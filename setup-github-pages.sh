#!/bin/bash

echo "🚀 GitHub Pages Deployment Setup"
echo "================================"

# Check if we're in a git repository
if [ ! -d ".git" ]; then
    echo "❌ Error: This is not a git repository"
    exit 1
fi

# Get repository name
REPO_URL=$(git remote get-url origin)
REPO_NAME=$(basename -s .git "$REPO_URL")

echo "📦 Repository: $REPO_NAME"
echo ""

# Update next.config.ts with the correct repository name
echo "🔧 Updating next.config.ts with repository name..."
sed -i "s|/your-repo-name|/$REPO_NAME|g" next.config.ts

echo "✅ Configuration updated!"
echo ""
echo "📋 Next steps:"
echo "1. Go to your repository Settings → Pages"
echo "2. Set Source to 'GitHub Actions'"
echo "3. Save the configuration"
echo "4. Push to version2 branch:"
echo "   git checkout version2"
echo "   git add ."
echo "   git commit -m 'Configure GitHub Pages deployment'"
echo "   git push origin version2"
echo ""
echo "🌐 Your site will be available at: https://your-username.github.io/$REPO_NAME"
echo ""
echo "📊 Monitor deployment in the Actions tab of your repository"