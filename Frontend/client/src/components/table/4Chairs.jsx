import React from 'react'

const TableFourChairs = () => {
    return (
        <div className=" mt-10 w-[250px] h-[220px]">
            <div className="h-full flex flex-col justify-between">
                <div className="flex justify-around">
                    <div className="relative w-[74px] h-[74px] rounded-full bg-[#58575776]"></div>
                    <div className="relative w-[74px] h-[74px] rounded-full bg-[#7F2A4490]"></div>
                </div>
                <div className="flex justify-around">
                    <div className="relative w-[74px] h-[74px] rounded-full bg-[#7F2A4490]"></div>
                    <div className="relative w-[74px] h-[74px] rounded-full bg-[#7F2A4490]"></div>
                </div>
            </div>
            <div className="bg-[#C0C0C030] w-[240px] h-[140px] border-solid rounded-xl cursor-pointer relative top-[-185px] backdrop-blur border-4 border-[#343333] hover:scale-110">
                <div className="w-full h-full flex justify-center items-center">
                    <span className="text-xl font-title font-bold">MESA 1</span>
                </div>
            </div>
        </div>
    )
}
export default TableFourChairs
