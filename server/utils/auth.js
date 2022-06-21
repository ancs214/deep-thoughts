const jwt = require('jsonwebtoken');

//secret enables the server to verify whether it recognizes this token
const secret = 'mysecretsshhhhh';
const expiration = '2h';

module.exports = {
    
    authMiddleware: function({ req }) {
        //allows token to be sent via req.body, req.query, or headers
        let token = req.body.token || req.query.token || req.headers.authorization;

        //separate "Bearer" from "<tokenvalue>"
        if(req.headers.authorization) {
            token = token
                .split(' ')
                .pop()
                .trim();
        }
        //if no token, return request object as it
        if(!token) {
            return req;
        }

        try {
            //decode and attach user data to request object. if secret doesnt match the secret that was used with jwt.sign(), the object wont be decoded!
            const { data } = jwt.verify(token, secret, { maxAge: expiration });
            req.user = data;
        } catch {
            console.log('Invalid token');
        }

        //return updated request object
        return req;
    },

    //signToken expects a user object and will add that user's username, email, _id properties to the token
    signToken: function({ username, email, _id }) {
        const payload = { username, email, _id }; 

        return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
    }
}