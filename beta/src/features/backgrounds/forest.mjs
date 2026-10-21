// Forest Magic: WebGL fireflies, pollen and subtle moving sunbeams.
// Single quad, no textures or point sprites. Canvas never intercepts input.
const VERT=`attribute vec2 a_pos;varying vec2 v_uv;void main(){v_uv=a_pos*.5+.5;gl_Position=vec4(a_pos,0.0,1.0);}`;
const FRAG=`precision highp float;
varying vec2 v_uv;
uniform float u_time;
uniform vec2 u_resolution;
float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453123);}
vec3 forestLayer(vec2 uv,float density,float speed,float radius,float opacity,vec3 tint){
 float aspect=u_resolution.x/max(u_resolution.y,1.);
 vec2 p=uv*vec2(aspect*density,density);
 vec2 cell=floor(p),f=fract(p);
 vec3 sum=vec3(0.);
 for(int y=-1;y<=1;y++)for(int x=-1;x<=1;x++){
  vec2 key=cell+vec2(float(x),float(y));
  float seed=hash(key+11.);
  // A few fireflies hover in place instead of filling every cell.
  float enabled=step(.26,seed);
  vec2 center=vec2(float(x),float(y))+
   vec2(.15+.70*hash(key+23.),.15+.7*hash(key+38.));
  center+=vec2(sin(u_time*speed+seed*14.)*.15,
               cos(u_time*speed*.72+seed*33.)*.12);
  float d=length(f-center);
  float light=1.-smoothstep(radius*.15,radius*2.4,d);
  float core=1.-smoothstep(.0,radius*.36,d);
  float pulse=.60+.40*sin(u_time*(1.2+seed*.9)+seed*29.);
  vec3 c=mix(tint,vec3(1.,.96,.64),hash(key+62.)*.55);
  sum+=c*(light*.40+core*.75)*enabled*pulse*opacity;
 }
 return min(sum,vec3(1.));
}
void main(){
 vec2 uv=v_uv;
 // Pollen gradually rises between the trunks; fireflies hover near foliage.
 vec3 distant=forestLayer(uv,16.,.36,.115,.33,vec3(.70,.95,.49));
 vec3 pollen=forestLayer(uv+vec2(0.,u_time*.0035),12.,.42,.12,.32,vec3(.98,.83,.44));
 vec3 flies=forestLayer(uv,6.5,.95,.17,.76,vec3(.67,1.,.43));
 // Warm forest light shafts, low-opacity and slow to avoid obscuring artwork.
 float shaft=pow(max(0.,sin(uv.x*19.+sin(uv.y*3.+u_time*.15))),11.)*.023;
 vec3 rgb=min(distant+pollen+flies+vec3(.9,.8,.42)*shaft,vec3(1.));
 float alpha=clamp(max(max(rgb.r,rgb.g),rgb.b)*.79+shaft,0.,.82);
 gl_FragColor=vec4(rgb,alpha);
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
