# Deployment Guide - Raspberry Pi

This guide covers deploying Lion's Lair Concierge to a Raspberry Pi for production use.

## Prerequisites

### Hardware
- Raspberry Pi 3 or newer
- MicroSD card (32GB+ recommended)
- Power supply
- Network connection (Ethernet or Wi-Fi)

### Software
- Raspberry Pi OS (latest, based on Debian)
- Node.js 22+ (for building, not required on Pi)
- Python 3.9+ (included with Raspberry Pi OS)

## Build Process

### 1. Build Production Artifacts

On your development machine:

```bash
cd /path/to/lions-den-concierge
chmod +x scripts/*.sh
./scripts/build-production.sh
```

This creates:
- `deploy/` directory with all production files
- `lions-lair-concierge-deploy.tar.gz` archive

### 2. Transfer to Raspberry Pi

**Option A: Using deploy script**
```bash
./scripts/deploy-pi.sh [pi-hostname] [pi-user]
# Example: ./scripts/deploy-pi.sh raspberrypi.local pi
```

**Option B: Manual transfer**
```bash
scp lions-lair-concierge-deploy.tar.gz pi@raspberrypi.local:~/
ssh pi@raspberrypi.local
tar -xzf lions-lair-concierge-deploy.tar.gz
cd deploy
sudo bash setup-pi.sh
```

## Manual Setup on Pi

If you prefer to set up manually:

### 1. Install System Dependencies

```bash
sudo apt-get update
sudo apt-get install -y python3 python3-pip python3-venv nginx
```

### 2. Setup Hub API

```bash
cd ~/lions-lair-concierge/hub-api
python3 -m venv venv
source venv/bin/activate
pip install --upgrade pip
pip install -r requirements.txt
deactivate
```

### 3. Setup Kiosk UI

```bash
sudo mkdir -p /var/www/lions-lair-concierge
sudo cp -r ~/lions-lair-concierge/kiosk-ui/* /var/www/lions-lair-concierge/
sudo chown -R www-data:www-data /var/www/lions-lair-concierge
```

### 4. Configure Nginx

```bash
sudo cp ~/lions-lair-concierge/systemd/nginx-lions-lair /etc/nginx/sites-available/lions-lair-concierge
sudo ln -s /etc/nginx/sites-available/lions-lair-concierge /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### 5. Install Hub API Service

```bash
sudo cp ~/lions-lair-concierge/systemd/lions-lair-hub-api.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable lions-lair-hub-api.service
sudo systemctl start lions-lair-hub-api.service
```

## Service Management

### Hub API Service

```bash
# Check status
sudo systemctl status lions-lair-hub-api

# View logs
sudo journalctl -u lions-lair-hub-api -f

# Restart service
sudo systemctl restart lions-lair-hub-api

# Stop service
sudo systemctl stop lions-lair-hub-api
```

### Nginx

```bash
# Check status
sudo systemctl status nginx

# Reload configuration
sudo systemctl reload nginx

# Restart
sudo systemctl restart nginx
```

## Accessing the Application

After deployment:

- **Kiosk UI**: `http://raspberrypi.local` or `http://[pi-ip-address]`
- **Hub API**: `http://raspberrypi.local:8000` or `http://[pi-ip-address]:8000`
- **API Docs**: `http://raspberrypi.local:8000/docs`

## Tablet Configuration

### Android Tablet (Kiosk Mode)

1. Install a kiosk browser app (e.g., Fully Kiosk Browser, Kiosk Browser Lockdown)
2. Configure to load: `http://raspberrypi.local` on startup
3. Enable kiosk mode to prevent users from exiting
4. Set screen timeout to "Never" or very long duration
5. Connect tablet to same network as Raspberry Pi

### iPad (Guided Access)

1. Open Safari and navigate to `http://raspberrypi.local`
2. Enable Guided Access (Settings > Accessibility > Guided Access)
3. Triple-click home button to enter Guided Access mode
4. Configure to prevent exiting Safari

## Network Configuration

### Finding Pi IP Address

```bash
# On Pi
hostname -I

# From another device on same network
ping raspberrypi.local
# or
nmap -sn 192.168.1.0/24 | grep -B 2 Raspberry
```

### Firewall Configuration

If using a firewall, allow:
- Port 80 (HTTP for Kiosk UI)
- Port 8000 (Hub API)

```bash
sudo ufw allow 80/tcp
sudo ufw allow 8000/tcp
```

## Troubleshooting

### Hub API not starting

```bash
# Check service status
sudo systemctl status lions-lair-hub-api

# Check logs
sudo journalctl -u lions-lair-hub-api -n 50

# Verify Python environment
cd ~/lions-lair-concierge/hub-api
source venv/bin/activate
python main.py
```

### Kiosk UI not loading

```bash
# Check nginx status
sudo systemctl status nginx

# Check nginx error logs
sudo tail -f /var/log/nginx/error.log

# Verify files are in place
ls -la /var/www/lions-lair-concierge/
```

### API connection issues

- Verify Hub API is running: `curl http://localhost:8000/api/health`
- Check nginx proxy configuration
- Verify CORS settings in Hub API if accessing from different origin

## Updates

To update the application:

1. Build new version on development machine
2. Transfer to Pi (same as initial deployment)
3. Restart services:
   ```bash
   sudo systemctl restart lions-lair-hub-api
   sudo systemctl reload nginx
   ```

## Production Checklist

- [ ] Hub API service is enabled and running
- [ ] Nginx is configured and serving Kiosk UI
- [ ] Services start automatically on boot
- [ ] Tablet is configured in kiosk mode
- [ ] Tablet can access Pi's IP address
- [ ] Admin panel is accessible (if needed for testing)
- [ ] Event stream is working (check browser console)
- [ ] All translations are working

## Security Notes

- Change default Pi user password
- Consider setting up SSH key authentication
- Restrict CORS origins in production (update Hub API config)
- Use HTTPS in production (requires SSL certificate)
- Keep system and packages updated

