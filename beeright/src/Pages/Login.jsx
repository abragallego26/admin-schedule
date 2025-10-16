import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate('/');
  };

  const handleLogin = (e) => {
    e.preventDefault(); 
    navigate('/dashboard');
  };

  return (
    <div className="login-wrapper flex justify-center items-center min-h-screen bg-gray-100">
      <div className="login-card bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <img src="/logo.jpg" alt="BeeBright Logo" className="logo mx-auto w-24 mb-4" />

        <div className="button-group flex justify-center mb-6">
          <button className="bg-[#f4b400] text-white px-6 py-2 rounded-l-lg font-semibold">
            Login
          </button>
          <button className="bg-gray-200 text-gray-600 px-6 py-2 rounded-r-lg font-semibold">
            Register
          </button>
        </div>

        <form className="login-form" onSubmit={handleLogin}>
          <div className="input-group mb-4">
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f4b400]"
            />
          </div>

          <div className="input-group mb-6">
            <label className="block mb-1 font-medium">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f4b400]"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#f4b400] text-white py-2 rounded-md font-semibold hover:bg-[#e5a900] transition"
          >
            Log In
          </button>

          <p className="text-center mt-4 text-gray-600">
            Don’t have an account? <span className="text-[#f4b400] font-semibold">Register</span>
          </p>

          <button
            type="button"
            onClick={handleBackToHome}
            className="w-full bg-gray-500 text-white py-2 rounded-md font-semibold hover:bg-gray-600 transition mt-4"
          >
            Back to Home
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
