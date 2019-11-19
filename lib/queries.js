'use strict'
const connectDb = require('./db');
const { ObjectID } = require('mongodb');
module.exports = {
    getCourses: async () => {
        let courses = [];
        try {
            const db = await connectDb();
            courses = await db.collection('courses').find().toArray();
        } catch (error) {
            console.log('Error query getCourses', error);
        }
        return courses;
    },
    getCourse: async (root, { id }) => {
        let course;
        try {
            const db = await connectDb();
            course = await db.collection('courses').findOne({ '_id': ObjectID(id) });
        } catch (error) {
            console.log('Error query getCourse', error);
        }
        return course;
    },
    getStudents: async () => {
        let students = [];
        try {
            const db = await connectDb();
            students = await db.collection('students').find().toArray();
        } catch (error) {
            console.log('Error query getCourses', error);
        }
        return students;
    },
    getStudent: async (root, { id }) => {
        let student;
        try {
            const db = await connectDb();
            student = await db.collection('students').findOne({ '_id': ObjectID(id) });
        } catch (error) {
            console.log('Error query getStudent', error);
        }
        return student;
    }
}