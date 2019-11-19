'use strict'
const connectDb = require('./db');
const { ObjectID } = require('mongodb');

module.exports = {
    Course: {
        people: async ({ people }) => {
            try {
                const db = await connectDb();
                if (!people) {
                    return [];
                }
                const ids = people.map(id => ObjectID(id));
                const peopleData = await db.collection('students').find(
                    { _id: { $in: ids } }
                ).toArray();
                return peopleData;
            } catch (error) {
                console.log('error en type people', error);
            }
        }
    }
}