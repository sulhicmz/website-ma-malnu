@echo off
REM GitHub Project Boards Setup Script (Windows)
REM This script creates and configures project boards for the website-ma-malnu repository

setlocal enabledelayedexpansion

REM Configuration
set REPO_OWNER=sulhicmz
set REPO_NAME=website-ma-malnu

echo 🚀 Setting up GitHub Project Boards for %REPO_OWNER%/%REPO_NAME%
echo ================================================================

REM Check if gh CLI is installed
gh --version >nul 2>&1
if errorlevel 1 (
    echo ❌ GitHub CLI (gh) is not installed. Please install it first.
    echo Visit: https://cli.github.com/manual/installation
    pause
    exit /b 1
)

REM Check authentication
gh auth status >nul 2>&1
if errorlevel 1 (
    echo ❌ Not authenticated with GitHub CLI. Please run 'gh auth login' first.
    pause
    exit /b 1
)

echo ✅ GitHub CLI authenticated successfully

REM Function to create a project board
:create_project
set project_name=%~1
set project_description=%~2

echo 📋 Creating project: %project_name%

REM Create project using GitHub CLI
gh project create --owner "%REPO_OWNER%" --title "%project_name%" --description "%project_description%" --format json > project_temp.json

REM Get project ID (requires jq for JSON parsing)
if exist "jq.exe" (
    for /f "delims=" %%i in ('jq -r ".id" project_temp.json') do set project_id=%%i
    echo ✅ Created project '%project_name%' with ID: !project_id!
) else (
    echo ⚠️ jq not found. Project created but ID not extracted.
    echo Please install jq from https://stedolan.github.io/jq/download/
)

REM Clean up temp file
if exist project_temp.json del project_temp.json

goto :eof

REM Main execution
:main
echo 📁 Creating project boards...

REM Note: This is a simplified version. Full implementation would require
REM more complex JSON parsing and column creation logic.

echo.
echo 🎯 Creating Backlog Management Board...
call :create_project "📋 Backlog Management" "Repository backlog for future work and low priority items"

echo.
echo 🚀 Creating Active Sprint Board...
call :create_project "🚀 Active Sprint" "Current sprint work and high priority items"

echo.
echo 🐛 Creating Bug Tracking Board...
call :create_project "🐛 Bug Tracking" "Bug reports and fixes tracking"

echo.
echo 🎓 Creating PPDB System Board...
call :create_project "🎓 PPDB System" "PPDB registration system issues and improvements"

echo.
echo 📦 Creating Release Planning Board...
call :create_project "📦 Release Planning" "Upcoming releases and deployment planning"

echo.
echo 📚 Creating Documentation Board...
call :create_project "📚 Documentation" "Documentation improvements and knowledge base"

echo.
echo 🎉 Project boards setup completed!
echo.
echo 📊 Summary of created boards:
echo   📋 Backlog Management: https://github.com/orgs/%REPO_OWNER%/projects
echo   🚀 Active Sprint: https://github.com/orgs/%REPO_OWNER%/projects
echo   🐛 Bug Tracking: https://github.com/orgs/%REPO_OWNER%/projects
echo   🎓 PPDB System: https://github.com/orgs/%REPO_OWNER%/projects
echo   📦 Release Planning: https://github.com/orgs/%REPO_OWNER%/projects
echo   📚 Documentation: https://github.com/orgs/%REPO_OWNER%/projects
echo.
echo 💡 Next steps:
echo   1. Visit the project boards to verify setup
echo   2. Manually create columns for each project
echo   3. Configure automation workflows to sync issues
echo   4. Set up notifications for project updates
echo.
echo 🔗 GitHub Projects: https://github.com/orgs/%REPO_OWNER%/projects
echo.
echo ⚠️ Note: For full automation, please run the bash version or install jq for JSON parsing.

pause
goto :eof

call :main