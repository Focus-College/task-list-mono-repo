import { authenticateToken } from '../../../middleware/authenticator';
import { TaskModel } from '../../../models/task';

export function put( app:any ){

    // NOT IDEMPOTENT: You can send only specific value to change
    app.put("/tasks/:taskId", authenticateToken, async ( request:any, response:any ) => {
        
        const taskId = request.params.taskId;
        const currentTask = await TaskModel.getById(taskId);
        
        // make sure the task exists
        if(!currentTask){
            response.status(404).send({
                error: 404,
                message: `Cannot find task with id ${taskId}`
            });
            return;
        }
        
        // make sure that the id in the task body (if present) matches the id in the parameters
        if(request.body.id && request.body.id !== taskId){
            response.status(400).send({
                error: 400,
                message: `The task id (${taskId}) sent in the request path does not match the id in the request body (${request.body.id})`
            });
            return;
        }
        
        const task = await TaskModel.updateFromJson( request.body );
        response.status(200).send( task );

    });

}