import React from "react";
import Button1 from "@/components/ui/button1";

const CardCategory = ({name, description, image, edit, deleteOnClick,editOnClick, notHover, notOnClick, id}) => {
    var heightDiv = "h-[250px]";
    var buttons = "";
    var noHover = false;
    var onclick = ()=> products(name);
    if(edit){
        buttons = (<div className="flex w-full justify-around mt-3">
            <Button1
                type="button"
                text="Eliminar"
                onClick={deleteOnClick}
            />
            <Button1
                type="button"
                text="Editar"
                variant={"confirm"}
                onClick={editOnClick}
            />
        </div>);
        heightDiv = "h-[310px]";
    }
    if(notHover){
        noHover = true;
    }
    if(notOnClick){
        onclick = () => {};
    }
    const products = (category) => {
        window.location.pathname = `/products/${category}`;
    };    
    return (
        <div className={`bg-[#3C3A3A] w-[250px] ${heightDiv} rounded-2xl m-10`} id={id}>
            <div className="w-[250px] h-[250px] rounded-2xl relative bg-cover bg-center bg-no-repeat"
            style={{backgroundImage: `url(${image})`}}
            >
                <div className="absolute inset-0 rounded-2xl bg-black opacity-50"></div>
                <div className="relative flex flex-col justify-around items-center h-full">
                    <h1 className="text-3xl font-bold text-white">{name}</h1>
                    <p className="text-lg font-semibold text-white">{description}</p>
                    <Button1
                        type="button"
                        text="Ver Productos"
                        onClick={onclick}
                        noHover={noHover}
                    />
                </div>
                {buttons}
            </div>
        </div>
    );
    
};

export default CardCategory;