import _404View from '../views/404.js'

export default class Router{
    constructor(routes, auth, fileoperator){
        this.routes = routes;
        this.auth = auth;
        this.fileoperator = fileoperator;

        window.router = this;
        window.addEventListener('popstate', function(){
            window.router.undoRoute(window.location.pathname.split('/')[1]);
        });

        this._loadInitialRoute();
    }

    loadRoute(...urlSegments){
        const matchedRoute = this._matchUrlToRoute(urlSegments);

        const url = `/${urlSegments.join('/')}`;
        history.pushState({}, '', url);

        const routerOutletElement = document.querySelectorAll('[router-data]')[0];
            
        routerOutletElement.innerHTML = matchedRoute.getTemplate(matchedRoute.params);

        this.initNavBar();
        this.validateRedirection();
    }

    undoRoute(...urlSegments){
        const matchedRoute = this._matchUrlToRoute(urlSegments);

        const routerOutletElement = document.querySelectorAll('[router-data]')[0];
        routerOutletElement.innerHTML = matchedRoute.getTemplate(matchedRoute.params);

        this.initNavBar();
        this.validateRedirection();
    }

    _matchUrlToRoute(urlSegments){

        const routeParams = {};

        const matchedRoute = this.routes.find(route => {
            
            const routePathSegments = route.path.split('/').slice(1);

            if (routePathSegments.length !== urlSegments.length){
                return false;
            }

            const match = routePathSegments.every((routePathSegment, i) => {
                return routePathSegment === urlSegments[i] || routePathSegment[0] === ':';
            });

            if (match) {
                routePathSegments.forEach((segment, i) => {
                    if (segment[0] === ':') {
                        const propName = segment.slice(1);
                        routeParams[propName] = decodeURIComponent(urlSegments[i]);
                    }                   
                });
            }
            return match;
        });

        const result = { ...matchedRoute, params: routeParams}

        if (!result['getTemplate']){
            return { path: '/404', getTemplate: _404View}
        } else {
            return result;
        }
    }

    _loadInitialRoute() {
        const pathnameSplit = window.location.pathname.split('/');
        const pathSegments = pathnameSplit.length > 1 ? pathnameSplit.slice(1) : '';

        this.loadRoute(...pathSegments);
    }
    initNavBar() {
        const accountNav = document.querySelector("#userAccountNav");
        if (this.auth.isUserLoged()) {
            const username = this.auth.getUserName();
            accountNav.innerHTML = `
            <li class="navigation__item navigation--email">${username}</li>
            <li class="navigation__item navigation__link" id="filesBtn"><i class="icon-database"></i></li>
            <li class="navigation__item navigation__link" id="settingsBtn"><i class="icon-cog"></i></li>
            <li class="navigation__item navigation__link navigation__link--bolded" id="logoutBtn">Log out</li>
            `;
            accountNav.querySelector("#logoutBtn").addEventListener('click', e => {
                e.preventDefault();
                this.auth.logout();
            });
            accountNav.querySelector("#filesBtn").addEventListener('click', e => {
                e.preventDefault();
                this.loadRoute('files');
            });
            accountNav.querySelector("#settingsBtn").addEventListener('click', e => {
                e.preventDefault();
                this.loadRoute('userSettings');
            });
        }
        else {
            const currentRoute = this.getCurrentRoute();
            if(currentRoute == "login")
                accountNav.innerHTML = `
                <li class="navigation__item"><a href="#" onclick="router.loadRoute('register')" class="navigation__link navigation__link--bolded">Sign up</a></li>`;
            else if(currentRoute == "register")
                accountNav.innerHTML = `
                <li class="navigation__item"><a href="#" onclick="router.loadRoute('login')" class="navigation__link">Sign in</a></li>`;
            else
                accountNav.innerHTML = `
                <li class="navigation__item"><a href="#" onclick="router.loadRoute('login')" class="navigation__link">Sign in</a></li>
                <li class="navigation__item"><a href="#" onclick="router.loadRoute('register')"  class="navigation__link navigation__link--bolded">Sign up</a></li>`;
        }
    }
    getCurrentRoute() {
        let route = window.location.href;
        route = route.split("/");
        route = route[3];
        return route;
    }
    validateRedirection() {
        
        const currentRoute = this.getCurrentRoute();
        if(this.auth.isUserLoged()) {
            if(currentRoute == "login" || currentRoute == "register" || currentRoute == "PasswordReset") {
                this.loadRoute('files', 'myfiles');
                this.fileoperator.setup();
            }
            if(currentRoute == "userSettings")
                this.auth.initpasswordChangeForm();
            if(currentRoute == "files")
                this.fileoperator.setup();
        }
        else {
            switch (currentRoute) {
                case "files":
                    this.loadRoute('');
                    break;
                case "userSettings":
                    this.loadRoute('');
                    break;
                case "login":
                    this.auth.initLoginForm();
                    break;
                case "register":
                    this.auth.initRegisterForm();
                    break;
                case "PasswordReset":
                    this.auth.initPassResetForm();
                    break;
                case "index":
                    this.auth.initRegisterForm();
                    break;
                case "newPasswordForm":
                    this.auth.initNewPassForm();
                    break;
                default:
                    break;
            }
        }
    }
}