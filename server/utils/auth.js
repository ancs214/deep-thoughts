const jwt = require('jsonwebtoken');

//secret enables the server to verify whether it recognizes this token
const secret = 'mysecretsshhhhh';
const expiration = '2h';

module.exports = {
    //signToken expects a user object and will add that user's username, email, _id properties to the token
    signToken: function({ username, email, _id }) {
        const payload = { username, email, _id }; 

        return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
    }
}