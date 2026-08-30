const CACHE='vida-verde-trace360-clean-v3';
const FALLBACK='./index.html';
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll([FALLBACK,'./styles.css','./app.js','./logo-fix-v3.js','./manifest.webmanifest','./assets/logo-official-v3.png','./assets/icon-192.png','./assets/icon-512.png'])).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;e.respondWith(fetch(e.request,{cache:'no-store'}).then(resp=>{const copy=resp.clone();caches.open(CACHE).then(c=>c.put(e.request,copy)).catch(()=>{});return resp}).catch(()=>caches.match(e.request).then(r=>r||caches.match(FALLBACK))))});
