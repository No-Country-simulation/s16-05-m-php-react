import React from 'react'

const TableSixChairs = () => {
    return (
        <div className=" mt-10 w-[220px] h-[280px]">
            <div className="h-full flex justify-between">
                <div className="flex flex-col justify-around h-[280px]">
                    <div className="relative w-[70px] h-[70px] rounded-full bg-[#58575776]"></div>
                    <div className="relative w-[70px] h-[70px] rounded-full bg-[#7F2A4490]"></div>
                    <div className="relative w-[70px] h-[70px] rounded-full bg-[#7F2A4490]"></div>
                </div>
                <div className="flex flex-col justify-around h-[280px]">
                    <div className="relative w-[70px] h-[70px] rounded-full bg-[#7F2A4490]"></div>
                    <div className="relative w-[70px] h-[70px] rounded-full bg-[#7F2A4490]"></div>
                    <div className="relative w-[70px] h-[70px] rounded-full bg-[#7F2A4490]"></div>
                </div>
            </div>
            <div className="bg-[#C0C0C030] w-[157px] h-[280px] border-solid rounded-xl cursor-pointer relative top-[-280px] left-[30px] backdrop-blur border-4 border-[#343333] hover:scale-110">
                <div className="w-full h-full flex justify-center items-center">
                    <span className="text-xl font-title font-bold">MESA 3</span>
                </div>
            </div>
        </div>
    )
}
export default TableSixChairs
