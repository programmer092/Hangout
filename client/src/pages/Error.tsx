const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white rounded-lg shadow-md p-8 max-w-md w-full text-center">
        <h1 className="text-4xl font-bold text-red-500 mb-4">404 Not Found</h1>
        <p className="text-lg text-gray-700 mb-8">
          Sorry, the page you are looking for does not exist.
        </p>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={() => (window.location.href = "/")}
        >
          Go Back to Home
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
