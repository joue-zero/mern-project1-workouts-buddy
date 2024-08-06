import React, {forwardRef, useEffect, useImperativeHandle, useRef} from 'react';
import {createPortal} from "react-dom";

const Modal =({message, success}) => {
    const dialog = useRef();
    useEffect(() => {
        if(message){
            dialog.current.showModal();
        }else {
            dialog.current.close();
        }
    });
    return createPortal( //w-[400px] bg-white h-52 flex items-center flex-col p-5
        <dialog ref={dialog} className="result-modal w-[400px] bg-white min-h-fit  items-center flex-col p-5" >
            <h1 className="text-2xl font-bold mb-2">
                {success && <p className="text-primary">Success</p>}
                {!success && <p className="text-red-500">Error</p>}
            </h1>
            <p className="text-gray-600 my-5">{message}</p>
            <form method='dialog'>
                <button className="bg-primary text-white px-5 py-2 rounded mt-2">Close</button>
            </form>
        </dialog>,
        document.getElementById('modal'));
};

export default Modal;