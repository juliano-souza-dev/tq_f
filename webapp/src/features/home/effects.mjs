// WebGL leve em uma única camada, independente do DOM e dos controles.
export const FX_BALANCED=Object.freeze({fps:30,particles:32,maxDpr:1.5});
const VERT=`attribute vec2 a_position;attribute float a_size;attribute float a_phase;
uniform float u_time;uniform vec2 u_pointer;
varying float v_phase;
void main(){
 float p=a_phase;
 vec2 point=a_position;
 point.y=mod(point.y+u_time*(0.012+mod(p*3.17,0.018))+1.12,2.24)-1.12;
 point.x+=sin(u_time*0.43+p*11.0+point.y*4.0)*0.029;
 point.xy+=u_pointer*(0.009+0.014*fract(p*8.0));
 gl_Position=vec4(point,0.,1.);
 gl_PointSize=a_size*(0.88+0.14*sin(u_time*1.3+p*17.));
 v_phase=p;
}`;
const FRAG=`precision mediump float;
varying float v_phase;
void main(){
 vec2 p=gl_PointCoord*2.0-1.0;
 float d=length(p);
 float halo=pow(max(0.,1.0-d),2.5);
 float core=1.0-smoothstep(0.0,0.23,d);
 vec3 gold=vec3(1.0,0.76,0.32);
 vec3 cyan=vec3(0.51,0.91,1.0);
 vec3 color=mix(gold,cyan,step(0.77,fract(v_phase*9.1)));
 float blink=0.60+0.35*sin(v_phase*31.0);
 gl_FragColor=vec4(color*(0.80+core*0.2), (halo*0.62+core*0.64)*blink);
}`;
function shader(gl,type,src){
 const s=gl.createShader(type);if(!s)throw Error('shader unavailable');
 gl.shaderSource(s,src);gl.compileShader(s);
 if(!gl.getShaderParameter(s,gl.COMPILE_STATUS)){const message=gl.getShaderInfoLog(s);gl.deleteShader(s);throw Error(message)}
 return s;
}
function initialize(gl){
 const vs=shader(gl,gl.VERTEX_SHADER,VERT),fs=shader(gl,gl.FRAGMENT_SHADER,FRAG),program=gl.createProgram();
 if(!program)throw Error('program unavailable');
 gl.attachShader(program,vs);gl.attachShader(program,fs);gl.linkProgram(program);
 gl.deleteShader(vs);gl.deleteShader(fs);
 if(!gl.getProgramParameter(program,gl.LINK_STATUS)){const msg=gl.getProgramInfoLog(program);gl.deleteProgram(program);throw Error(msg)}
 return program;
}
export function mountHomeEffects({root=document,windowRef=window,quality=FX_BALANCED}={}){
 const host=root.querySelector('.home-view');
 if(!host)return ()=>{};
 const doc=host.ownerDocument;
 const media=windowRef.matchMedia?.('(prefers-reduced-motion: reduce)');
 const canvas=doc.createElement('canvas');
 canvas.className='home-webgl-fx';canvas.setAttribute('aria-hidden','true');
 canvas.setAttribute('data-fx-quality','balanced');
 let gl=null,raf=0,observer=null,program=null,buffer=null,active=false,disposed=false;
 const cleanupFns=[];
 let pointer=[0,0],last=0;
 const fallback=()=>{canvas.remove();host.classList.add('home-fx-fallback');host.dataset.fxMode='fallback';};
 const pause=()=>{active=false;if(raf)windowRef.cancelAnimationFrame(raf);raf=0;};
 const updateSize=()=>{
   if(!gl)return;
   const box=host.getBoundingClientRect(),dpr=Math.min(quality.maxDpr,windowRef.devicePixelRatio||1);
   const w=Math.max(1,Math.round(box.width*dpr)),h=Math.max(1,Math.round(box.height*dpr));
   if(canvas.width!==w||canvas.height!==h){canvas.width=w;canvas.height=h;gl.viewport(0,0,w,h)}
 };
 const frame=timestamp=>{
   raf=0;if(!active||disposed||!gl)return;
   if(timestamp-last>=1000/quality.fps){
     last=timestamp;updateSize();
     gl.clearColor(0,0,0,0);gl.clear(gl.COLOR_BUFFER_BIT);
     gl.useProgram(program);
     gl.uniform1f(gl.getUniformLocation(program,'u_time'),timestamp*0.001);
     gl.uniform2fv(gl.getUniformLocation(program,'u_pointer'),pointer);
     gl.drawArrays(gl.POINTS,0,quality.particles);
   }
   raf=windowRef.requestAnimationFrame(frame);
 };
 const resume=()=>{
   if(disposed||active||doc.hidden||media?.matches)return;
   active=true;last=0;raf=windowRef.requestAnimationFrame(frame);
 };
 const destroy=()=>{
   if(disposed)return;disposed=true;pause();
   for(const unlisten of cleanupFns)unlisten();
   observer?.disconnect();
   if(gl){if(buffer)gl.deleteBuffer(buffer);if(program)gl.deleteProgram(program)}
   canvas.remove();host.classList.remove('home-fx-fallback');delete host.dataset.fxMode;
 };
 if(media?.matches){fallback();return destroy}
 try{
   host.prepend(canvas);
   gl=canvas.getContext('webgl',{alpha:true,antialias:false,premultipliedAlpha:false,depth:false,stencil:false,powerPreference:'low-power',preserveDrawingBuffer:false});
   if(!gl){fallback();return destroy}
   program=initialize(gl);
   buffer=gl.createBuffer();if(!buffer)throw Error('buffer unavailable');
   const points=new Float32Array(quality.particles*4);
   // Aleatório determinístico, sem grandes alocações no loop.
   for(let i=0;i<quality.particles;i++){
     const seed=i*0.61803398875;
     points[i*4]=(seed%1)*2-1;
     points[i*4+1]=((seed*7.13)%1)*2-1;
     points[i*4+2]=3+((seed*19.3)%1)*8;
     points[i*4+3]=seed%1;
   }
   gl.bindBuffer(gl.ARRAY_BUFFER,buffer);gl.bufferData(gl.ARRAY_BUFFER,points,gl.STATIC_DRAW);
   gl.useProgram(program);
   const stride=4*4;
   for(const [name,size,offset] of [['a_position',2,0],['a_size',1,8],['a_phase',1,12]]){
     const location=gl.getAttribLocation(program,name);
     if(location<0)continue;
     gl.enableVertexAttribArray(location);gl.vertexAttribPointer(location,size,gl.FLOAT,false,stride,offset);
   }
   gl.enable(gl.BLEND);gl.blendFunc(gl.SRC_ALPHA,gl.ONE_MINUS_SRC_ALPHA);
   host.dataset.fxMode='webgl';
   const move=event=>{
     const rect=host.getBoundingClientRect();
     pointer=[Math.max(-1,Math.min(1,((event.clientX-rect.left)/rect.width)*2-1)),
              Math.max(-1,Math.min(1,1-((event.clientY-rect.top)/rect.height)*2))];
   };
   const onVisibility=()=>doc.hidden?pause():resume();
   const onMedia=()=>media?.matches?pause():resume();
   const onLost=e=>{e.preventDefault();pause();fallback()};
   host.addEventListener('pointermove',move,{passive:true});
   cleanupFns.push(()=>host.removeEventListener('pointermove',move));
   doc.addEventListener('visibilitychange',onVisibility);
   cleanupFns.push(()=>doc.removeEventListener('visibilitychange',onVisibility));
   media?.addEventListener?.('change',onMedia);
   cleanupFns.push(()=>media?.removeEventListener?.('change',onMedia));
   canvas.addEventListener('webglcontextlost',onLost);
   cleanupFns.push(()=>canvas.removeEventListener('webglcontextlost',onLost));
   if(typeof windowRef.ResizeObserver==='function'){observer=new windowRef.ResizeObserver(updateSize);observer.observe(host)}
   else{windowRef.addEventListener('resize',updateSize);cleanupFns.push(()=>windowRef.removeEventListener('resize',updateSize))}
   updateSize();resume();
 }catch(e){pause();fallback();if(gl){if(buffer)gl.deleteBuffer(buffer);if(program)gl.deleteProgram(program)}}
 return destroy;
}
