import homeView from '../views/main_page/home.js'
import FAQView from '../views/main_page/FAQ.js'
import registerView from '../views/main_page/register.js'

const routes = [
    {
        path: '/',
        getTemplate: (params) => homeView,
    },
    {
        path: '/about',
        getTemplate: (params) => '<h1>About</h1>',
    },
    {
        path: '/contact',
        getTemplate: (params) => '<h1>Contact</h1>',
    },
    {
        path: '/faq',
        //getTemplate: (params) => '<h1>FAQ</h1>',
        getTemplate: (params) => FAQView,
    },
    {
        path: '/products/:productId',
        getTemplate: (params) =>  `<h1>Product ${params.productId}</h1>`,
    },
    {
        path: '/register',
        getTemplate: (params) =>  registerView,
    },
];

export default routes;