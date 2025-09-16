@echo off
echo Starting E-Commerce Application...
echo.

echo Setting up Java environment...
set JAVA_HOME=C:\Program Files\Java\jdk-24
set PATH=%JAVA_HOME%\bin;%PATH%

echo Starting Backend (Spring Boot)...
start "Backend" cmd /k "set JAVA_HOME=C:\Program Files\Java\jdk-24 && set PATH=%JAVA_HOME%\bin;%PATH% && .\mvnw.cmd spring-boot:run"

echo Waiting 15 seconds for backend to start...
timeout /t 15 /nobreak > nul

echo Starting Frontend (React)...
start "Frontend" cmd /k "cd frontend && npm start"

echo.
echo Application is starting up!
echo Backend will be available at: http://localhost:8080
echo Frontend will be available at: http://localhost:3000
echo.
echo Demo Accounts:
echo Admin: username=admin, password=admin123
echo User: username=user, password=user123
echo.
pause

