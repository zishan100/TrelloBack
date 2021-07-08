const mongoose = require("mongoose");

const ListSchema = new mongoose.Schema({
       id:String,
       title: String,
}, {timestamps: true });

const ToDoList = mongoose.model("ToDoList", ListSchema);

module.exports = ToDoList;
