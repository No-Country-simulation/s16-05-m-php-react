import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import Login from "./pages/Login";

function App() {
  return (
    <>
      <Navbar />
      <Login className="bg-color-bg" />
      <Footer />
    </>
  );
}

export default App;
