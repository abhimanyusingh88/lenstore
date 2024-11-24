import { useNavigate } from 'react-router-dom';

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 flex flex-col justify-between">
      <header className="text-center py-10 bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold">About Us</h1>
        <p className="mt-4 text-lg sm:text-xl lg:text-2xl">
          We are a company that treats your responsibilities like ours. Here, you can store your goods safely and efficiently.
        </p>
      </header>

      <main className="flex flex-col items-center p-6 sm:p-8 lg:p-12">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold mb-6">Storage Categories</h2>
        <table className="table-auto w-full sm:w-3/4 md:w-2/3 lg:w-1/2 border-collapse bg-white shadow-lg rounded-lg">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="px-4 py-2 border">Category</th>
              <th className="px-4 py-2 border">Pricing</th>
            </tr>
          </thead>
          <tbody>
            <tr className="text-center">
              <td className="px-4 py-2 border">Car</td>
              <td className="px-4 py-2 border">$600/month</td>
            </tr>
            <tr className="text-center bg-gray-100">
              <td className="px-4 py-2 border">Clothes</td>
              <td className="px-4 py-2 border">$20/week</td>
            </tr>
            <tr className="text-center">
              <td className="px-4 py-2 border">Cattles</td>
              <td className="px-4 py-2 border">$5/day</td>
            </tr>
          </tbody>
        </table>

        <button
          onClick={() => navigate('/')}
          className="mt-8 px-6 py-3 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 transition duration-200"
        >
          Return Home
        </button>
      </main>

      <footer className="text-center py-6 bg-gray-200 text-gray-600">
        <p className="text-sm sm:text-base lg:text-lg">Conditions Apply. Prices are subject to change.</p>
      </footer>
    </div>
  );
};

export default About;
