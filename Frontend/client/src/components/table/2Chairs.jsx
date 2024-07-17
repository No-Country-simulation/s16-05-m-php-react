import React from 'react'

const TableTwoChairs = () => {
    return (
        <div className=" m-10 w-[180px] h-[180px]">
            <div className="h-full flex flex-col justify-around">
                <div className="flex justify-start">
                    <div className="relative w-[74px] h-[74px] rounded-full bg-[#58575776]"></div>
                </div>
                <div className="flex justify-end">
                    <div className="relative w-[74px] h-[74px] rounded-full bg-[#7F2A4490]"></div>
                </div>
            </div>
            <div className="bg-[#C0C0C030] w-[130px] h-[130px] rotate-45 border-solid rounded-xl cursor-pointer relative top-[-155px] left-[25px] backdrop-blur border-4 border-[#343333] hover:scale-110">
                <div className="w-full h-full flex justify-center items-center -rotate-45">
                    <span className="text-xl font-title font-bold">MESA 2</span>
                </div>
            </div>
        </div>
    )
}
export default TableTwoChairs