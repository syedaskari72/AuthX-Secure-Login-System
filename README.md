# 🔐 AuthX - Full-Stack MERN Authentication System

A complete authentication system with OTP verification via Email and Phone Number, built with the MERN stack.

## ✨ Features

- **User Registration** with name, email, phone, and password
- **OTP Verification** via both Email (Nodemailer) and Phone (Twilio)
- **User Login** with email or phone + password
- **Forgot Password** with OTP verification
- **JWT Authentication** for protected routes
- **Password Hashing** with bcrypt
- **OTP Hashing** for security
- **5-minute OTP Expiry**
- **Resend OTP** functionality
- **Redux Toolkit** for state management
- **Responsive UI** with Tailwind CSS
- **Protected Dashboard** route

## 🛠️ Tech Stack

### Frontend
- React.js 18
- Redux Toolkit (State Management)
- React Router v6 (Navigation)
- Axios (API calls)
- Tailwind CSS (Styling)
- React Hot Toast (Notifications)
- React Icons
- Vite (Build tool)

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT (jsonwebtoken)
- bcryptjs (Password hashing)
- Nodemailer (Email OTP)
- Twilio (SMS OTP)
- express-validator
- express-rate-limit
- CORS

## 📁 Project Structure

```
AuthX/
├── backend/
│   ├── config/
│   │   └── database.js
│   ├── controllers/
│   │   └── authController.js
│   ├── middleware/
│   │   ├── auth.js
│   │   └── errorHandler.js
│   ├── models/
│   │   └── User.js
│   ├── routes/
│   │   └── authRoutes.js
│   ├── utils/
│   │   ├── generateToken.js
│   │   ├── generateOTP.js
│   │   ├── sendEmail.js
│   │   ├── sendSMS.js
│   │   └── emailTemplates.js
│   ├── .env.example
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Loader.jsx
│   │   │   └── Navbar.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Signup.jsx
│   │   │   ├── VerifyOTP.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── ForgotPassword.jsx
│   │   │   ├── ResetPassword.jsx
│   │   │   └── Dashboard.jsx
│   │   ├── redux/
│   │   │   ├── store.js
│   │   │   └── slices/
│   │   │       └── authSlice.js
│   │   ├── services/
│   │   │   ├── api.js
│   │   │   └── authService.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── .env.example
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── package.json
└── README.md
```

## 🎨 Frontend Pages

1. **Home** (`/`) - Landing page with features
2. **Signup** (`/signup`) - User registration form
3. **Verify OTP** (`/verify-otp`) - OTP verification page
4. **Login** (`/login`) - User login form
5. **Forgot Password** (`/forgot-password`) - Request password reset
6. **Reset Password** (`/reset-password`) - Reset password with OTP
7. **Dashboard** (`/dashboard`) - Protected user dashboard

## 🔒 Security Features

- ✅ Password hashing with bcrypt (10 salt rounds)
- ✅ OTP hashing before storing in database
- ✅ JWT token authentication
- ✅ 5-minute OTP expiry
- ✅ Rate limiting on API endpoints
- ✅ CORS configuration
- ✅ Environment variables for sensitive data
- ✅ Protected routes (frontend & backend)
- ✅ Input validation
- ✅ Error handling

## 🎯 User Flow

### Registration Flow
1. User fills signup form (name, email, phone, password)
2. Backend validates input and checks for duplicates
3. User account created (unverified)
4. 6-digit OTP generated and hashed
5. OTP sent to email (Nodemailer) and phone (Twilio)
6. User enters OTP on verification page
7. Backend verifies OTP
8. Account marked as verified
9. JWT token generated and returned
10. User redirected to dashboard

### Login Flow
1. User enters email/phone and password
2. Backend validates credentials
3. Checks if account is verified
4. JWT token generated and returned
5. User redirected to dashboard

### Forgot Password Flow
1. User enters email or phone
2. Backend generates and sends OTP
3. User enters OTP and new password
4. Backend verifies OTP
5. Password updated and hashed
6. User redirected to login

## 📱 Responsive Design

The application is fully responsive and works on:
- 📱 Mobile devices
- 📱 Tablets
- 💻 Desktops
- 🖥️ Large screens

## 🐛 Error Handling

- Invalid credentials
- Duplicate email/phone
- Expired OTP
- Invalid OTP
- Unverified account
- Missing fields
- Network errors
- Database errors

