import React from "react";
import { useLocation } from "react-router-dom";
import { deleteShoppingCart } from "../../../../Utilities/fakedb";
const PaymentSuccess = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const transactionId = query.get("transactionID");
  return (
    <div className="flex justify-center text-center items-center h-96 bg-slate-500 m-10">
        <div className="text-white">
        <h1 className="text-4xl text-green-800">Congratulations!</h1> 
        <h1 className="text-3xl">You have successfully place your order</h1>
        <h1 className="text-3xl text-red-800">{transactionId}</h1>
        </div>
    </div>
  );
};

export default PaymentSuccess;
