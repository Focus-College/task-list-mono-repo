import { authenticateToken } from '../../middleware/authenticator';
import { TaskModel } from '../../models/task';

export function post( app:any ){

    app.post("/tasks", authenticateToken, async (request:any, response:any) => {
    
        const task = await TaskModel.create({
            done: false,
            description: request.body.description
        });
    
        response.status(201).send( task );
    
    });

}