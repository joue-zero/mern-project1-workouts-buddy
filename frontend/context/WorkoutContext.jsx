import {createContext, useReducer, useRef} from "react";

const workoutContext = createContext({
    workouts: []
});

export default workoutContext;
function workoutDispatch(state, action){
    switch(action.type){
        case 'SET_WORKOUTS':
            return {
                ...state,
                workouts: action.payload.workouts
            };
        case 'ADD_WORKOUT':
            return {
                ...state,
                workouts: [action.payload.workout, ...state.workouts]
            };
        case 'DELETE_WORKOUT':
            return {
                ...state,
                workouts: state.workouts.filter((ele) => ele._id !== action.payload.id)
            };
        default:
            return state;
    }
}
export function WorkoutProvider({children}){
    const [data, dispatch] = useReducer(workoutDispatch, {
        workouts: []
    });
    return (
        <workoutContext.Provider value={{data, dispatch}}>
            {children}
        </workoutContext.Provider>
    )
}