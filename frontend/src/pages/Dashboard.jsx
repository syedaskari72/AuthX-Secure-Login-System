import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Navbar from '../components/Navbar';
import { FiUser, FiMail, FiPhone, FiCheckCircle, FiCalendar } from 'react-icons/fi';

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    document.title = 'Dashboard - AuthX';
  }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.name}! 👋
          </h1>
          <p className="text-gray-600">
            Your account is verified and ready to use.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Profile Card */}
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Profile Information</h2>
              {user?.isVerified && (
                <div className="flex items-center space-x-2 text-green-600">
                  <FiCheckCircle />
                  <span className="text-sm font-semibold">Verified</span>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                <FiUser className="text-primary-600 text-xl mt-1" />
                <div>
                  <p className="text-sm text-gray-600">Full Name</p>
                  <p className="text-lg font-semibold text-gray-900">{user?.name}</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                <FiMail className="text-primary-600 text-xl mt-1" />
                <div>
                  <p className="text-sm text-gray-600">Email Address</p>
                  <p className="text-lg font-semibold text-gray-900">{user?.email}</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                <FiPhone className="text-primary-600 text-xl mt-1" />
                <div>
                  <p className="text-sm text-gray-600">Phone Number</p>
                  <p className="text-lg font-semibold text-gray-900">{user?.phone}</p>
                </div>
              </div>

              {user?.createdAt && (
                <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                  <FiCalendar className="text-primary-600 text-xl mt-1" />
                  <div>
                    <p className="text-sm text-gray-600">Member Since</p>
                    <p className="text-lg font-semibold text-gray-900">
                      {formatDate(user.createdAt)}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Stats Card */}
          <div className="card">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Account Status</h2>
            
            <div className="space-y-4">
              <div className="p-6 bg-gradient-to-r from-green-50 to-green-100 rounded-lg border-2 border-green-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-green-700 font-medium">Account Status</p>
                    <p className="text-2xl font-bold text-green-900">Active</p>
                  </div>
                  <div className="text-4xl">✅</div>
                </div>
              </div>

              <div className="p-6 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg border-2 border-blue-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-blue-700 font-medium">Email Verification</p>
                    <p className="text-2xl font-bold text-blue-900">Verified</p>
                  </div>
                  <div className="text-4xl">📧</div>
                </div>
              </div>

              <div className="p-6 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg border-2 border-purple-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-purple-700 font-medium">Phone Verification</p>
                    <p className="text-2xl font-bold text-purple-900">Verified</p>
                  </div>
                  <div className="text-4xl">📱</div>
                </div>
              </div>

              <div className="p-6 bg-gradient-to-r from-primary-50 to-primary-100 rounded-lg border-2 border-primary-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-primary-700 font-medium">Security Level</p>
                    <p className="text-2xl font-bold text-primary-900">High</p>
                  </div>
                  <div className="text-4xl">🔒</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-8 card">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Protected Features</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-gradient-to-br from-primary-50 to-primary-100 rounded-lg">
              <div className="text-4xl mb-3">🔐</div>
              <h3 className="font-semibold text-gray-900 mb-2">Secure Access</h3>
              <p className="text-sm text-gray-600">
                Your account is protected with JWT authentication
              </p>
            </div>

            <div className="text-center p-6 bg-gradient-to-br from-primary-50 to-primary-100 rounded-lg">
              <div className="text-4xl mb-3">🛡️</div>
              <h3 className="font-semibold text-gray-900 mb-2">Data Protection</h3>
              <p className="text-sm text-gray-600">
                All sensitive data is encrypted and secure
              </p>
            </div>

            <div className="text-center p-6 bg-gradient-to-br from-primary-50 to-primary-100 rounded-lg">
              <div className="text-4xl mb-3">⚡</div>
              <h3 className="font-semibold text-gray-900 mb-2">Fast & Reliable</h3>
              <p className="text-sm text-gray-600">
                Built with modern MERN stack technology
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;