const mongoose = require('../db/connection'); 

const taskSchema = require('./taskSchema');
    
const memberSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    tasks: [taskSchema]
  });
  
  const Member = mongoose.model('Member', memberSchema);
  module.exports = Member;
