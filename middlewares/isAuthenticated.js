import JWT from 'jsonwebtoken'; 


const userAuth = (req, res, next) => {
    
    try {
        const authHeader = req.headers.authorization;
        if(!authHeader || !authHeader.startsWith('Bearer')) {
            next(new Error('Please login to access this route'));
        }
        const token = authHeader.split(' ')[1];
        const payload = JWT.verify(token, process.env.JWT_SECRET);
        // console.log(payload)
        req.user = {id: payload.id};
        // console.log(req.user)
        next();
        
    } catch (error) {
        next(new Error('Invalid credentials'));
    }
};

export default userAuth;