Write-Host "🚀 Pushing V3 Tour & Travels to GitHub..." -ForegroundColor Cyan
Write-Host ""

# Check if git is initialized
if (-not (Test-Path ".git")) {
    Write-Host "📦 Initializing Git repository..." -ForegroundColor Yellow
    git init
    git branch -M main
    Write-Host "✅ Git initialized" -ForegroundColor Green
    Write-Host ""
}

# Add the fixed files
Write-Host "📝 Adding changes..." -ForegroundColor Yellow
git add vite.config.js vercel.json
Write-Host "✅ Files staged" -ForegroundColor Green
Write-Host ""

# Commit
Write-Host "💾 Committing changes..." -ForegroundColor Yellow
git commit -m "Fix Vercel deployment: Update vite config for proper path resolution"
Write-Host "✅ Changes committed" -ForegroundColor Green
Write-Host ""

# Check if remote exists
$remotes = git remote
if ($remotes -notcontains "origin") {
    Write-Host "⚠️  No remote repository found!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please create a repository on GitHub first at: https://github.com/new" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Then run these commands:" -ForegroundColor Yellow
    Write-Host "git remote add origin https://github.com/YOUR_USERNAME/v3-tour-travels.git" -ForegroundColor White
    Write-Host "git push -u origin main" -ForegroundColor White
} else {
    # Push to GitHub
    Write-Host "📤 Pushing to GitHub..." -ForegroundColor Yellow
    git push
    Write-Host ""
    Write-Host "✅ Successfully pushed to GitHub!" -ForegroundColor Green
    Write-Host "🎉 Vercel will automatically redeploy with the fix!" -ForegroundColor Cyan
}
