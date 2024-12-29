# Secure 2FA Implementation with React and Node.js

This project demonstrates the implementation of secure Two-Factor Authentication (2FA) using React, TypeScript, and Node.js. It showcases how to integrate 2FA seamlessly into web applications by generating QR codes, validating TOTP tokens, and enhancing security with an additional authentication layer. The focus is on improving user account security and preventing unauthorized access

## 🌟 Features

- **User Authentication**
  - Email/Password-based signup and login
  - Secure session management
  - Protected routes and access control

- **Two-Factor Authentication (2FA)**
  - TOTP-based two-factor authentication
  - QR code generation for authenticator apps
  - Seamless integration with popular authenticator apps (Google Authenticator, Authy)

- **Security Features**
  - Session timeout for inactive users
  - Centralized error handling
  - Uniform API response format
  - Request logging and monitoring

- **Modern Tech Stack**
  - React with TypeScript
  - Express.js backend
  - Tailwind CSS for styling
  - Vite for fast development

## 🔄 Application Flow

1. **Authentication**
   - Users begin by signing up or logging in with their credentials
   - New users create an account, existing users use email/password

2. **2FA Setup**
   - After initial authentication, users set up 2FA
   - QR code scanning with preferred authenticator app
   - Verification of TOTP setup

3. **Secure Access**
   - Future logins require both password and TOTP
   - Session management with automatic timeout
   - Protected routes access control

## 🛠️ Technical Stack

### Frontend
- React
- TypeScript
- Tailwind CSS
- React Router
- React Context for state management
- Vite

### Backend
- Node.js
- Express.js
- TypeScript
- Speakeasy (for 2FA)
- QRCode generation
- Express Session
- CORS support

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Git

### Installation

#### 1. Clone the repository
```bash
git clone [repository-url]
```
#### 2. Install dependencies for both frontend and backend
```bash
cd nodejs-2fa
npm install #Installs backend dependencies

# Open in separate terminal
#Install frontend dependencies
cd ./client
npm install
```
#### 3. Start development servers
```bash
# Start backend server from project root
npm run dev

# Start frontend development server
cd client
npm run dev
```

## 📁 Project Structure

```txt

├── logs/                  # Log files
├── client/                # Frontend React application
│   ├── src/
│   │   ├── components/    # Reusable React components
│   │   ├── context/       # React Context providers
│   │   ├── pages/         # Application pages
│   │   ├── utils/         # Utility functions
│   │   └── App.tsx        # Main application component
│   │   # Vite configuration
│   ├── package.json
│   └── readme.md
│
│       # Backend Node.js application
├── src/
│   ├── config/         # Configuration files
│   ├── db/             # Temp Database
│   ├── controllers/    # Controller logic
│   ├── logger/         # Logger logic
│   ├── middleware/     # Express middlewares
│   ├── routes/         # API routes
│   ├── utils/          # Utility functions
│   ├── models/         # Data models
│   └── index.ts        # Server entry point
│
├── package.json
├── nodemon.json
├── tsconfig.json
└── README.md

```

## 🔒 Security Features
### Session Management

#### Secure session handling
- Automatic timeout for inactive sessions
- Session persistence across page refreshes

#### 2FA Implementation
- Time-based One-Time Password (TOTP)
- QR code generation for easy setup
- Secure token verification

#### Error Handling 
- Centralized error management
- Consistent error responses
- Detailed logging for debugging

## 🚧 Development Tasks
### Completed ✅
- User signup, login, and validation
- Protected routes implementation
- Secure session handling
- 2FA setup and verification
- QR code generation
- Session state management
- Error handling and logging
- Uniform API response format

### Planned 📋
- Backup 2FA recovery codes
- Password reset functionality
- Enhanced session management with Redis

#### 📝 Note
This project is intended as a demonstration of 2FA implementation.  While key features such as session management, error handling, and API structure are included, it may not fully adhere to all industry best practices. Further enhancements are recommended before using it.

### 👤 Author
Saquib Shaikh <br/> 📫 [contact@msaquib.com](mailto:contact@msaquib.com)