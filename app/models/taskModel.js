var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var userModel = require('./userModel');

var taskSchema = new Schema({
  _creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'userModel'
  },
  taskTitle: {
		type: 		String,
		required: 	true
	},
	taskTag: {
		type: 		String
	},
	taskPoints: {
		type: 		Number
	},
  taskStatus: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('taskModel', taskSchema);
