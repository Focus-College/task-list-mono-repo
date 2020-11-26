import { authenticateToken } from '../../../middleware/authenticator';
import { TaskModel } from '../../../models/task';

export function patch( app:any ){

    // NOT IDEMPOTENT: You can send only specific value to change
    app.patch("/tasks/:taskId", authenticateToken, async ( request:any, response:any ) => {
        
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
        
        
        if(request.body._id){
            
            // make sure that the id in the task body (if present) matches the id in the parameters
            if(request.body._id !== taskId){
                response.status(400).send({
                    error: 400,
                    message: `The task id (${taskId}) sent in the request path does not match the id in the request body (${request.body.id})`
                });
                return;
            }

            let task = { ...currentTask, ...request.body };
            task = await TaskModel.updateFromJson( task );
            response.status(200).send( task );

        } else {

            let task = { ...currentTask, ...request.body };
            task = await TaskModel.update( task );
            response.status(200).send( task );

        }

    });

}