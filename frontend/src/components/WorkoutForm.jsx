import React, {useRef, useState} from 'react';
import {Form, useActionData} from "react-router-dom";
import useWorkoutsContext from "../../hooks/workoutsHook.js";
import Modal from "./Modal.jsx";
import {data} from "autoprefixer";

function WorkoutForm() {
    // const data = useActionData();
    const formRef = useRef();
    const {dispatch} = useWorkoutsContext();
    // const [errors, setErrors] = useState({});
    const [error, setError] = useState('');
    const [added, setAdded] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const title = formData.get('title');
        const load = formData.get('load');
        const reps = formData.get('reps');
        const response = await fetch('http://localhost:3000/api/workouts/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title, load, reps
            })
        });
        const data = await response.json();
        if (response.ok) {
            dispatch({type: 'ADD_WORKOUT', payload: {workout: data.workout}});
            setError('');
            setAdded(true);
            formRef.current.reset();
        } else {
            setError(data.message);
            setAdded(false);
        }

    }
    return (
        <>
            {/*<Modal message={error} success={added}/>*/}

            <form method='POST' onSubmit={handleSubmit} ref={formRef}>

                <h1 className="text-2xl mb-2 font-bold">Add Workout</h1>
                {error && <p className="text-red-500">{error}</p>}
                {added && <p className="text-green-500">Workout added successfully!</p>}
                <div className="flex flex-col mb-1">
                    <label htmlFor="title" className="text-gray-600">Title</label>
                    <input type="text" id="title" name="title"
                           className="px-2 py-1 text-gray-600 border border-gray-300 rounded my-1 outline-0"
                           placeholder="Title"/>
                    {/*{errors.title && <p className="text-red-500">{errors.title}</p>}*/}
                </div>
                <div className="flex flex-col mb-1">
                    <label htmlFor="load" className="text-gray-600">Load</label>
                    <input type="number" id="load" name="load"
                           className="px-2 py-1 text-gray-600 border border-gray-300 rounded my-1 outline-0"
                           placeholder="Load"/>
                    {/*{errors.load && <p className="text-red-500">{errors.load}</p>}*/}
                </div>
                <div className="flex flex-col mb-1">
                    <label htmlFor="reps" className="text-gray-600">Reps</label>
                    <input type="number" id="reps" name="reps"
                           className="px-2 py-1 text-gray-600 border border-gray-300 rounded my-1 outline-0"
                           placeholder="Reps"/>
                    {/*{errors.reps && <p className="text-red-500">{errors.reps}</p>}*/}
                </div>
                <button className="py-2 bg-primary rounded text-white px-5">Submit</button>
            </form>
        </>
    );
}

export default WorkoutForm;

