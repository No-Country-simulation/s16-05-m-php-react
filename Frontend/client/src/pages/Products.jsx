import React from "react";
import product from "@/assets/product.png";
import CardProduct from "@/components/Cards/CardProduct";
import Button1 from "@/components/ui/button1";

const Products = () => {
    return (
        <div className="flex flex-col text-center items-center bg-color-bg text-color-text w-full min-h-[80vh]">
            <h1 className="text-4xl font-bold my-10 text-color-secondary ">Productos de la Categoría Hamburguesas</h1>
            <Button1
                type="button"
                text="Agregar Nuevo Producto"
            />
            <div className="flex flex-wrap items-center justify-center">
                <CardProduct image={product} name="Cheese Burger" description={"Hamburguesa clásica con queso chedar, lechuga, tomate y 2 porciones de carne, acompañado de papas fritas"} price={12000} />
                <CardProduct image={product} name="Cheese Burger" description={"Hamburguesa clásica con queso chedar, lechuga, tomate y 2 porciones de carne, acompañado de papas fritas"} price={12000} disabled />
                <CardProduct image={product} name="Cheese Burger" description={"Hamburguesa clásica con queso chedar, lechuga, tomate y 2 porciones de carne, acompañado de papas fritas"} price={12000} />
                <CardProduct image={product} name="Cheese Burger" description={"Hamburguesa clásica con queso chedar, lechuga, tomate y 2 porciones de carne, acompañado de papas fritas"} price={12000} />
                <CardProduct image={product} name="Cheese Burger" description={"Hamburguesa clásica con queso chedar, lechuga, tomate y 2 porciones de carne, acompañado de papas fritas"} price={12000} />
                <CardProduct image={product} name="Cheese Burger" description={"Hamburguesa clásica con queso chedar, lechuga, tomate y 2 porciones de carne, acompañado de papas fritas"} price={12000} />
                <CardProduct image={product} name="Cheese Burger" description={"Hamburguesa clásica con queso chedar, lechuga, tomate y 2 porciones de carne, acompañado de papas fritas"} price={12000} />
                <CardProduct image={product} name="Cheese Burger" description={"Hamburguesa clásica con queso chedar, lechuga, tomate y 2 porciones de carne, acompañado de papas fritas"} price={12000} />
                <CardProduct image={product} name="Cheese Burger" description={"Hamburguesa clásica con queso chedar, lechuga, tomate y 2 porciones de carne, acompañado de papas fritas"} price={12000} />
                <CardProduct image={product} name="Cheese Burger" description={"Hamburguesa clásica con queso chedar, lechuga, tomate y 2 porciones de carne, acompañado de papas fritas"} price={12000} />
                <CardProduct image={product} name="Cheese Burger" description={"Hamburguesa clásica con queso chedar, lechuga, tomate y 2 porciones de carne, acompañado de papas fritas"} price={12000} />
                <CardProduct image={product} name="Cheese Burger" description={"Hamburguesa clásica con queso chedar, lechuga, tomate y 2 porciones de carne, acompañado de papas fritas"} price={12000} />
                <CardProduct image={product} name="Cheese Burger" description={"Hamburguesa clásica con queso chedar, lechuga, tomate y 2 porciones de carne, acompañado de papas fritas"} price={12000} />
                <CardProduct image={product} name="Cheese Burger" description={"Hamburguesa clásica con queso chedar, lechuga, tomate y 2 porciones de carne, acompañado de papas fritas"} price={12000} />
            </div>
        </div>
    );
};

export default Products;