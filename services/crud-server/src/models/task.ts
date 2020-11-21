import fs from 'fs';

// read user
const path = `${__dirname}/../data`;
const file = `${path}/tasks.json`;

if(!fs.existsSync(path)){
    fs.mkdirSync(path);
}

if(!fs.existsSync(file)){
    fs.writeFileSync(file, JSON.stringify([]), { encoding: 'utf-8' });
}

export interface ITask {
    id: number,
    done: boolean,
    description: string
}

export const TaskModel = {

    getAll: ():ITask[] => {
        const tasks = JSON.parse(fs.readFileSync(file, { encoding: 'utf-8' }));
        console.log('TaskModel.getAll', tasks);
        return tasks;
    },

    setAll: ( users:ITask[] ) => {
        fs.writeFileSync(file, JSON.stringify(users, null, 4), { encoding: 'utf-8' });
    },

    getById: ( taskId:number ): ITask|undefined => {

        return TaskModel.getAll().find( task => {
            console.log(task, taskId);
            return task.id === taskId;
        });

    },

    update: ( task:ITask ) => {

        const tasks = TaskModel.getAll();
        const indexOfCurrentTask = tasks.map(_task=>_task.id).indexOf( task.id );
        tasks.splice(indexOfCurrentTask, 1, task);
        TaskModel.setAll(tasks);

    },

    delete: ( task:ITask ) => {

        const tasks = TaskModel.getAll();
        const indexOfCurrentTask = tasks.map(_task=>_task.id).indexOf( task.id );
        tasks.splice(indexOfCurrentTask, 1);
        TaskModel.setAll(tasks);

    },

    findNextId: () => {
        
        const tasks = TaskModel.getAll();
        return tasks.length ? Math.max(...tasks.map(task => task.id)) + 1 : 1;
    
    }

}