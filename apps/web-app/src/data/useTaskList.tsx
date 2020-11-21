import { atom, selector, useRecoilState, useRecoilValue } from 'recoil';
import api from '../api';

export interface ITask {
    id: number;
    done: boolean;
    description: string;
}

export const taskListState = atom({
    key: 'taskList',
    default: [] as ITask[]
});

export const completedTaskListState = selector({
    key: 'completedTaskList',
    get: ({ get }) => {
        return get(taskListState).filter(task => task.done)
    }
})

export const remainingTaskListState = selector({
    key: 'remainingTaskList',
    get: ({ get }) => {
        return get(taskListState).filter(task => !task.done)
    }
});

export function useTaskList(){

    const [ taskList, setTaskList ] = useRecoilState<ITask[]>(taskListState);
    const completedTaskList = useRecoilValue(completedTaskListState);
    const remainingTaskList = useRecoilValue(remainingTaskListState);
    
    const loadRemoteTasks = () => {
        api.tasks.get().then( response => {
            setTaskList( response.data );
        });
    }

    const create = ( description:string ) => {
        api.tasks.post({ done: false, description }).then( response => {
            setTaskList([ ...taskList, response.data ]);
        });
    }

    const markDone = ( id:number, done:boolean ) => {
        api.tasks.patch( id, { done }).then( response => {
            return api.tasks.get();
        }).then( response => {
            setTaskList( response.data );
        });
    }

    const remove = ( id:number ) => {
        api.tasks.delete( id ).then(() => {
            return api.tasks.get();
        }).then( response => {
            setTaskList( response.data );
        });
    }

    return {
        taskList,
        completedTaskList,
        remainingTaskList,
        setTaskList,
        loadRemoteTasks,
        create,
        markDone,
        remove
    }

}