const express = require('express');
const cors = require('cors')
class Server {

    constructor(){

        this.app = express();
        this.port = process.env.PORT;
        this.pathUsers='/api/users'

        //Middlewares
        this.middlewares();
        // this.cors();

        //rutas de mi aplicacion
        this.router();
    }

    middlewares(){
        //cors
        this.app.use(cors());
        //lectura y parseo
        this.app.use(express.json());
        //express
        this.app.use( express.static('public'));
        //
    }

    router(){
        this.app.use(this.pathUsers,require('../routes/users'));
    };

    listen(){
        this.app.listen(this.port,()=>{
            console.log('Server corriendo en el puerto:',this.port)
        })
    };

}

module.exports= Server;