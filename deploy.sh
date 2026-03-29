#!/bin/bash

# V3 Tour & Travels - Vercel Deployment Script

echo "🚀 V3 Tour & Travels - Vercel Deployment"
echo "========================================"
echo ""

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "📦 Initializing Git repository..."
    git init
    git add .
    git commit -m "Initial commit - V3 Tour & Travels website"
    echo "✅ Git repository initialized"
    echo ""
fi

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "⚠️  Vercel CLI not found"
    echo "📥 Installing Vercel CLI..."
    npm install -g vercel
    echo "✅ Vercel CLI installed"
    echo ""
fi

# Deploy to Vercel
echo "🚀 Deploying to Vercel..."
echo ""
vercel --prod

echo ""
echo "✅ Deployment complete!"
echo "🌐 Your website is now live!"
