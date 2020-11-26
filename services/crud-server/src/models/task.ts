import dotenv from 'dotenv';
dotenv.config();

import { MongoClient, ObjectId } from "mongodb";
const client = new MongoClient(process.env.MONGODB_CONNECTION_STRING);

export interface ITask {
    _id: ObjectId,
    done: boolean,
    description: string
}

type ITaskStringId = Omit<ITask, "_id"> & { _id: string };

export const TaskModel = {

    getAll: async ():Promise<ITask[]> => {
        
        await client.connect();
        const database = client.db('bradley');
        const collection = database.collection('tasks');
        // const query = { done: true };
        const tasks:ITask[] = await collection.find({}).toArray();
        
        console.log('TaskModel.getAll', tasks);
        return tasks;

    },

    getById: async ( taskId:string ): Promise<ITask|undefined> => {

        await client.connect();
        const database = client.db('bradley');
        const collection = database.collection('tasks');
        return collection.findOne({ _id: new ObjectId(taskId) });

    },

    updateFromJson: async( task:ITaskStringId ) => {

        return TaskModel.update({
            ...task,
            _id: new ObjectId( task._id )
        });

    },
    
    update: async ( task:ITask ) => {

        try {
        
            await client.connect();
            const database = client.db('bradley');
            const collection = database.collection('tasks');
            
            console.log( task._id, typeof task._id );
            
            const update = await collection.updateOne({ _id: task._id }, { $set: { ...task }});
            return task;

        } catch(e) {
            console.log(task);
            console.log(e);
            return;
        }
    

    },

    create: async( taskToCreate:Omit<ITask, "_id"> ):Promise<ITask> => {
        
        await client.connect();
        const database = client.db('bradley');
        const collection = database.collection('tasks');
        const insert = await collection.insertOne( taskToCreate );
        return { _id: insert.insertedId, ...taskToCreate };

    },

    delete: async ( task:ITask ) => {

        await client.connect();
        const database = client.db('bradley');
        const collection = database.collection('tasks');
        await collection.deleteOne({ _id: task._id });

    }

}