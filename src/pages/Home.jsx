import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import PageNav from "../PageNav";

function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedIsLoggedIn = localStorage.getItem("isLoggedIn");
    const storedUserName = localStorage.getItem("userName");
    
    if (storedIsLoggedIn === "true" && storedUserName) {
      setIsLoggedIn(true);
      setUserName(storedUserName);
    }
  }, []);

  const goToStore = () => {
    navigate("/store");
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userName");
    setIsLoggedIn(false);
    setUserName("");
  };

  return (
    <div className="h-screen relative overflow-hidden">
      <div className="relative z-20">
        <PageNav handleLogout={handleLogout} userName={userName} />
      </div>

      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-[url('/bg.jpg')] blur-sm -z-10"
        alt="Background"
      ></div>

      <div className="relative z-10 flex justify-center flex-col items-center h-full px-4 sm:px-8 md:px-16">
        <h5 className="text-4xl sm:text-6xl md:text-8xl font-bold text-white -translate-y-10 font-sans block text-center">
          We Store <span className="text-emerald-600">Responsibilities</span>
        </h5>
        {!isLoggedIn ? (
          // If not logged in, show the "Login" button
          <Link to="/login">
            <div className="text-white text-xl sm:text-2xl md:text-3xl font-sans h-[50px] w-[170px] bg-slate-700 flex justify-center items-center rounded-[2.5rem] mt-4">
              Login
            </div>
          </Link>
        ) : (
          // If logged in, show the "Go to Store" button
          <div
            className="text-white text-xl sm:text-2xl md:text-3xl font-sans h-[50px] w-[170px] bg-slate-700 flex justify-center items-center rounded-[2.5rem] cursor-pointer mt-4"
            onClick={goToStore}
          >
            STORAGE
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
