import React, { useState, useEffect } from 'react';
import { productImage, updateProduct } from '@/axios/fetch';
import Button1 from '../ui/button1';
import backgroundImage from "../../assets/backgroundImage.png";
import CardProduct from "@/components/Cards/CardProduct";

const EditProduct = ({ isOpen, onClose, name, description, image, id }) => {
    const [product, setProduct] = useState(null);
    const [nameProduct, setNameProduct] = useState('');
    const [descriptionProduct, setDescriptionProduct] = useState('');
    const [imageProduct, setImageProduct] = useState('');
    const [imagePreview, setImagePreview] = useState('');
    const [error, setError] = useState("");

    useEffect(() => {
        if (id) {
            setNameProduct(name);
            setDescriptionProduct(description);
            setImagePreview(image);
            setProduct(<CardProduct name={name} description={description} image={image} notHover={true} notOnClick={true}/>);
        }
    }, [id, name, description, image]);
    if (!isOpen)return null;

    const handleNameChange = (event) => {
        const name = event.target.value;
        const description = descriptionProduct || 'Eslogan';
        const image = imagePreview || imageProduct;
        setNameProduct(name);
        setProduct(<CardProduct name={name} description={description} image={image} notHover={true} notOnClick={true}/>);
    };

    const handleDescriptionChange = (event) => {
        const description = event.target.value;
        const name = nameProduct || 'Categoría';
        const image = imagePreview || imageProduct;
        setDescriptionProduct(description);
        setProduct(<CardProduct name={name} description={description} image={image} notHover={true} notOnClick={true}/>);
    };

    const handleImageChange = (event) => {
        const image = event.target.files[0];
        const imageUrl = URL.createObjectURL(image);
        setImagePreview(imageUrl);
        const name = nameProduct || 'Categoría';
        const description = descriptionProduct || 'Eslogan';
        setImageProduct(image);
        setProduct(<CardProduct name={name} description={description} image={imageUrl} notHover={true} notOnClick={true}/>);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(name === nameProduct && description === descriptionProduct && imageProduct === "") {
            onClose();
            return;
        }else{
            if(imageProduct !== "") {
                try {
                    const response = await productImage(imageProduct, id);
                    if(response.status === 201) {
                        try {
                            const responseUpdate = await updateProduct(id, nameProduct, descriptionProduct);
                            if(responseUpdate.status === 200) {
                                window.location.reload();
                            }
                        } catch (error) {
                            setError(error.responseUpdate.data.message);
                        }
                    }
                } catch (error) {
                    setError(error.response.data.message);
                }
            }else{
                try {
                    const responseUpdate = await updateProduct(id, nameProduct, descriptionProduct);
                    if(responseUpdate.status === 200) {
                        window.location.reload();
                    }
                } catch (error) {
                    setError(error.response.data.message);
                }
            }
        }
    };

    return (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex justify-center items-center z-10" onClick={onClose}>
            <div className="bg-color-bg p-5 rounded-md relative border-2 border-color-secondary w-1/2 h-3/4 min-h-[580px]" style={{backgroundImage: `url(${backgroundImage})`, backgroundSize: "cover", backgroundPosition: "center"}} onClick={e => e.stopPropagation()}>
                <h1 className="text-3xl font-title font-bold text-color-secondary text-center">Editar la Categoría de {name}</h1>
                <form className='flex flex-col h-full justify-around py-10 items-center' onSubmit={handleSubmit}>
                    <input id='name'type="text" placeholder="Nombre de la categoría" className='min-w-56 w-1/2 px-3 py-2 rounded-md font-semibold text-color-bg' value={nameProduct} onChange={handleNameChange} required />
                    {error && <div className="text-red-500 font-semibold">{error}</div>}
                    <input type="text" placeholder='Eslogan' className='min-w-56 w-1/2 px-3 py-2 rounded-md font-semibold text-color-bg' value={descriptionProduct} onChange={handleDescriptionChange} required/>
                    <input type="file" className="w-1/2 font-semibold"  accept="image/*" onChange={handleImageChange}/>
                    <h1 className='font-bold text-color-secondary text-xl'>Previsualización</h1>
                    <div className='min-w-56 h-3/5 w-1/2 bg-color-bg rounded-md flex justify-center items-center'>
                        {product}
                    </div>
                    <div className='flex justify-around w-1/2 min-w-56'>
                        <Button1 type={"button"} text={"Cancelar"} onClick={onClose} />
                        <Button1 type={"submit"} variant={"confirm"} text={"Aceptar"} />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditProduct;
