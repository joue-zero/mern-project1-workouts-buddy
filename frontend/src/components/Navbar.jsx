import {NavLink} from "react-router-dom";

export default function Navbar(){
    return (
        <header className="bg-white">
            <div className="container mx-auto my-0 py-2.5 px-5 flex items-center justify-between">
                <NavLink to='/' className="text-[#333] no-underline text-2xl">
                    <h1>Workout Buddy</h1>
                </NavLink>
            </div>
        </header>
    )
}