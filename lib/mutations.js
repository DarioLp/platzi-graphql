'use strict'
const connectDb = require('./db');
const { ObjectID } = require('mongodb');
const errorHandler = require('./errorHandler');
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
            errorHandler(error);
        }
    },
    editCourse: async (root, { _id, input }) => {
        try {
            const db = await connectDb();
            await db.collection('course').updateOne(
                { _id: ObjectID(_id) },
                { $set: input }
            );
            const course = await db.collection('course').findOne({ _id: ObjectID(_id) });
            return course;
        } catch (error) {
            errorHandler(error);
        }
    },
    createPerson: async (root, { input }) => {
        try {
            const db = await connectDb();
            const student = await db.collection('students').insertOne(input);
            input._id = student.insertedId;
            return input;
        } catch (error) {
            errorHandler(error);
        }
    },
    editPerson: async (root, { _id, input }) => {
        try {
            const db = await connectDb();
            await db.collection('students').updateOne(
                { _id: ObjectID(_id) },
                { $set: input }
            );
            const student = await db.collection('students').findOne({ _id: ObjectID(_id) });
            return student;
        } catch (error) {
            errorHandler(error);
        }
    },
    deleteDocument: async (root, { _id, collection }) => {
        try {
            const db = await connectDb();
            const query = await db.collection(collection).remove(
                { _id: ObjectID(_id) }
            );
            return `${query.result.n} Elemento/s borrado`;
        } catch (error) {
            errorHandler(error);
            return 'Error tratando de eliminar';
        }
    },
    addPeople: async (root, { courseID, personID }) => {

        try {
            const db = await connectDb();
            const course = await db.collection('courses').findOne({
                _id: ObjectID(courseID)
            });
            const person = await db.collection('students').findOne({
                _id: ObjectID(personID)
            });

            if (!course || !person) throw new Error('La Persona o el Curso no existe');

            await db.collection('courses').updateOne(
                { _id: ObjectID(courseID) },
                { $addToSet: { people: ObjectID(personID) } }
            );
            return course;
        } catch (error) {
            errorHandler(error);

        }

    },
}