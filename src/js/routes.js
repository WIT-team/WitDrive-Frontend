import homeView from '../views/main_page/home.js'
import FAQView from '../views/main_page/FAQ.js'
import registerView from '../views/main_page/register.js'
import loginView from '../views/main_page/login.js'
import passwordResetView from '../views/main_page/PasswordReset.js'
import files from '../views/user_panel/files.js'
import shared from '../views/user_panel/shared.js'
import _404View from '../views/404.js'
import userSettings from '../views/user_panel/userSettings.js'
import sharedfile from '../views/user_panel/sharedFile.js'

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
        path: '/files',
        getTemplate: files,
    },
    {
        path: '/shared',
        getTemplate: shared,
    },
    {
        path: '/files/:directory',
        getTemplate: files,
    },
    {
        path: '/sharedfile/:shareid',
        getTemplate: sharedfile,
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