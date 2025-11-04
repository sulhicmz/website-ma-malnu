# Repository Configuration Commands

# Set repository topics
gh repo edit sulhicmz/website-ma-malnu --add-topic "nextjs" --add-topic "tailwindcss" --add-topic "sanity" --add-topic "typescript" --add-topic "education"

# Set repository visibility (if needed)
# gh repo edit sulhicmz/website-ma-malnu --visibility public

# Enable security features
gh api repos/sulhicmz/website-ma-malnu/automated-security-fixes --method PUT

# Enable vulnerability alerts
gh api repos/sulhicmz/website-ma-malnu/vulnerability-alerts --method PUT

# Set default branch
gh repo edit sulhicmz/website-ma-malnu --default-branch main

# Create labels for better organization
gh label create "bug" --color "d73a4a" --description "Something isn't working"
gh label create "enhancement" --color "a2eeef" --description "New feature or request"
gh label create "documentation" --color "0075ca" --description "Improvements or additions to documentation"
gh label create "dependencies" --color "0366d6" --description "Pull requests that update a dependency file"
gh label create "performance" --color "1d76db" --description "Performance related issues"
gh label create "security" --color "ee0701" --description "Security related issues"
gh label create "accessibility" --color "fbca04" --description "Accessibility related issues"
gh label create "triage" --color "fef2c0" --description "Issues that need to be triaged"
gh label create "wontfix" --color "ffffff" --description "This will not be worked on"
gh label create "question" --color "d876e3" --description "Further information is requested"