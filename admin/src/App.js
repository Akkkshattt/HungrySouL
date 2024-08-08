import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/SideBar/Sidebar";
import AddItem from "./pages/Add/AddItem";
import ListItem from "./pages/List/ListItem";
import OrderItem from "./pages/Order/OrderItem";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {

  return (
    <div className="app">
      <ToastContainer />
      <Navbar />
      <hr />
      <div className="app-contents">
        <Sidebar />
        <Routes>
          <Route path="/add" element={<AddItem />} />
          <Route path="/list" element={<ListItem />} />
          <Route path="/orders" element={<OrderItem />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
