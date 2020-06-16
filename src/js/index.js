import Router from '../js/router.js';
import routes from '../js/routes.js';
import Auth from '../js/auth.js';
import FileOperator from '../js/file-operator.js';

const api = 'https://witdrive-api.azurewebsites.net:443/api/';

const auth = new Auth(api);
const fileOperator = new FileOperator(auth, api);
const router = new Router(routes,auth,fileOperator);
// To run application enter in terminal: 
// http-server-spa . ./index.html