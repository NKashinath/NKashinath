const mongoose = require('mongoose');


const usersModel = mongoose.model('users', {
    uFirstName: {
        type: String
    },
    uLastName: {
        type: String
    },
    uEmail: {
        type: String
    },
    uMobile: {
        type: Number
    },
    uPassword: {
        type: String
    },
    uCurrentToken: {
        type: String
    },
    uRefreshToken: {
        type: String,
        default: null
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    createdDate: {
        type: Date,
        default: Date.now()
    }
})

module.exports = usersModel;