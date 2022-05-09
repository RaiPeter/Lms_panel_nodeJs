// api auth 
module.exports = async(req, res, next)=>{

    try {
        const auth = "apiauth123";
        const authid = await req.body.apiauth;
        if (auth === authid) {
            console.log('api auth matched');
            next();
        }else{
            res.status(401).send('Unauthorized')    
        }
    } catch (e) {
        console.log('api auth notmatched');
        res.status(401).send('Unauthorized')
    }
    
}