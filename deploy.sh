#!/bin/bash

# Deployment script for 0xleal.me
# Usage: ./deploy.sh

set -e  # Exit on any error

# Configuration
SERVER_USER="root"
SERVER_IP="128.140.98.63"
SERVER_PATH="/var/www/0xleal"
SSH_KEY="$HOME/.ssh/hetzner"  # Update this to your SSH key path
LOCAL_DIST="dist"

echo "🚀 Starting deployment to 0xleal.me..."

# Step 1: Build the project
echo ""
echo "📦 Building project..."
npm run build

if [ ! -d "$LOCAL_DIST" ]; then
    echo "❌ Error: dist/ directory not found. Build failed?"
    exit 1
fi

echo "✅ Build complete!"

# Step 2: Upload files to server
echo ""
echo "📤 Uploading files to server..."
rsync -avz --delete \
    -e "ssh -i $SSH_KEY" \
    $LOCAL_DIST/ \
    $SERVER_USER@$SERVER_IP:$SERVER_PATH/

echo "✅ Files uploaded!"

# Step 3: Set correct permissions on server
echo ""
echo "🔧 Setting permissions..."
ssh -i $SSH_KEY $SERVER_USER@$SERVER_IP << 'EOF'
chown -R www-data:www-data /var/www/0xleal
chmod -R 755 /var/www/0xleal
EOF

echo "✅ Permissions set!"

# Done!
echo ""
echo "🎉 Deployment complete!"
echo "🌐 Visit: https://0xleal.me"
echo ""
