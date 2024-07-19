import React from 'react'

const TableSixChairs = ({name, id, reservedChairs, hover, onClick}) => {

    var style;
    if(hover){
        style = "cursor-pointer hover:scale-110";
    }

    const defaultChairsColor = "bg-[#58575776]";
    const reservedChairsColor = "bg-[#7F2A4490]";

    return (
        <div id={id} className=" m-10 w-[220px] h-[280px]">
            <div className="h-full flex justify-between">
                <div className="flex flex-col justify-around h-[280px]">
                    <div className={`relative w-[70px] h-[70px] rounded-full ${reservedChairs === 6 ? reservedChairsColor : defaultChairsColor}`}></div>
                    <div className={`relative w-[70px] h-[70px] rounded-full ${reservedChairs === 5 || reservedChairs === 6 ? reservedChairsColor : defaultChairsColor}`}></div>
                    <div className={`relative w-[70px] h-[70px] rounded-full ${reservedChairs === 5 || reservedChairs === 6 ? reservedChairsColor : defaultChairsColor}`}></div>
                </div>
                <div className="flex flex-col justify-around h-[280px]">
                    <div className={`relative w-[70px] h-[70px] rounded-full ${reservedChairs === 5 || reservedChairs === 6 ? reservedChairsColor : defaultChairsColor}`}></div>
                    <div className={`relative w-[70px] h-[70px] rounded-full ${reservedChairs === 5 || reservedChairs === 6 ? reservedChairsColor : defaultChairsColor}`}></div>
                    <div className={`relative w-[70px] h-[70px] rounded-full ${reservedChairs === 5 || reservedChairs === 6 ? reservedChairsColor : defaultChairsColor}`}></div>
                </div>
            </div>
            <div className={`${style} bg-[#C0C0C030] w-[157px] h-[280px] border-solid rounded-xl relative top-[-280px] left-[30px] backdrop-blur border-4 border-[#343333]` } onClick={onClick}>
                <div className="w-full h-full flex justify-center items-center">
                    <span className="text-xl font-title font-bold text-color-secondary text-center">{name}</span>
                </div>
            </div>
        </div>
    )
}
export default TableSixChairs
