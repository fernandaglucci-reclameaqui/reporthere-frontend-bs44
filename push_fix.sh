#!/bin/bash
# Simple script to push the login route fix to GitHub

cd /home/ubuntu/reporthere-frontend-bs44
echo "📤 Pushing the login route fix to GitHub..."
git push origin main

if [ $? -eq 0 ]; then
    echo "✅ Successfully pushed! Vercel will automatically deploy."
    echo "🚀 Check deployment status at: https://vercel.com/fernanda-luccis-projects/reporthere-frontend-bs44/deployments"
else
    echo "❌ Push failed. You may need to authenticate with GitHub."
fi
