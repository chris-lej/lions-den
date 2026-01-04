#!/bin/bash
# Build production artifacts for Raspberry Pi deployment

set -e

echo "🏗️  Building Lion's Lair Concierge for Production..."

# Build Angular app
echo "📦 Building Kiosk UI..."
cd apps/kiosk-ui
npm ci
npm run build -- --configuration production
cd ../..

# Create deployment directory
DEPLOY_DIR="deploy"
rm -rf $DEPLOY_DIR
mkdir -p $DEPLOY_DIR

# Copy Hub API
echo "📦 Packaging Hub API..."
mkdir -p $DEPLOY_DIR/hub-api
cp -r apps/hub-api/* $DEPLOY_DIR/hub-api/
rm -rf $DEPLOY_DIR/hub-api/__pycache__ $DEPLOY_DIR/hub-api/*.pyc 2>/dev/null || true

# Copy Kiosk UI build
echo "📦 Packaging Kiosk UI..."
# Angular outputs to dist/kiosk-ui/browser/ in production
if [ -d "apps/kiosk-ui/dist/kiosk-ui/browser" ]; then
    cp -r apps/kiosk-ui/dist/kiosk-ui/browser/* $DEPLOY_DIR/kiosk-ui/
else
    # Fallback if structure is different
    cp -r apps/kiosk-ui/dist/* $DEPLOY_DIR/kiosk-ui/
fi

# Copy deployment scripts
echo "📦 Copying deployment scripts..."
cp scripts/deploy-pi.sh $DEPLOY_DIR/
cp scripts/setup-pi.sh $DEPLOY_DIR/
chmod +x $DEPLOY_DIR/*.sh

# Copy systemd service files
echo "📦 Copying systemd services..."
mkdir -p $DEPLOY_DIR/systemd
cp scripts/systemd/* $DEPLOY_DIR/systemd/

# Copy environment template
echo "📦 Copying configuration templates..."
cp scripts/.env.template $DEPLOY_DIR/

# Create deployment archive
echo "📦 Creating deployment archive..."
tar -czf lions-lair-concierge-deploy.tar.gz $DEPLOY_DIR/

echo "✅ Production build complete!"
echo "📦 Deployment package: lions-lair-concierge-deploy.tar.gz"
echo "📁 Deployment directory: $DEPLOY_DIR/"

