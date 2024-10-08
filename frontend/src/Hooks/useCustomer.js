import { useEffect, useState } from "react";

const useCustomer = (email) => {
  const [isCustomer, setIsCustomer] = useState(false);
  const [isCustomerLoading, setIsCustomerLoading] = useState(true);
  useEffect(() => {
    if (email) {
      fetch(`http://localhost:5000/users/customer/${email}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setIsCustomer(data.isCustomer);
          setIsCustomerLoading(false);
        });
    }
  }, [email]);
  return [isCustomer, isCustomerLoading];
};

export default useCustomer;
