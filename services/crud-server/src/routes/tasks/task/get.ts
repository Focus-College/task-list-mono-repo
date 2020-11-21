import { authenticateToken } from '../../../middleware/authenticator';
import { TaskModel } from '../../../models/task';

export function get( app:any ){

    // responds with all tasks
    app.get("/tasks/:taskId", authenticateToken, (request:any, response:any) => {
        
        const taskId = Number(request.params.taskId);
        const foundTask = TaskModel.getById(taskId);

        if(foundTask){
            response.send( foundTask );
        }

        else {
            response.status(404).send({
                error: 404,
                message: `Cannot find task with id ${taskId}`
            });
        }

    });

}