import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React from 'react'

const Login = () => {

  return (
    <div className='flex flex-col items-center justify-center h-[80vh]'>
        <form className=' flex flex-col gap-4'>
            <div className='flex flex-col'>
                <label htmlFor="" className='font-bold'>Email</label>
                <Input placeholder= "Email..." className= "w-[350px] border-[1px] border-[solid] border-[black]" />
                <label htmlFor="" className='font-bold'>Contraseña</label>
                <Input placeholder= "Contraseña..." className= "w-[350px] border-[1px] border-[solid] border-[black]" />
                <div className='flex items-center justify-end'>
                    <a href="#"><u className='text-[blue]'> Olvidé mi contraseña</u></a>
                </div>
            </div>
            
            <div className='flex items-center justify-center mt-2'>
            <Button className= "bg-color-primary w-[230px] "> INGRESAR</Button>
            </div>
            
        </form>

    </div>
  )
}

export default Login