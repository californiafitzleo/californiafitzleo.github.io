param(
    [string]$Email = "your-email@example.com",
    [string]$KeyType = "ed25519"
)

$ErrorActionPreference = "Continue"

function Write-ColorOutput {
    param(
        [string]$Message,
        [string]$Color = "White"
    )
    Write-Host $Message -ForegroundColor $Color
}

Write-ColorOutput "=== GitHub SSH Setup ===" "Cyan"
Write-ColorOutput ""

$sshDir = "$env:USERPROFILE\.ssh"
$keyFile = "$sshDir\id_$KeyType"
$pubKeyFile = "$keyFile.pub"

if (Test-Path $pubKeyFile) {
    Write-ColorOutput "SSH key already exists at: $pubKeyFile" "Yellow"
    $confirm = Read-Host "Regenerate? (y/N)"
    if ($confirm -ne "y" -and $confirm -ne "Y") {
        Write-ColorOutput "`nYour public key:" "Green"
        Get-Content $pubKeyFile
        Write-ColorOutput "`nCopy the key above and add it to GitHub:" "Yellow"
        Write-ColorOutput "  https://github.com/settings/keys" "Cyan"
        exit 0
    }
}

if (-not (Test-Path $sshDir)) {
    New-Item -ItemType Directory -Path $sshDir -Force | Out-Null
    Write-ColorOutput "Created .ssh directory" "Green"
}

Write-ColorOutput "`nGenerating SSH key..." "Yellow"
ssh-keygen -t $KeyType -C $Email -f $keyFile -N '""'

if ($LASTEXITCODE -ne 0) {
    Write-ColorOutput "Failed to generate SSH key" "Red"
    exit 1
}

Write-ColorOutput "`nSSH key generated successfully!" "Green"
Write-ColorOutput "  Private key: $keyFile" "White"
Write-ColorOutput "  Public key:  $pubKeyFile" "White"

Write-ColorOutput "`nYour public key:" "Cyan"
Write-ColorOutput "--------------------------------------------------" "Gray"
Get-Content $pubKeyFile
Write-ColorOutput "--------------------------------------------------" "Gray"

Write-ColorOutput "`nNext steps:" "Yellow"
Write-ColorOutput "  1. Copy the public key above" "White"
Write-ColorOutput "  2. Go to https://github.com/settings/keys" "White"
Write-ColorOutput "  3. Click 'New SSH key'" "White"
Write-ColorOutput "  4. Paste the key and save" "White"
Write-ColorOutput "  5. Run .\switch-to-ssh.ps1 to switch remote URL" "White"

Write-ColorOutput "`nTesting SSH connection after adding key:" "Yellow"
Write-ColorOutput "  ssh -T git@github.com" "Cyan"
