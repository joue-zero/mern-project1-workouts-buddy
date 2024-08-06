import {useState} from 'react'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import HomePage, {loader as getAllWorkouts, action as addWorkout} from "./pages/Home.jsx";
import Navbar from "./components/Navbar.jsx";
import RootLayout from "./pages/RootLayout.jsx";
import WorkoutForm from "./components/WorkoutForm.jsx";
import WorkoutContext, {WorkoutProvider} from "../context/WorkoutContext.jsx";

const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout/>,
        children: [
            {
                index: true,
                element: <HomePage/>,
                // loader: getAllWorkouts,
                // action: addWorkout,
            },
            {
                path: 'workouts',
                element: <WorkoutForm/>,
                action: addWorkout
            }
        ]
    }
])

function App() {
    return (
        <WorkoutProvider>
            <RouterProvider router={router}>
            </RouterProvider>
        </WorkoutProvider>
    )
}

export default App
