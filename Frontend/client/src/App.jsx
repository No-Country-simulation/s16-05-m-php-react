import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import Router from "./router/Router";
import { BrowserRouter } from "react-router-dom";
import useMediaQuery from "./hooks/useMediaQuery";

function App() {
  const isDesktop = useMediaQuery("(min-width: 768px)"); // Tailwind's `md` breakpoint

  return (
    <BrowserRouter>
      <div className="flex flex-col overflow-y-hidden min-h-screen bg-color-bg text-color-text">
        {isDesktop && <Navbar />}
        <div className="flex-grow">
          <Router />
        </div>
        {isDesktop && <Footer />}
      </div>
    </BrowserRouter>
  );
}

export default App;
