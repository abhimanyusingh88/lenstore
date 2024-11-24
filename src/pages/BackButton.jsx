import { useNavigate } from 'react-router-dom';

function BackButton() {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate("/login");
  };

  return (
    <button
      onClick={handleBackClick}
      className="bg-gray-700 text-white p-3 rounded-full flex items-center"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6 mr-2"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M15 19l-7-7 7-7"
        />
      </svg>
      Back
    </button>
  );
}

export default BackButton;