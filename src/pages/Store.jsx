import { useState, useEffect } from "react";
import PageNav from "../PageNav";
import { Link } from "react-router-dom";

function Store() {
  const [userName, setUserName] = useState("");
  const [itemType, setItemType] = useState("car");
  const [quantity, setQuantity] = useState("");
  const [daysPassed,setDaysPassed]=useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [storedItems, setStoredItems] = useState([]);
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);
  const [showPayButton, setShowPayButton] = useState(false);
  const DAILY_DUE_RATE = 10;

  useEffect(() => {
    // Increment daysPassed every day
    const interval = setInterval(() => {
      setDaysPassed((prev) => prev + 1);
    }, 24 * 60 * 60 * 1000); // 24 hours

    return () => clearInterval(interval); // Clean up on unmount
  }, []);

  useEffect(() => {
    // Recalculate total dues whenever daysPassed updates
    const newDues = storedItems.reduce((acc, item) => {
      const due = daysPassed * DAILY_DUE_RATE * item.quantity;
      return acc + due;
    }, 0);
    setTotalPrice(newDues);
  }, [daysPassed,storedItems]);

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
    // Ensure quantity is valid
    if (!quantity || isNaN(quantity) || quantity <= 0) {
      alert("Please enter a valid quantity greater than 0.");
      return;
    }
  
    // Create new item with current date
    const newItem = {
      itemType,
      quantity: Number(quantity), // Ensure quantity is stored as a number
      price: totalPrice,
      paid: false,
      dateStored: new Date().toISOString(), // Store ISO string for consistency
    };
  
    // Update stored items and reset form
    setStoredItems((prevItems) => [...prevItems, newItem]);
    setShowPayButton(true); // Show the "Pay Now" button
    setItemType("car");
    setQuantity("");
  };
  

  const handleRemoveItem = (index) => {
    setStoredItems((prevItems) => prevItems.filter((_, i) => i !== index));
  };

  const handlePay = () => {
    const updatedItems = storedItems.map(item =>
      !item.paid
        ? { ...item, paid: true, paymentDate: new Date().toISOString() }
        : item
    );
    setStoredItems(updatedItems);
    setPaymentConfirmed(true);
    setShowPayButton(false);  // paisa dete hi gyb karna hai
    setTimeout(() => {
      setPaymentConfirmed(false);
    }, 2000);
  };

  const handlePayDues = () => {
    
    const updatedItems = storedItems.map(item =>
      !item.paid
        ? { ...item, paid: true, paymentDate: new Date().toISOString() }
        : item
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

  <div className="fixed top-0 left-0 right-0 z-10">
  <PageNav userName={userName} />
</div>
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


<h2 className="text-4xl font-semibold mb-4 mt-[30px]">
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
            <option value="cattle">🪑Furniture</option>
            <option value="vegetables">🍅Vegetables</option>
            
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
  <h3 className="text-2xl font-semibold mb-4 text-gray-800">Stored Items</h3>
  {storedItems.length === 0 ? (
    <p className="text-gray-600 italic">No items added yet.</p>
  ) : (
    <ul className="space-y-4">
      {storedItems.map((item, index) => {
        const storedDate = item.dateStored ? new Date(item.dateStored) : null;
        const paymentDate = item.paymentDate ? new Date(item.paymentDate) : null;

        const daysStored = storedDate
          ? Math.floor((Date.now() - storedDate.getTime()) / (1000 * 60 * 60 * 24))
          : 0;

        const formattedStoredDate = storedDate
          ? storedDate.toLocaleDateString()
          : "Unknown";
        const formattedPaymentDate = paymentDate
          ? `${paymentDate.toLocaleDateString()} ${paymentDate.toLocaleTimeString()}`
          : null;

        const handleMarkAsPaid = () => {
          const updatedItems = [...storedItems];
          updatedItems[index].paid = true;
          updatedItems[index].paymentDate = new Date().toISOString();
          setStoredItems(updatedItems);
        };

        return (
          <li
            key={index}
            className={`p-4 border rounded-lg shadow-sm transition-shadow duration-300 ${
              item.paid
                ? "bg-green-50 border-green-300"
                : "bg-red-50 border-red-300"
            }`}
          >
            <div className="flex justify-between items-center">
              <span className="flex items-center text-lg font-medium text-gray-800">
                {item.quantity} {item.itemType}(s) :-
              </span>
              <span
                className={`text-sm font-semibold px-2 py-1 rounded ${
                  item.paid ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"
                }`}
              >
                {item.paid ? "Paid" : "Due"}
              </span>
            </div>
            <div className="mt-3 text-sm text-gray-600 space-y-1">
              <p>
                <span className="font-medium text-gray-800">Date Stored:</span>{" "}
                {formattedStoredDate}
              </p>
              <p>
                <span className="font-medium text-gray-800">Days Stored:</span>{" "}
                {daysStored} day(s)
              </p>
              {formattedPaymentDate && (
                <p>
                  <span className="font-medium text-gray-800">Payment Date:</span>{" "}
                  {formattedPaymentDate}
                </p>
              )}
              {!item.paid && (
                <div className="flex justify-between items-center mt-2">
                  <button
                    onClick={handleMarkAsPaid}
                    className="bg-green-500 text-white text-sm px-3 py-1 rounded-lg hover:bg-green-600 transition-colors duration-200 focus:outline-none focus:ring focus:ring-green-300"
                  >
                    Confirm Payment
                  </button>
                  <button
                    onClick={() => handleRemoveItem(index)}
                    className="bg-red-500 text-white text-sm px-3 py-1 rounded-lg hover:bg-red-600 transition-colors duration-200 focus:outline-none focus:ring focus:ring-red-300"
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>
          </li>
        );
      })}
    </ul>
  )}
</div>



{unpaidItems.length > 0 && (
  <div className="flex flex-col items-center">
    <div className="text-lg font-semibold text-red-600 mb-2">
      Total Dues: <span className="text-emerald-500">${totalDues}</span>
    </div>
    <button
      onClick={() => {
        handlePayDues();
        setShowPayButton(false); // Ensure Pay Now is hidden after payment
      }}
      className="bg-red-500 text-white px-6 py-2 rounded-lg mt-4 hover:bg-red-600 focus:outline-none"
    >
      Pay Dues
    </button>
  </div>
)}
{unpaidItems.length > 0 && showPayButton && (
  <button
    onClick={() => {
      handlePay();
      setShowPayButton(false); // Hide Pay Now after payment
    }}
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