import React from 'react'

const TableFourChairs = ({name, id, reservedChairs, hover, onClick}) => {

    var style;
    if(hover){
        style = "cursor-pointer hover:scale-110";
    }

    const defaultChairsColor = "bg-[#58575776]";
    const reservedChairsColor = "bg-[#7F2A4490]";

    return (
        <div id={id} className=" m-10 w-[250px] h-[220px]">
            <div className="h-full flex flex-col justify-between">
                <div className="flex justify-around">
                    <div className={`relative w-[74px] h-[74px] rounded-full ${reservedChairs === 4 ? reservedChairsColor : defaultChairsColor}`}></div>
                    <div className={`relative w-[74px] h-[74px] rounded-full ${reservedChairs === 3 || reservedChairs === 4 ? reservedChairsColor : defaultChairsColor}`}></div>
                </div>
                <div className="flex justify-around">
                    <div className={`relative w-[74px] h-[74px] rounded-full ${reservedChairs === 3 || reservedChairs === 4 ? reservedChairsColor : defaultChairsColor}`}></div>
                    <div className={`relative w-[74px] h-[74px] rounded-full ${reservedChairs === 3 || reservedChairs === 4 ? reservedChairsColor : defaultChairsColor}`}></div>
                </div>
            </div>
            <div className={`${style} bg-[#C0C0C030] w-[240px] h-[140px] border-solid rounded-xl relative top-[-185px] backdrop-blur border-4 border-[#343333]`} onClick={onClick}>
                <div className="w-full h-full flex justify-center items-center">
                    <span className="text-xl font-title font-bold text-color-secondary text-center">{name}</span>
                </div>
            </div>
        </div>
    )
}
export default TableFourChairs
