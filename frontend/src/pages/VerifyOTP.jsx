import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { verifyOTP, resendOTP, reset } from '../redux/slices/authSlice';
import toast from 'react-hot-toast';
import Loader from '../components/Loader';
import { FiMail } from 'react-icons/fi';

const VerifyOTP = () => {
  const [otp, setOtp] = useState('');
  const [timer, setTimer] = useState(300); // 5 minutes in seconds
  const [canResend, setCanResend] = useState(false);
  const initialMount = useRef(true);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isLoading, isError, isSuccess, message, tempUserId, token } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    console.log('VerifyOTP mounted - tempUserId from Redux:', tempUserId);
    console.log('VerifyOTP mounted - tempUserId from sessionStorage:', sessionStorage.getItem('tempUserId'));
    console.log('VerifyOTP mounted - isError:', isError, 'isSuccess:', isSuccess);
    
    // Clear any error state from previous page (like login error)
    if (isError || isSuccess) {
      console.log('Clearing error/success state from previous page');
      dispatch(reset());
    }
    
    // Give a small delay to check for tempUserId to handle race conditions
    const checkTimer = setTimeout(() => {
      // Re-check sessionStorage at the time of evaluation, not at mount time
      const sessionTempUserId = sessionStorage.getItem('tempUserId');
      console.log('VerifyOTP checking after 100ms - Redux:', tempUserId, 'Session:', sessionTempUserId);
      
      // If we have tempUserId in sessionStorage but not in Redux, something is wrong with state initialization
      if (!sessionTempUserId) {
        console.log('No tempUserId found in sessionStorage, redirecting to signup');
        navigate('/signup');
      } else {
        console.log('tempUserId found in sessionStorage, staying on verify page');
      }
    }, 100);

    return () => clearTimeout(checkTimer);
  }, []); // Only run once on mount

  useEffect(() => {
    const sessionTempUserId = sessionStorage.getItem('tempUserId');
    if (!tempUserId && !sessionTempUserId) {
      return; // Don't start timer if no tempUserId
    }

    // Timer countdown
    const interval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer <= 1) {
          setCanResend(true);
          clearInterval(interval);
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [tempUserId]);

  useEffect(() => {
    // Skip on initial mount (to avoid handling login page's error state)
    if (initialMount.current) {
      initialMount.current = false;
      return;
    }

    console.log('VerifyOTP state change - isError:', isError, 'isSuccess:', isSuccess);

    if (isError && message) {
      toast.error(message);
      dispatch(reset());
    }

    if (isSuccess && token) {
      toast.success(message);
      navigate('/dashboard');
      dispatch(reset());
    }
  }, [isError, isSuccess, message, token, navigate, dispatch]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (!otp || otp.length !== 6) {
      toast.error('Please enter a valid 6-digit OTP');
      return;
    }

    const userId = tempUserId || sessionStorage.getItem('tempUserId');
    dispatch(verifyOTP({ userId, otp }));
  };

  const handleResendOTP = () => {
    if (!canResend) return;

    const userId = tempUserId || sessionStorage.getItem('tempUserId');
    dispatch(resendOTP(userId));
    setTimer(300);
    setCanResend(false);
    toast.success('OTP resent successfully!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary-600 mb-2">🔐 AuthX</h1>
          <h2 className="text-3xl font-bold text-gray-900">Verify OTP</h2>
          <p className="mt-2 text-gray-600">
            Enter the 6-digit code sent to your email
          </p>
        </div>

        <div className="card">
          <div className="flex justify-center mb-6">
            <div className="text-center">
              <FiMail className="text-3xl text-primary-600 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Email</p>
            </div>
          </div>

          <form onSubmit={onSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 text-center">
                Enter OTP
              </label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                className="input-field text-center text-2xl tracking-widest font-bold"
                placeholder="000000"
                maxLength="6"
                required
              />
            </div>

            <div className="text-center">
              {timer > 0 ? (
                <p className="text-sm text-gray-600">
                  OTP expires in:{' '}
                  <span className="font-semibold text-primary-600">
                    {formatTime(timer)}
                  </span>
                </p>
              ) : (
                <p className="text-sm text-red-600 font-semibold">OTP expired!</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-primary"
            >
              {isLoading ? <Loader /> : 'Verify OTP'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600 mb-2">Didn't receive the code?</p>
            <button
              onClick={handleResendOTP}
              disabled={!canResend || isLoading}
              className={`link-primary ${
                !canResend || isLoading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              Resend OTP
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyOTP;