import {json, redirect, useActionData, useLoaderData} from "react-router-dom";
import React, {useEffect} from "react";
import WorkoutDetails from "../components/WorkoutDetails.jsx";
import WorkoutForm from "../components/WorkoutForm.jsx";
import useWorkoutsContext from "../../hooks/workoutsHook.js";
import Modal from "../components/Modal.jsx";

export default function HomePage(){
    // const workouts = useLoaderData();
    const {data, dispatch} = useWorkoutsContext();
    useEffect(() => {
        async function fetchData(){
            const response = await fetch('http://localhost:3000/api/workouts/');
            const data = await response.json();
            dispatch({type: 'SET_WORKOUTS', payload: {workouts: data}});
        }
        fetchData();
    }, []);
    return (
        <div className="grid md:grid-cols-3 lg:gap-28 md:gap-10 p-5">
            {/*<Modal message={"Item Added Successfully!"} success={false}/>*/}
            <div className="md:col-start-1 md:col-end-3 relative" id="workouts-cont">
                {!data || data.workouts.length === 0 && <h2 className="text-2xl text-center">No workouts available!</h2>}
                {data && data.workouts.map((ele) => (
                    <WorkoutDetails key={ele._id} {...ele}/>
                ))}
            </div>
            <div className="">
                <WorkoutForm/>
            </div>

        </div>
    );
}
export async function loader(){
    const response = await fetch('http://localhost:3000/api/workouts/');
    if(!response.ok){
        return json({error: "can't fetch the data!"}, {status: 500});
    }
    return response;
}

export async function action({params, request}){
    console.log(request);
    const formData = await request.formData();
    const title = formData.get('title');
    const load = formData.get('load');
    const reps = formData.get('reps');
    const errors = {};
    if(!title){
        errors['title'] = 'Title is required!';
    }
    if(!load){
        errors['load'] = 'Load is required!';
    }
    if(!reps){
        errors['reps'] = 'Reps is required!';
    }
    if(Object.keys(errors).length > 0){
        return json({data: errors}, {status: 400});
    }
    const response = await fetch('http://localhost:3000/api/workouts/',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title, load, reps
        })
    });
    if(!response.ok){
        return json({data: "can't fetch the data!"}, {status: 500});
    }
    return json({data: "Workout added successfully!"}, {status: 200});
}