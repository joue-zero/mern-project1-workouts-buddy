import React, {useEffect, useRef, useState} from 'react';
import useWorkoutsContext from "../../hooks/workoutsHook.js";
import Modal from "./Modal.jsx";
import {createPortal} from "react-dom";
import FlashMessage from "./FlashMessage.jsx";
import {formatDistanceToNow} from "date-fns";

function WorkoutDetails({title, load, reps, _id, createdAt}) {
    const {dispatch} = useWorkoutsContext();
    const [message, setMessage] = useState('');
    function handleDelete() {
        const proceed = confirm('Are you sure you want to delete this workout?');
        if (proceed) {
            // dispatch({type: 'DELETE_WORKOUT', payload: {id: _id}});
            fetch(`http://localhost:3000/api/workouts/${_id}`, {
                method: 'DELETE'
            }).then((result) => {
                return result.json();
            }).then((data) => {
                dispatch({type: 'DELETE_WORKOUT', payload: {id: _id}});
                setMessage(data.message);
            }).catch((err) => {
                setMessage('Something went wrong!');
            });
        }
    }

    return (
        <>
            {message && <FlashMessage message={message} setMessage={setMessage}/>}
           <div className="p-5 mx-auto my-5 relative shadow-gray-950 bg-white rounded">
                <h4 className="mb-2.5 text-lg text-primary font-bold">{title}</h4>
                <p className="m-0 text-sm text-gray-700">
                    <strong>Load (kg): </strong> {load}
                </p>
                <p className="m-0 text-sm text-gray-700">
                    <strong>Reps (kg): </strong> {reps}
                </p>
                <p className="m-0 text-sm text-gray-700">
                    <strong>Created at: </strong> {formatDistanceToNow(new Date(createdAt), {addSuffix: true})}
                </p>
                <div className='absolute top-5 right-5'>
                    <span className="p-1.5 text-[#333] cursor-pointer">Edit</span>
                    <button className="text-pink-500 py-1 px-2 border border-transparent hover:border-pink-500"
                            onClick={handleDelete}>Delete
                    </button>
                </div>
            </div>
        </>
    );
}

export default WorkoutDetails;