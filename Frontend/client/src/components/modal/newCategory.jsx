import React, { useState } from 'react';
import { createCategory, categoryImage } from '@/axios/fetch';
import Button1 from '../ui/button1';
import backgroundImage from "../../assets/backgroundImage.png";
import CardCategory from "@/components/Cards/CardCategory";

const NewCategory = ({ isOpen, onClose }) => {
    const [category, setCategory] = useState(null);
    const [nameCategory, setNameCategory] = useState('');
    const [phraseCategory, setPhraseCategory] = useState('');
    const [imageCategory, setImageCategory] = useState('');
    const [imagePreview, setImagePreview] = useState('');
    const [error, setError] = useState("");

    if (!isOpen)return null;

    const handleNameChange = (event) => {
        const name = event.target.value;
        const phrase = phraseCategory || 'Eslogan';
        const image = imagePreview;
        setNameCategory(name);
        setCategory(<CardCategory name={name} description={phrase} image={image} notHover={true} notOnClick={true}/>);
    };

    const handlePhraseChange = (event) => {
        const phrase = event.target.value;
        const name = nameCategory || 'Categoría';
        const image = imagePreview;
        setPhraseCategory(phrase);
        setCategory(<CardCategory name={name} description={phrase} image={image} notHover={true} notOnClick={true}/>);
    };

    const handleImageChange = (event) => {
        const image = event.target.files[0];
        const imageUrl = URL.createObjectURL(image);
        setImagePreview(imageUrl);
        const name = nameCategory || 'Categoría';
        const phrase = phraseCategory || 'Eslogan';
        setImageCategory(image);
        setCategory(<CardCategory name={name} description={phrase} image={imageUrl} notHover={true} notOnClick={true}/>);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await createCategory(nameCategory, phraseCategory);
            if (response.status === 201) {
                try {
                    const responseImage = await categoryImage(imageCategory, response.data.id);
                    if (responseImage.status === 201) {
                        window.location.reload();
                    }
                } catch (error) {
                    setError(error.response.data.message);
                }
            }
        } catch (error) {
            setError(error.response.data.message);
        }
    };

    const close = () => {
        setCategory(null);
        setNameCategory('');
        setPhraseCategory('');
        setImageCategory('');
        setImagePreview('');
        setError("");
        onClose();
    };

    return (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex justify-center items-center z-10" onClick={close}>
            <div className="bg-color-bg p-5 rounded-md relative border-2 border-color-secondary w-1/2 h-3/4 min-h-[580px]" style={{backgroundImage: `url(${backgroundImage})`, backgroundSize: "cover", backgroundPosition: "center"}} onClick={e => e.stopPropagation()}>
                <h1 className="text-3xl font-title font-bold text-color-secondary text-center">Nueva Categoría</h1>
                <form className='flex flex-col h-full justify-around py-10 items-center' onSubmit={handleSubmit}>
                    <input id='name'type="text" placeholder="Nombre de la categoría" className='min-w-56 w-1/2 px-3 py-2 rounded-md font-semibold text-color-bg' value={nameCategory} onChange={handleNameChange} required />
                    {error && <div className="text-red-500 font-semibold">{error}</div>}
                    <input type="text" placeholder='Eslogan' className='min-w-56 w-1/2 px-3 py-2 rounded-md font-semibold text-color-bg' value={phraseCategory} onChange={handlePhraseChange} required/>
                    <input type="file" className="w-1/2 font-semibold"  accept="image/*" onChange={handleImageChange} required/>
                    <h1 className='font-bold text-color-secondary text-xl'>Previsualización</h1>
                    <div className='min-w-56 h-3/5 w-1/2 bg-color-bg rounded-md flex justify-center items-center'>
                        {category}
                    </div>
                    <div className='flex justify-around w-1/2 min-w-56'>
                        <Button1 type={"button"} text={"Cancelar"} onClick={close} />
                        <Button1 type={"submit"} variant={"confirm"} text={"Aceptar"} />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default NewCategory;
