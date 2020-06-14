import homeView from '../views/main_page/home.js'
import FAQView from '../views/main_page/FAQ.js'
import registerView from '../views/main_page/register.js'
import loginView from '../views/main_page/login.js'
import resetPassword from '../views/main_page/reset-password.js'
import forgotPassword from '../views/main_page/forgot-password.js'
import files from '../views/user_panel/files.js'
import shared from '../views/user_panel/shared.js'
import _404View from '../views/404.js'
import passwordChange from '../views/user_panel/passwordChange.js'
import sharedfile from '../views/user_panel/sharedFile.js'
import deleteAccount from '../views/user_panel/deleteAccount.js'

const routes = [
    {
        path: '/404',
        getTemplate: _404View,
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
        path: '/forgot-password',
        getTemplate: (params) =>  forgotPassword,
    },
    {
        path: '/reset-password',
        getTemplate: (params) =>  resetPassword,
    },
    {
        path: '/passwordChange',
        getTemplate: (params) =>  passwordChange,
    },
    {
        path: '/deleteAccount',
        getTemplate: (params) =>  deleteAccount,
    },
];

export default routes;