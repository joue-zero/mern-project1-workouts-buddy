import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

function FlashMessage({ message, setMessage }) {

    useEffect(() => {
        const timer = setTimeout(() => {
            setMessage('');
        }, 3000);

        return () => clearTimeout(timer);
    }, []);
    function stopTimer() {
        setMessage('');
    }

    if (!message) {
        return null;
    }

    return createPortal(
        <div className='bg-primary text-white px-5 py-2 absolute top-5 left-1/2 -translate-x-1/2'>
            {message}
            <span
                className="absolute w-6 h-6 rounded-full bg-pink-700 cursor-pointer -top-2 -right-2 leading-3 text-center p-2"
                onClick={stopTimer}>X</span>
        </div>,
        document.body
    );
}

export default FlashMessage;