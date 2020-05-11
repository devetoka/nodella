
class RouteManager {
    constructor(){
        this.parameters = null;
        let routeKeys = {
            "prefix" : null,
            "controller" : null,
            "url" : null,
            "full_url": null
        };
        this.methods = {
            "get" : {},
            "post" : {},
            "put" : {},
            "patch" : {},
            "delete" : {}
        };
    
    }

    pathSlashPopper(path){
        let lastChar = path[path.length -1];
        
        if(lastChar == '/'){
            path = path.split('');
            path.pop();
            path = path.join('');
            console.log(path);
            return path;
        }
        return path;
       
    }

    pathSlashUnshifter(path){
        let firstChar = path[0];
        if(firstChar == '/'){
            path = path.split('');
            path.shift();
            path = path.join('');
            
            return path;

        }
        return path;
    }
    


    get(path, controller){
        if(this.parameters != null){
            if(this.parameters.prefix != null){
                console.log(this.parameters);
                let prefixedPath = this.pathSlashPopper(this.parameters.prefix) + '/' + this.pathSlashUnshifter(path);
                
                let routeKeys = {
                    "prefix" : this.parameters.prefix,
                    "controller" : controller,
                    "url" : path,
                    "full_url": prefixedPath
                }
                this.methods.get[prefixedPath] = routeKeys;
            }
        }
        else{
            if(path.length){
                let routeKeys = {
                    "prefix" : null,
                    "controller" : controller,
                    "url" : path,
                    "full_url": null
                }
                this.methods.get[path] = routeKeys;
            }
        }
        
    }
    post(path, controller){
        if(path.length){
            this.methods.post[path] = controller;
        }
    }

    delete(path, controller){
        if(path.length){
            this.methods.delete[path] = controller;
        }
    }
    searchRoute(method, path){
        let prefix = this.parameters != null ? (this.parameters.prefix != null ? this.parameters.prefix : null ): null;
        let path_ = path;
        if(prefix){
           path_ = path.replace(prefix, "");
        }
        let lastChar = path_[path_.length -1];
        if(lastChar == '/'){
            path_ = path_.split('');
            path_.pop();
            path_ = path_.join('');
        }
        let d = method.toLowerCase();
        if(path in this.methods[d]){
            return this.methods[d][path]['controller'];
        }else {
            let pathSection = path_.split('/');
            for(let key in this.methods[d]){
                let key_ = key;
                if(prefix)
                    key_ = key.replace(prefix, "");
               let  keySplit = key_.split('/');
                if(keySplit[1] == pathSection[1] && keySplit.length == pathSection.length){
                    let flag = true;
                    let params = {};
                   for(let i = 1; i < keySplit.length; i++){
                   
                        if(keySplit[i] != pathSection[i] ){
                            let index = keySplit[i].indexOf(':');
                            if(index < 0){
                                flag = false;
                                break;
                            }else{
                                console.log(pathSection[i] + 'lo');
                                let a = keySplit[i].split('');
                                a.shift();
                                let z = pathSection[i].indexOf('?');
                                if(z > 0){
                                    pathSection[i] = pathSection[i].split('');
                                    pathSection[i].splice(z, pathSection[i].length - z); 
                                    pathSection[i] = pathSection[i].join('');
                                }
                               
                               
                                
                                params[a.join('')] = pathSection[i];
                            }
                        }
                   }
                   if(flag){
                       console.log(params);
                        this.methods[d][key]['params'] = params;
                        return this.methods[d][key];
                   }
                   
                }
            }
        }
       
        throw new Error(path + " can not be found");

    }


    group(parameters, callback){
        this.parameters = parameters;
        
        callback();
    }
}

module.exports = RouteManager;