---
title: Installer Scripts
weight: 10
---

# Install

What it does:

- Install some dependencys
- Setup ufw firewall if available
- Create a Folders /var/lib/rustdesk-server and /var/log/rustdesk-server
- Installs executables into /usr/bin
- Download and extract RustDesk Pro Services to the above folder
- Create systemd services for hbbs and hbbr
- If you chose Domain, it will install Nginx and certbot, allowing the API to be available on port 443 (https) and get an SSL certificate over port 80, this will autorenew

# Upgrade

What it does:

- Checks for new versions of RustDesk-Server-Pro
- If it finds a new version it, removes the API files and downloads new executables and API files

# Convert from Opensource

What it does: 

- Disable and removes the old services
- Install some dependencys
- Setup ufw firewall if available
- Create a Folder /var/lib/rustdesk-server and copy the certs here
- Download and extract RustDesk Pro Services to the above folder
- Create systemd services for hbbs and hbbr
- If you chose Domain, it will install Nginx and certbot, allowing the API to be available on port 443 (https) and get an SSL certificate over port 80, this will autorenew.
