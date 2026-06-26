param(
    [string]$Branch = "source",
    [string]$Remote = "origin",
    [int]$MaxRetries = 5,
    [int]$RetryDelaySeconds = 10
)

$ErrorActionPreference = "Continue"

function Write-ColorOutput {
    param(
        [string]$Message,
        [string]$Color = "White"
    )
    Write-Host $Message -ForegroundColor $Color
}

function Test-GitRemoteConnection {
    Write-ColorOutput "Testing connection to remote..." "Yellow"
    $result = git ls-remote --heads $Remote $Branch 2>&1
    if ($LASTEXITCODE -eq 0) {
        Write-ColorOutput "  Connection OK" "Green"
        return $true
    } else {
        Write-ColorOutput "  Connection failed: $result" "Red"
        return $false
    }
}

function Invoke-GitPushWithRetry {
    param([int]$Attempt = 1)

    if ($Attempt -gt $MaxRetries) {
        Write-ColorOutput "`nFailed after $MaxRetries attempts." "Red"
        return $false
    }

    Write-ColorOutput "`n[Attempt $Attempt/$MaxRetries] Pushing $Branch to $Remote..." "Cyan"

    git push -u $Remote $Branch 2>&1 | ForEach-Object {
        Write-Host "  $_"
    }

    if ($LASTEXITCODE -eq 0) {
        Write-ColorOutput "`nPush successful!" "Green"
        return $true
    }

    $errorMsg = $Error[0].Exception.Message
    Write-ColorOutput "  Push failed with exit code: $LASTEXITCODE" "Red"

    if ($Attempt -lt $MaxRetries) {
        Write-ColorOutput "  Retrying in $RetryDelaySeconds seconds..." "Yellow"
        Start-Sleep -Seconds $RetryDelaySeconds
        return Invoke-GitPushWithRetry -Attempt ($Attempt + 1)
    }

    return $false
}

Write-ColorOutput "=== Git Push with Retry ===" "Cyan"
Write-ColorOutput ""

Write-ColorOutput "Current status:" "Yellow"
git status --short
Write-ColorOutput ""

$ahead = git rev-list --count "$Remote/$Branch..HEAD" 2>$null
if ($LASTEXITCODE -eq 0 -and $ahead -gt 0) {
    Write-ColorOutput "Local branch is ahead by $ahead commit(s)." "Yellow"
}

Write-ColorOutput ""
$success = Invoke-GitPushWithRetry

if ($success) {
    Write-ColorOutput "`n=== Done ===" "Green"
    git status
    exit 0
} else {
    Write-ColorOutput "`n=== Push Failed ===" "Red"
    Write-ColorOutput "Try these alternatives:" "Yellow"
    Write-ColorOutput "  1. Check your internet connection" "White"
    Write-ColorOutput "  2. Use SSH instead of HTTPS" "White"
    Write-ColorOutput "  3. Configure a proxy if needed" "White"
    Write-ColorOutput "  4. Try again later" "White"
    exit 1
}
