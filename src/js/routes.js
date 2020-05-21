import homeView from '../views/main_page/home.js'
import FAQView from '../views/main_page/FAQ.js'
import registerView from '../views/main_page/register.js'
import loginView from '../views/main_page/login.js'
import passwordResetView from '../views/main_page/PasswordReset.js'
import userView from '../views/user_panel/files.js'
import _404View from '../views/404.js'
import userSettings from '../views/user_panel/userSettings.js'

const routes = [
    {
        path: '/404',
        getTemplate: (params) => _404View,
    },
    {
        path: '/',
        getTemplate: (params) => homeView,
    },
    {
        path: '/login',
        getTemplate: (params) => loginView,
    },
    {
        path: '/faq',
        getTemplate: (params) => FAQView,
    },
    {
        path: '/files', //  path: '/files/:directory',
        getTemplate: userView,
    },
    {
        path: '/files/:directory',
        getTemplate: userView,
    },
    {
        path: '/register',
        getTemplate: (params) =>  registerView,
    },
    {
        path: '/PasswordReset',
        getTemplate: (params) =>  passwordResetView,
    },
    {
        path: '/userSettings',
        getTemplate: (params) =>  userSettings,
    },
];

export default routes;