import _404View from '../views/404.js'

export default class Router{
    constructor(routes){
        this.routes = routes;
        this._loadInitialRoute();
    }

    loadRoute(...urlSegments){
        // Próba dopasowania strony URL do trasy
        const matchedRoute = this._matchUrlToRoute(urlSegments);

        // Pchnij wpis historii z nowym adresem URL.
        // Przekazujemy pusty obiekt i pusty łańcuch jako historyState
        // i argumenty tytułowe, ale ich wartości nie mają tu większego znaczenia.
        const url = `/${urlSegments.join('/')}`;
        history.pushState({}, '', url);

        // Dołącz szablon dopasowanej trasy do DOM, 
        // wewnątrz elementu z atrybutem data-routeroutlet.
        const routerOutletElement = document.querySelectorAll('[router-data]')[0];
        routerOutletElement.innerHTML = matchedRoute.getTemplate(matchedRoute.params);
    }

    _matchUrlToRoute(urlSegments){

        const routeParams = {};

        // Spróbuj dopasować adres URL do trasy.
        const matchedRoute = this.routes.find(route => {
            
            // Zakładamy, że trasa zawsze zaczyna się od ukośnika,  
            // a więc pierwsza pozycja w tablicy segmentów zawsze będzie pustym 
            // stringiem. Przetnij 1 indeks tablicy, aby zignorować ten pusty łańcuch.

            const routePathSegments = route.path.split('/').slice(1);

            // Jeśli są różne liczby segmentów, wówczas trasa nie
            // pasuje do adresu URL.
            if (routePathSegments.length !== urlSegments.length){
                return false;
            }

            // Jeśli każdy segment w adresie url jest zgodny z odpowiadającym mu segmentem na trasie,
            // lub segment trasy zaczyna się od znaku ':', wówczas trasa jest dopasowana.
            const match = routePathSegments.every((routePathSegment, i) => {
                return routePathSegment === urlSegments[i] || routePathSegment[0] === ':';
            });

            // Jeśli trasa jest zgodna z adresem URL, wyciągnij z niego wszelkie parametry.
            if (match) {
                routePathSegments.forEach((segment, i) => {
                    if (segment[0] === ':') {
                        const propName = segment.slice(1);
                        routeParams[propName] = decodeURIComponent(urlSegments[i]);
                    }                   
                });
            }
            return match;

            // // Jeśli każdy segment w adresie url pasuje do 
            // // odpowiadającej mu trasy, wówczas trasa jest dopasowana.
            // return routePathSegments
            //     .every((routePathSegment, i) => routePathSegment === urlSegments[i]);
        });

        const result = { ...matchedRoute, params: routeParams}

        if (!result['getTemplate']){
            return { path: '/404', getTemplate: _404View}
        } else {
            return result;
        }
    }

    _loadInitialRoute() {
        // Wyznacz odcinki trasy, które powinny zostać obciążone na początku.
        const pathnameSplit = window.location.pathname.split('/');
        const pathSegments = pathnameSplit.length > 1 ? pathnameSplit.slice(1) : '';

        // Załaduj wstępną trasę (route)
        this.loadRoute(...pathSegments);
    }
}