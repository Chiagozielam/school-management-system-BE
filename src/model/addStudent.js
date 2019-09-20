const mongoose = require('mongoose');

const addStudentSchema = new mongoose.Schema({
    studentName: {
        type: String,
        required: true
    },
    studentEmail: {
        type: String,
        required: true
    },
    studentClass: {
        type: String,
        required: true
    },
    studentGender: {
        type: String,
        required: true
    },
    studentImg: {
        type: String,
        required: true
    },
    studentPassword: {
        type: String,
        required: true
    },
    studentDescription: {
        type: String,
        required: true
    }
    
})

const addStudent = mongoose.model("addStudents", addStudentSchema);

module.exports = addStudent;
