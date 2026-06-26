param(
    [string]$Repo = "californiafitzleo/californiafitzleo.github.io.git",
    [string]$Remote = "origin",
    [string]$Protocol = "https"
)

$ErrorActionPreference = "Continue"

function Write-ColorOutput {
    param(
        [string]$Message,
        [string]$Color = "White"
    )
    Write-Host $Message -ForegroundColor $Color
}

Write-ColorOutput "=== Switch Git Remote Protocol ===" "Cyan"
Write-ColorOutput ""

if ($Protocol -eq "ssh") {
    $newUrl = "git@github.com:$Repo"
} else {
    $newUrl = "https://github.com/$Repo"
}

Write-ColorOutput "Current remote:" "Yellow"
git remote -v
Write-ColorOutput ""

Write-ColorOutput "Switching to: $newUrl" "Cyan"
git remote set-url $Remote $newUrl

Write-ColorOutput ""
Write-ColorOutput "Updated remote:" "Green"
git remote -v

if ($Protocol -eq "https") {
    Write-ColorOutput ""
    Write-ColorOutput "=== HTTPS + PAT Setup ===" "Yellow"
    Write-ColorOutput ""
    Write-ColorOutput "To use HTTPS, you need a Personal Access Token (PAT):" "White"
    Write-ColorOutput ""
    Write-ColorOutput "1. Create a PAT:" "Cyan"
    Write-ColorOutput "   Go to: https://github.com/settings/tokens" "White"
    Write-ColorOutput "   Click 'Generate new token' -> 'Generate new token (classic)'" "White"
    Write-ColorOutput "   Select scopes: 'repo' (full control of private repositories)" "White"
    Write-ColorOutput "   Click 'Generate token' and copy the token" "White"
    Write-ColorOutput ""
    Write-ColorOutput "2. Use the token when pushing:" "Cyan"
    Write-ColorOutput "   Username: your GitHub username" "White"
    Write-ColorOutput "   Password: the PAT token you just created" "White"
    Write-ColorOutput ""
    Write-ColorOutput "3. Or cache credentials with Git Credential Manager:" "Cyan"
    Write-ColorOutput "   git config --global credential.helper manager" "White"
    Write-ColorOutput "   Then git push, and enter PAT when prompted" "White"
    Write-ColorOutput ""
    Write-ColorOutput "4. Or embed token in URL (not recommended for shared machines):" "Cyan"
    Write-ColorOutput "   git remote set-url $Remote https://USERNAME:TOKEN@github.com/$Repo" "White"
}
