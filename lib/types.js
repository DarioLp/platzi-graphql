'use strict'
const connectDb = require('./db');
const { ObjectID } = require('mongodb');
const errorHandler = require('./errorHandler');

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
                errorHandler(error);
            }
        }
    },
    Person: {
        __resolveType: (person, context, info) => {
            if (person.phone) {
                return 'Monitor';
            } else {
                return 'Student';
            }

        }
    }
}