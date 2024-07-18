import React from 'react';

const TableTwoChairs = ({name, id,  reservedChairs}) => {

    const defaultChairsColor = "bg-[#58575776]";
    const reservedChairsColor = "bg-[#7F2A4490]";

    return (
        <div id={id} className=" m-10 w-[180px] h-[180px]">
            <div className="h-full flex flex-col justify-around">
                <div className="flex justify-start">
                    <div className={`relative w-[74px] h-[74px] rounded-full ${reservedChairs === 1 || reservedChairs === 2 ? reservedChairsColor : defaultChairsColor}`}></div>
                </div>
                <div className="flex justify-end">
                    <div className={`relative w-[74px] h-[74px] rounded-full ${reservedChairs === 2 ? reservedChairsColor : defaultChairsColor}`}></div>
                </div>
            </div>
            <div className="bg-[#C0C0C030] w-[130px] h-[130px] rotate-45 border-solid rounded-xl cursor-pointer relative top-[-155px] left-[25px] backdrop-blur border-4 border-[#343333] hover:scale-110">
                <div className="w-full h-full flex justify-center items-center -rotate-45">
                    <span className="text-xl font-title text-color-secondary font-bold">{name}</span>
                </div>
            </div>
        </div>
    )
}
export default TableTwoChairs