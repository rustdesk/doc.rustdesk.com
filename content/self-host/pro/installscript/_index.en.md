---
title: Simple Install
weight: 10
---

{{% notice note %}}
Don't forget to get your license from [https://rustdesk.com/pricing.html](https://rustdesk.com/pricing.html), check [license](/docs/en/self-host/pro/license) page for more details.
{{% /notice %}}

## Install

Copy and paste the above command into your Linux terminal to install RustDesk Server Pro.

`bash <(wget -qO- https://raw.githubusercontent.com/rustdesk/rustdesk-server-pro/main/install.sh)`

What it does:

- Install some dependencies
- Setup UFW firewall if available
- Create a working directory /var/lib/rustdesk-server and a log directory /var/log/rustdesk-server
- Installs executables into /usr/bin
- Download and extract RustDesk Pro Services to the above folder (service names are rustdesk-hbbs.service and rustdesk-hbbr.service)
- Create systemd services for hbbs and hbbr
- If you choose Domain, it will install Nginx and Certbot, allowing the API to be available on port 443 (https) and get an SSL certificate over port 80, it is automatically renewed

## Upgrade

Copy and paste the above command into your Linux terminal to upgrade your existing RustDesk Server Pro Installation, this could also be saved locally and scheduled with cron.

`bash <(wget -qO- https://raw.githubusercontent.com/rustdesk/rustdesk-server-pro/main/update.sh)`

What it does:

- Checks for new versions of RustDesk Server Pro
- If it finds a new version, it removes the API files and downloads new executables and API files

## Convert from open source

Copy and paste the above command into your Linux terminal to convert from RustDesk Server to RustDesk Server Pro.

`bash <(wget -qO- https://raw.githubusercontent.com/rustdesk/rustdesk-server-pro/main/convertfromos.sh)`

What it does:

- Disable and removes the old services
- Install some dependencies
- Setup UFW firewall if available
- Create a folder /var/lib/rustdesk-server and copy the certs here
- Delete /var/log/rustdesk and create /var/log/rustdesk-server
- Download and extract RustDesk Pro Services to the above folder (service names are rustdesk-hbbs.service and rustdesk-hbbr.service)
- Create systemd services for hbbs and hbbr
- If you choose Domain, it will install Nginx and Certbot, allowing the API to be available on port 443 (https) and get an SSL certificate over port 80, it is automatically renewed

## FAQ for Scripts

Q - How do I start and stop services?
A - The services use systemd so can be started and stopped using `sudo systemctl stop|start|restart rustdesk-hbbs|rustdesk-hbbr` e.g. `sudo systemctl restart rustdesk-hbbs`

Q - How do I view the linux logs?
A - The logs are stored in /var/log/rustdesk-server, you can view them using `cat /var/log/rustdesk-server/hbbs.log` or `cat /var/log/rustdesk-server/hbbs.error`.

Q - How do I check the status of the RustDesk services?
A - To check the status `sudo systemctl status rustdesk-hbbs|rustdesk-hbbr` e.g. `sudo systemctl status rustdesk-hbbs`.
