import React, { useState, useEffect } from "react";
import Button1 from "@/components/ui/button1";
import { useNavigate } from "react-router-dom";
import { recoverPassword } from "@/axios/fetch";

const ResetPass = () => {
    const [loading, setLoading] = useState(false);
    const [buttonConfirm, setButtonConfirm] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        if(loading){
            setButtonConfirm(<div className="flex flex-wrap w-[84.78px] h-[40px] justify-center items-center bg-color-secondary rounded-md">
                <div role="status">
                    <svg
                        aria-hidden="true"
                        className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-red-600"
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
            </div>)
        }else{
            setButtonConfirm(<Button1 text="Enviar" type={"submit"} variant={"confirm"}/>);
        }
    }, [loading]);

    const checkPassword = (password) => {
        const minLength = /.{8,}/;
        const upperCase = /[A-Z]/;
        const lowerCase = /[a-z]/;
        const number = /[0-9]/;
        let errorVar = "La contraseña debe tener al menos ";

        if (!minLength.test(password)) {
            errorVar += ("8 caracteres, ");
        }
        if (!upperCase.test(password)) {
            errorVar += ("una letra mayúscula, ");
        }
        if (!lowerCase.test(password)) {
            errorVar +=("una letra minúscula, ");
        }
        if (!number.test(password)) {
            errorVar +=("un número.");
        }
        if(errorVar === "La contraseña debe tener al menos "){
            setError("");
        }else{
            setError(errorVar);
        }
    }

    const navigate = useNavigate();
    const handleClick = async(e) => {
        e.preventDefault();
        if(error === ""){
            setLoading(true);
            const tokenForm = e.target.token.value;
            const passwordForm = e.target.password.value;
            try{
                const response = await recoverPassword(tokenForm, passwordForm);
                if(response.status === 200){
                    alert("Se ha cambiado la contraseña");
                    navigate("/login");
                    setLoading(false);
                }else if(response.response.status === 403){
                    alert("El código ah expirado o no es valido");
                    setLoading(false);
                    return;
                }
            }catch(error){
                setLoading(false);
                console.log(error);
                return;
            }
        }else{
            return console.log(error);
        }
    }
    return (
        <div className="w-full h-screen md:h-[75.5vh] flex flex-col items-center ">
            <h1 className="text-3xl text-center font-bold text-color-secondary my-10">Nueva contraseña</h1>
            <form action="" className="max-w-xl w-full flex flex-col justify-center h-1/2 mt-10 items-center" onSubmit={handleClick}>
                <p className="text-center text-color-secondary">Ingrese el código enviado a su correo</p>
                <input type="text" placeholder="Código" name="token" className="my-5 py-2 w-1/2 min-w-56 rounded-md border border-color-secondary bg-color-bg text-center focus:outline-none" required/>
                <input type="password" placeholder="Nueva Contraseña" name="password" className="my-5 py-2 w-1/2 min-w-56 rounded-md border border-color-secondary bg-color-bg text-center focus:outline-none" onChange={(e) => checkPassword(e.target.value)} required/>
                {error && <p className="text-red-500 italic min-w-56 w-1/2 text-center">{error}</p>}
                <div className="flex flex-wrap justify-around w-full max-w-xl my-5">
                    <div className="mx-3 my-3">
                        <Button1 text="Cancelar" onClick={()=>navigate("/")} />
                    </div>
                    <div className="mx-3 my-3">
                        {buttonConfirm}
                    </div>
                </div>
            </form>
        </div>
    )
}

export default ResetPass