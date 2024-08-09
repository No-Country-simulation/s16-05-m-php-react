import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import CardCategory from '../Cards/CardCategory';
import CardProduct from '../Cards/CardProduct';

const CarouselComponent = ({data, solicitud}) => {
    
    const dataInfo = () => {
        return data['hydra:member'].map((item) => {
            if(solicitud === 'category'){
                return (
                    <div className='scale-80 w-full flex justify-center items-center' key={item.id}>
                        <CardCategory
                            name={item.name}
                            description={item.phrase}
                            image={item.image}
                            id={item.id}
                            destino={"productsClient"}
                        />
                    </div>
                );
            }else if(solicitud === 'product'){
                return(
                    <div className='scale-[0.79] w-full flex justify-center items-center' key={item.id}>
                        <CardProduct
                            name={item.name} 
                            description={item.description} 
                            image={item.image} id={item.id} 
                            price={item.price} 
                            disabled={item.is_available}
                        />
                    </div>
                )
            }
        });
    };

    return (
        <div className='w-full max-w-xl'>
            <Carousel
                showThumbs={false}
                showStatus={false}
                showIndicators={true}
                centerMode={true}
                centerSlidePercentage={145}
                thumbWidth={100}
                width="100%"
                infiniteLoop
                autoPlay
                interval={3000}
            >
                {dataInfo()}
            </Carousel>
        </div>
    );
};

export default CarouselComponent;