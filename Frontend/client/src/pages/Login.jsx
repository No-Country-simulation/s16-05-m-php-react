import React, { useState } from 'react';
import { loginUser } from '@/axios/fetch';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import useAuthStore from '@/stores/useAuthStore';

const Login = () => {
  const { email, password, setEmail, setPassword, setToken, setRole } = useAuthStore();
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser(email, password);
      if (response.status === 200) {
        const { token, role } = response.data;
        setToken(token);
        setRole(role);
        console.log('Inicio de sesión exitoso');
      } else {
        console.error(`Error en el inicio de sesión: ${response.status}`);
        setError('Error al iniciar sesión, verifica tus credenciales');
      }
    } catch (error) {
      console.error('Error en el inicio de sesión:', error);
      setError('Error al iniciar sesión, verifica tus credenciales');
    }
  };

  return (
    <div className='flex flex-col items-center justify-center h-[80vh] '>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <div className='flex flex-col'>
          <label htmlFor="email" className='font-bold font-title'>Email</label>
          <Input
            placeholder="Email..."
            className="w-[350px] border-[1px] border-[solid] border-[black]"
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="password" className='font-bold font-title'>Contraseña</label>
          <Input
            placeholder="Contraseña..."
            className="w-[350px] border-[1px] border-[solid] border-[black]"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className='flex items-center justify-end'>
            <a href="#"><u className='text-[blue]'> Olvidé mi contraseña</u></a>
          </div>
        </div>
        
        <div className='flex items-center justify-center mt-2'>
          <Button className="bg-color-primary w-[230px] font-title">INGRESAR</Button>
        </div>
      </form>
      {error && <div className='text-red-500'>{error}</div>}
    </div>
  );
};

export default Login;