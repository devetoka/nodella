
const RouteManager = require('../ServiceProviders/RouteServiceProvider/RouteManager');
const routerManager = new RouteManager();






routerManager.group({'prefix' : '/api/v1'}, function(){
    //user routes
    routerManager.get('/users', 'UserController.index');
    routerManager.get('/admins/:id', 'UserController.test');
    routerManager.get('/users/:id', 'UserController.show');
    routerManager.get('/users/:id/products', 'UserController.test2');   
    routerManager.get('/users/:id/:name/:month/:year', 'UserController.test3');   
    routerManager.delete('/users/:id', 'UserController.destroy');   
});
   










module.exports = routerManager;