import { task } from '..';
import { authenticateToken } from '../../../middleware/authenticator';
import { TaskModel } from '../../../models/task';

export function remove(app:any){

    // double requests should ignore the second
    app.delete("/tasks/:taskId", authenticateToken, async ( request:any, response:any ) => {
        
        const taskId = request.params.taskId;
        const taskToDelete = await TaskModel.getById( taskId );
        
        
        if( !taskToDelete ){
            response.status(404).send({
                error: 404,
                message: `Cannot find task with id ${taskId}`
            });
            return;
        }
        
        // // delete the task
        await TaskModel.delete( taskToDelete );
        response.status(204).send();

    });

}