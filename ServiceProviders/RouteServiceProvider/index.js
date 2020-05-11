//handles routes

//accepts all routes and 
const r = require('../../routes/routes');
const namespace = '../../http/controllers/';

class RouteServiceProvider {
    constructor(){
      
    }    
    async router(req,res){
        try {
            let route = r.searchRoute(req.method, req.url);
            let routeObject = route['controller'].split('.');
            let controller = require(namespace + routeObject[0]);
            let controller2 = new controller(req);
           let method = routeObject[1];
           if(typeof controller2[method] == 'function'){
           
               req['params'] = route['params'];
                let response = await controller2[method](req);
                res.send(response);
           }
        } catch (error) {
            res.send(error.message);
        }
       
            
        throw new Error('Undefined method: '+ routeObject[1] + ' in ' + routeObject[0]  );
    }
}


module.exports = RouteServiceProvider;