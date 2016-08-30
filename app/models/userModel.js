// load the things we need
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
var taskModel = require('./taskModel');

// define the schema for our user model
var userSchema = mongoose.Schema({
    local            : {
        username     : String,
        password     : String,
    },
    google           : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    },

    currentSprint: {
        type: Number
    },
    totalCompletedPoints: {
        type: Number
    }

    // backlogList: [{
    //     type: mongoose.Schema.Types.ObjectId, ref: 'taskModel'
    // }],
    // progressList: [{
    //     type: mongoose.Schema.Types.ObjectId, ref: 'taskModel'
    // }],
    // doneList: [{
    //     type: mongoose.Schema.Types.ObjectId, ref: 'taskModel'
    // }]
});

// methods ======================
// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

// create the model for users and expose it to our app
module.exports = mongoose.model('userModel', userSchema);
