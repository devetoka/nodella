

class UserController {
    constructor(req){
        this.req = req
    }
    async index() {   
        console.log(this.req.url);     
        return 'index';
    }

    async destroy() {
        return 'delete';
    }

    async show(){
        return 'show';
    }

    async test(){
        return 'test';
    }

    async test2(){
        return 'test2s';
    }

    async test3(){
        return this.req.params;
    }
}

module.exports = UserController;