import React from 'react';

const Button1 = ({onClick, text, type, variant}) => {
    var style;
    if(!variant){
        style = "bg-color-primary text-color-secondary";
    }else if(variant === "confirm"){
        style = "bg-color-secondary text-color-primary";
        //style = "bg-emerald-500 text-white"
    }

    return (
        <div>
            <button type={type} className={`font-title font-bold rounded-md px-4 py-2 hover:scale-110 transition ease-in-out duration-300 ${style}`} onClick={onClick}>{text}</button>
        </div>
    );
};

export default Button1;