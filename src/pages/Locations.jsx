import { useNavigate } from "react-router-dom";

const stores = [
  {
    id: 1,
    name: "Noida Store",
    location: "Sector 34, Noida",
    openingTime: "09:00",
    closingTime: "21:00",
    mapLink: "https://www.google.com/maps?q=Sector+34,+Noida" // Add Google Maps link
  },
  {
    id: 2,
    name: "Lajpat Nagar Store",
    location: "Lajpat Nagar, Delhi",
    openingTime: "10:00",
    closingTime: "22:00",
    mapLink: "https://www.google.com/maps?q=Lajpat+Nagar,+Delhi" // Add Google Maps link
  },
  {
    id: 3,
    name: "Haryana Store",
    location: "Sector 28, Haryana",
    openingTime: "08:00",
    closingTime: "18:00",
    mapLink: "https://www.google.com/maps?q=Sector+28,+Haryana" // Add Google Maps link
  },
  {
    id: 4,
    name: "South Delhi Store",
    location: "Satya Niketan, South Delhi",
    openingTime: "07:00",
    closingTime: "20:00",
    mapLink: "https://www.google.com/maps?q=Satya+Niketan,+South+Delhi" // Add Google Maps link
  },
];

const StoreStatus = () => {
  const navigate = useNavigate();

  const getStoreStatus = (openingTime, closingTime) => {
    const currentTime = new Date();
    const [openHour, openMinute] = openingTime.split(":").map(Number);
    const [closeHour, closeMinute] = closingTime.split(":").map(Number);

    const openDate = new Date(currentTime);
    openDate.setHours(openHour, openMinute, 0, 0);

    const closeDate = new Date(currentTime);
    closeDate.setHours(closeHour, closeMinute, 0, 0);

    return currentTime >= openDate && currentTime < closeDate ? "open" : "closed";
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-green-100 text-gray-800 flex flex-col">
      {/* Header */}
      <header className="bg-gray-800 text-white py-4 shadow-md flex justify-between items-center px-6">
        <h1 className="text-3xl font-bold">Our Stores</h1>
        <button
          onClick={() => navigate("/")}
          className="bg-white text-orange-500 px-4 py-2 rounded-lg font-semibold shadow-md hover:bg-orange-100 transition"
        >
          Return Home
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto py-10 px-4">
        <h2 className="text-2xl font-semibold text-center mb-8 text-orange-700">
          Find Our Stores Below
        </h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stores.map((store) => {
            const status = getStoreStatus(store.openingTime, store.closingTime);
            const isOpen = status === "open";

            return (
              <li
                key={store.id}
                className={`p-6 rounded-lg shadow-md transform transition-transform hover:scale-105 ${isOpen ? "bg-gradient-to-r from-green-300 to-green-400 text-orange" : "bg-gradient-to-r from-gray-300 to-gray-400 text-gray-800"}`}
              >
                <a
                  href={store.mapLink} // Linking to Google Maps
                  target="_blank" // Open link in a new tab
                  rel="noopener noreferrer"
                  className="block"
                >
                  <h3 className="text-xl font-bold">{store.name}</h3>
                  <p className="mt-2">{store.location}</p>
                  <p className="mt-1 text-sm">
                    <span className="font-medium">Hours:</span> {store.openingTime} - {store.closingTime}
                  </p>
                  <p
                    className={`mt-3 font-semibold text-lg ${isOpen ? "text-green-900" : "text-gray-600"}`}
                  >
                    {isOpen ? "Open Now" : "Closed"}
                  </p>
                  {/* Click to view on map message */}
                  <p className="mt-3 text-sm text-blue-600 underline">Click to view on map</p>
                </a>
              </li>
            );
          })}
        </ul>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-3">
        <div className="container mx-auto text-center text-sm">
          <p>&copy; 2024 Our Stores. All rights reserved.</p>
          <p>Contact us: support@ourstores.com</p>
        </div>
      </footer>
    </div>
  );
};

export default StoreStatus;
