import Router from '../js/router.js'
import routes from '../js/routes.js'

// Inicjuj naszą instancję klasy
const router = new Router(routes);

// Zapamiętaj zmienną w przeglądarce. Domyślnie 
// "module" usuwa zmienne po wykonaniu
window.router = router;

// http-server-spa . ./index.html