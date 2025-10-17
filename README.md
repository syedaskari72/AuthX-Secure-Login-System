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

## 🚀 Deployment

AuthX is deployment-ready with **Frontend on Vercel** and **Backend on Render**.

### Deployment Stack

- **Frontend**: Vercel (Free tier, Global CDN, Instant deployments)
- **Backend**: Render (Free tier, Auto-deploy from GitHub)
- **Database**: MongoDB Atlas (Free tier, 512MB storage)
- **Email**: Gmail SMTP (Free, 500 emails/day)

### Quick Deploy

1. **Push code to GitHub**
2. **Deploy backend on Render** (Web Service)
3. **Deploy frontend on Vercel** (Static Site)
4. **Configure environment variables**
5. **Done!** 🎉

### 📚 Deployment Guide

See **[DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)** for complete step-by-step instructions.

### Deployment Files Included

- ✅ `vercel.json` - Vercel configuration
- ✅ `render.yaml` - Render configuration
- ✅ `vite.config.js` - Production build optimization
- ✅ `.env.example` files - Environment templates

### Environment Variables

**Backend** (Render):
```env
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/authx
JWT_SECRET=your_32_char_secret_key
JWT_EXPIRE=7d
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-16-char-app-password
EMAIL_FROM=AuthX <noreply@authx.com>
OTP_EXPIRY_MINUTES=5
FRONTEND_URL=https://your-app.vercel.app
```

**Frontend** (Vercel):
```env
VITE_API_URL=https://your-backend.onrender.com/api
```

### Prerequisites

1. **GitHub account** - For code repository
2. **MongoDB Atlas** - Free database (512MB)
3. **Render account** - Free backend hosting
4. **Vercel account** - Free frontend hosting
5. **Gmail account** - For sending OTP emails

## 📦 Installation

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/authx.git
   cd authx
   ```

2. **Install dependencies**
   ```bash
   npm run install-all
   ```
   Or manually:
   ```bash
   cd backend && npm install
   cd ../frontend && npm install
   ```

3. **Configure environment variables**
   ```bash
   # Backend
   cd backend
   cp .env.example .env
   # Edit .env with your credentials
   
   # Frontend
   cd ../frontend
   cp .env.example .env
   # Edit .env with your API URL
   ```

4. **Start MongoDB** (if running locally)
   ```bash
   mongod
   ```

5. **Run the application**
   ```bash
   # From root directory
   npm run dev
   ```
   Or separately:
   ```bash
   # Terminal 1 - Backend
   cd backend && npm run dev
   
   # Terminal 2 - Frontend
   cd frontend && npm run dev
   ```

6. **Access the application**
   - Frontend: http://localhost:5173
   - Backend: http://localhost:5000

## 🧪 Testing

### Test User Registration
1. Go to http://localhost:5173/signup
2. Fill in the registration form
3. Check email/phone for OTP
4. Verify OTP
5. Access dashboard

### Test API Endpoints
```bash
# Health check
curl http://localhost:5000/

# Register user
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","phone":"+1234567890","password":"Test@123"}'
```

See [API_DOCUMENTATION.md](API_DOCUMENTATION.md) for complete API reference.

## 🔧 Configuration

### Backend Configuration

The backend uses environment variables for configuration. Copy `.env.example` to `.env` and update:

```env
# Required
MONGODB_URI=mongodb://localhost:27017/authx
JWT_SECRET=your_secret_key_min_32_chars
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password

# Optional (for SMS)
TWILIO_ACCOUNT_SID=your_sid
TWILIO_AUTH_TOKEN=your_token
TWILIO_PHONE_NUMBER=+1234567890
```

### Frontend Configuration

Create `.env` in frontend directory:

```env
VITE_API_URL=http://localhost:5000/api
```

For production, update with your deployed backend URL.

## 📚 Documentation

- **[API_DOCUMENTATION.md](API_DOCUMENTATION.md)** - Complete API reference with examples
- **[DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)** - Step-by-step deployment guide (Vercel + Render)
- **[CHANGES_SUMMARY.md](CHANGES_SUMMARY.md)** - Project changes and updates

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 👨‍💻 Author

Your Name - [GitHub Profile](https://github.com/yourusername)

## 🙏 Acknowledgments

- MongoDB for the database
- Express.js for the backend framework
- React.js for the frontend library
- Node.js for the runtime environment
- Nodemailer for email service
- Twilio for SMS service
- All other open-source libraries used in this project

## 📞 Support

For support, email your-email@example.com or open an issue in the repository.

## 🔮 Future Enhancements

- [ ] Social authentication (Google, Facebook, GitHub)
- [ ] Two-factor authentication (2FA)
- [ ] Email verification link option
- [ ] Password strength meter
- [ ] User profile management
- [ ] Admin dashboard
- [ ] Activity logs
- [ ] Session management
- [ ] Remember me functionality
- [ ] Account deletion
- [ ] Export user data
- [ ] Multi-language support
- [ ] Dark mode
- [ ] Progressive Web App (PWA)

## ⚡ Performance

- Optimized build with code splitting
- Lazy loading for routes
- Image optimization
- Gzip compression
- Browser caching
- CDN ready

## 🔐 Security Features

- ✅ HTTPS enforcement (in production)
- ✅ Helmet.js security headers
- ✅ Rate limiting
- ✅ CORS protection
- ✅ XSS protection
- ✅ SQL injection prevention
- ✅ Password hashing (bcrypt)
- ✅ JWT token authentication
- ✅ OTP hashing
- ✅ Input validation
- ✅ Environment variable protection

## 📊 Project Stats

- **Backend**: Node.js + Express.js
- **Frontend**: React.js + Vite
- **Database**: MongoDB
- **Authentication**: JWT + OTP
- **Styling**: Tailwind CSS
- **State Management**: Redux Toolkit
- **API Calls**: Axios
- **Email**: Nodemailer
- **SMS**: Twilio

---

**Made with ❤️ using MERN Stack**

⭐ Star this repository if you find it helpful!

