import React from 'react'

const Navbar = () => {
  return (
    <div className='flex flex-row justify-between items-center p-5 h-28 font-title border-b-[1px]'>
      <p>logo</p>
      <ul className='flex gap-5'>
        <li>Reservá tu mesa</li>
        <li>Consultá tu reserva</li>
        <li>Contactanos</li>
      </ul>
    </div>
  )
}

export default Navbar