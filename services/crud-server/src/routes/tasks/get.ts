import { task } from '.';
import { authenticateToken } from '../../middleware/authenticator';
import { TaskModel } from '../../models/task';

export function get( app:any ){

    // responds with all tasks
    app.get("/tasks", authenticateToken, async (request:any, response:any) => {
        
        const tasks = await TaskModel.getAll();
        response.send( tasks );

    });

}