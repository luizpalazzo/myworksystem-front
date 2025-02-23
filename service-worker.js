// Nome do cache
const CACHE_NAME = 'my-pwa-cache-v1';
// Arquivos que serão armazenados em cache
const urlsToCache = [
  '/',
  '/index.html',
  '/css/style.css',
  '/js/main.js'
];

// Evento de instalação do Service Worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Abrindo cache e adicionando arquivos');
        return cache.addAll(urlsToCache);
      })
  );
});

// Intercepta as requisições e retorna a versão em cache, se disponível
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Retorna o arquivo em cache ou faz uma nova requisição
        return response || fetch(event.request);
      })
  );
});
