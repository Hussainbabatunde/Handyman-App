import * as React from 'react';
import socket from '../../socket';

const taskActions = {
    updateTask: async (dispatch, active_task) => {
        dispatch({ type: 'UPDATE_TASK', active_task });
    },
    onConnected: (dispatch) => {
        console.log( 'onConnected_____');
    },
    onDisconnected: (dispatch, reason) => {
        console.log(reason, 'onDisconnected_____');
    },
    onError: (dispatch, error) => {
        console.log(error, 'onError_____');
    },
    initTask: (dispatch, active_task) => {
        console.log(active_task?.task_id, new Date(), 'initTask_____');
        if (active_task) {
            const { task_id, userId } = active_task;
            socket.task_id = task_id;
            socket.userId = userId;
            dispatch({ type: 'UPDATE_TASK', active_task });
        }
    },
    cancelTask: (dispatch) => {
        dispatch({ type: 'UPDATE_TASK', active_task: null });
        //socket.off('connect');
        //socket.off('disconnect');
        socket.disconnect();
    },
}

export default taskActions;