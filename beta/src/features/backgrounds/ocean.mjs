// GPU sea surface with animated wave crests, bounded to the water in the beach artwork.
export function mountOceanEffect(host,{windowRef=window,preview=false}={}){
 if(!host)return ()=>{};
 const doc=host.ownerDocument,reduce=windowRef.matchMedia?.('(prefers-reduced-motion: reduce)');
 if(reduce?.matches)return ()=>{};
 const c=doc.createElement('canvas');c.className='background-webgl-layer ocean-webgl-layer';c.setAttribute('aria-hidden','true');
 c.style.cssText='position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:1';
 host.style.isolation='isolate';host.prepend(c);
 let gl,prog,buf,raf=0,last=0,dead=false,observer;const clean=[];
 const vertex=`attribute vec2 position;varying vec2 uv;void main(){uv=position*.5+.5;gl_Position=vec4(position,0.,1.);}`;
 const fragment=`precision mediump float;varying vec2 uv;uniform float time;uniform vec2 resolution;
 void main(){
  vec2 p=uv; // p.y 0 at bottom, 1 at top
  // The tropical beach art has the open sea on the right, with the waterline
  // extending diagonally down toward the lower-left portion of the picture.
  float shoreline=mix(.64,.15,smoothstep(.10,.95,p.x));
  float sea=smoothstep(shoreline-.06,shoreline+.09,p.x*0.10+p.y*0.90);
  sea*=smoothstep(.30,.53,p.x);
  // Water is below the horizon in this artwork, not in the sky.
  sea*=1.0-smoothstep(.49,.69,p.y);
  vec2 w=p;
  float wave=sin(w.y*126.0+w.x*19.0-time*2.0+sin(w.x*23.0+time*.55)*1.4);
  float cross=sin(w.y*78.0-w.x*40.0-time*1.3);
  float glint=pow(max(0.0,wave*.65+cross*.35),9.0);
  float foam=pow(max(0.0,sin(w.y*96.0+w.x*43.0-time*1.55)),19.0);
  float sparkle=pow(max(0.0,sin(w.x*291.0+time*1.8)*sin(w.y*213.0-time*1.5)),18.0);
  float pulse=.78+.22*sin(time*.8);
  vec3 color=mix(vec3(.15,.83,.94),vec3(.91,1.,.92),clamp(glint+foam,0.,1.));
  float opacity=sea*(.07+.23*glint+.15*foam+.31*sparkle)*pulse;
  gl_FragColor=vec4(color,opacity);
 }`;
 const compile=(type,src)=>{const sh=gl.createShader(type);gl.shaderSource(sh,src);gl.compileShader(sh);if(!gl.getShaderParameter(sh,gl.COMPILE_STATUS))throw Error(gl.getShaderInfoLog(sh));return sh};
 const stop=()=>{if(raf)windowRef.cancelAnimationFrame(raf);raf=0};
 const size=()=>{if(!gl)return;const r=host.getBoundingClientRect();const scale=Math.min(windowRef.devicePixelRatio||1,1.25,Math.sqrt(320000/Math.max(1,r.width*r.height)));const w=Math.max(1,Math.round(r.width*scale)),h=Math.max(1,Math.round(r.height*scale));if(c.width!==w||c.height!==h){c.width=w;c.height=h;gl.viewport(0,0,w,h)}};
 const frame=t=>{raf=0;if(dead||doc.hidden||reduce?.matches)return;if(t-last>33){last=t;size();gl.clearColor(0,0,0,0);gl.clear(gl.COLOR_BUFFER_BIT);gl.useProgram(prog);gl.uniform1f(gl.getUniformLocation(prog,'time'),t*.001);gl.uniform2f(gl.getUniformLocation(prog,'resolution'),c.width,c.height);gl.drawArrays(gl.TRIANGLE_STRIP,0,4)}raf=windowRef.requestAnimationFrame(frame)};
 const resume=()=>{if(!dead&&!doc.hidden&&!reduce?.matches&&!raf)raf=windowRef.requestAnimationFrame(frame)};
 const destroy=()=>{if(dead)return;dead=true;stop();clean.forEach(fn=>fn());observer?.disconnect();if(gl){if(buf)gl.deleteBuffer(buf);if(prog)gl.deleteProgram(prog)}c.remove()};
 try{
 gl=c.getContext('webgl',{alpha:true,depth:false,antialias:false,premultipliedAlpha:false,powerPreference:'low-power'});
 if(!gl){destroy();return ()=>{}}
 const vs=compile(gl.VERTEX_SHADER,vertex),fs=compile(gl.FRAGMENT_SHADER,fragment);
 prog=gl.createProgram();gl.attachShader(prog,vs);gl.attachShader(prog,fs);gl.linkProgram(prog);gl.deleteShader(vs);gl.deleteShader(fs);
 if(!gl.getProgramParameter(prog,gl.LINK_STATUS))throw Error(gl.getProgramInfoLog(prog));
 buf=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,buf);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,1,1]),gl.STATIC_DRAW);
 const loc=gl.getAttribLocation(prog,'position');gl.enableVertexAttribArray(loc);gl.vertexAttribPointer(loc,2,gl.FLOAT,false,0,0);
 gl.enable(gl.BLEND);gl.blendFunc(gl.SRC_ALPHA,gl.ONE_MINUS_SRC_ALPHA);
 const vis=()=>{if(doc.hidden||reduce?.matches)stop();else resume()};doc.addEventListener('visibilitychange',vis);clean.push(()=>doc.removeEventListener('visibilitychange',vis));
 reduce?.addEventListener?.('change',vis);clean.push(()=>reduce?.removeEventListener?.('change',vis));
 const lost=e=>{e.preventDefault();destroy()};c.addEventListener('webglcontextlost',lost);clean.push(()=>c.removeEventListener('webglcontextlost',lost));
 if(windowRef.ResizeObserver){observer=new windowRef.ResizeObserver(size);observer.observe(host)}else{windowRef.addEventListener('resize',size);clean.push(()=>windowRef.removeEventListener('resize',size))}
 size();resume();
 }catch(error){console.warn('Ocean effect failed',error);destroy()}
 return destroy;
}
