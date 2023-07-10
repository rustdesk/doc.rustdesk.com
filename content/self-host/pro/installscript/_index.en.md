---
title: Simple Install
weight: 10
---

{{% notice note %}} Don't forget to get your license from https://rustdesk.com/pricing.html, check license page for more details. {{% /notice %}}

# Install
Copy and paste the above command into your linux terminal to install RustDesk Server Pro.

`bash <(wget -qO- https://raw.githubusercontent.com/rustdesk/rustdesk-server-pro/main/install.sh)`

What it does:

- Install some dependencys
- Setup ufw firewall if available
- Create a Folders /var/lib/rustdesk-server and /var/log/rustdesk-server
- Installs executables into /usr/bin
- Download and extract RustDesk Pro Services to the above folder
- Create systemd services for hbbs and hbbr
- If you chose Domain, it will install Nginx and certbot, allowing the API to be available on port 443 (https) and get an SSL certificate over port 80, this will autorenew

# Upgrade
Copy and paste the above command into your linux terminal to upgrade your existing RustDesk Server Pro Installation, this could also be saved locally and scheduled with cron.

`bash <(wget -qO- https://raw.githubusercontent.com/rustdesk/rustdesk-server-pro/main/update.sh)`

What it does:

- Checks for new versions of RustDesk-Server-Pro
- If it finds a new version it, removes the API files and downloads new executables and API files

# Convert from Opensource

Copy and paste the above command into your linux terminal to convert from RustDesk Server to RustDesk Server Pro.

`bash <(wget -qO- https://raw.githubusercontent.com/rustdesk/rustdesk-server-pro/main/convertfromos.sh)`

What it does: 

- Disable and removes the old services
- Install some dependencys
- Setup ufw firewall if available
- Create a Folder /var/lib/rustdesk-server and copy the certs here
- Delete /var/log/rustdesk and create /var/log/rustdesk-server
- Download and extract RustDesk Pro Services to the above folder
- Create systemd services for hbbs and hbbr
- If you chose Domain, it will install Nginx and certbot, allowing the API to be available on port 443 (https) and get an SSL certificate over port 80, this will autorenew.
