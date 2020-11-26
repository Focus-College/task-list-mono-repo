import { authenticateToken } from '../../../middleware/authenticator';
import { TaskModel } from '../../../models/task';

export function get( app:any ){

    // responds with all tasks
    app.get("/tasks/:taskId", authenticateToken, async (request:any, response:any) => {
        
        const taskId = request.params.taskId;
        const foundTask = await TaskModel.getById(taskId);

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