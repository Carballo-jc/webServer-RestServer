const mongoose = require('mongoose');


const dbConnection = async() =>{

    try {
     await   mongoose.connect(process.env.MONGO_CONECT,{
         useNewUrlParser:true,
         useUnifiedTopology:true,
         useCreateIndex:true,
         useFindAndModify:false
     });
     console.log('Base de datos CONECTADA');
    } catch (error) {
        console.log(error);
        throw new Error('Error al iniciar la base de dato');
    }

}


module.exports={
    dbConnection
}