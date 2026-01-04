#!/bin/bash
# Setup script to run on Raspberry Pi
# Installs dependencies and configures services

set -e

echo "🔧 Setting up Lion's Lair Concierge on Raspberry Pi..."

# Install system dependencies
echo "📦 Installing system dependencies..."
sudo apt-get update
sudo apt-get install -y python3 python3-pip python3-venv nginx

# Setup Hub API
echo "🐍 Setting up Hub API..."
cd hub-api
python3 -m venv venv
source venv/bin/activate
pip install --upgrade pip
pip install -r requirements.txt
deactivate
cd ..

# Setup Kiosk UI (served via nginx)
echo "🌐 Setting up Kiosk UI..."
sudo mkdir -p /var/www/lions-lair-concierge
sudo cp -r kiosk-ui/* /var/www/lions-lair-concierge/
sudo chown -R www-data:www-data /var/www/lions-lair-concierge

# Configure nginx
echo "⚙️  Configuring nginx..."
sudo cp systemd/nginx-lions-lair /etc/nginx/sites-available/lions-lair-concierge
sudo ln -sf /etc/nginx/sites-available/lions-lair-concierge /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx

# Install systemd service for Hub API
echo "⚙️  Installing Hub API service..."
sudo cp systemd/lions-lair-hub-api.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable lions-lair-hub-api.service
sudo systemctl start lions-lair-hub-api.service

echo "✅ Setup complete!"
echo "📊 Check service status: sudo systemctl status lions-lair-hub-api"
echo "📝 View logs: sudo journalctl -u lions-lair-hub-api -f"

