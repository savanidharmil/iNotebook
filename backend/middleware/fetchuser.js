var jwt = require('jsonwebtoken');
const JWT_SECRET="dharmil@213";

fetchuser=(req,res,next)=>{
    // Get the user from the JWT token and append id to req object
    const token = req.header('auth-token');
    if(!token){
        res.status(401).send({error:"please authenticate using a valid token.."})
    }

    try {
        const data = jwt.verify(token,JWT_SECRET);
        console.log(data);
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send({error:"please authenticate using a valid token."})
    }
}
module.exports= fetchuser;