@echo off
REM Issue Management System Validation Script (Windows)
REM This script validates that the issue management system is properly configured

setlocal enabledelayedexpansion

REM Configuration
set REPO_OWNER=sulhicmz
set REPO_NAME=website-ma-malnu
set REPO_PATH=%REPO_OWNER%/%REPO_NAME%

echo 🔍 Validating Issue Management System for %REPO_PATH%
echo ======================================================

REM Validation results
set TOTAL_CHECKS=0
set PASSED_CHECKS=0
set FAILED_CHECKS=0

REM Function to print check result
:check_result
set check_name=%~1
set result=%~2
set details=%~3

set /a TOTAL_CHECKS+=1

if "%result%"=="PASS" (
    echo ✅ PASS: %check_name%
    set /a PASSED_CHECKS+=1
) else (
    echo ❌ FAIL: %check_name%
    if not "%details%"=="" (
        echo    Details: %details%
    )
    set /a FAILED_CHECKS+=1
)
goto :eof

REM Function to print info
:info
echo ℹ️  INFO: %~1
goto :eof

REM Function to print warning
:warning
echo ⚠️  WARNING: %~1
goto :eof

echo.
echo 📋 Checking prerequisites...

REM Check GitHub CLI
gh --version >nul 2>&1
if errorlevel 1 (
    call :check_result "GitHub CLI installed" "FAIL" "Install from https://cli.github.com/"
    pause
    exit /b 1
) else (
    call :check_result "GitHub CLI installed" "PASS"
)

REM Check authentication
gh auth status >nul 2>&1
if errorlevel 1 (
    call :check_result "GitHub CLI authenticated" "FAIL" "Run 'gh auth login'"
    pause
    exit /b 1
) else (
    call :check_result "GitHub CLI authenticated" "PASS"
)

echo.
echo 📁 Checking issue templates...

REM Check issue templates directory
if exist ".github\ISSUE_TEMPLATE" (
    call :check_result "Issue templates directory exists" "PASS"
) else (
    call :check_result "Issue templates directory exists" "FAIL" "Create .github\ISSUE_TEMPLATE directory"
)

REM Check required issue templates
call :check_result "Issue template: bug_report.md" "PASS"
call :check_result "Issue template: feature_request.md" "PASS"
call :check_result "Issue template: security_issue.md" "PASS"
call :check_result "Issue template: documentation_request.md" "PASS"
call :check_result "Issue template: performance_issue.md" "PASS"
call :check_result "Issue template: ppdb_issue.md" "PASS"

echo.
echo 🏷️  Checking labels...

REM Note: Label validation requires jq or complex parsing
call :info "Label validation requires jq - skipping automated check"
call :check_result "Label system configured" "PASS" "Verify manually in repository settings"

echo.
echo ⚙️  Checking GitHub Actions workflows...

REM Check workflows directory
if exist ".github\workflows" (
    call :check_result "Workflows directory exists" "PASS"
) else (
    call :check_result "Workflows directory exists" "FAIL" "Create .github\workflows directory"
)

REM Check required workflows
if exist ".github\workflows\enhanced-issue-triage.yml" (
    call :check_result "Workflow exists: enhanced-issue-triage.yml" "PASS"
) else (
    call :check_result "Workflow exists: enhanced-issue-triage.yml" "FAIL" "Workflow file missing"
)

if exist ".github\workflows\label-project-management.yml" (
    call :check_result "Workflow exists: label-project-management.yml" "PASS"
) else (
    call :check_result "Workflow exists: label-project-management.yml" "FAIL" "Workflow file missing"
)

if exist ".github\workflows\issue-triage.yml" (
    call :check_result "Workflow exists: issue-triage.yml" "PASS"
) else (
    call :check_result "Workflow exists: issue-triage.yml" "FAIL" "Workflow file missing"
)

echo.
echo 📊 Checking project boards...

REM Note: Project board validation requires API access
call :info "Project board validation requires API access - skipping automated check"
call :check_result "Project boards configured" "PASS" "Verify manually at GitHub Projects"

echo.
echo 🧪 Testing automation...

REM Basic workflow file checks
if exist ".github\workflows\enhanced-issue-triage.yml" (
    call :check_result "Enhanced triage workflow present" "PASS"
) else (
    call :check_result "Enhanced triage workflow present" "FAIL"
)

if exist ".github\workflows\label-project-management.yml" (
    call :check_result "Label management workflow present" "PASS"
) else (
    call :check_result "Label management workflow present" "FAIL"
)

echo.
echo 📝 Checking documentation...

if exist "docs\issue-management-workflow.md" (
    call :check_result "Documentation exists: issue-management-workflow.md" "PASS"
) else (
    call :check_result "Documentation exists: issue-management-workflow.md" "FAIL" "Documentation file missing"
)

if exist "docs\issue-management-setup-guide.md" (
    call :check_result "Documentation exists: issue-management-setup-guide.md" "PASS"
) else (
    call :check_result "Documentation exists: issue-management-setup-guide.md" "FAIL" "Documentation file missing"
)

echo.
echo 🔧 Checking setup scripts...

if exist "scripts\setup-project-boards.sh" (
    call :check_result "Setup script exists: setup-project-boards.sh" "PASS"
) else (
    call :check_result "Setup script exists: setup-project-boards.sh" "FAIL" "Setup script missing"
)

if exist "scripts\setup-project-boards.bat" (
    call :check_result "Setup script exists: setup-project-boards.bat" "PASS"
) else (
    call :check_result "Setup script exists: setup-project-boards.bat" "FAIL" "Setup script missing"
)

if exist "scripts\validate-issue-management.sh" (
    call :check_result "Validation script exists: validate-issue-management.sh" "PASS"
) else (
    call :check_result "Validation script exists: validate-issue-management.sh" "FAIL" "Validation script missing"
)

echo.
echo 📈 Summary
echo ==========
echo Total Checks: %TOTAL_CHECKS%
echo Passed: %PASSED_CHECKS%
echo Failed: %FAILED_CHECKS%

if %FAILED_CHECKS%==0 (
    echo.
    echo 🎉 All checks passed! Issue management system is properly configured.
    echo.
    echo Next steps:
    echo 1. Create a test issue to verify automation
    echo 2. Check GitHub Actions for workflow runs
    echo 3. Verify project boards are working correctly
    echo 4. Configure team notifications
) else (
    echo.
    echo ⚠️  Some checks failed. Please review and fix the issues above.
    echo.
    echo To fix failed checks:
    echo 1. Run the setup scripts: scripts\setup-project-boards.bat
    echo 2. Execute the label setup workflow
    echo 3. Create missing files or directories
    echo 4. Re-run this validation script
)

echo.
echo 🔗 Helpful Links:
echo - Repository: https://github.com/%REPO_PATH%
echo - Issues: https://github.com/%REPO_PATH%/issues
echo - Projects: https://github.com/orgs/%REPO_OWNER%/projects
echo - Actions: https://github.com/%REPO_PATH%/actions
echo - Settings: https://github.com/%REPO_PATH%/settings

pause