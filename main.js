import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';

const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const dot = document.querySelector('.cursor-dot'), ring = document.querySelector('.cursor-ring');
window.addEventListener('pointermove', e => { dot.style.left = e.clientX+'px'; dot.style.top = e.clientY+'px'; ring.style.left = e.clientX+'px'; ring.style.top = e.clientY+'px'; });
document.querySelectorAll('a,button,.committee-card,.award-card').forEach(el=>{el.addEventListener('mouseenter',()=>ring.classList.add('active'));el.addEventListener('mouseleave',()=>ring.classList.remove('active'))});
document.querySelectorAll('.magnetic').forEach(el=>{el.addEventListener('pointermove',e=>{const r=el.getBoundingClientRect();el.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.12}px, ${(e.clientY-r.top-r.height/2)*.12}px)`});el.addEventListener('pointerleave',()=>el.style.transform='')});

const observer = new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}}),{threshold:.12});
document.querySelectorAll('.reveal').forEach((el,i)=>{el.style.transitionDelay=`${Math.min(i%5*55,220)}ms`;observer.observe(el)});
document.querySelectorAll('.committee-card').forEach(card=>{const name=card.querySelector('h3')?.textContent.trim();if(name)card.addEventListener('click',()=>{window.location.href=`committee.html?name=${encodeURIComponent(name)}`});card.setAttribute('tabindex','0');card.addEventListener('keydown',e=>{if(e.key==='Enter')card.click()})});

const container=document.getElementById('globe-canvas');
if(container){
  const scene=new THREE.Scene(); const camera=new THREE.PerspectiveCamera(35,container.clientWidth/container.clientHeight,.1,100); camera.position.set(0,0,5.8);
  const renderer=new THREE.WebGLRenderer({alpha:true,antialias:true}); renderer.setPixelRatio(Math.min(devicePixelRatio,1.5)); renderer.setSize(container.clientWidth,container.clientHeight); renderer.toneMapping=THREE.ACESFilmicToneMapping; container.appendChild(renderer.domElement);
  const group=new THREE.Group(); scene.add(group);
  const globe=new THREE.Mesh(new THREE.SphereGeometry(1.65,40,40),new THREE.MeshPhysicalMaterial({color:0x64151a,roughness:.78,metalness:.18,clearcoat:.2,transparent:true,opacity:.9})); group.add(globe);
  const wire=new THREE.Mesh(new THREE.SphereGeometry(1.68,20,20),new THREE.MeshBasicMaterial({color:0xd4af37,wireframe:true,transparent:true,opacity:.18})); group.add(wire);
  const ringA=new THREE.Mesh(new THREE.TorusGeometry(2.02,.008,8,128),new THREE.MeshBasicMaterial({color:0xd4af37,transparent:true,opacity:.7})); ringA.rotation.x=.55; group.add(ringA);
  const ringB=new THREE.Mesh(new THREE.TorusGeometry(2.3,.004,8,128),new THREE.MeshBasicMaterial({color:0xd4af37,transparent:true,opacity:.35})); ringB.rotation.y=.7; ringB.rotation.x=1.1; group.add(ringB);
  const points=[]; for(let i=0;i<110;i++){const p=new THREE.Vector3().randomDirection().multiplyScalar(2.05+Math.random()*.45);points.push(p.x,p.y,p.z)} const stars=new THREE.Points(new THREE.BufferGeometry().setAttribute('position',new THREE.Float32BufferAttribute(points,3)),new THREE.PointsMaterial({color:0xd4af37,size:.025,transparent:true,opacity:.8})); group.add(stars);
  const light=new THREE.DirectionalLight(0xffdcc1,2.5);light.position.set(-2,2,4);scene.add(light);scene.add(new THREE.AmbientLight(0x5f1c1f,1.4));
  let mx=0,my=0; window.addEventListener('pointermove',e=>{mx=(e.clientX/innerWidth-.5)*.5;my=(e.clientY/innerHeight-.5)*.35});
  function animate(t){requestAnimationFrame(animate); if(!reduced){group.rotation.y=t*.00008+mx;group.rotation.x += (my-group.rotation.x)*.01;ringA.rotation.z=t*.00012;stars.rotation.y=-t*.00004} renderer.render(scene,camera)} animate(0);
  window.addEventListener('resize',()=>{camera.aspect=container.clientWidth/container.clientHeight;camera.updateProjectionMatrix();renderer.setSize(container.clientWidth,container.clientHeight)});
}

const menu=document.querySelector('.menu-toggle'); const nav=document.querySelector('.nav-links'); menu?.addEventListener('click',()=>{nav.classList.toggle('open');});
