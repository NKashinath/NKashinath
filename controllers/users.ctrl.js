const usersService = require('../services/users.svc');
const bcrypt = require('bcrypt');
const sendMail = require('@sendgrid/mail');
const jwt = require('jsonwebtoken');
const config = require('../config');

sendMail.setApiKey(config.sengridKey);

class usersCtrl{
    async getAllUsers(req, res){
        try{
            const users = await usersService.getAllUsers();
            if(users){
                res.status(200);
                res.json({data: users, status: false, err: null})
            }
        }
        catch (err){
            res.status(409);
            res.json({data: null, status: false, err})
        }
    }
    async register(req, res){
        try{
            const userFound = await usersService.getByEmail(req.body.uEmail)
            // console.log(req.body.uEmail);
            // console.log(userFound);
            if(userFound){
                    res.status(409);
                    res.json({errorDescription: 'User_Already_Exist', status: false, err: null})
            }
            else {
                req.body.uPassword = await bcrypt.hash(req.body.uPassword, 5);
                const users = await usersService.add(req.body);
                console.log(req.body);
                res.status(200);
                res.json({data: users, status: false, err: null})
            }
        }
        catch (err){
            res.status(500);
            res.json({data: null, status: false, err})    
        }
    }
    async login(req, res){
        try {
            const user = await usersService.getByEmail(req.body.uEmail);
            if (user){
                const isPasswordMatched = await bcrypt.compareSync(req.body.uPassword, user.uPassword)
                if (isPasswordMatched){
                    const gentoken = await jwt.sign({
                        userId: user._id,
                        userFirstName: user.uFirstName,
                        userLastName: user.uLastName,
                        userEmail: user.uEmail,
                        userPassword: user.uPassword
                    },'D0nt4get!', {expiresIn: '1h'});
                    // console.log(gentoken);
                    const tokenUpdate = await usersService.findByIdAndUpdateToken({id: user._id, uCurrentToken: gentoken});
                    // console.log(tokenUpdate);
                    // console.log(user.uRefreshToken);

                    res.status(200);
                    res.json({data: user, status: true, err: null})
                }
                else {
                    res.status(409);
                    res.json({errorDescription: 'Password Incorrect', status: false, err: null})
                }
            }
            else {
                res.status(409);
                res.json({errorDescription: 'Email Not Registered', status: false, err: null})
            }
        } catch (err) {
            console.log(err);
            console.log(user);
            res.status(500);
            res.json({errorDescription: 'Server Error', status: false, err})
        }
    }
    async updatePasswordMail(req, res){
        try {
            const isEmailExist = await usersService.getByEmail(req.body.uEmail);
            if(isEmailExist){
                const token = await jwt.sign({
                    uEmail: isEmailExist.uEmail,
                    uPassword: isEmailExist.uPassword,
                    uId: isEmailExist._id
                }, 'D0nt4get!', {expiresIn: '1h'})
                // console.log(token);
                const passwordUpdateUrl = `http://localhost:4200/auth/updatePassword?token=${token}&Email=${isEmailExist.uEmail}`
                const msg = {
                    to: req.body.uEmail,
                    from: 'knagaram@yopmail.com', // Use the email address or domain you verified above
                    subject: 'Your OShop password reste link',
                    text: `Hi ${isEmailExist.uFirstName}`,
                    html: `
                    <html>
                    <h5>Password reset link</h5><br>
                    <a target='_blank' href=${passwordUpdateUrl}>Reset your Password here</a>
                    </html>
                    `
                }
                const response = await sendMail.send(msg);
                res.status(200);
                res.json({data: 'Mail_Sent', status: true, err: null})
            }
            else {
                res.status(409);
                res.json({data: 'Email_Not_Registered', status: false, err})
            }
        } catch (error) {
            res.status(500);
            res.json({data: 'Bad_Request', status: false, error})
        }
    }
    async updatePassword(req, res){
        try {
            const hashedPassword = await bcrypt.hashSync(req.body.uPassword, 5);
            const isTokenExpired = await jwt.verify(req.query.token, 'D0nt4get!', (err, decoded)=> {
                if (err){
                    res.status(409);
                    res.json({data: 'Token is EXPIRED', status: false, errorDescription: 'Password reset Link Expired. Click Forgot Password' });   
                }
                else{
                    req.decodeToken = decoded;
                    usersService.findByIdAndUpdate({id: req.decodeToken.uId, uPassword: hashedPassword});
                    res.status(200);
                    res.json({data:'Password Updated Successfully', status: true, err: null});
                }
            });            
        } catch (error) {
            res.status(500);
            res.json({data: 'Server Error', status: false, err: null});
        }
   }
}
module.exports = new usersCtrl();