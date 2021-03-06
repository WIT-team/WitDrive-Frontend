import _404View from '../views/404.js'
function loadingON()
{
  const El = document.querySelector('#loading');
  El.style="background-color: rgba(233, 233, 233, 0.7);position: fixed;width: 100%;height: 100%;z-index: 100;display: block;";
}
function loadingOFF()
{
  const El = document.querySelector('#loading');
  El.style="background-color: rgba(233, 233, 233, 0.7);position: fixed;width: 100%;height: 100%;z-index: 100;display: none;";
}
export default class Router{
    constructor(routes, auth, fileoperator){
        this.routes = routes;
        this.auth = auth;
        this.routerDataEl = document.querySelector('[router-data]');
        this.fileoperator = fileoperator;
        this.fileoperator.setRouter(this);
        this.auth.setRouter(this);
        window.router = this;
        window.addEventListener('popstate', function(){
            window.router.undoRoute(window.location.pathname.split('/')[1]);
        });

        this._loadInitialRoute();
    }

    loadRoute(...urlSegments){

        const matchedRoute = this._matchUrlToRoute(urlSegments);
        loadingON();
        setTimeout(() => {
            const url = `/${urlSegments.join('/')}`;
            history.pushState({}, '', url);
            const routerOutletElement = document.querySelectorAll('[router-data]')[0];
            
            routerOutletElement.innerHTML = matchedRoute.getTemplate(matchedRoute.params);

            setTimeout(() => {
                loadingOFF();
                this.initNavBar();
                this.validateRedirection();
            },100);
        },100);
    }

    undoRoute(...urlSegments){
        const matchedRoute = this._matchUrlToRoute(urlSegments);
        loadingON();
        setTimeout(() => {

        const routerOutletElement = document.querySelectorAll('[router-data]')[0];
        routerOutletElement.innerHTML = matchedRoute.getTemplate(matchedRoute.params);
        setTimeout(() => {
            loadingOFF();
        this.initNavBar();
        this.validateRedirection();
    },100);
},100);
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
            <li class="navigation__item navigation__link" onclick="router.loadRoute('passwordChange')"><i class="icon-cog"></i></li>
            <li class="navigation__item navigation__link navigation__link--bolded" id="logoutBtn">Log out</li>
            `;
            accountNav.querySelector("#logoutBtn").addEventListener('click', e => {
                e.preventDefault();
                this.auth.logout();
            });
        }
        else {
            const currentRoute = this.getCurrentRoute();
            if(currentRoute == "login")
                accountNav.innerHTML = `
                <li class="navigation__item"><a onclick="router.loadRoute('register')" class="navigation__link navigation__link--bolded">Sign up</a></li>`;
            else if(currentRoute == "register")
                accountNav.innerHTML = `
                <li class="navigation__item"><a onclick="router.loadRoute('login')" class="navigation__link">Sign in</a></li>`;
            else
                accountNav.innerHTML = `
                <li class="navigation__item"><a onclick="router.loadRoute('login')" class="navigation__link">Sign in</a></li>
                <li class="navigation__item"><a onclick="router.loadRoute('register')"  class="navigation__link navigation__link--bolded">Sign up</a></li>`;
        }
    }
    getCurrentRoute() {
        let route = window.location.href;
        route = route.split("/");
        route = route[3];
        return route;
    }
    getParameters() {
        let route = window.location.href;
        route = route.split("/");
        if(route.length > 3)
            return route.slice(4);
        return [];
    }
    validateRedirection() {
        const currentRoute = this.getCurrentRoute();
        if(this.auth.isUserLoged()) {
            if(currentRoute == "login" || currentRoute == "register" || currentRoute == "reset-password" || currentRoute == "forgot-password") {
                this.loadRoute('files');
                this.fileoperator.setup();
            }
            if(currentRoute == "passwordChange")
                this.auth.initpasswordChangeForm();
            if(currentRoute == "deleteAccount")
                this.auth.initdeleteAccountForm();
            if(currentRoute == "files" || currentRoute == "shared" || currentRoute == "bin" || currentRoute == "sharedfile")
                this.fileoperator.setup(currentRoute);
            if(currentRoute == "results")
                this.fileoperator.checkSearch();
        }
        else {
            switch (currentRoute) {
                case "":
                    this.auth.initRegisterForm();
                    break;
                case "files":
                    this.loadRoute('');
                    break;
                case "passwordChange":
                    this.loadRoute('');
                    break;
                case "deleteAccount":
                    this.loadRoute('');
                    break;
                case "login":
                    this.auth.initLoginForm();
                    break;
                case "register":
                    this.auth.initRegisterForm();
                    break;
                case "forgot-password":
                    this.auth.initforgotPassForm();
                    break;
                case "reset-password":
                    this.auth.initResetPassForm();
                    break;
                case "index":
                    this.auth.initRegisterForm();
                    break;
                case "newPasswordForm":
                    this.auth.initNewPassForm();
                    break;
                case "sharedfile":
                    console.log(currentRoute);
                    this.fileoperator.setup("sharedfile");
                case "results":
                    this.loadRoute('');
                    break;
                default:
                    break;
            }
        }
    }
}