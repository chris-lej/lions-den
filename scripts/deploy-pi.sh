#!/bin/bash
# Deploy Lion's Lair Concierge to Raspberry Pi
# Usage: ./deploy-pi.sh [pi-hostname-or-ip] [pi-user]

set -e

PI_HOST="${1:-raspberrypi}"
PI_USER="${2:-pi}"
DEPLOY_DIR="deploy"

if [ ! -d "$DEPLOY_DIR" ]; then
    echo "❌ Deployment directory not found. Run ./build-production.sh first."
    exit 1
fi

echo "🚀 Deploying to Raspberry Pi ($PI_USER@$PI_HOST)..."

# Create remote directory
ssh $PI_USER@$PI_HOST "mkdir -p ~/lions-lair-concierge"

# Copy deployment files
echo "📤 Copying files..."
scp -r $DEPLOY_DIR/* $PI_USER@$PI_HOST:~/lions-lair-concierge/

# Run setup script on Pi
echo "⚙️  Running setup on Pi..."
ssh $PI_USER@$PI_HOST "cd ~/lions-lair-concierge && sudo bash setup-pi.sh"

echo "✅ Deployment complete!"
echo "🌐 Kiosk UI should be available at: http://$PI_HOST:4201"
echo "🔌 Hub API should be available at: http://$PI_HOST:8000"

