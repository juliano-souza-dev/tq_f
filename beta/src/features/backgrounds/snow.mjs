// Full-frame procedural WebGL snowfall: foreground, middle and distant layers.
// Single quad, no textures or point sprites. Canvas never intercepts input.
const VERT=`attribute vec2 a_pos;varying vec2 v_uv;void main(){v_uv=a_pos*.5+.5;gl_Position=vec4(a_pos,0.0,1.0);}`;
const FRAG=`precision highp float;
varying vec2 v_uv;
uniform float u_time;
uniform vec2 u_resolution;
float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453123);}
float layer(vec2 uv,float scale,float speed,float radius,float brightness){
 vec2 p=uv*vec2(scale*u_resolution.x/max(1.0,u_resolution.y),scale);
 p.y+=u_time*speed;
 p.x+=sin(u_time*.31+p.y*.34)*.22;
 vec2 cell=floor(p),f=fract(p);
 float light=0.0;
 for(int y=-1;y<=1;y++){
  for(int x=-1;x<=1;x++){
   vec2 offset=vec2(float(x),float(y));
   vec2 key=cell+offset;
   float seed=hash(key);
   vec2 center=offset+vec2(.16+.68*seed,.14+.70*hash(key+17.7));
   center.x+=sin(u_time*(.4+seed*.6)+seed*6.28)*.16;
   float d=length(f-center);
   float flake=1.0-smoothstep(radius*.26,radius,d);
   light=max(light,flake*(.55+.45*seed));
  }
 }
 return light*brightness;
}
void main(){
 vec2 uv=v_uv;
 float farSnow=layer(uv,16.0,.45,.062,.48);
 float midSnow=layer(uv,10.0,.72,.078,.76);
 float nearSnow=layer(uv,6.5,1.05,.090,1.0);
 float intensity=clamp(farSnow+midSnow+nearSnow,0.0,1.0);
 vec3 rgb=mix(vec3(.75,.88,1.0),vec3(1.0),clamp(nearSnow+midSnow*.5,0.,1.));
 gl_FragColor=vec4(rgb,intensity*.92);
}`;
function makeShader(gl,type,source){
 const shader=gl.createShader(type);gl.shaderSource(shader,source);gl.compileShader(shader);
 if(!gl.getShaderParameter(shader,gl.COMPILE_STATUS)){const e=gl.getShaderInfoLog(shader);gl.deleteShader(shader);throw new Error(e)}
 return shader;
}
export function mountSnowEffect(host,{windowRef=window,preview=false}={}){
 if(!host)return ()=>{};
 const doc=host.ownerDocument,media=windowRef.matchMedia?.('(prefers-reduced-motion: reduce)');
 if(media?.matches)return ()=>{};
 const canvas=doc.createElement('canvas');canvas.className='background-webgl-layer snow-scene';
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
 }catch(e){console.warn('Snowfall WebGL unavailable:',e);destroy()}
 return destroy;
}
