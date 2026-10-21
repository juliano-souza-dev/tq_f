// Ten background-specific WebGL particle systems. One GPU canvas per visible scene.
const THEMES=Object.freeze({bg_forest:0,bg_ocean:1,bg_city:2,bg_royal:3,bg_space:4,bg_candy:5,bg_dinos:6,bg_kingdom:7,bg_farm:8,bg_ice:9});
export const backgroundEffectName=id=>(['Vagalumes','Brilhos do mar','Luzes da cidade','Poeira dourada','Estrelas cósmicas','Confeitos flutuantes','Esporos pré-históricos','Magia encantada','Pólen ao vento','Neve'][THEMES[id]??0]);
const VERT=`attribute vec2 a_pos;attribute float a_seed;attribute float a_size;
uniform float u_time;uniform float u_theme;uniform float u_height;
varying float v_seed;varying float v_theme;
void main(){
 float s=a_seed,t=u_time;
 vec2 p=a_pos;
 float speed=0.035+fract(s*7.17)*0.075;
 if(u_theme>8.5){ // snowfall, drifting down
   p.y=1.16-mod((1.16-p.y)+t*speed*(2.0+fract(s*13.)),2.32);
   p.x+=sin(t*0.85+s*31.0+p.y*3.0)*0.075;
 }else if(u_theme<1.5&&u_theme>0.5){ // ocean glints, bob and shimmer
   p.y+=sin(t*0.6+s*29.0)*0.014;
   p.x+=sin(t*0.4+s*14.0)*0.025;
 }else if(u_theme>3.5&&u_theme<4.5){ // slow stars
   p.y=mod(p.y-t*speed*0.20+1.1,2.2)-1.1;
 }else if(u_theme>1.5&&u_theme<2.5){ // city lights
   p.y+=sin(t*0.8+s*22.0)*0.006;
 }else{
   p.y=mod(p.y+t*speed+1.1,2.2)-1.1;
   p.x+=sin(t*(0.5+fract(s*7.0))+s*29.0)*0.035;
 }
 gl_Position=vec4(p,0.,1.);
 gl_PointSize=min(15.,a_size*(0.7+0.3*sin(t*1.6+s*28.0))*(u_height/690.0+0.55));
 v_seed=s;v_theme=u_theme;
}`;
const FRAG=`precision mediump float;
varying float v_seed;varying float v_theme;
uniform float u_time;
void main(){
 vec2 p=gl_PointCoord*2.0-1.0;float d=length(p);
 float a=(1.0-smoothstep(0.52,1.0,d))*0.64;
 vec3 c=vec3(1.0,.88,.52);
 if(v_theme>8.5){c=vec3(.91,.96,1.0);a=(1.0-smoothstep(.65,1.,d))*.84;}
 else if(v_theme<1.5&&v_theme>.5){c=mix(vec3(.65,.96,1.),vec3(1.,.96,.68),fract(v_seed*9.));a*=.67;}
 else if(v_theme>1.5&&v_theme<2.5){c=vec3(1.,.75,.42);a*=.55;}
 else if(v_theme>2.5&&v_theme<3.5){c=vec3(1.,.8,.36);}
 else if(v_theme>3.5&&v_theme<4.5){c=mix(vec3(.6,.8,1.),vec3(1.,.85,1.),fract(v_seed*8.));}
 else if(v_theme>4.5&&v_theme<5.5){c=mix(vec3(1.,.62,.85),vec3(.68,1.,.8),fract(v_seed*7.));}
 else if(v_theme>5.5&&v_theme<6.5){c=vec3(.65,1.,.57);a*=.53;}
 else if(v_theme>6.5&&v_theme<7.5){c=mix(vec3(1.,.85,.47),vec3(.82,.59,1.),fract(v_seed*8.));}
 else if(v_theme>7.5&&v_theme<8.5){c=vec3(1.,.94,.54);a*=.59;}
 else{c=mix(vec3(.72,1.,.53),vec3(1.,.96,.54),fract(v_seed*8.));}
 a*=.75+.25*sin(u_time*1.5+v_seed*44.);
 gl_FragColor=vec4(c,a);
}`;
function compile(gl,type,code){const s=gl.createShader(type);gl.shaderSource(s,code);gl.compileShader(s);if(!gl.getShaderParameter(s,gl.COMPILE_STATUS)){const e=gl.getShaderInfoLog(s);gl.deleteShader(s);throw Error(e)}return s}
export function mountBackgroundEffect(host,id,{windowRef=window,preview=false}={}){
 if(!host||!(id in THEMES))return ()=>{};
 const doc=host.ownerDocument,reduce=windowRef.matchMedia?.('(prefers-reduced-motion: reduce)');
 if(reduce?.matches)return ()=>{};
 const canvas=doc.createElement('canvas');canvas.className='background-webgl-layer';canvas.setAttribute('aria-hidden','true');canvas.style.cssText='position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:1;';
 host.style.isolation='isolate';host.prepend(canvas);
 let gl,program,buffer,raf=0,observer,disposed=false,visible=!doc.hidden,last=0;
 const clean=[];
 const stop=()=>{if(raf)windowRef.cancelAnimationFrame(raf);raf=0};
 const size=()=>{if(!gl)return;const r=host.getBoundingClientRect(),dpr=Math.min(windowRef.devicePixelRatio||1,1.25),scale=Math.min(dpr,Math.sqrt(340000/Math.max(1,r.width*r.height)));const w=Math.max(1,Math.round(r.width*scale)),h=Math.max(1,Math.round(r.height*scale));if(canvas.width!==w||canvas.height!==h){canvas.width=w;canvas.height=h;gl.viewport(0,0,w,h)}};
 const frame=now=>{raf=0;if(disposed||!visible||!gl)return;if(now-last>33){last=now;size();gl.clearColor(0,0,0,0);gl.clear(gl.COLOR_BUFFER_BIT);gl.useProgram(program);gl.uniform1f(gl.getUniformLocation(program,'u_time'),now*.001);gl.uniform1f(gl.getUniformLocation(program,'u_theme'),THEMES[id]);gl.uniform1f(gl.getUniformLocation(program,'u_height'),canvas.height);gl.drawArrays(gl.POINTS,0,preview?38:54)}raf=windowRef.requestAnimationFrame(frame)};
 const resume=()=>{if(!disposed&&visible&&!raf)raf=windowRef.requestAnimationFrame(frame)};
 const destroy=()=>{if(disposed)return;disposed=true;stop();clean.forEach(f=>f());observer?.disconnect();if(gl){if(buffer)gl.deleteBuffer(buffer);if(program)gl.deleteProgram(program)}canvas.remove()};
 try{
 gl=canvas.getContext('webgl',{alpha:true,antialias:false,depth:false,stencil:false,preserveDrawingBuffer:false,powerPreference:'low-power'});
 if(!gl){destroy();return ()=>{}}
 const vs=compile(gl,gl.VERTEX_SHADER,VERT),fs=compile(gl,gl.FRAGMENT_SHADER,FRAG);
 program=gl.createProgram();gl.attachShader(program,vs);gl.attachShader(program,fs);gl.linkProgram(program);gl.deleteShader(vs);gl.deleteShader(fs);
 if(!gl.getProgramParameter(program,gl.LINK_STATUS))throw Error(gl.getProgramInfoLog(program));
 const n=preview?38:54,points=new Float32Array(n*4);
 for(let i=0;i<n;i++){const seed=(i*.6180339887)%1;points[i*4]=seed*2-1;points[i*4+1]=((i*.754877666)%1)*2-1;points[i*4+2]=seed;points[i*4+3]=2.5+seed*(id==='bg_ice'?5:7)}
 buffer=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,buffer);gl.bufferData(gl.ARRAY_BUFFER,points,gl.STATIC_DRAW);
 for(const [name,count,offset] of [['a_pos',2,0],['a_seed',1,8],['a_size',1,12]]){const loc=gl.getAttribLocation(program,name);if(loc<0)continue;gl.enableVertexAttribArray(loc);gl.vertexAttribPointer(loc,count,gl.FLOAT,false,16,offset)}
 gl.enable(gl.BLEND);gl.blendFunc(gl.SRC_ALPHA,gl.ONE_MINUS_SRC_ALPHA);
 const onVisibility=()=>{visible=!doc.hidden&&!reduce?.matches;if(!visible)stop();else resume()};
 const onLost=e=>{e.preventDefault();destroy()};
 doc.addEventListener('visibilitychange',onVisibility);clean.push(()=>doc.removeEventListener('visibilitychange',onVisibility));
 reduce?.addEventListener?.('change',onVisibility);clean.push(()=>reduce?.removeEventListener?.('change',onVisibility));
 canvas.addEventListener('webglcontextlost',onLost);clean.push(()=>canvas.removeEventListener('webglcontextlost',onLost));
 if(windowRef.ResizeObserver){observer=new windowRef.ResizeObserver(size);observer.observe(host)}else{windowRef.addEventListener('resize',size);clean.push(()=>windowRef.removeEventListener('resize',size))}
 size();resume();
 }catch(e){console.warn('Background WebGL unavailable',e);destroy()}
 return destroy;
}
