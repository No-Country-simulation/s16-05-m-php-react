import React, { useState } from "react";
import { loginUser } from "@/axios/fetch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useAuthStore from "@/stores/useAuthStore";
import logo from "../assets/logog.svg";
import backgroundImage from "../assets/backgroundImage.png";
import { useNavigate } from "react-router-dom";
import Footer from "@/components/Footer/Footer";

const Login = () => {
  const { email, password, setEmail, setPassword, setToken, setRole, setUsername } =
    useAuthStore();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await loginUser(email, password);

      if (response.status === 200) {
        const { token, role, username } = response.data;
        setToken(token);
        setRole(role);
        setUsername(username)
        navigate("/tables");
      } else {
        setError("Error al iniciar sesión, verifica tus credenciales");
      }
    } catch (error) {
      setError("Error al iniciar sesión, verifica tus credenciales");
    } finally {
      setLoading(false); // Terminar el estado de carga
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center bg-color-bg text-color-text w-full min-w-screen min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url(${backgroundImage})`
      }}
    >
      <img src={logo} alt="logo" className="w-80 h-72 mt-32" />
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-5">
          <label className="relative w-[350px]">
            <Input
              className="w-[350px] border-[1px] h-[60px] border-[solid] text-color-text bg-color-bg border-color-text items-end outline-[none] focus:border-color-text transition duration-200"
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder=" "
            />
            <span className="absolute text-color-text text-opacity-80 left-1 top-4 px-4 transition duration-200 input-text">
              Correo Electrónico
            </span>
          </label>

          <div className="relative w-[350px]">
            <Input
              className="w-[350px] border-[1px] h-[60px] border-[solid] text-color-text bg-color-bg border-color-text items-end outline-[none] focus:border-color-text transition duration-200"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder=" "
            />
            <span className="absolute text-color-text text-opacity-80 left-1 top-4 px-4 transition duration-200 input-text">
              Contraseña
            </span>
          </div>

          <div className="flex items-center justify-end">
            <a href="#">
              <u className="text-color-text"> Olvidé mi contraseña</u>
            </a>
          </div>
        </div>

        <div className="flex items-center justify-center mt-2">
          <Button className="bg-color-primary w-[230px] h-[45px] font-title hover:bg-color-primary">
            {loading ? (
              <div role="status">
                <svg
                  aria-hidden="true"
                  className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span className="sr-only">Loading...</span>
              </div>
            ) : (
              "INGRESAR"
            )}
          </Button>
        </div>
      </form>
      {error && <div className="text-red-500">{error}</div>}
      <div className="mt-20 w-full">
        <Footer />
      </div>
    </div>
  );
};

export default Login;
