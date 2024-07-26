import React, { useState, useEffect } from 'react';
import { productImage, updateProduct } from '@/axios/fetch';
import Button1 from '../ui/button1';
import backgroundImage from "../../assets/backgroundImage.png";
import CardProduct from "@/components/Cards/CardProduct";

const EditProduct = ({ isOpen, onClose, name, description, image, id, price, categories, categoryId, available }) => {
    const [product, setProduct] = useState(null);
    const [nameProduct, setNameProduct] = useState('');
    const [descriptionProduct, setDescriptionProduct] = useState('');
    const [imageProduct, setImageProduct] = useState('');
    const [imagePreview, setImagePreview] = useState('');
    const [priceProduct , setPriceProduct] = useState(0);
    const [categoryProduct, setCategoryProduct] = useState('');
    const [categoryTextProduct, setCategoryTextProduct] = useState('');
    const [isAvailableProduct, setIsAvailableProduct] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        if (id) {
            setNameProduct(name);
            setDescriptionProduct(description);
            setImagePreview(image);
            setPriceProduct(price);
            setCategoryProduct(categoryId);
            setIsAvailableProduct(available);
            setProduct(<CardProduct price={price} name={name} description={description} image={image} />);
        }
    }, [id, name, description, image, price, categoryId, available]);
    if (!isOpen)return null;

    const handleNameChange = (event) => {
        const name = event.target.value;
        const description = descriptionProduct || 'Descripción';
        const image = imagePreview;
        const price = priceProduct || 0;
        const available = isAvailableProduct;
        setNameProduct(name);
        setProduct(<CardProduct price={price} name={name} description={description} image={image} disabled={available} />);
    };

    const handleDescriptionChange = (event) => {
        const description = event.target.value;
        const name = nameProduct || 'Producto';
        const image = imagePreview;
        const price = priceProduct || 0;
        const available = isAvailableProduct;
        setDescriptionProduct(description);
        setProduct(<CardProduct price={price} name={name} description={description} image={image} disabled={available} />);
    };

    const handleImageChange = (event) => {
        const image = event.target.files[0];
        const imageUrl = URL.createObjectURL(image);
        setImagePreview(imageUrl);
        const name = nameProduct || 'Producto';
        const description = descriptionProduct || 'Descripción';
        const price = priceProduct || 0;
        const available = isAvailableProduct;
        setImageProduct(image);
        setProduct(<CardProduct price={price} name={name} description={description} image={imageUrl} disabled={available} />);
    };

    const handlePriceChange = (event) => {
        const price = Number(event.target.value);
        const name = nameProduct || 'Producto';
        const description = descriptionProduct || 'Descripción';
        const image = imagePreview;
        const available = isAvailableProduct;
        setPriceProduct(price);
        setProduct(<CardProduct price={price} name={name} description={description} image={image} disabled={available} />);
    };

    const handleCategoryChange = (event) => {
        const category = Number(event.target.value);
        setCategoryProduct(category);
        for (let i = 0; i < categories.length; i++) {
            if (categories[i]['id'] === category) {
                setCategoryTextProduct("Categoría: " + categories[i].name);
                break;
            }
        }
    };

    const handleIsAvailableChange = (event) => {
        const available = Boolean(event.target.value);
        const name = nameProduct || 'Producto';
        const description = descriptionProduct || 'Descripción';
        const price = priceProduct || 0;
        const image = imagePreview;
        setIsAvailableProduct(available);
        setProduct(<CardProduct price={price} name={name} description={description} image={image} disabled={available} />);
    };

    const options = categories.map((category) => (
        <option key={category.id} value={category.id}>
            {category.name}
        </option>
    ));

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
                <h1 className="text-3xl font-title font-bold text-color-secondary text-center">Nuevo Producto</h1>
                <form className='flex flex-col h-full justify-around pb-5 items-center' onSubmit={handleSubmit}>
                    <input id='name'type="text" placeholder="Nombre del producto" className='min-w-56 w-1/2 px-3 py-2 rounded-md font-semibold text-color-bg' value={nameProduct} onChange={handleNameChange} required />
                    {error && <div className="text-red-500 font-semibold">{error}</div>}
                    <input type="text" placeholder='Descripción' className='min-w-56 w-1/2 px-3 py-2 rounded-md font-semibold text-color-bg' value={descriptionProduct} onChange={handleDescriptionChange} required/>
                    <div className='flex justify-between w-1/2 rounded-md font-semibold'>
                        <input type="number" min={1} placeholder='Precio' className=' w-1/3 px-3 py-2 rounded-md font-semibold text-color-bg' value={priceProduct} onChange={handlePriceChange} required/>
                        <select className='w-1/2 px-3 py-2 rounded-md font-semibold text-color-bg' value={categoryProduct} onChange={handleCategoryChange}>
                            <option value="" disabled>Categoría</option>
                            {options}
                        </select>
                    </div>
                    <div className='w-1/2 flex'>
                        <input type="file" className="w-1/3 font-semibold text-center"  accept="image/*" onChange={handleImageChange} required/>
                        <label htmlFor="disponible" className='mx-3 font-semibold'><input type="radio" id='disponible' className='mx-2' name='disponibilidad' defaultChecked value={true} onClick={handleIsAvailableChange} />Disponible</label>
                        <label htmlFor="noDisponible" className='mx-3 font-semibold'><input type="radio" id='noDisponible' className='mx-2' name='disponibilidad' value={""} onClick={handleIsAvailableChange} /> No Disponible</label>
                    </div>
                    <h1 className='font-bold text-color-secondary text-xl'>Previsualización</h1>
                    <div className='min-w-56 h-3/5 w-1/2 bg-color-bg rounded-md flex justify-center items-center'>
                        <div className='transform scale-75'>
                        <div className='font-bold text-color-secondary text-xl mt-5'>{categoryTextProduct}</div>
                            {product}
                        </div>
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
