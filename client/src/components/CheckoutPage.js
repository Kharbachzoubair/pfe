// CheckoutPage.js
import React, { useState } from "react";
import { useAuth } from "./context/Auth";
import { useCart } from "./context/Cart";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";

const CheckoutPage = () => {
  const [auth] = useAuth();
  const [cart] = useCart();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handlePayment = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/v1/product/checkout", {
        cart,
      });
      setLoading(false);
      localStorage.removeItem("cart");
      toast.success("Payment completed successfully!");
      navigate("/dashboard/user/orders");
    } catch (error) {
      console.error("Error making payment:", error);
      setLoading(false);
      toast.error("Payment failed. Please try again.");
    }
  };

  if (!auth.token) {
    return <Spinner />;
  }

  if (loading) {
    return <Spinner />;
  }

  return (
    <div>
      <h1>Checkout</h1>
      <button onClick={handlePayment}>Checkout</button>
    </div>
  );
};

export default CheckoutPage;
