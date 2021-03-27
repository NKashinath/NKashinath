const userModel = require('../../backend-8AM/temp/models/user.model');
const usersModel = require('../model/users.model');

class usersService{
    getAll(){
        return usersModel.find();
    }
    add(udata){
        const add = new usersModel(udata);
        return add.save();
    }
    getByEmail(uEmail){
        return usersModel.findOne({uEmail})
    }
    findByIdAndUpdate(data){
        return usersModel.findByIdAndUpdate(data.id, {
            $set: {
                uPassword: data.uPassword
            }
        }, {new: true})
    }
    findByIdAndUpdateToken(data){
        return usersModel.findByIdAndUpdate(data.id, {
            $set: {
                uCurrentToken: data.uCurrentToken
            }
        }, {new: true}).exec();
    }
}
module.exports = new usersService();
