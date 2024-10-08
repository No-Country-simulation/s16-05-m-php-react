import React from "react";
import Button1 from "@/components/ui/button1";

const CardProduct = ({name, description, image, price, disabled, edit, onClickDelete, onClickEdit}) => {
    const priceFinal = price.toLocaleString();
    var disabledStyle = null;
    var noDisponible = null;
    var editProduct = null;
    var height = "h-[390px]";
    if(disabled === false) {
        if(edit){
            disabledStyle = (<div className="absolute inset-0 rounded-t-2xl bg-black opacity-70 flex items-center justify-center"></div>);
        }else{
            disabledStyle = (<div className="absolute inset-0 rounded-2xl bg-black opacity-70 flex items-center justify-center"></div>);
        }
        
        noDisponible = (<div className="absolute inset-0 flex items-center justify-center"><span className=" text-3xl font-bold text-red-500 -rotate-45">No Disponible</span></div>);
    }
    if(edit){
        editProduct = (<div className="flex w-full justify-around mt-3">
                    <Button1
                        type="button"
                        text="Eliminar"
                        onClick={onClickDelete}
                    />
                    <Button1
                        type="button"
                        text="Editar"
                        variant={"confirm"}
                        onClick={onClickEdit}
                    />
            </div>
        );
        height = "h-[450px]";
    }
    return (
        <div className={`w-[250px] ${height} rounded-2xl bg-[#3C3A3A] m-10`}>
            <div className="w-[250px] h-[390px] flex flex-col justify-around items-center relative">
                {disabledStyle}
                {noDisponible}
                <div className="w-[230px]">
                    <img src={`${image}`} alt="Imagen de un producto" className="w-[230px] bg-color-bg h-[170px] rounded-2xl object-cover object-center"/>
                </div>
                <h1 className="text-3xl px-3 font-bold text-color-secondary">{name}</h1>
                <p className="text-base px-3 font-semibold text-white">{description}</p>
                <p className="text-lg px-3 font-semibold text-color-secondary">$ {priceFinal}</p>
            </div>
            {editProduct}
        </div>
    );
    
};

export default CardProduct;