


const getUsers = (req,res)=>{
    const query = req.query;
    res.json({
        msg:'get API',
        query
    });
};
const putUsers = (req,res)=>{
    const {id} = req.params
    res.json({
        msg:'put API',
        id
    });
};
const postUsers = (req,res)=>{
    const body = req.body;

    res.status(201).json({
        msg:'post API controller',
        body
    });
};
const deleteUsers = (req,res)=>{
    res.json({
        msg:'delete API'
    });
};
module.exports= {
    getUsers,
    putUsers,
    postUsers,
    deleteUsers
}