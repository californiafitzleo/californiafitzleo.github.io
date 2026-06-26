param(
    [string]$CommitMessage = "Update blog content"
)

$ErrorActionPreference = "Stop"

Write-Host "=== Hexo Blog Deploy Script ===" -ForegroundColor Cyan
Write-Host ""

Write-Host "[1/5] Checking git status..." -ForegroundColor Yellow
$gitStatus = git status --porcelain
if ($gitStatus) {
    Write-Host "  Uncommitted changes detected:" -ForegroundColor Red
    $gitStatus | ForEach-Object { Write-Host "    $_" -ForegroundColor Red }
    $confirm = Read-Host "  Continue anyway? (y/N)"
    if ($confirm -ne "y" -and $confirm -ne "Y") {
        Write-Host "  Aborted." -ForegroundColor Red
        exit 1
    }
}
Write-Host "  OK" -ForegroundColor Green

Write-Host ""
Write-Host "[2/5] Checking current branch..." -ForegroundColor Yellow
$currentBranch = git rev-parse --abbrev-ref HEAD
Write-Host "  Current branch: $currentBranch" -ForegroundColor Cyan
if ($currentBranch -ne "source") {
    Write-Host "  Warning: Not on 'source' branch" -ForegroundColor Yellow
    $confirm = Read-Host "  Continue anyway? (y/N)"
    if ($confirm -ne "y" -and $confirm -ne "Y") {
        Write-Host "  Aborted." -ForegroundColor Red
        exit 1
    }
}
Write-Host "  OK" -ForegroundColor Green

Write-Host ""
Write-Host "[3/5] Pulling latest changes..." -ForegroundColor Yellow
git pull origin source
if ($LASTEXITCODE -ne 0) {
    Write-Host "  Pull failed. Please resolve conflicts first." -ForegroundColor Red
    exit 1
}
Write-Host "  OK" -ForegroundColor Green

Write-Host ""
Write-Host "[4/5] Building site..." -ForegroundColor Yellow
hexo clean
if ($LASTEXITCODE -ne 0) {
    Write-Host "  Clean failed." -ForegroundColor Red
    exit 1
}
hexo generate
if ($LASTEXITCODE -ne 0) {
    Write-Host "  Build failed." -ForegroundColor Red
    exit 1
}
Write-Host "  OK" -ForegroundColor Green

Write-Host ""
Write-Host "[5/5] Deploying..." -ForegroundColor Yellow
hexo deploy
if ($LASTEXITCODE -ne 0) {
    Write-Host "  Deploy failed." -ForegroundColor Red
    exit 1
}
Write-Host "  OK" -ForegroundColor Green

Write-Host ""
Write-Host "=== Deployment Complete! ===" -ForegroundColor Green
Write-Host "  Site: https://californiafitzleo.github.io/" -ForegroundColor Cyan
