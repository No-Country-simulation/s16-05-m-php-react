import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import TableFourChairs from "./components/table/4Chairs";
import Login from "./pages/Login";
import Tables from "./pages/Tables";

function App() {
  return (
    <div className="bg-color-bg text-color-text">
      <Navbar />
      <Login />
      <Tables />

      <Footer />
    </div>
  );
}

export default App;
