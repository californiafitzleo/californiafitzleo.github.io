param(
    [string]$RepoUrl = "https://github.com/californiafitzleo/californiafitzleo.github.io.git"
)

$ErrorActionPreference = "Stop"

Write-Host "=== Hexo Blog Setup Script ===" -ForegroundColor Cyan
Write-Host ""

if (Test-Path .git) {
    Write-Host "Git repository already exists." -ForegroundColor Yellow
    $confirm = Read-Host "Reinitialize? (y/N)"
    if ($confirm -ne "y" -and $confirm -ne "Y") {
        Write-Host "  Skipped." -ForegroundColor Gray
        exit 0
    }
    Remove-Item -Recurse -Force .git
    Write-Host "  Removed existing git repository." -ForegroundColor Gray
}

Write-Host ""
Write-Host "[1/4] Initializing git repository..." -ForegroundColor Yellow
git init -b source
if ($LASTEXITCODE -ne 0) {
    Write-Host "  Failed to initialize git." -ForegroundColor Red
    exit 1
}
Write-Host "  OK" -ForegroundColor Green

Write-Host ""
Write-Host "[2/4] Adding remote origin..." -ForegroundColor Yellow
git remote add origin $RepoUrl
if ($LASTEXITCODE -ne 0) {
    git remote set-url origin $RepoUrl
}
Write-Host "  Remote: $RepoUrl" -ForegroundColor Cyan
Write-Host "  OK" -ForegroundColor Green

Write-Host ""
Write-Host "[3/4] Adding all files..." -ForegroundColor Yellow
git add .
if ($LASTEXITCODE -ne 0) {
    Write-Host "  Failed to add files." -ForegroundColor Red
    exit 1
}
Write-Host "  OK" -ForegroundColor Green

Write-Host ""
Write-Host "[4/4] Creating initial commit..." -ForegroundColor Yellow
git commit -m "Initial commit: Hexo blog source"
if ($LASTEXITCODE -ne 0) {
    Write-Host "  Failed to commit." -ForegroundColor Red
    exit 1
}
Write-Host "  OK" -ForegroundColor Green

Write-Host ""
Write-Host "=== Setup Complete! ===" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "  1. Push source branch to GitHub:" -ForegroundColor White
Write-Host "     git push -u origin source" -ForegroundColor Cyan
Write-Host "  2. Enable GitHub Actions in repository settings" -ForegroundColor White
Write-Host "  3. Set GitHub Pages source to 'main' branch" -ForegroundColor White
Write-Host "  4. After first push, GitHub Actions will auto-deploy to main branch" -ForegroundColor White
