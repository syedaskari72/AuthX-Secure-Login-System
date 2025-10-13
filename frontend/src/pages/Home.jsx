import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Navbar from '../components/Navbar';
import { FiShield, FiMail, FiSmartphone, FiLock, FiCheckCircle } from 'react-icons/fi';

const Home = () => {
  const { token, user } = useSelector((state) => state.auth);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Welcome to <span className="text-primary-600">AuthX</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            A secure, full-stack MERN authentication system with OTP verification via email and phone
          </p>
          
          {token && user ? (
            <Link
              to="/dashboard"
              className="inline-block px-8 py-4 bg-primary-600 text-white text-lg font-semibold rounded-lg hover:bg-primary-700 transition-colors duration-200 shadow-lg"
            >
              Go to Dashboard
            </Link>
          ) : (
            <div className="flex justify-center space-x-4">
              <Link
                to="/signup"
                className="px-8 py-4 bg-primary-600 text-white text-lg font-semibold rounded-lg hover:bg-primary-700 transition-colors duration-200 shadow-lg"
              >
                Get Started
              </Link>
              <Link
                to="/login"
                className="px-8 py-4 bg-white text-primary-600 text-lg font-semibold rounded-lg hover:bg-gray-50 transition-colors duration-200 shadow-lg border-2 border-primary-600"
              >
                Login
              </Link>
            </div>
          )}
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          <div className="card text-center">
            <div className="flex justify-center mb-4">
              <FiShield className="text-5xl text-primary-600" />
            </div>
            <h3 className="text-xl font-bold mb-2">Secure Authentication</h3>
            <p className="text-gray-600">
              JWT-based authentication with bcrypt password hashing for maximum security
            </p>
          </div>

          <div className="card text-center">
            <div className="flex justify-center mb-4">
              <FiMail className="text-5xl text-primary-600" />
            </div>
            <h3 className="text-xl font-bold mb-2">Email OTP</h3>
            <p className="text-gray-600">
              Verify your account with OTP sent directly to your email using Nodemailer
            </p>
          </div>

          <div className="card text-center">
            <div className="flex justify-center mb-4">
              <FiSmartphone className="text-5xl text-primary-600" />
            </div>
            <h3 className="text-xl font-bold mb-2">Phone OTP</h3>
            <p className="text-gray-600">
              Receive verification codes via SMS using Twilio API integration
            </p>
          </div>

          <div className="card text-center">
            <div className="flex justify-center mb-4">
              <FiLock className="text-5xl text-primary-600" />
            </div>
            <h3 className="text-xl font-bold mb-2">Password Reset</h3>
            <p className="text-gray-600">
              Secure password recovery with OTP verification via email and phone
            </p>
          </div>

          <div className="card text-center">
            <div className="flex justify-center mb-4">
              <FiCheckCircle className="text-5xl text-primary-600" />
            </div>
            <h3 className="text-xl font-bold mb-2">Account Verification</h3>
            <p className="text-gray-600">
              Two-factor verification ensures only legitimate users access the system
            </p>
          </div>

          <div className="card text-center">
            <div className="flex justify-center mb-4">
              <div className="text-5xl">⚡</div>
            </div>
            <h3 className="text-xl font-bold mb-2">Fast & Reliable</h3>
            <p className="text-gray-600">
              Built with modern MERN stack for optimal performance and scalability
            </p>
          </div>
        </div>

        {/* Tech Stack Section */}
        <div className="card max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Tech Stack</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-semibold mb-3 text-primary-600">Frontend</h3>
              <ul className="space-y-2 text-gray-700">
                <li>✓ React.js with Hooks</li>
                <li>✓ Redux Toolkit for State Management</li>
                <li>✓ Tailwind CSS for Styling</li>
                <li>✓ React Router for Navigation</li>
                <li>✓ Axios for API Calls</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-3 text-primary-600">Backend</h3>
              <ul className="space-y-2 text-gray-700">
                <li>✓ Node.js + Express.js</li>
                <li>✓ MongoDB with Mongoose</li>
                <li>✓ JWT Authentication</li>
                <li>✓ Nodemailer for Email</li>
                <li>✓ Twilio for SMS</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;