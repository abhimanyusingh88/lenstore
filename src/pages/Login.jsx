import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import PageNav from "../PageNav";

function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("anything@gmail.com");
  const [password, setPassword] = useState("123456");
  const [confirmPassword, setConfirmPassword] = useState(""); // for sign-up
  const [fullName, setFullName] = useState(""); // for sign-up
  const [userName, setUserName] = useState(""); // Store logged-in user's name
  const navigate = useNavigate();

  // Check login status directly in the render process
  const storedIsLoggedIn = localStorage.getItem("isLoggedIn");
  const storedUserName = localStorage.getItem("userName");

  useEffect(() => {
    if (storedIsLoggedIn === "true" && storedUserName && !userName) {
      setUserName(storedUserName); // Set userName if logged in
    }
  }, [storedIsLoggedIn, storedUserName, userName]);

  const handleLogin = () => {
    const correctEmail = "anything@gmail.com";
    const correctPassword = "123456";

    if (email === correctEmail && password === correctPassword) {
      setUserName("John Doe"); // static name (could be dynamic)
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userName", "John Doe");
      navigate("/store");
    } else {
      setError("Wrong credentials, please try again.");
    }
  };

  const handleSignUp = () => {
    if (fullName && email && password && password === confirmPassword) {
      setUserName(fullName);
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userName", fullName);
      navigate("/store");
    } else if (password !== confirmPassword) {
      setError("Passwords do not match.");
    } else {
      setError("Please fill in all fields.");
    }
  };

  const handleLogout = () => {
    setUserName("");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userName");
    navigate("/login");
  };

  const toggleForm = () => {
    setIsLogin((prevState) => !prevState);
    setError(""); // Reset error message when toggling form
  };

  return (
    <div className="bg-gradient-to-r from-red-100 to-red-200 h-screen w-full flex flex-col">
      <PageNav handleLogout={handleLogout} userName={userName} />
      <div className="flex-grow flex justify-center items-center">
        <div className="h-[500px] w-[600px] sm:w-[90%] md:w-[80%] lg:w-[60%] bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="w-full h-[40px] bg-gray-700 text-green-500 font-bold flex items-center justify-center">
            {isLogin ? "Login with Your Credentials" : "Sign Up with Your Details"}
          </div>
          {error && (
            <div className="text-red-500 font-medium text-center mt-4">
              {error}
            </div>
          )}
          <div className="flex flex-col gap-4 w-full items-center mt-10 overflow-auto px-4">
            {/* If already logged in, show Go to Store option */}
            {storedIsLoggedIn === "true" && (
              <div className="flex flex-col items-center w-full gap-4">
                <NavLink
                  to="/store"
                  className="h-[40px] w-4/5 flex items-center justify-center bg-green-500 text-white rounded-lg hover:bg-green-600"
                >
                  Go to Store
                </NavLink>
              </div>
            )}
            {/* Show Login/Sign Up form only if not logged in */}
            {storedIsLoggedIn !== "true" && (
              <div className="flex flex-col w-full gap-4">
                {/* Common fields for both Login and SignUp */}
                <div className="flex flex-col gap-1 w-full">
                  <label className="text-gray-700 font-medium">Enter Your Email/Mobile No.</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email/Mobile No."
                    className="h-[40px] w-full border border-gray-300 rounded-lg px-2 focus:outline-none focus:border-gray-700"
                  />
                </div>
                <div className="flex flex-col gap-1 w-full">
                  <label className="text-gray-700 font-medium">Enter Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="h-[40px] w-full border border-gray-300 rounded-lg px-2 focus:outline-none focus:border-gray-700"
                  />
                </div>
                {/* SignUp specific fields */}
                {!isLogin && (
                  <>
                    <div className="flex flex-col gap-1 w-full">
                      <label className="text-gray-700 font-medium">Full Name</label>
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Full Name"
                        className="h-[40px] w-full border border-gray-300 rounded-lg px-2 focus:outline-none focus:border-gray-700"
                      />
                    </div>
                    <div className="flex flex-col gap-1 w-full">
                      <label className="text-gray-700 font-medium">Confirm Password</label>
                      <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm Password"
                        className="h-[40px] w-full border border-gray-300 rounded-lg px-2 focus:outline-none focus:border-gray-700"
                      />
                    </div>
                  </>
                )}
                <button
                  className="h-[40px] w-full bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  onClick={isLogin ? handleLogin : handleSignUp}
                >
                  {isLogin ? "Login" : "Sign Up"}
                </button>
                <div
                  className="mt-4 text-blue-600 cursor-pointer"
                  onClick={toggleForm}
                >
                  {isLogin ? "Create Account?" : ""}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
