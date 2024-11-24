import { useNavigate } from 'react-router-dom';

const Contact = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 flex flex-col justify-between">
      <header className="text-center py-10 bg-gradient-to-r from-green-500 to-teal-500 text-white">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold">Contact Us</h1>
        <p className="mt-4 text-lg sm:text-xl lg:text-2xl">
          Have questions? Reach out to us through any of the following ways.
        </p>
      </header>

      <main className="flex flex-col items-center p-6 sm:p-8 lg:p-12">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold mb-6">Get in Touch</h2>
        <div className="bg-white shadow-lg rounded-lg p-6 w-full sm:w-3/4 lg:w-1/2 text-center">
          <p className="text-lg mb-4 sm:text-xl">
            📧 <span className="font-medium">Email:</span>{' '}
            <a href="mailto:lenstore@gmail.com" className="text-blue-500 hover:underline">
              lenstore@gmail.com
            </a>
          </p>
          <p className="text-lg sm:text-xl">
            📞 <span className="font-medium">Call Us:</span>{' '}
            <a href="tel:+91xxxxxxxxx" className="text-blue-500 hover:underline">
              +91 xxxxxxxxx
            </a>
          </p>
        </div>

        <button
          onClick={() => navigate('/')}
          className="mt-8 px-6 py-3 bg-green-500 text-white rounded-md shadow-md hover:bg-green-600 transition duration-200"
        >
          Return Home
        </button>
      </main>

      <footer className="text-center py-6 bg-gray-200 text-gray-600">
        <p className="text-sm sm:text-base lg:text-lg">We’re here to help! Conditions Apply.</p>
      </footer>
    </div>
  );
};

export default Contact;
