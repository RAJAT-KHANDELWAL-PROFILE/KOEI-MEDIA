#!/bin/bash

# Configuration
USER_HOME="/home/rajat_ceo_laxvionsolutions_com"
SITE_DIR="$USER_HOME/new-website"
CONFIG_FILE="/etc/nginx/sites-available/koei-media-new"
LINK_FILE="/etc/nginx/sites-enabled/koei-media-new"

echo "Using Site Directory: $SITE_DIR"

# 1. Create Nginx Configuration
echo "Creating Nginx config at $CONFIG_FILE..."
sudo bash -c "cat > $CONFIG_FILE" <<EOF
server {
    listen 80;
    server_name koeimedia.com www.koeimedia.com;
    
    root $SITE_DIR;
    index index.html index.htm;

    access_log /var/log/nginx/koei-new-access.log;
    error_log /var/log/nginx/koei-new-error.log;

    location / {
        try_files \$uri \$uri/ =404;
    }
}
EOF

# 2. Enable the Site
if [ ! -f "$LINK_FILE" ]; then
    echo "Enabling site..."
    sudo ln -s "$CONFIG_FILE" "$LINK_FILE"
fi

# 3. Test Configuration
echo "Testing Nginx configuration..."
sudo nginx -t

# 4. Reload Nginx
if [ $? -eq 0 ]; then
    echo "Reloading Nginx..."
    sudo systemctl reload nginx
    echo "SUCCESS: Nginx is now serving $SITE_DIR on Port 8080!"
else
    echo "ERROR: Nginx configuration test failed. Not reloading."
    exit 1
fi
