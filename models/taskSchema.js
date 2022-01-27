const mongoose = require('../db/connection'); 

const taskSchema = new mongoose.Schema ({
  taskTitle: {
    type: String,
    required: true
  },
  taskDescription: {
    type: String,
    required: true
  },
  priority: {
    type: Number,
    required: true
  },
  completed: {
    type: Boolean,
    required: true
  }
});

module.exports = taskSchema