<<<<<<< HEAD
import { createContext } from "react";
import { doctors } from "../assets/data/doctors";
=======
import { createContext, useState, useContext } from "react";
>>>>>>> 20cc38228264b7523930b8c862b8c524042c2b8a

export const AppContext = createContext();

const AppContextProvider = (props) => {
<<<<<<< HEAD
  const currencySymbol = "$";
  const value = {
    doctors,
    currencySymbol,
  };
=======
  const [doctors, setDoctors] = useState([]); // State động cho doctors
  const currencySymbol = "$";

  const value = {
    doctors,
    setDoctors,
    currencySymbol,
  };

>>>>>>> 20cc38228264b7523930b8c862b8c524042c2b8a
  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

<<<<<<< HEAD
export default AppContextProvider;
=======
// Hook để sử dụng context
export const useAppContext = () => useContext(AppContext);

export default AppContextProvider;
>>>>>>> 20cc38228264b7523930b8c862b8c524042c2b8a
