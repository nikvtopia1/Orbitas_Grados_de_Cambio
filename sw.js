// Service worker de Órbitas — generado por fuentes/build-orbitas.js. No editar a mano.
// Estrategia: red primero, caché de respaldo. Así el que abre la página siempre ve la
// última versión si tiene señal, y sigue funcionando entero sin conexión.
var CACHE = "orbitas-989581ae35";
var ASSETS = ["./", "./index.html", "./manifest.json", "./icon-192.png", "./icon-512.png", "./icon-maskable-512.png"];
self.addEventListener("install", function(e){
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE).then(function(c){ return c.addAll(ASSETS); }));
});
self.addEventListener("activate", function(e){
  e.waitUntil(caches.keys().then(function(ks){
    return Promise.all(ks.filter(function(k){ return k !== CACHE; }).map(function(k){ return caches.delete(k); }));
  }).then(function(){ return self.clients.claim(); }));
});
self.addEventListener("fetch", function(e){
  if(e.request.method !== "GET") return;
  e.respondWith(
    fetch(e.request).then(function(r){
      var cp = r.clone();
      caches.open(CACHE).then(function(c){ c.put(e.request, cp); });
      return r;
    }).catch(function(){
      return caches.match(e.request).then(function(m){ return m || caches.match("./index.html"); });
    })
  );
});
