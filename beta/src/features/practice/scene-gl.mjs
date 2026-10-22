// GPU-rendered illustrated world: image-space water refraction, sunbeams and glints.
// No extra network requests beyond the already-present practice background image.
export function mountPracticeWorldGL(host,{world=1}={}){
 const image=host?.querySelector('.practice-scene-image');
 if(!host||!image||!window.WebGLRenderingContext||matchMedia('(prefers-reduced-motion: reduce)').matches)return ()=>{};
 const canvas=document.createElement('canvas');
 canvas.className='practice-scene-gl';
 canvas.setAttribute('aria-hidden','true');
 const gl=canvas.getContext('webgl',{alpha:false,antialias:false,powerPreference:'low-power',premultipliedAlpha:false});
 if(!gl)return ()=>{};
 const vert=`attribute vec2 position; varying vec2 uv; void main(){uv=position*.5+.5;gl_Position=vec4(position,0.,1.);}`;
 const frag=`precision mediump float;
 varying vec2 uv;
 uniform sampler2D art;
 uniform float time;
 uniform float strength;
 uniform float world;
 uniform vec2 resolution;
 uniform float impactAge;
 uniform float impactSign;
 uniform vec2 impactPoint;
 float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
 void main(){
   vec2 p=vec2(uv.x,1.-uv.y);
   vec4 src=texture2D(art,vec2(p.x,1.-p.y));
   float turquoise=smoothstep(.02,.21,src.b-src.r)*smoothstep(.0,.16,src.g-src.r);
   float waterZone=smoothstep(.32,.60,p.y)*turquoise;
   // The refraction is gated by actual turquoise pixels, so stones, UI plaques
   // and ornate gold details do not warp with the water.
   float phase=time*(world<1.5?1.2:1.65);
   vec2 shift=vec2(sin(p.y*142.+phase*2.1)+sin(p.y*75.-phase*1.4),cos(p.x*85.+phase))*vec2(.0015,.00095)*waterZone*strength;
   vec3 color=texture2D(art,vec2(p.x+shift.x,1.-p.y+shift.y)).rgb;
   float shimmer=sin(p.x*65.+p.y*46.-phase*2.6)*sin(p.x*27.-phase);
   color+=vec3(.026,.057,.063)*max(0.,shimmer)*waterZone*strength;
   // Soft dappled light: subtle so the image remains faithful to the artwork.
   float light=sin(p.x*11.+p.y*4.+time*.31)*sin(p.x*7.-p.y*3.-time*.21);
   float rays=pow(max(0.,light),3.)*(1.-smoothstep(.18,.88,p.y));
   color+=vec3(.045,.034,.012)*rays*strength;
   // Sparse sparkling reflections near the lower water regions.
   vec2 grid=floor(p*vec2(27.,39.));
   float rnd=hash(grid+floor(time*.7));
   float points=step(.982,rnd)*pow(max(0.,1.-length(fract(p*vec2(27.,39.))-.5)*3.),4.);
   color+=vec3(.20,.22,.16)*points*waterZone*strength;
   // GPU impact response shared with the existing background pass.
   // Positive: golden/turquoise expanding ring and sparks. Negative: brief
   // crimson distortion and fragments, behind all the DOM controls.
   if(impactAge>=0. && impactAge<1.65){
     float age=impactAge;
     float good=step(0.,impactSign);
     vec2 scaled=(p-impactPoint)*vec2(resolution.x/max(1.,resolution.y),1.);
     float radius=length(scaled);
     float ringRadius=age*(good>0.5?.43:.32);
     float ring=exp(-pow((radius-ringRadius)*34.,2.));
     float fade=(1.-smoothstep(.15,good>0.5?1.45:1.15,age));
     float shake=(1.-good)*fade*.0028*sin(p.y*92.+age*61.);
     vec3 distorted=texture2D(art,vec2(clamp(p.x+shake,0.,1.),1.-p.y)).rgb;
     color=mix(color,distorted,(1.-good)*fade*.64);
     vec3 ringColor=mix(vec3(1.,.14,.21),world>1.5?vec3(.44,1.,.98):vec3(1.,.82,.29),good);
     color=mix(color,ringColor,min(.88,ring*fade*.86));
     // Individually moving GPU sparks, deterministic by spatial cell.
     vec2 cell=floor(p*vec2(36.,62.));
     vec2 center=(cell+.5)/vec2(36.,62.);
     float random=hash(cell);
     vec2 delta=center-impactPoint;
     float spread=length(delta);
     float sparkle=step(.72,random)*exp(-pow((spread-(.08+age*.32)) * 30.,2.));
     sparkle*=pow(max(0.,1.-length(fract(p*vec2(36.,62.))-.5)*2.),6.);
     color+=ringColor*sparkle*fade*(good>0.5?1.1:.85);
     color+=ringColor*max(0.,1.-radius*4.)*fade*(good>0.5?.12:.08);
   }
   gl_FragColor=vec4(color,1.);
 }`;
 const shader=(type,source)=>{const s=gl.createShader(type);gl.shaderSource(s,source);gl.compileShader(s);if(!gl.getShaderParameter(s,gl.COMPILE_STATUS))throw Error(gl.getShaderInfoLog(s));return s};
 let program,texture,buffer,frame=0,active=true,ready=false;
 try{
  program=gl.createProgram();gl.attachShader(program,shader(gl.VERTEX_SHADER,vert));gl.attachShader(program,shader(gl.FRAGMENT_SHADER,frag));
  gl.linkProgram(program);if(!gl.getProgramParameter(program,gl.LINK_STATUS))throw Error('WebGL link failed');
  buffer=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,buffer);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),gl.STATIC_DRAW);
  gl.useProgram(program);const attr=gl.getAttribLocation(program,'position');gl.enableVertexAttribArray(attr);gl.vertexAttribPointer(attr,2,gl.FLOAT,false,0,0);
 }catch(e){gl.getExtension('WEBGL_lose_context')?.loseContext();return ()=>{}}
 const uTime=gl.getUniformLocation(program,'time'),uStrength=gl.getUniformLocation(program,'strength'),uWorld=gl.getUniformLocation(program,'world');
 const low=(navigator.hardwareConcurrency||4)<=4||((navigator.deviceMemory||4)<=2);
 const dpr=Math.min(devicePixelRatio||1,low?1:1.4);
 const start=performance.now();
 let last=0;
 let impactStarted=-1,impactSign=1,impactPoint=[.5,.72];
 const uImpactAge=gl.getUniformLocation(program,'impactAge'),uImpactSign=gl.getUniformLocation(program,'impactSign'),uImpactPoint=gl.getUniformLocation(program,'impactPoint'),uResolution=gl.getUniformLocation(program,'resolution');
 function draw(now){
  if(!active)return;
  frame=requestAnimationFrame(draw);
  if(document.hidden||!ready||now-last<(low?45:28))return;last=now;
  const box=host.getBoundingClientRect();
  if(box.width<2||box.height<2)return;
  const w=Math.round(box.width*dpr),h=Math.round(box.height*dpr);
  if(canvas.width!==w||canvas.height!==h){canvas.width=w;canvas.height=h;gl.viewport(0,0,w,h)}
  gl.useProgram(program);gl.uniform1f(uTime,(now-start)/1000);gl.uniform1f(uStrength,low?.55:1);gl.uniform1f(uWorld,world);
  gl.uniform1f(uImpactAge,impactStarted<0?-1:(now-impactStarted)/1000);
  gl.uniform1f(uImpactSign,impactSign);
  gl.uniform2f(uImpactPoint,...impactPoint);
  gl.uniform2f(uResolution,w,h);
  gl.drawArrays(gl.TRIANGLES,0,6);
 }
 function activate(){
  if(!active||ready||!image.complete||!image.naturalWidth)return;
  try{
   texture=gl.createTexture();gl.bindTexture(gl.TEXTURE_2D,texture);
   gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL,true);
   gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);
   gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);
   gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,image);
   gl.uniform1i(gl.getUniformLocation(program,'art'),0);
   image.after(canvas);
   host.classList.add('practice-scene-gl-active');
   ready=true;frame=requestAnimationFrame(draw);
  }catch(e){canvas.remove()}
 }
 image.addEventListener('load',activate);
 if(image.complete)activate();
 const lost=e=>{e.preventDefault();host.classList.remove('practice-scene-gl-active');canvas.remove();ready=false;cancelAnimationFrame(frame)};
 canvas.addEventListener('webglcontextlost',lost);
 const stop=()=>{active=false;cancelAnimationFrame(frame);image.removeEventListener('load',activate);canvas.removeEventListener('webglcontextlost',lost);host.classList.remove('practice-scene-gl-active');canvas.remove();if(texture)gl.deleteTexture(texture);if(buffer)gl.deleteBuffer(buffer);if(program)gl.deleteProgram(program);gl.getExtension('WEBGL_lose_context')?.loseContext()};
 stop.burst=(good,point)=>{impactSign=good?1:-1;impactPoint=point||[.5,.72];impactStarted=performance.now();};
 return stop;
}
