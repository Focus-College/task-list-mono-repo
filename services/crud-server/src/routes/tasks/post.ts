import { authenticateToken } from '../../middleware/authenticator';
import { TaskModel } from '../../models/task';

export function post( app:any ){

    app.post("/tasks", authenticateToken, (request:any, response:any) => {
    
        const task = {
            // id: TaskModel.findNextId(),
            done: false,
            description: request.body.description
        };
        
        // const tasks = TaskModel.getAll();
        // tasks.push( task );
        // TaskModel.setAll(tasks);
    
        response.status(201).send( task );
    
    });

}