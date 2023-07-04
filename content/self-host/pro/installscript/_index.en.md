---
title: Install Script
weight: 10
---

What it does:

- Install some dependencys
- Setup ufw firewall if available
- Create a Folders /var/lib/rustdesk-server and /var/log/rustdesk
- Installs executables into /usr/bin
- Download and extract RustDesk Pro Services to the above folder
- Create systemd services for hbbs and hbbr
- If you chose Domain, it will install Nginx and certbot, allowing the API to be available on port 443 (https) and get an SSL certificate over port 80, this will autorenew.
