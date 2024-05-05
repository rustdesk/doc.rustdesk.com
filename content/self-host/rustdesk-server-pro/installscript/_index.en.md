---
title: Simple Install
weight: 10
---

{{% notice note %}}
Don't forget to get your license from [https://rustdesk.com/pricing.html](https://rustdesk.com/pricing.html), check [license](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/license/) page for more details.

Please read [OSS installation](https://rustdesk.com/docs/en/self-host/rustdesk-server-oss/install/) first before doing this simple install. You can know more underlying details there.
{{% /notice %}}

### Install

Copy and paste the above command into your Linux terminal to install RustDesk Server Pro.

`bash <(wget -qO- https://raw.githubusercontent.com/rustdesk/rustdesk-server-pro/main/install.sh)`

What it does:

- Install some dependencies
- Setup UFW firewall if available
- Create a working directory `/var/lib/rustdesk-server` and a log directory `/var/log/rustdesk-server`
- Installs executables into `/usr/bin`
- Download and extract RustDesk Pro Services to the above folder
- Create systemd services for hbbs and hbbr (service names are rustdesk-hbbs.service and rustdesk-hbbr.service)
- If you choose Domain, it will install Nginx and Certbot, allowing the API to be available on port 443 (HTTPS) and get an SSL certificate over port 80, it is automatically renewed

{{% notice note %}}
If you want to set up https for web console manually, please check this
https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/faq/#set-up-https-for-web-console-manually
{{% /notice %}}

{{% notice note %}}
If the systemd service fails to start, it is probably related to SELinux, please check this
https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/faq/#selinux
{{% /notice %}}

{{% notice note %}}
If your client cannot connect to your server or you cannot access the web console, please check this
https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/faq/#firewall
{{% /notice %}}

### Upgrade

Copy and paste the above command into your Linux terminal to upgrade your existing RustDesk Server Pro installation, this could also be saved locally and scheduled with cron.

`bash <(wget -qO- https://raw.githubusercontent.com/rustdesk/rustdesk-server-pro/main/update.sh)`

What it does:

- Checks for new versions of RustDesk Server Pro
- If it finds a new version, it removes the API files and downloads new executables and API files

### Convert from open source

Copy and paste the above command into your Linux terminal to convert from RustDesk Server to RustDesk Server Pro.

`bash <(wget -qO- https://raw.githubusercontent.com/rustdesk/rustdesk-server-pro/main/convertfromos.sh)`

{{% notice note %}}
Please add `21114` TCP port to your firewal, this is additional port for web console and user login in RustDesk client.
{{% /notice %}}

What it does:

- Disable and removes the old services
- Install some dependencies
- Setup UFW firewall if available
- Create a folder `/var/lib/rustdesk-server` and copy the certs here
- Delete `/var/log/rustdesk` and create `/var/log/rustdesk-server`
- Download and extract RustDesk Pro Services to the above folder
- Create systemd services for hbbs and hbbr (service names are rustdesk-hbbs.service and rustdesk-hbbr.service)
- If you choose Domain, it will install Nginx and Certbot, allowing the API to be available on port 443 (HTTPS) and get an SSL certificate over port 80, it is automatically renewed

### Backup/Restore

To make life easy we have created a backup and restore script, this will take the keys, all configuration and database and create a tar file which can be saved to else where.

To setup the backup script on your RustDesk Server do the following:
```
wget https://raw.githubusercontent.com/rustdesk/rustdesk-server-pro/main/backup.sh
chmod +x backup.sh
```
You now have options.

Run the backup script `./backup.sh` to create a one time backup.

Or run the backup script `./backup.sh --schedule`. This will schedule the backup script to run nightly and autorotate.

To restore do the following:
```
wget https://raw.githubusercontent.com/rustdesk/rustdesk-server-pro/main/restore.sh
chmod +x restore.sh
```
Copy the backup file into the same folder as the restore.sh file and then run `./restore.sh`.

This will restore your server to how it was prior, you will need to revoke your [license](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/license/) to move it to the restored server.
