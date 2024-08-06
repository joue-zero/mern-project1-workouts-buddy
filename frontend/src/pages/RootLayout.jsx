import {Outlet} from "react-router-dom";
import Navbar from "../components/Navbar.jsx";

export default function RootLayout(){
    return (
        <>
            <Navbar/>
            <div className="container mx-auto my-0 py-5">
                <Outlet/>
            </div>
        </>
    )
}