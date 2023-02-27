import { FETCH_TODO, NEW_TODO, ONDROP_TODO } from '../types/types';

export const fetchTodo = () => dispatch => {
    fetch('https://jsonplaceholder.typicode.com/posts')
        .then(res => res.json())
        .then(todos =>
            dispatch({
                type: FETCH_TODO,
                payload: todos
            })
        );
};


export const createTodo = todoData => dispatch => {
    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(todoData)
    })
        .then(res => res.json())
        .then(todo =>
            dispatch({
                type: NEW_TODO,
                payload: todo
            })
        );
};


