const jwt = require('jsonwebtoken');

const { SECRET_KEY } = require('./../config');
const User = require('./../models/user');
const Token = require('./../models/token');

// register a user 
exports.register = async (req, res, next) => {
    const { firstName, lastName, email, password } = req.body;
    const user = await User.findOne({ email });
    if (user)
        return res.status(403).json({ error: { message: 'Email already in use!' } });
    const newUser = new User({ firstName, lastName, email, password });
    try {
        await newUser.save();
        const token = getSignedToken(newUser);
        res.status(200).json({ token });
    } catch (error) {
        error.status = 400;
        next(error);
    }
};

//login a user
exports.login = async (req, res, next) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user)
        return res.status(403).json({ error: { message: 'invalid email/password' } });
    const isValid = await user.isPasswordValid(password);
    if (!isValid)
        return res.status(403).json({ error: { message: 'invalid email/password' } });
    const token = getSignedToken(user);
    res.status(200).json({ token });
};

//logout a user
exports.logout = async (req, res, next) => {
    try {
        logoutToken = new Token({token:req.headers.authorization})
        await logoutToken.save();
        res.status(200).json({ "message":"Logout Sucessfull" });
    } catch (error) {
        error.status = 400;
        next(error);
    }

};

//generate signed jwt token
getSignedToken = user => {
    return jwt.sign({
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName
    }, SECRET_KEY, { expiresIn: '1h' });
};