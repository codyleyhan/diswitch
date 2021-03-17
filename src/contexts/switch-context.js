import {
    createContext,
    useReducer,
} from 'react';

export const SwitchContext = createContext();

const storageKey = 'switches';
const initState = JSON.parse(localStorage.getItem(storageKey)) || [];

export const ADD_SWITCH = 'ADD_SWITCH';
export const DELETE_SWITCH = 'DELETE_SWITCH';
export const UPDATE_SWITCH = 'UPDATE_SWITCH';

const withSaveState = fn => {
    return (switches, action) => {
       const newState = fn(switches, action);
       localStorage.setItem(storageKey, JSON.stringify(newState));
       return newState;
    }
}

const reducer = withSaveState((switches, action) => {
    switch (action.type) {
        case ADD_SWITCH:
            action.payload.id = switches.length === 0 ? 0 : switches[switches.length-1].id +1;
            return [
                ...switches,
                action.payload,
            ];
        case DELETE_SWITCH:
            return switches.filter(s => s.id !== action.payload);
        case UPDATE_SWITCH:
            return switches.map(s => {
                if (s.id !== action.payload.id) {
                    return s
                }
                return {
                    ...s,
                    ...action.payload,
                }
            })
        default:
            throw new Error(action.type + ' is an invalid action type');
    }
});

export const SwitchContextProvider = props => {
    const [state, dispatch] = useReducer(reducer, initState);

    return <SwitchContext.Provider value={[state, dispatch]}>{props.children}</SwitchContext.Provider>
};