 // Custom cursor
 const cursor = document.getElementById('cursor');
 const ring = document.getElementById('cursorRing');
 let mx = 0, my = 0, rx = 0, ry = 0;
 document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
 function animCursor() {
   cursor.style.left = mx + 'px'; cursor.style.top = my + 'px';
   rx += (mx - rx) * 0.12; ry += (my - ry) * 0.12;
   ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
   requestAnimationFrame(animCursor);
 }
 animCursor();
 document.querySelectorAll('a, button, .chip, .stat-card, .project-card, .skill-group').forEach(el => {
   el.addEventListener('mouseenter', () => {
     cursor.style.width = '20px'; cursor.style.height = '20px';
     ring.style.width = '52px'; ring.style.height = '52px'; ring.style.opacity = '0.8';
   });
   el.addEventListener('mouseleave', () => {
     cursor.style.width = '12px'; cursor.style.height = '12px';
     ring.style.width = '36px'; ring.style.height = '36px'; ring.style.opacity = '0.5';
   });
 });

 // Scroll reveal
 const reveals = document.querySelectorAll('.reveal');
 const obs = new IntersectionObserver(entries => {
   entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); } });
 }, { threshold: 0.12 });
 reveals.forEach(r => obs.observe(r));

 // Bar animations
 const barObs = new IntersectionObserver(entries => {
   entries.forEach(e => {
     if (e.isIntersecting) {
       e.target.querySelectorAll('.bar-fill').forEach(bar => {
         bar.style.width = bar.dataset.width + '%';
       });
     }
   });
 }, { threshold: 0.3 });
 document.querySelectorAll('.skill-group').forEach(g => barObs.observe(g));

 // Active nav
 const sections = document.querySelectorAll('section[id]');
 const navLinks = document.querySelectorAll('.nav-links a');
 window.addEventListener('scroll', () => {
   let current = '';
   sections.forEach(s => { if (window.scrollY >= s.offsetTop - 120) current = s.id; });
   navLinks.forEach(a => {
     a.classList.remove('active');
     if (a.getAttribute('href') === '#' + current) a.classList.add('active');
   });
 });