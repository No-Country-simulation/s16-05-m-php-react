import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import TableFourChairs from "./components/table/4Chairs";
import Login from "./pages/Login";
import Tables from "./pages/Tables";
import Router from "./router/Router";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen bg-color-bg text-color-text">
        <Navbar />
        <div className="flex-grow">
          <Router />
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
