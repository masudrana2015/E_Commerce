import { useQuery } from "@tanstack/react-query";
import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../../Contexts/AuthProvider/AuthProvider";

const MyOrder = () => {
  const { user } = useContext(AuthContext);

  const url = `http://localhost:5000/orders/${user?.email}`;

  const { data: orders = [] } = useQuery({
    queryKey: ["orders", user?.email],
    queryFn: async () => {
      const res = await fetch(url, {
        headers: {
          authorization: `bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      const data = await res.json();
      return data;
    },
  });

  console.log(orders);

  const handleShowDetails = (id) => {
    console.log(id);
  };
  return (
    <div className="mx-20">
      <h3 className="text-3xl mb-5">My Orders</h3>
      <div className="overflow-x-auto">
        <table className="table w-full">
          {orders.length > 0 ? (
            <thead>
              <tr>
                <th></th>
                <th>Order ID</th>
                <th>transactionID</th>
                <th>Amount</th>
                <th>Order Date</th>
                {/* <th>Date</th> */}
                
                <th>Action</th>
              </tr>
            </thead>
          ) : (
            <div className="flex justify-center items-center h-[200px] bg-slate-200">
              No Orders Founded Please{" "}
              <Link to="/menu">
                <span className="underline text-blue-700">Shop more</span>
              </Link>
            </div>
          )}
          <tbody>
            {orders &&
              orders?.map((order, i) => (
                <tr key={order._id}>
                  <th>{i + 1}</th>
                  <td>{order._id.slice(0,10)+'..'}</td>
                  <td>{order.transactionId.slice(0,10)+'..'}</td>

                  <td>{order.price} Tk.</td>
                  {/* <td>{booking.bookingDate.split('T')[0]}</td> */}
                  <td>{order?.orderDate?.split("T")[0]}</td>
                 
                  <td>
                    <Link to={`/dashboard/orders/${order._id}`}>
                      <button className="btn btn-primary">View Details</button>
                    </Link>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyOrder;
