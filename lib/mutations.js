'use strict'
const connectDb = require('./db');

module.exports = {
    createCourse: async (root, { input }) => {
        const defaults = {
            teacher: '',
            topic: ''
        };
        const newCourse = Object.assign(defaults, input);
        try {
            const db = await connectDb();
            const course = await db.collection('courses').insertOne(input);
            newCourse._id = course.insertedId;
            return newCourse;
        } catch (error) {
            console.log('Error mutation createCourse', error);
        }
    }
}