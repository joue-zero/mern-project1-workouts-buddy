import WorkoutContext from "../context/WorkoutContext.jsx";
import {useContext} from "react";


export default function useWorkoutsContext() {
     return useContext(WorkoutContext);
}