@echo off
echo ========================================
echo    AuthX Installation Script
echo ========================================
echo.

echo [1/4] Installing Backend Dependencies...
cd backend
call npm install
if %errorlevel% neq 0 (
    echo ERROR: Backend installation failed!
    pause
    exit /b 1
)
echo Backend dependencies installed successfully!
echo.

echo [2/4] Installing Frontend Dependencies...
cd ..\frontend
call npm install
if %errorlevel% neq 0 (
    echo ERROR: Frontend installation failed!
    pause
    exit /b 1
)
echo Frontend dependencies installed successfully!
echo.

echo [3/4] Setting up environment files...
cd ..
if not exist "backend\.env" (
    copy "backend\.env.example" "backend\.env"
    echo Created backend\.env - Please configure it!
) else (
    echo backend\.env already exists
)

if not exist "frontend\.env" (
    copy "frontend\.env.example" "frontend\.env"
    echo Created frontend\.env - Please configure it!
) else (
    echo frontend\.env already exists
)
echo.

echo [4/4] Installation Complete!
echo.
echo ========================================
echo    Next Steps:
echo ========================================
echo 1. Configure backend\.env with your credentials
echo 2. Configure frontend\.env if needed
echo 3. Start MongoDB
echo 4. Run: npm run dev (in backend folder)
echo 5. Run: npm run dev (in frontend folder)
echo.
echo See SETUP.md for detailed instructions!
echo ========================================
pause