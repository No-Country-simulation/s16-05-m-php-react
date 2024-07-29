import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import useProductStore from "@/stores/useProductStore";
import CardProduct from "@/components/Cards/CardProduct";
import Button1 from "@/components/ui/button1";
import NewProduct from "@/components/modal/newProduct";
import EditProduct from "@/components/modal/editProduct";
import { deleteProduct } from "@/axios/fetch";

const Products = () => {
    const {nameCategory, dataCategory, product, error, loading, fetchProduct } = useProductStore();

    const {categoryId} = useParams();

    useEffect(() => {
        fetchProduct(categoryId);
    }, [fetchProduct]);

    const [isModalOpenNewProduct, setIsModalOpenNewProduct] = useState(false);
    const [isModalOpenEditProduct, setIsModalOpenEditProduct] = useState(false);
    const [name, setName] = useState(null);
    const [description, setDescription] = useState(null);
    const [image, setImage] = useState(null);
    const [id, setId] = useState(null);
    const [price, setPrice] = useState(null);
    const [isAvailable, setIsAvailable] = useState(null);

    const openModalNewProduct = () => setIsModalOpenNewProduct(true);
    const closeModalNewProduct = () => setIsModalOpenNewProduct(false);
    const openModalEditProduct = () => setIsModalOpenEditProduct(true);
    const closeModalEditProduct = () => setIsModalOpenEditProduct(false);

    if (loading) {
        return (
            <div className="flex flex-wrap w-full h-[75.5vh] justify-center items-center bg-color-bg ">
                <div role="status">
                    <svg
                        aria-hidden="true"
                        className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-red-600"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="currentColor"
                        />
                        <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentFill"
                        />
                    </svg>
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center w-full bg-color-bg h-[10vh]">
                {error}
            </div>
        );
    }

    if (!product) {
        return (
            <div className="flex justify-center w-full h-[75.5vh] bg-color-bg">
                No se encontraron datos de las categorías.
            </div>
        );
    }

    const deleteProducts = async (id) => {
        const confirmDelete = confirm("¿Deseas eliminar este producto?");
        if (!confirmDelete) return;
        try {
            const response = await deleteProduct(id);
            if (response.status === 204) {
                window.location.reload();
            }
        } catch (error) {
            console.log(error);
            return;
        }
    };

    const dataProduct = (name, description, image, id, price, available) => {
        setName(name);
        setDescription(description);
        setImage(image);
        setId(id);
        setPrice(price);
        setIsAvailable(available);
        openModalEditProduct();
    };

    const productResponse = product["hydra:member"].map((product) => {
        return (
        <CardProduct 
            name={product.name} 
            description={product.description} 
            image={product.image} 
            key={product.id}
            price={product.price}
            disabled={product.is_available}
            edit
            onClickDelete={()=>deleteProducts(product.id)}
            onClickEdit={()=>dataProduct(product.name, product.description, product.image, product.id, product.price, product.is_available)}
        />);
});
    return (
        <div className="flex flex-col text-center items-center bg-color-bg text-color-text w-full min-h-[80vh]">
            <h1 className="text-4xl font-bold my-10 text-color-secondary ">Productos de la Categoría {nameCategory}</h1>
            <div className="flex justify-between w-1/4">
                <Button1 
                    type="button"
                    text="Volver a Categorías"
                    onClick={() => window.location.href = "/menu"}
                />
                <Button1
                    type="button"
                    text="Agregar Nuevo Producto"
                    onClick={openModalNewProduct}
                />
            </div>
            <div className="flex flex-wrap items-center justify-center">
                {productResponse}
            </div>
            <NewProduct isOpen={isModalOpenNewProduct} onClose={closeModalNewProduct} categories={dataCategory}/>
            <EditProduct isOpen={isModalOpenEditProduct} onClose={closeModalEditProduct} name={name} description={description} image={image} price={price} id={id} categoryId={categoryId} available={isAvailable} categories={dataCategory}/>
        </div>
    );
};

export default Products;