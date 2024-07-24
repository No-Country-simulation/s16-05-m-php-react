import React from "react";
import CardCategory from "@/components/Cards/CardCategory";
import Hamburguesa from "@/assets/category.png";
import Button1 from "@/components/ui/button1";

const Menu = () => {
    return (
        <div className="flex flex-col text-center items-center bg-color-bg text-color-text w-full min-h-[80vh]">
            <h1 className="text-4xl font-bold my-10 text-color-secondary ">Categorías</h1>
            <Button1
                type="button"
                text="Agregar Nueva Categoría"
            />
            <div className="flex flex-wrap items-center justify-center">
                <CardCategory name={"Hamburguesas"} description={"Para verdaderos fanáticos"} image={Hamburguesa} />
            </div>
        </div>
    );
};

export default Menu;