import { useQuery } from "@tanstack/react-query";
import React, { useContext, useEffect } from "react";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../../Contexts/AuthProvider/AuthProvider";

const MyReservation = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const url = `http://localhost:5000/reservations?email=${user?.email}`;

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

  const handlePayment = (id) => {
    console.log(id);
    const bookingInfo = {
      id: id,
    };
    fetch("http://localhost:5000/booking-payment", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(bookingInfo),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        window.location.replace(data.url);
        if (data.acknowledged) {
          // setIsBooked(true);
          // navigate("/dashboard/pa");
          // toast.success("Booking confirmed");
          // refetch();
        } else {
          // toast.error(data.message);
        }
      });
  };
  return (
    <div className="mx-10">
      <h3 className="text-3xl mb-5">My Reservation</h3>
      <div className="overflow-x-auto">
        <table className="table w-full">
          {orders.length > 0 ? (
            <thead>
              <tr>
                <th>No</th>
                <th>Booking ID</th>
                <th>transactionID</th>

                
                <th>Price</th>
                
                <th>Action</th>
              </tr>
            </thead>
          ) : (
            <div className="flex justify-center items-center h-[200px] bg-slate-200">
              No Reservation Founded Please
              <Link to="/reservation">
                <span className="underline text-blue-700 px-1"> Booking</span>{" "}
                from Here
              </Link>
            </div>
          )}

          <tbody>
            {orders &&
              orders?.map((order, i) => (
                <tr key={order._id}>
                  <th>{i + 1}</th>
                  <td>{order._id}</td>
                  <td>{order.transactionId}</td>
                  

                  {/* <td>{booking.bookingDate.split('T')[0]}</td> */}
                  {/* <td>{order.bookingDate}</td> */}
                  {/* <td>{order.price} Tk.</td> */}
                  <td>
                    {/* <button
                                            className='btn btn-primary btn-sm'
                                        >Pay</button> */}
                    {order.price && !order.paid && (
                      <button
                        onClick={() => handlePayment(order._id)}
                        className="btn btn-primary btn-sm"
                      >
                        Pay
                      </button>
                    )}
                    {order.price && order.paid && (
                      <span className="text-green-500">Paid</span>
                    )}
                  </td>
                  <td>
                  <Link to={`/dashboard/reservations/${order._id}`}>
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

export default MyReservation;
