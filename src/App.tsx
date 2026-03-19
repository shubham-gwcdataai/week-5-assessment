import React from "react";
import { Provider } from "react-redux";
import { store } from "./store";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import CartSidebar from "./components/ui/CartSidebar";
import HomePage from "./pages/HomePage";
import "./index.css";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div className="min-h-screen font-body">
        <Navbar />
        <CartSidebar />
        <HomePage />
        <Footer />
      </div>
    </Provider>
  );
};

export default App;
