'use strict'
const connectDb = require('./db');
const { ObjectID } = require('mongodb');
const errorHandler = require('./errorHandler');

module.exports = {
    getCourses: async () => {
        let courses = [];
        try {
            const db = await connectDb();
            courses = await db.collection('courses').find().toArray();
        } catch (error) {
            errorHandler(error);
        }
        return courses;
    },
    getCourse: async (root, { id }) => {
        let course;
        try {
            const db = await connectDb();
            course = await db.collection('courses').findOne({ '_id': ObjectID(id) });
        } catch (error) {
            errorHandler(error);
        }
        return course;
    },
    getPeople: async () => {
        let students = [];
        try {
            const db = await connectDb();
            students = await db.collection('students').find().toArray();
        } catch (error) {
            errorHandler(error);
        }
        return students;
    },
    getPerson: async (root, { id }) => {
        let student;
        try {
            const db = await connectDb();
            student = await db.collection('students').findOne({ '_id': ObjectID(id) });
        } catch (error) {
            errorHandler(error);
        }
        return student;
    }
}