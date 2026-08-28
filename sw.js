const CACHE='vida-verde-trace360-test-v18';
const ASSETS=['./','./index.html','./styles.css','./branding.css','./branding-v18.css','./app.js','./v13.js','./branding-v18.js','./manifest.webmanifest','./icons/icon-exact-192-v18.png','./icons/icon-exact-512-v18.png','./icons/logo-exact-v18.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))));self.clients.claim()});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;if(e.request.mode==='navigate'){e.respondWith(fetch(e.request,{cache:'no-store'}).catch(()=>caches.match('./index.html')));return}e.respondWith(fetch(e.request,{cache:'no-store'}).catch(()=>caches.match(e.request))) });
