#!/bin/bash

echo "🚀 Pushing V3 Tour & Travels to GitHub..."
echo ""

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "📦 Initializing Git repository..."
    git init
    echo "✅ Git initialized"
    echo ""
fi

# Add the fixed files
echo "📝 Adding changes..."
git add vite.config.js vercel.json
echo "✅ Files staged"
echo ""

# Commit
echo "💾 Committing changes..."
git commit -m "Fix Vercel deployment: Update vite config for proper path resolution"
echo "✅ Changes committed"
echo ""

# Check if remote exists
if ! git remote | grep -q "origin"; then
    echo "⚠️  No remote repository found!"
    echo "Please create a repository on GitHub first, then run:"
    echo "git remote add origin https://github.com/YOUR_USERNAME/v3-tour-travels.git"
    echo "git push -u origin main"
else
    # Push to GitHub
    echo "📤 Pushing to GitHub..."
    git push
    echo ""
    echo "✅ Successfully pushed to GitHub!"
    echo "🎉 Vercel will automatically redeploy with the fix!"
fi
