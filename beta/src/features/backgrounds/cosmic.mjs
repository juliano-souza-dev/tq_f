// Full-frame procedural WebGL cosmic field: parallax stars, twinkles, and nebula glow.
// Single quad, no textures or point sprites. Canvas never intercepts input.
const VERT=`attribute vec2 a_pos;varying vec2 v_uv;void main(){v_uv=a_pos*.5+.5;gl_Position=vec4(a_pos,0.0,1.0);}`;
const FRAG=`precision highp float;
varying vec2 v_uv;
uniform float u_time;
uniform vec2 u_resolution;
float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453123);}
vec3 starfield(vec2 uv,float density,float drift,float radius,vec3 tint){
 float ratio=u_resolution.x/max(1.0,u_resolution.y);
 vec2 p=uv*vec2(density*ratio,density);
 p+=vec2(u_time*drift,-u_time*drift*.26);
 vec2 cell=floor(p),f=fract(p);
 vec3 light=vec3(0.);
 for(int y=-1;y<=1;y++)for(int x=-1;x<=1;x++){
  vec2 offset=vec2(float(x),float(y));
  vec2 key=cell+offset;
  float seed=hash(key);
  vec2 star=offset+vec2(.15+.7*seed,.15+.7*hash(key+13.5));
  float d=length(f-star);
  float halo=1.0-smoothstep(radius*.17,radius,d);
  float pulse=.62+.38*sin(u_time*(1.2+seed*2.0)+seed*28.0);
  float spike=max(0.,1.0-abs(f.x-star.x)*65.)*max(0.,1.0-abs(f.y-star.y)*10.);
  float core=1.0-smoothstep(0.0,radius*.23,d);
  vec3 color=mix(tint,vec3(1.0),seed*.65);
  light+=color*(halo*.62+core*.42+spike*halo*.09)*pulse;
 }
 return clamp(light,vec3(0.),vec3(1.));
}
void main(){
 vec2 uv=v_uv;
 vec2 p=uv-.5;
 float nebula=sin(uv.x*6.5+u_time*.12)*sin(uv.y*7.3-u_time*.09);
 float haze=smoothstep(.0,.8,nebula)*.055;
 vec3 distant=starfield(uv,22.0,.009,.105,vec3(.58,.74,1.0));
 vec3 middle=starfield(uv,13.0,.021,.115,vec3(.82,.65,1.0));
 vec3 near=starfield(uv,7.0,.043,.095,vec3(1.0,.93,.79));
 vec3 rgb=clamp(distant*.65+middle*.86+near+vec3(.32,.13,.65)*haze,vec3(0.),vec3(1.));
 float alpha=clamp(max(max(rgb.r,rgb.g),rgb.b)*.88+haze,0.,.9);
 gl_FragColor=vec4(rgb,alpha);
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
