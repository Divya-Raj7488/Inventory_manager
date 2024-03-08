import { useState } from "react";
import LocationContext from "./LocationContext";

export default locationContextProvider = ({ children }) => {
  const [locationData, setLocationData] = useState("");

  return (
    <LocationContext.Provider value={{ locationData, setLocationData }}>
      {children}
    </LocationContext.Provider>
  );
};
