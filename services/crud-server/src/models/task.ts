import fs from 'fs';

import { MongoClient, ObjectId } from "mongodb";
const client = new MongoClient("mongodb+srv://admin:3xrZS2rCphtLYwDd@operatingdatastorage.byj0b.mongodb.net/bradley");

export interface ITask {
    _id: ObjectId,
    done: boolean,
    description: string
}

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

    setAll: ( users:ITask[] ) => {
        // fs.writeFileSync(file, JSON.stringify(users, null, 4), { encoding: 'utf-8' });
    },

    getById: async ( taskId:string ): Promise<ITask|undefined> => {

        await client.connect();
        const database = client.db('bradley');
        const collection = database.collection('tasks');
        const task:ITask = await collection.findOne({ _id: new ObjectId(taskId) });
        return task;

    },

    update: ( task:ITask ) => {

        // const tasks = TaskModel.getAll();
        // const indexOfCurrentTask = tasks.map(_task=>_task.id).indexOf( task.id );
        // tasks.splice(indexOfCurrentTask, 1, task);
        // TaskModel.setAll(tasks);

    },

    delete: ( task:ITask ) => {

        // const tasks = TaskModel.getAll();
        // const indexOfCurrentTask = tasks.map(_task=>_task.id).indexOf( task.id );
        // tasks.splice(indexOfCurrentTask, 1);
        // TaskModel.setAll(tasks);

    },

    findNextId: () => {
        
        // const tasks = TaskModel.getAll();
        // return tasks.length ? Math.max(...tasks.map(task => task.id)) + 1 : 1;
    
    }

}