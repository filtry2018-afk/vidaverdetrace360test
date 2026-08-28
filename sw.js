const CACHE='vida-verde-trace360-test-v17';
const ASSETS=['./','./index.html','./styles.css','./branding.css','./branding-v14.css','./app.js','./v13.js','./branding-v17.js','./manifest.webmanifest','./icons/icon-192.png','./icons/icon-512.png','./icons/logo-full.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))));self.clients.claim()});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;if(e.request.mode==='navigate'){e.respondWith(fetch(e.request,{cache:'no-store'}).catch(()=>caches.match('./index.html')));return}e.respondWith(fetch(e.request,{cache:'no-store'}).catch(()=>caches.match(e.request))) });
