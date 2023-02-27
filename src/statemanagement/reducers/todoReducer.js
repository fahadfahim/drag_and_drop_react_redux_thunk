import { FETCH_TODO, NEW_TODO, ONDROP_TODO } from '../types/types';

const initialState = {
    todos: [
        { id: 1, name: 'Learn Angular', category: 'wip', bgcolor: 'yellow' },
        { id: 2, name: 'Learn React', category: 'wip', bgcolor: 'lightblue' },
        { id: 3, name: 'Learn Vue', category: 'complete', bgcolor: 'green' },
        { id: 4, name: 'washes cloth', category: 'todo', bgcolor: 'red' }
    ],
    todo: {}
};

export default function (state = initialState, action) {
    switch (action.type) {
        case FETCH_TODO:
            return {
                ...state,
                todos: action.payload
            };
        case NEW_TODO:
            return {
                ...state,
                todos: [...state.todos, action.payload]
            };
        case ONDROP_TODO:
            return {
                ...state,
                todos: [...state.todos, action.payload]
            };
        default:
            return state;
    }
}
