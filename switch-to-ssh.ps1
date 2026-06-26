param(
    [string]$Repo = "californiafitzleo/californiafitzleo.github.io.git",
    [string]$Remote = "origin"
)

$ErrorActionPreference = "Continue"

function Write-ColorOutput {
    param(
        [string]$Message,
        [string]$Color = "White"
    )
    Write-Host $Message -ForegroundColor $Color
}

Write-ColorOutput "=== Switch Remote to SSH ===" "Cyan"
Write-ColorOutput ""

Write-ColorOutput "Current remote URL:" "Yellow"
git remote -v
Write-ColorOutput ""

$sshUrl = "git@github.com:$Repo"
Write-ColorOutput "Target SSH URL: $sshUrl" "Cyan"
Write-ColorOutput ""

Write-ColorOutput "Testing SSH connection..." "Yellow"
$sshOutput = & ssh -T git@github.com 2>&1
$sshOutput | ForEach-Object {
    Write-Host "  $_"
}

if ($LASTEXITCODE -eq 1) {
    Write-ColorOutput "  SSH authentication successful!" "Green"
} elseif ($LASTEXITCODE -eq 255) {
    Write-ColorOutput "  SSH connection failed. Make sure you've added your key to GitHub." "Red"
    Write-ColorOutput "  Run .\setup-ssh.ps1 first to generate and set up SSH keys." "Yellow"
    exit 1
} else {
    Write-ColorOutput "  SSH test exit code: $LASTEXITCODE" "Yellow"
}

Write-ColorOutput "`nSwitching remote URL..." "Yellow"
git remote set-url $Remote $sshUrl

Write-ColorOutput "`nUpdated remote URL:" "Green"
git remote -v

Write-ColorOutput "`nTesting new remote..." "Yellow"
$lsOutput = & git ls-remote --heads $Remote 2>&1
$lsOutput | Select-Object -First 3 | ForEach-Object {
    Write-Host "  $_"
}

if ($LASTEXITCODE -eq 0) {
    Write-ColorOutput "`nSuccess! Remote switched to SSH." "Green"
    Write-ColorOutput "  You can now use: git push, .\push.ps1, npm run push" "White"
} else {
    Write-ColorOutput "`nWarning: Could not verify remote connection" "Yellow"
    Write-ColorOutput "  Check your SSH key and GitHub settings" "White"
}
