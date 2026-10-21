// Forest Magic: daytime WebGL sunlight, airborne dust and drifting autumn leaves.
// Single quad, no textures or point sprites. Canvas never intercepts input.
const VERT=`attribute vec2 a_pos;varying vec2 v_uv;void main(){v_uv=a_pos*.5+.5;gl_Position=vec4(a_pos,0.0,1.0);}`;
const FRAG=`precision highp float;
varying vec2 v_uv;
uniform float u_time;
uniform vec2 u_resolution;
float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453123);}
vec4 fallingLeaves(vec2 uv,float density,float speed,float opacity){
 float aspect=u_resolution.x/max(u_resolution.y,1.);
 vec2 p=uv*vec2(aspect*density,density);
 p.y+=u_time*speed;
 p.x+=sin(u_time*.48+p.y*.7)*.26;
 vec2 cell=floor(p),f=fract(p);
 vec4 result=vec4(0.);
 for(int y=-1;y<=1;y++)for(int x=-1;x<=1;x++){
  vec2 key=cell+vec2(float(x),float(y));
  float seed=hash(key+8.);
  vec2 center=vec2(float(x),float(y))+vec2(.14+.72*hash(key+18.),.14+.72*hash(key+29.));
  center.x+=sin(u_time*.7+seed*23.)*.24;
  vec2 d=f-center;
  float angle=seed*6.283+sin(u_time*.9+seed*13.)*.6;
  vec2 q=vec2(cos(angle)*d.x-sin(angle)*d.y,sin(angle)*d.x+cos(angle)*d.y);
  float shape=length(q/vec2(.17,.065));
  float leaf=1.-smoothstep(.76,1.10,shape);
  float vein=1.-smoothstep(.006,.024,abs(q.y));
  vec3 color=mix(vec3(.85,.48,.12),vec3(.58,.78,.23),hash(key+51.));
  float a=leaf*(.64+.12*vein)*opacity*step(.15,seed);
  result.rgb+=color*a;
  result.a+=a;
 }
 return vec4(min(result.rgb,vec3(1.)),min(result.a,1.));
}
float dust(vec2 uv,float scale,float speed){
 float ratio=u_resolution.x/max(u_resolution.y,1.);
 vec2 p=uv*vec2(scale*ratio,scale)+vec2(u_time*.016,-u_time*speed);
 vec2 cell=floor(p),f=fract(p);
 float b=0.;
 for(int y=-1;y<=1;y++)for(int x=-1;x<=1;x++){
  vec2 key=cell+vec2(float(x),float(y));
  vec2 center=vec2(float(x),float(y))+vec2(hash(key+2.),hash(key+19.));
  float d=length(f-center);
  b+= (1.-smoothstep(.022,.085,d))*(.4+.6*hash(key+31.));
 }
 return min(b,1.);
}
void main(){
 vec2 uv=v_uv;
 // Wide sunlight shafts leaning through canopy from the upper left.
 float beamX=uv.x+(.95-uv.y)*.35;
 float shafts=pow(max(0.,sin(beamX*14.0+sin(uv.y*2.3+u_time*.14)*.20)),5.0);
 float sunMask=smoothstep(.02,.30,uv.y)*(1.-smoothstep(.65,1.,uv.y));
 float light=shafts*sunMask*(.20+.055*sin(u_time*.32));
 float ambient=(.028+.025*sin(uv.x*7.+u_time*.14))*sunMask;
 float pollen=dust(uv,13.,.05)*.32;
 vec4 farLeaves=fallingLeaves(uv,4.7,.22,.57);
 vec4 closeLeaves=fallingLeaves(uv+vec2(.27,.16),3.3,.34,.85);
 vec3 glow=vec3(1.,.84,.44)*(light+ambient)+vec3(1.,.92,.59)*pollen;
 vec3 mixed=glow+farLeaves.rgb+closeLeaves.rgb;
 float alpha=clamp(light*.8+ambient+pollen*.65+farLeaves.a+closeLeaves.a,0.,.83);
 gl_FragColor=vec4(min(mixed,vec3(1.)),alpha);
}`;
function makeShader(gl,type,source){
 const shader=gl.createShader(type);gl.shaderSource(shader,source);gl.compileShader(shader);
 if(!gl.getShaderParameter(shader,gl.COMPILE_STATUS)){const e=gl.getShaderInfoLog(shader);gl.deleteShader(shader);throw new Error(e)}
 return shader;
}
export function mountForestEffect(host,{windowRef=window,preview=false}={}){
 if(!host)return ()=>{};
 const doc=host.ownerDocument,media=windowRef.matchMedia?.('(prefers-reduced-motion: reduce)');
 if(media?.matches)return ()=>{};
 const canvas=doc.createElement('canvas');canvas.className='background-webgl-layer forest-scene';
 canvas.setAttribute('aria-hidden','true');
 canvas.style.cssText='position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:0';
 host.prepend(canvas);
 let gl=null,program=null,buffer=null,raf=0,observer=null,dead=false,last=0;
 const cleanup=[];
 const stop=()=>{if(raf)windowRef.cancelAnimationFrame(raf);raf=0};
 const destroy=()=>{if(dead)return;dead=true;stop();cleanup.forEach(fn=>fn());observer?.disconnect();if(gl){if(buffer)gl.deleteBuffer(buffer);if(program)gl.deleteProgram(program)}canvas.remove()};
 const size=()=>{if(!gl)return;const r=host.getBoundingClientRect(),scale=Math.min(windowRef.devicePixelRatio||1,1.25,Math.sqrt(245000/Math.max(1,r.width*r.height)));const w=Math.max(1,Math.round(r.width*scale)),h=Math.max(1,Math.round(r.height*scale));if(w!==canvas.width||h!==canvas.height){canvas.width=w;canvas.height=h;gl.viewport(0,0,w,h)}};
 const draw=t=>{raf=0;if(dead||doc.hidden||media?.matches)return;if(t-last>=1000/25){last=t;size();gl.clearColor(0,0,0,0);gl.clear(gl.COLOR_BUFFER_BIT);gl.useProgram(program);gl.uniform1f(gl.getUniformLocation(program,'u_time'),t*.001);gl.uniform2f(gl.getUniformLocation(program,'u_resolution'),canvas.width,canvas.height);gl.drawArrays(gl.TRIANGLE_STRIP,0,4)}raf=windowRef.requestAnimationFrame(draw)};
 const resume=()=>{if(!dead&&!doc.hidden&&!media?.matches&&!raf)raf=windowRef.requestAnimationFrame(draw)};
 const visibility=()=>{if(doc.hidden||media?.matches)stop();else resume()};
 try{
  gl=canvas.getContext('webgl',{alpha:true,antialias:false,depth:false,stencil:false,premultipliedAlpha:false,powerPreference:'low-power'});
  if(!gl){destroy();return ()=>{}}
  const v=makeShader(gl,gl.VERTEX_SHADER,VERT),f=makeShader(gl,gl.FRAGMENT_SHADER,FRAG);
  program=gl.createProgram();gl.attachShader(program,v);gl.attachShader(program,f);gl.linkProgram(program);gl.deleteShader(v);gl.deleteShader(f);
  if(!gl.getProgramParameter(program,gl.LINK_STATUS))throw new Error(gl.getProgramInfoLog(program));
  buffer=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,buffer);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,1,1]),gl.STATIC_DRAW);
  const loc=gl.getAttribLocation(program,'a_pos');gl.enableVertexAttribArray(loc);gl.vertexAttribPointer(loc,2,gl.FLOAT,false,0,0);
  gl.enable(gl.BLEND);gl.blendFunc(gl.SRC_ALPHA,gl.ONE_MINUS_SRC_ALPHA);
  doc.addEventListener('visibilitychange',visibility);cleanup.push(()=>doc.removeEventListener('visibilitychange',visibility));
  media?.addEventListener?.('change',visibility);cleanup.push(()=>media?.removeEventListener?.('change',visibility));
  const lost=e=>{e.preventDefault();destroy()};canvas.addEventListener('webglcontextlost',lost);cleanup.push(()=>canvas.removeEventListener('webglcontextlost',lost));
  if(windowRef.ResizeObserver){observer=new windowRef.ResizeObserver(size);observer.observe(host)}else{windowRef.addEventListener('resize',size);cleanup.push(()=>windowRef.removeEventListener('resize',size))}
  size();resume();
 }catch(e){console.warn('Forest WebGL unavailable:',e);destroy()}
 return destroy;
}
