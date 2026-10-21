// Tropical Beach: texture-based WebGL water distortion. The image itself is sampled,
// not merely decorated with particles. Transparent pixels leave land and sky intact.
import {BACKGROUNDS,backgroundUrl} from './catalog.mjs';
const SOURCE=backgroundUrl(BACKGROUNDS.find(x=>x.id==='bg_ocean'));
const VS=`attribute vec2 a_position;varying vec2 v_uv;void main(){v_uv=a_position*.5+.5;gl_Position=vec4(a_position,0.,1.);}`;
const FS=`precision mediump float;
varying vec2 v_uv;
uniform sampler2D u_texture;
uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_image;
void main(){
 // object-fit:cover UV mapping, matching the CSS background and img.
 vec2 scale=vec2(max(u_resolution.x/u_image.x,u_resolution.y/u_image.y));
 vec2 visible=u_resolution/(u_image*scale);
 vec2 p=(v_uv-.5)*visible+.5;
 // Beach image: ocean dominates the right-hand side below the horizon.
 // Mask is softly graded to keep palms, sand and sky sharp.
 float horizon=1.0-smoothstep(.47,.62,p.y);
 float coast=.51-.39*smoothstep(.05,.95,p.y);
 float offshore=smoothstep(coast-.075,coast+.07,p.x);
 float sea=horizon*offshore;
 float ripple=sin(p.y*155.0-p.x*29.0-u_time*2.65+sin(p.x*38.0+u_time*.7));
 float swell=sin(p.y*57.0+p.x*18.0-u_time*1.25);
 vec2 displacement=vec2((ripple*.0028+swell*.0038),(ripple*.0013+swell*.0023))*sea;
 vec2 sampleUV=clamp(p+displacement,vec2(.002),vec2(.998));
 vec3 original=texture2D(u_texture,p).rgb;
 vec3 shifted=texture2D(u_texture,sampleUV).rgb;
 float crest=pow(max(0.,sin(p.y*108.0+p.x*34.0-u_time*2.1)),15.0);
 float reflection=pow(max(0.,sin(p.y*182.0-p.x*24.0-u_time*3.1)*sin(p.x*35.0+u_time*.7)),12.0);
 // Animated shoreline foam where sand transitions to the sea.
 float beachEdge=exp(-pow((p.x-coast)/.058,2.0))*horizon;
 float foam=pow(max(0.,sin(p.y*88.0+p.x*45.0-u_time*1.7)),11.0)*beachEdge;
 vec3 color=shifted+vec3(.14,.35,.36)*crest*.18+vec3(.48,.55,.46)*reflection*.21+vec3(.65,.83,.74)*foam*.40;
 // The canvas is transparent except over the water: no distortion elsewhere.
 float alpha=sea*.96;
 gl_FragColor=vec4(mix(original,color,sea),alpha);
}`;
function shader(gl,type,source){const s=gl.createShader(type);gl.shaderSource(s,source);gl.compileShader(s);if(!gl.getShaderParameter(s,gl.COMPILE_STATUS)){const msg=gl.getShaderInfoLog(s);gl.deleteShader(s);throw Error(msg)}return s}
export function mountOceanEffect(host,{windowRef=window}={}){
 if(!host)return ()=>{};
 const doc=host.ownerDocument;
 const media=windowRef.matchMedia?.('(prefers-reduced-motion: reduce)');
 if(media?.matches)return ()=>{};
 const canvas=doc.createElement('canvas');
 canvas.className='background-webgl-layer ocean-webgl-layer';
 canvas.setAttribute('aria-hidden','true');
 canvas.style.cssText='position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:1';
 host.style.isolation='isolate';
 host.prepend(canvas);
 let gl=null,program=null,buffer=null,texture=null,raf=0,last=0,observer=null,dead=false,loaded=false;
 let imageWidth=1,imageHeight=1;
 const cleanup=[];
 const image=new Image();
 image.crossOrigin='anonymous';
 const stop=()=>{if(raf)windowRef.cancelAnimationFrame(raf);raf=0};
 const destroy=()=>{if(dead)return;dead=true;stop();image.onload=null;image.onerror=null;cleanup.forEach(f=>f());observer?.disconnect();if(gl){if(texture)gl.deleteTexture(texture);if(buffer)gl.deleteBuffer(buffer);if(program)gl.deleteProgram(program)}canvas.remove()};
 const size=()=>{if(!gl)return;const rect=host.getBoundingClientRect();const dpr=Math.min(windowRef.devicePixelRatio||1,1.25);const scale=Math.min(dpr,Math.sqrt(380000/Math.max(1,rect.width*rect.height)));const w=Math.max(1,Math.round(rect.width*scale)),h=Math.max(1,Math.round(rect.height*scale));if(canvas.width!==w||canvas.height!==h){canvas.width=w;canvas.height=h;gl.viewport(0,0,w,h)}};
 const draw=t=>{raf=0;if(dead||!loaded||doc.hidden||media?.matches)return;if(t-last>=1000/30){last=t;size();gl.clearColor(0,0,0,0);gl.clear(gl.COLOR_BUFFER_BIT);gl.useProgram(program);gl.activeTexture(gl.TEXTURE0);gl.bindTexture(gl.TEXTURE_2D,texture);gl.uniform1i(gl.getUniformLocation(program,'u_texture'),0);gl.uniform1f(gl.getUniformLocation(program,'u_time'),t*.001);gl.uniform2f(gl.getUniformLocation(program,'u_resolution'),canvas.width,canvas.height);gl.uniform2f(gl.getUniformLocation(program,'u_image'),imageWidth,imageHeight);gl.drawArrays(gl.TRIANGLE_STRIP,0,4)}raf=windowRef.requestAnimationFrame(draw)};
 const resume=()=>{if(!dead&&loaded&&!raf&&!doc.hidden&&!media?.matches)raf=windowRef.requestAnimationFrame(draw)};
 const visibility=()=>{if(doc.hidden||media?.matches)stop();else resume()};
 try{
  gl=canvas.getContext('webgl',{alpha:true,antialias:false,depth:false,stencil:false,premultipliedAlpha:false,powerPreference:'low-power'});
  if(!gl){destroy();return ()=>{}}
  const vert=shader(gl,gl.VERTEX_SHADER,VS),frag=shader(gl,gl.FRAGMENT_SHADER,FS);
  program=gl.createProgram();gl.attachShader(program,vert);gl.attachShader(program,frag);gl.linkProgram(program);gl.deleteShader(vert);gl.deleteShader(frag);
  if(!gl.getProgramParameter(program,gl.LINK_STATUS))throw Error(gl.getProgramInfoLog(program));
  buffer=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,buffer);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,1,1]),gl.STATIC_DRAW);
  const loc=gl.getAttribLocation(program,'a_position');gl.enableVertexAttribArray(loc);gl.vertexAttribPointer(loc,2,gl.FLOAT,false,0,0);
  texture=gl.createTexture();gl.bindTexture(gl.TEXTURE_2D,texture);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);
  gl.enable(gl.BLEND);gl.blendFunc(gl.SRC_ALPHA,gl.ONE_MINUS_SRC_ALPHA);
  image.onload=()=>{if(dead)return;imageWidth=image.naturalWidth;imageHeight=image.naturalHeight;gl.bindTexture(gl.TEXTURE_2D,texture);gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL,true);gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,image);loaded=true;size();resume()};
  image.onerror=()=>{console.warn('Ocean texture could not load');destroy()};
  image.src=SOURCE;
  doc.addEventListener('visibilitychange',visibility);cleanup.push(()=>doc.removeEventListener('visibilitychange',visibility));
  media?.addEventListener?.('change',visibility);cleanup.push(()=>media?.removeEventListener?.('change',visibility));
  const onLost=e=>{e.preventDefault();destroy()};canvas.addEventListener('webglcontextlost',onLost);cleanup.push(()=>canvas.removeEventListener('webglcontextlost',onLost));
  if(windowRef.ResizeObserver){observer=new windowRef.ResizeObserver(size);observer.observe(host)}else{windowRef.addEventListener('resize',size);cleanup.push(()=>windowRef.removeEventListener('resize',size))}
  size();
 }catch(e){console.warn('Ocean shader error',e);destroy()}
 return destroy;
}
