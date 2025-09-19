@echo off
echo Preparing files for GitHub Pages deployment...
echo.

REM Create a temporary directory for the files
if not exist "github-upload" mkdir "github-upload"

REM Copy all necessary files
copy "index.html" "github-upload\"
copy "styles.css" "github-upload\"
copy "script.js" "github-upload\"
copy "businessLogo.png" "github-upload\"

echo Files copied to 'github-upload' folder:
dir "github-upload"

echo.
echo ========================================
echo READY FOR GITHUB UPLOAD!
echo ========================================
echo.
echo Next steps:
echo 1. Go to github.com and create a new repository
echo 2. Upload all files from the 'github-upload' folder
echo 3. Enable GitHub Pages in repository settings
echo 4. Get your live URL!
echo.
echo See 'github-setup.md' for detailed instructions.
echo.
pause
