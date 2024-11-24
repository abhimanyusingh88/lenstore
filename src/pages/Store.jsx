import { useState, useEffect } from "react";
import PageNav from "../PageNav";
import { Link } from "react-router-dom";

function Store() {
  const [userName, setUserName] = useState("");
  const [itemType, setItemType] = useState("car");
  const [quantity, setQuantity] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [storedItems, setStoredItems] = useState([]);
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);
  const [showPayButton, setShowPayButton] = useState(false);

  useEffect(() => {
    const storedUserName = localStorage.getItem("userName");
    if (storedUserName) {
      setUserName(storedUserName);
    }
  }, []);

  useEffect(() => {
    const prices = { car: 600, clothes: 5, cattle: 20 };
    if (quantity && !isNaN(quantity)) {
      setTotalPrice(prices[itemType] * Number(quantity));
    } else {
      setTotalPrice(0);
    }
  }, [itemType, quantity]);

  useEffect(() => {
    const savedItems = localStorage.getItem("storedItems");
    if (savedItems) {
      setStoredItems(JSON.parse(savedItems));
    }
  }, []);

  useEffect(() => {
    if (storedItems.length > 0) {
      localStorage.setItem("storedItems", JSON.stringify(storedItems));
    }
  }, [storedItems]);

  const handleAddItem = () => {
    if (!quantity || isNaN(quantity) || quantity <= 0) {
      return;
    }
    const newItem = { itemType, quantity, price: totalPrice, paid: false };
    setStoredItems((prevItems) => [...prevItems, newItem]);
    setShowPayButton(true);  // Show the "Pay Now" button when a new item is added
    setItemType("car");
    setQuantity("");
  };

  const handleRemoveItem = (index) => {
    setStoredItems((prevItems) => prevItems.filter((_, i) => i !== index));
  };

  const handlePay = () => {
    const updatedItems = storedItems.map((item) => ({
      ...item,
      paid: true,
    }));
    setStoredItems(updatedItems);
    setPaymentConfirmed(true);
    setShowPayButton(false);  // paisa dete hi gyb karna hai
    setTimeout(() => {
      setPaymentConfirmed(false);
    }, 2000);
  };

  const handlePayDues = () => {
    
    const updatedItems = storedItems.map((item) =>
      !item.paid ? { ...item, paid: true } : item
    );
    setShowPayButton(false);
    setStoredItems(updatedItems);
    setPaymentConfirmed(true);
    setTimeout(() => {
      setPaymentConfirmed(false);
    }, 2000);
  };

  const handleQuantityChange = (e) => {
    const value = e.target.value;
    if (value === "" || /^[0-9\b]+$/.test(value)) {
      setQuantity(value);
    }
  };

  const handleClearPaidItems = () => {
    const unpaidItems = storedItems.filter((item) => !item.paid);
    setStoredItems(unpaidItems);
    localStorage.setItem("storedItems", JSON.stringify(unpaidItems));
  };

  const unpaidItems = storedItems.filter((item) => !item.paid);
  const paidItems = storedItems.filter((item) => item.paid);
  const totalDues = unpaidItems.reduce((acc, item) => acc + item.price, 0);

  return (
    <div className="bg-gradient-to-r from-red-100 via-white to-red-100 min-h-screen overflow-y-auto">
  {/* Your content here */}


      <PageNav userName={userName} />
      <Link to="/login">
  <button className="flex items-center justify-center h-10 w-10 bg-gray-700 rounded-full hover:bg-gray-600 transition-all mt-2 ml-2">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5 text-white"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 19l-7-7 7-7"
      />
    </svg>
  </button>
</Link>



      <div className="flex flex-col items-center justify-center text-center text-gray-900 px-4 py-8">
      {paymentConfirmed && (
  <div className="fixed top-10 left-1/2 transform -translate-x-1/2 p-4 bg-green-600 text-white rounded-lg shadow-lg z-50 flex items-center gap-2">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-8 h-8"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M5 13l4 4L19 7"
      />
    </svg>
    <span className="text-lg font-semibold">Payment Confirmed</span>
  </div>
)}


        <h2 className="text-4xl font-semibold mb-4">
          Welcome{" "}
          <span className="text-emerald-500">
            {userName || "Guest"}
          </span>
          , now you can store your goods.
        </h2>
        <div className="flex flex-col w-full max-w-md gap-6 mb-6">
          <label className="text-lg text-blue-600 font-medium">Select Item Type:</label>
          <select
            value={itemType}
            onChange={(e) => setItemType(e.target.value)}
            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="car">🚗Car</option>
            <option value="clothes">👚Clothes</option>
            <option value="cattle">🐄Cattle</option>
          </select>

          <label className="text-lg text-blue-600 font-medium">Quantity:</label>
          <input
            type="number"
            value={quantity}
            onChange={handleQuantityChange}
            min="1"
            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter quantity"
          />

          <div className="text-xl font-semibold text-gray-900">
            Total Price: <span className="text-emerald-500">${totalPrice}</span>
          </div>
          <button
            onClick={handleAddItem}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg mt-4 hover:bg-blue-600 focus:outline-none"
          >
            Add Item
          </button>
        </div>
        <div className="w-full max-w-md mb-8">
          <h3 className="text-2xl font-semibold mb-4">Stored Items</h3>
          {storedItems.length === 0 ? (
            <p className="text-gray-600">No items added yet.</p>
          ) : (
            <ul className="space-y-4">
              {storedItems.map((item, index) => (
                <li
                key={index}
                className={`flex justify-between text-lg ${item.paid ? "text-green-600" : "text-red-600"}`}
              >
                <span className="flex items-center">
                  {item.paid && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6 mr-2 text-green-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                  {item.quantity} {item.itemType}(s)
                </span>
                <div className="flex items-center">
                  <span>${item.price}</span>
                  <button
                    onClick={() => handleRemoveItem(index)}
                    className="ml-4 bg-red-500 text-white px-2 py-1 rounded-lg hover:bg-red-600 focus:outline-none"
                  >
                    Remove
                  </button>
                </div>
              </li>
              
              ))}
            </ul>
          )}
        </div>
        {unpaidItems.length > 0 && (
          <div className="flex flex-col items-center">
            <div className="text-lg font-semibold text-red-600 mb-2">
              Total Dues: <span className="text-emerald-500">${totalDues}</span>
            </div>
            <button
              onClick={handlePayDues}
              className="bg-red-500 text-white px-6 py-2 rounded-lg mt-4 hover:bg-red-600 focus:outline-none"
            >
              Pay Dues
            </button>
          </div>
        )}
        {showPayButton && (
          <button
            onClick={handlePay}
            className="bg-green-500 text-white px-6 py-2 rounded-lg mt-4 hover:bg-green-600 focus:outline-none"
          >
            Pay Now
          </button>
        )}
        {paidItems.length > 0 && (
          <button
            onClick={handleClearPaidItems}
            className="bg-yellow-500 text-white px-6 py-2 rounded-lg mt-4 hover:bg-yellow-600 focus:outline-none"
          >
            Clear Paid Items
          </button>
        )}
      </div>
    </div>
  );
}

export default Store;