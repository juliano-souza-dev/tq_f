// Full-frame procedural WebGL cosmic field: parallax stars, twinkles, and nebula glow.
// Single quad, no textures or point sprites. Canvas never intercepts input.
const VERT=`attribute vec2 a_pos;varying vec2 v_uv;void main(){v_uv=a_pos*.5+.5;gl_Position=vec4(a_pos,0.0,1.0);}`;
const FRAG=`precision highp float;
varying vec2 v_uv;
uniform float u_time;
uniform vec2 u_resolution;
float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453123);}
vec3 stars(vec2 uv,float density,float speed,float radius,vec3 tint){
 float aspect=u_resolution.x/max(1.,u_resolution.y);
 vec2 p=uv*vec2(density*aspect,density)+vec2(u_time*speed,-u_time*speed*.3);
 vec2 cell=floor(p),f=fract(p);vec3 light=vec3(0.);
 for(int y=-1;y<=1;y++)for(int x=-1;x<=1;x++){
  vec2 key=cell+vec2(float(x),float(y));float seed=hash(key);
  vec2 center=vec2(float(x),float(y))+vec2(.15+.7*seed,.15+.7*hash(key+12.7));
  vec2 delta=f-center;float d=length(delta);
  float halo=(1.-smoothstep(0.,radius*2.5,d))*.50;
  float core=1.-smoothstep(radius*.05,radius*.38,d);
  float twinkle=.68+.32*sin(u_time*(1.8+seed*2.0)+seed*35.);
  float cross=(exp(-abs(delta.x)*42.)*exp(-abs(delta.y)*5.)+exp(-abs(delta.y)*42.)*exp(-abs(delta.x)*5.))*.35;
  float prominent=step(.82,seed);
  vec3 color=mix(tint,vec3(1.),seed*.6);
  light+=color*(halo+core*.75+cross*prominent)*twinkle;
 }
 return min(light,vec3(1.));
}
float meteor(vec2 uv,float seed){
 float cycle=mod(u_time*.23+seed,1.);
 float active=smoothstep(.03,.10,cycle)*(1.-smoothstep(.28,.36,cycle));
 vec2 head=vec2(1.24-cycle*3.,.92-cycle*.95)+vec2(seed*.14,-seed*.22);
 vec2 d=uv-head;
 float distanceLine=abs(d.y-d.x*.32);
 float behind=smoothstep(-.36,-.02,d.x)*(1.-smoothstep(0.,.025,d.x));
 return active*exp(-distanceLine*115.)*behind*.92;
}
void main(){
 vec2 uv=v_uv;
 float n=sin(uv.x*8.+u_time*.16)*sin(uv.y*5.5-u_time*.11);
 float mist=smoothstep(-.35,.9,n)*.11;
 vec3 far=stars(uv,23.,.014,.17,vec3(.49,.72,1.));
 vec3 middle=stars(uv,13.,.033,.22,vec3(.84,.59,1.));
 vec3 near=stars(uv,7.,.065,.24,vec3(1.,.9,.63));
 float shooting=max(meteor(uv,.07),meteor(uv,.57));
 vec3 color=far*.9+middle*1.1+near*1.3+vec3(.46,.19,.85)*mist+shooting*vec3(.95,.94,1.);
 float opacity=clamp(max(max(color.r,color.g),color.b)*.95+mist*.6,0.,.96);
 gl_FragColor=vec4(min(color,vec3(1.)),opacity);
}`;
function makeShader(gl,type,source){
 const shader=gl.createShader(type);gl.shaderSource(shader,source);gl.compileShader(shader);
 if(!gl.getShaderParameter(shader,gl.COMPILE_STATUS)){const e=gl.getShaderInfoLog(shader);gl.deleteShader(shader);throw new Error(e)}
 return shader;
}
export function mountCosmicEffect(host,{windowRef=window,preview=false}={}){
 if(!host)return ()=>{};
 const doc=host.ownerDocument,media=windowRef.matchMedia?.('(prefers-reduced-motion: reduce)');
 if(media?.matches)return ()=>{};
 const canvas=doc.createElement('canvas');canvas.className='background-webgl-layer cosmic-scene';
 canvas.setAttribute('aria-hidden','true');
 canvas.style.cssText='position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:15';
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
 }catch(e){console.warn('Cosmic WebGL unavailable:',e);destroy()}
 return destroy;
}
