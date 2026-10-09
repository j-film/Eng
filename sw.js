// Bump CACHE whenever index.html or the bundled photos change.
// Only this workbook's caches are managed; progress in localStorage is untouched.
const CACHE = "eng-workbook-20261009-v1";
const ASSETS = [
  "index.html",
  "assets/photos/pexels-6205499.jpg",
  "assets/photos/pexels-4947362.jpg",
  "assets/photos/pexels-7447290.jpg",
  "assets/photos/pexels-36730391.jpg",
  "assets/photos/pexels-7698802.jpg",
  "assets/photos/pexels-16154014.jpg",
  "assets/photos/pexels-9327199.jpg",
  "assets/photos/pexels-36730433.jpg",
  "assets/photos/pexels-5428009.jpg",
  "assets/photos/pexels-36812158.jpg",
  "assets/photos/pexels-15158183.jpg",
  "assets/photos/pexels-25809277.jpg",
  "assets/photos/pexels-4173218.jpg",
  "assets/photos/pexels-35462353.jpg"
];
const assetURLs = ASSETS.map(path => new URL(path, self.registration.scope).href);
self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE);
    try {
      // Atomic installation: do not announce readiness if even one photo failed.
      await cache.addAll(assetURLs.map(url => new Request(url, {cache: 'reload'})));
    } catch (error) {
      await caches.delete(CACHE);
      throw error;
    }
  })());
});
self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    for (const key of await caches.keys()) {
      if (key.startsWith('eng-workbook-') && key !== CACHE) await caches.delete(key);
    }
    await self.clients.claim();
  })());
});
self.addEventListener('message', event => {
  if (event.data?.type !== 'ENG_OFFLINE_STATUS') return;
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE);
    const entries = await Promise.all(assetURLs.map(url => cache.match(url)));
    if (entries.every(Boolean)) event.source?.postMessage({type: 'ENG_OFFLINE_READY'});
  })());
});
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  if (event.request.method !== 'GET' || url.origin !== self.location.origin) return;
  const indexURL = new URL('index.html', self.registration.scope).href;
  // Only the workbook entry point is a navigation fallback, never arbitrary 404s.
  const isEntry = event.request.mode === 'navigate' &&
    (url.pathname === new URL(self.registration.scope).pathname || url.href.split(/[?#]/)[0] === indexURL);
  if (isEntry) {
    event.respondWith(fetch(event.request).catch(() => caches.open(CACHE).then(cache => cache.match(indexURL))));
  } else if (assetURLs.includes(url.href)) {
    event.respondWith(caches.open(CACHE).then(async cache => (await cache.match(event.request)) || fetch(event.request)));
  }
});
