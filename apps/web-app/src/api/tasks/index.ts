import axios from 'axios';
import { HOSTNAME } from '../config';

export default {
    
    get: async () => {
        return axios.get(`${HOSTNAME}/tasks`, {
            headers: {
                Authorization: `Bearer ${window.localStorage.getItem('token')}`
            }
        });
    },

    post: async ( body:any ) => {
        return axios.post(`${HOSTNAME}/tasks` , body, {
            headers: {
                Authorization: `Bearer ${window.localStorage.getItem('token')}`
            }
        });
    },

    patch: async ( id:number, body:any ) => {
        return axios.patch(`${HOSTNAME}/tasks/${id}`, body, {
            headers: {
                Authorization: `Bearer ${window.localStorage.getItem('token')}`
            }
        });
    },

    delete: async ( id:number ) => {
        return axios.delete(`${HOSTNAME}/tasks/${id}`, {
            headers: {
                Authorization: `Bearer ${window.localStorage.getItem('token')}`
            }
        });
    }

}