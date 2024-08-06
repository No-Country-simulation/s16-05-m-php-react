import React, {useState, useEffect} from "react";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import Router from "./router/Router";
import { BrowserRouter } from "react-router-dom";
import useMediaQuery from "./hooks/useMediaQuery";
import useAuthStore from "@/stores/useAuthStore";
import Button1 from "./components/ui/button1";

function App() {
  const isDesktop = useMediaQuery("(min-width: 768px)"); // Tailwind's `md` breakpoint
  const {token, expiresAt, logout, renovateToken } = useAuthStore();
  const [visualAlert, setVisualAlert]= useState(false);
  const [alerta, setAlerta] = useState(null);
  const [location, setLocation] = useState(false);
  const currentPath = window.location.pathname;

  useEffect(() => {
    let intervalId;
    if(token){
      const checkToken = () => {
        const expireTime = (expiresAt/1000)
        const actualTime = Math.floor(Date.now()/1000);
        if (actualTime < expireTime) {
          if((actualTime + 300) >= expireTime){
            setVisualAlert(true);
          }
        }else {
          setVisualAlert(false);
          logout();
          return;
        }
      }
      clearInterval(intervalId);
      intervalId = setInterval(checkToken, 60000);
    };
    return () => {
      clearInterval(intervalId);
    };
  },[token]);

  useEffect(() => {
    if(visualAlert === true){
      setAlerta(<div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex justify-center items-center z-10">
        <div className="rounded-md bg-color-bg p-3 w-1/4 min-w-[460px] border-2 border-color-secondary">
          <p className="text-center w-full font-bold text-2xl text-color-secondary">¿La sesión va a expirar desea extenderla?</p>
          <div className="flex justify-around items-center w-full mt-8 mb-3">
            <Button1
                type="button"
                text="Finalizar Sesión"
                onClick={() => cerrar()}
            />
            <Button1
                type="button"
                text="Extender Sesión"
                variant={"confirm"}
                onClick={() => extend()}
            />
          </div>
        </div>
      </div>);
    }else{
      setAlerta(null);
    }
  },[visualAlert]);

  useEffect(() => {
    if(currentPath === "/admin"){
      setLocation(true);
    }else{
      setLocation(false);
    }
  },[currentPath]);

  const cerrar = () => {
    setVisualAlert(false);
    logout();
  }

  const extend = () => {
    setVisualAlert(false);
    renovateToken();
  }

  return (
    <BrowserRouter>
      <div className="flex flex-col overflow-y-hidden min-h-screen bg-color-bg text-color-text">
        {isDesktop && !location && <Navbar />}
        <div className="flex-grow">
          <Router />
        </div>
        {isDesktop && !location && <Footer />}
        {alerta}
      </div>
    </BrowserRouter>
  );
}

export default App;
