import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Navbar from "./components/navbar/Navbar";
import Home from "./pages/home/Home";
import SellCarPage from "./pages/sellCarPage/SellCarPage";
import ProfilePage from "./pages/profilePage/ProfilePage";
import LoginPage from "./pages/login/LoginPage";
import SignupPage from "./pages/signupPage/SignupPage";
// import NotFound from "./pages/NotFound";
import "./styles/global.scss";
import CarsListPage from "./pages/carListPage/CarListPage";

const App = () => {
  const [user, setUser] = useState(null);
  const [cars, setCars] = useState([
    {
      id: 1,
      make: "Toyota",
      model: "Camry",
      year: 2020,
      price: 25000,
      mileage: 30000,
      fuelType: "Gasoline",
      transmission: "Automatic",
      location: "New York",
      description: "Excellent condition, well maintained",
      image: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=400",
      sellerId: 1,
      contact: "john@example.com"
    },
    {
      id: 2,
      make: "Honda",
      model: "Civic",
      year: 2019,
      price: 22000,
      mileage: 35000,
      fuelType: "Gasoline",
      transmission: "Manual",
      location: "California",
      description: "Great fuel economy, sporty design",
      image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400",
      sellerId: 2,
      contact: "jane@example.com"
    },
    {
      id: 3,
      make: "BMW",
      model: "X5",
      year: 2021,
      price: 55000,
      mileage: 15000,
      fuelType: "Gasoline",
      transmission: "Automatic",
      location: "Texas",
      description: "Luxury SUV with premium features",
      image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400",
      sellerId: 1,
      contact: "john@example.com"
    }
  ]);

  const addCar = (carData) => {
    const newCar = {
      ...carData,
      id: Date.now(),
      sellerId: user?.id || 1
    };
    setCars([...cars, newCar]);
  };

  const updateCar = (carId, updatedData) => {
    setCars(cars.map(car => car.id === carId ? { ...car, ...updatedData } : car));
  };

  const deleteCar = (carId) => {
    setCars(cars.filter(car => car.id !== carId));
  };

  return (
    <BrowserRouter>
      <div className="app">
        <Navbar user={user} setUser={setUser} />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home cars={cars} />} />
            <Route path="/cars" element={<CarsListPage cars={cars} />} />
            <Route path="/sell" element={<SellCarPage onAddCar={addCar} />} />
            <Route path="/profile" element={<ProfilePage user={user} cars={cars} onUpdateCar={updateCar} onDeleteCar={deleteCar} />} />
            <Route path="/login" element={<LoginPage setUser={setUser} />} />
            <Route path="/signup" element={<SignupPage setUser={setUser} />} />
            {/* <Route path="*" element={<NotFound />} /> */}
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
};

export default App;