// Enchanted cloud sky WebGL: moving mist, sun shafts, drifting petals.
// Single quad, no textures or point sprites. Canvas never intercepts input.
const VERT=`attribute vec2 a_pos;varying vec2 v_uv;void main(){v_uv=a_pos*.5+.5;gl_Position=vec4(a_pos,0.0,1.0);}`;
const FRAG=`precision highp float;
varying vec2 v_uv;
uniform float u_time;
uniform vec2 u_resolution;
float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453123);}
float cloud(vec2 p){
 float v=sin(p.x*4.4+sin(p.y*3.0)*.8)*.5+.5;
 v+=sin(p.x*8.2-p.y*2.7)*.17;
 v+=sin(p.x*12.4+p.y*5.3)*.09;
 return smoothstep(.57,.82,v);
}
float petal(vec2 p,float phase){
 float t=u_time*.095+phase*5.;
 vec2 location=vec2(fract(phase*.731+t*.21),1.-fract(phase*.923+t*.32));
 location.x+=sin(u_time*.71+phase*19.)*.044;
 vec2 d=p-location;float a=u_time*.85+phase*24.;
 vec2 r=vec2(cos(a)*d.x-sin(a)*d.y,sin(a)*d.x+cos(a)*d.y);
 return (1.-smoothstep(.009,.016,length(r/vec2(.72,1.25))))*.68;
}
void main(){
 vec2 uv=v_uv;
 // Transparent animated mist bands. Floating islands stay untouched.
 float y=uv.y;
 float band=smoothstep(.13,.36,y)*(1.-smoothstep(.60,.83,y));
 float drift=cloud(vec2(uv.x*1.1-u_time*.013,uv.y*.65));
 float mist=drift*band*.19;
 float ray=pow(max(0.,sin(uv.x*11.5+uv.y*3.8+u_time*.15)),6.);
 float daylight=ray*smoothstep(.32,.87,y)*.095;
 float petals=0.;
 for(int i=0;i<10;i++){petals+=petal(uv,float(i)*.131+.081);}
 petals=clamp(petals,0.,.7);
 float glimmer=pow(max(0.,sin(uv.x*62.+u_time*.7)*sin(uv.y*74.-u_time*.4)),22.)*.06;
 vec3 rgb=vec3(.92,.96,1.)*mist+vec3(1.,.89,.58)*daylight+
          vec3(1.,.36,.70)*petals+vec3(1.,.97,.72)*glimmer;
 float alpha=clamp(mist+daylight+petals*.88+glimmer,0.,.72);
 gl_FragColor=vec4(min(rgb,vec3(1.)),alpha);
}`;
function makeShader(gl,type,source){
 const shader=gl.createShader(type);gl.shaderSource(shader,source);gl.compileShader(shader);
 if(!gl.getShaderParameter(shader,gl.COMPILE_STATUS)){const e=gl.getShaderInfoLog(shader);gl.deleteShader(shader);throw new Error(e)}
 return shader;
}
export function mountCloudSkyEffect(host,{windowRef=window,preview=false}={}){
 if(!host)return ()=>{};
 const doc=host.ownerDocument,media=windowRef.matchMedia?.('(prefers-reduced-motion: reduce)');
 if(media?.matches)return ()=>{};
 const canvas=doc.createElement('canvas');canvas.className='background-webgl-layer clouds-scene';
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
 }catch(e){console.warn('Cloud sky WebGL unavailable:',e);destroy()}
 return destroy;
}
