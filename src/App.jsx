import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Router/Home/Home";
import CarPage from "./components/CarPage/CarPage";

const App = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3001/cars");
        const data = await response.json();
        setCars(data);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchData();
  }, []);
  return (
    <Routes>
      <Route path="/" element={<Home cars={cars} />}></Route>
      <Route path="/car/:id" element={<CarPage cars={cars} />}></Route>
    </Routes>
  );
};

export default App;
