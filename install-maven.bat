@echo off
echo Installing Maven for Windows...

REM Create a tools directory
if not exist "tools" mkdir tools
cd tools

REM Download Maven (using PowerShell)
echo Downloading Maven...
powershell -Command "Invoke-WebRequest -Uri 'https://dlcdn.apache.org/maven/maven-3/3.9.6/binaries/apache-maven-3.9.6-bin.zip' -OutFile 'maven.zip'"

REM Extract Maven
echo Extracting Maven...
powershell -Command "Expand-Archive -Path 'maven.zip' -DestinationPath '.' -Force"

REM Set environment variables for this session
set MAVEN_HOME=%CD%\apache-maven-3.9.6
set PATH=%MAVEN_HOME%\bin;%PATH%

echo Maven installed successfully!
echo MAVEN_HOME is set to: %MAVEN_HOME%
echo.
echo You can now run: mvn --version
echo.
echo To make this permanent, add these to your system environment variables:
echo MAVEN_HOME=%MAVEN_HOME%
echo PATH=%PATH%

cd ..
echo.
echo Running Maven commands...
mvn --version

