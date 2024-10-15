---
title: FAQ
weight: 600
---

### How can I install with the Simple Install Script?
1. Get your license from [https://rustdesk.com/pricing.html](https://rustdesk.com/pricing.html), check [license](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/license/) page for more details.
2. Spin up a VPS, bare metal or Linux VM.
3. If you want to use DNS and SSL create a DNS name i.e. `rustdesk.yourdomain.com`.
4. [This page](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/installscript/#install).
5. Copy and paste the command into your Linux terminal.
6. Follow the prompts as they guide you through the install.
7. Once the install is complete `https://rustdesk.yourdomain.com` or `http://youripaddress:21114`.
8. Log in with the username `admin` and password `test1234`.
9. Enter your license code purchased in step 1.

### How can I convert from RustDesk Server Open Source to RustDesk Server Pro?
1. Get your license from [https://rustdesk.com/pricing.html](https://rustdesk.com/pricing.html), check [license](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/license/) page for more details.
2. Open TCP port 21114.
3. Log into your RustDesk Server.
4. If you didn't already use DNS and want to use SSL create a DNS name i.e. `rustdesk.yourdomain.com`.
5. [This page](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/installscript/#convert-from-open-source).
6. Copy and paste the command into your Linux terminal.
7. Follow the prompts as they guide you through the install.
8. Once the install is complete go to `https://rustdesk.yourdomain.com` or `http://youripaddress:21114`.
9. Log in with the username `admin` and password `test1234`.
10. Enter your license code purchased in step 1.

### There is a new version of RustDesk Server Pro out, how can I upgrade?
You'd better back up data files (sqlite3 files etc.) first, https://github.com/rustdesk/rustdesk-server-pro/discussions/184#discussioncomment-8013375.
#### If you installed with script
1. [This page](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/installscript/#upgrade).
2. Copy and paste the command into your Linux terminal.
3. Follow the prompts as they guide you through the upgrade.
#### Docker Compose
```
docker compose up -d --build --pull always
```
But this depends on your docker version, for more discussion, check [this](https://stackoverflow.com/questions/37685581/how-to-get-docker-compose-to-use-the-latest-image-from-repository).
#### Docker
```
docker ps
# you can also use <CONTAINER NAME>, e.g. `hbbs` and `hbbr` if you follow our manual.
docker stop <CONTAINER ID>
docker rm <CONTAINER ID>
docker rmi <IMAGE ID>
docker run ..... # same as you installed it before
```

e.g.

```
root@hz:~# sudo docker ps
CONTAINER ID   IMAGE                          COMMAND   CREATED          STATUS                         PORTS     NAMES
30822972c220   rustdesk/rustdesk-server-pro   "hbbr"    10 seconds ago   Restarting (1) 2 seconds ago             hbbr
0f3a6f185be3   rustdesk/rustdesk-server-pro   "hbbs"    15 seconds ago   Up 14 seconds                            hbbs
root@hz:~# sudo docker kill hbbr hbbs
hbbr
hbbs
root@hz:~# sudo docker ps
CONTAINER ID   IMAGE     COMMAND   CREATED   STATUS    PORTS     NAMES
root@hz:~# sudo docker rm hbbr hbbs
hbbr
hbbs
root@hz:~# sudo docker rmi rustdesk/rustdesk-server-pro
Untagged: rustdesk/rustdesk-server-pro:latest
Untagged: rustdesk/rustdesk-server-pro@sha256:401b8344323addf777622d0463bd7b964dd18a01599e42e20d8b3818dae71ad2
Deleted: sha256:a3d9d43a3d1dd84b10c39fe0abf7767b18a87819ff0981443ce9e9a52604c889
Deleted: sha256:65ae79ecc0f8b1c8a21085d04af7c8d8f368dd5ad844982d4c7b3ac1f38ba33a
Deleted: sha256:9274a824aef10f2ef106d8f85fbd1905037169cf610951f63dc5109dae4b0825
Deleted: sha256:aa89ac8b57a49f49f041c01b9c0f016060e611cf282e3fda281bc6bebbabaf3f
Deleted: sha256:4af9839016f72586a46f915cae8a5ccf3380ba88a2f79532692d3b1d7020387e
Deleted: sha256:e900a7ffc2fc14fa432cc04823740dcbb78c0aa3508abbbe287ce8b274541ada
Deleted: sha256:503eeab76c11e8316a2a450ef0790d31c5af203309e9c5b44d1bf8a601e6e587
Deleted: sha256:825683356e7dbfcbaabcbf469c9aeb34d36ebeab0308170432b9553e28203116
Deleted: sha256:24a48d4af45bab05d8712fe22abec5761a7781283500e32e34bdff5798c09399
root@hz:~# sudo docker images
REPOSITORY         TAG       IMAGE ID       CREATED        SIZE
rustdesk/makepkg   latest    86a981e2e18f   2 months ago   2.23GB
root@hz:~# sudo docker run --name hbbs -v ./data:/root -td --net=host --restart unless-stopped rustdesk/rustdesk-server-pro hbbs
Unable to find image 'rustdesk/rustdesk-server-pro:latest' locally
latest: Pulling from rustdesk/rustdesk-server-pro
4ce000a43472: Pull complete
1543f88421d3: Pull complete
9b209c1f5a8d: Pull complete
d717f548a400: Pull complete
1e60b98f5660: Pull complete
a86960d9bced: Pull complete
acb361c4bbf6: Pull complete
4f4fb700ef54: Pull complete
Digest: sha256:401b8344323addf777622d0463bd7b964dd18a01599e42e20d8b3818dae71ad2
Status: Downloaded newer image for rustdesk/rustdesk-server-pro:latest
0cc5387efa8d2099c0d8bc657b10ed153a6b642cd7bbcc56a6c82790a6e49b04
root@hz:~# sudo docker run --name hbbr -v ./data:/root -td --net=host --restart unless-stopped rustdesk/rustdesk-server-pro hbbr
4eb9da2dc460810547f6371a1c40a9294750960ef2dbd84168079e267e8f371a
root@hz:~# sudo docker ps
CONTAINER ID   IMAGE                          COMMAND   CREATED         STATUS                                  PORTS     NAMES
4eb9da2dc460   rustdesk/rustdesk-server-pro   "hbbr"    5 seconds ago   Restarting (1) Less than a second ago             hbbr
0cc5387efa8d   rustdesk/rustdesk-server-pro   "hbbs"    8 seconds ago   Up 7 seconds                                      hbbs
root@hz:~# sudo docker images
REPOSITORY                     TAG       IMAGE ID       CREATED        SIZE
rustdesk/rustdesk-server-pro   latest    a3d9d43a3d1d   5 days ago     193MB
rustdesk/makepkg               latest    86a981e2e18f   2 months ago   2.23GB
```

For more details, check [this](https://www.cherryservers.com/blog/how-to-update-docker-image).

### I installed with the script, how can I start and stop services?
The services use systemd so can be started and stopped using `sudo systemctl stop|start|restart rustdesk-hbbs|rustdesk-hbbr` e.g. `sudo systemctl restart rustdesk-hbbs`.

### I installed with the script, how can I view the Linux logs?
The logs are stored in `/var/log/rustdesk-server`, you can view them using `tail /var/log/rustdesk-server/hbbs.log` or `tail /var/log/rustdesk-server/hbbs.error`.

### I installed with the script, how can I check the status of the RustDesk services?
To check the status `sudo systemctl status rustdesk-hbbs|rustdesk-hbbr` e.g. `sudo systemctl status rustdesk-hbbs`.

### How can I change the admin password?
1. `https://rustdesk.yourdomain.com` or `http://youripaddress:21114`.
2. Log in with the username `admin` and password `test1234`.
3. Click on `admin` in the top right hand corner.
4. Click on `Settings`.
5. Enter your new password in the boxes provided.

### How can I move my license to a new server?
Please see [here](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/license/#invoices-and-migration).

### Emails aren't working from my VPS
A lot of VPS providers block ports 465 and 25.

A simple way to check is using telnet. To test in the Linux terminal type `telnet your.mailserver.com 25`. On Windows use PowerShell with `Test-NetConnection -ComputerName your.mailserver.com -Port 25`.

Your mail server may not be using port 25. Please make sure you are using the correct ports.

### Can I deploy RustDesk using PowerShell or similar?
Sure, you can find scripts to aid deployment [here](https://rustdesk.com/docs/en/self-host/client-deployment/).

### How can I file a bug report?
Please file via [GitHub](https://github.com/rustdesk/rustdesk-server-pro/issues).

### Why if I am self hosting is this not free and open source?
1. RustDesk has become a full time job for a number of people, they have lives, wives, jobs and kids which all demands attention and costs money!
2. We want to be here and still making great progress in years to come.
3. The open source version will continue to be open source and we encourage others to make developments in line with the AGPL license.

### I can't connect to devices in different groups, why is this?
This is easily sorted, you need to allow cross-group access.
1. Add new groups.
2. Click `Edit`.
3. Select the relevant groups you want access (it automatically adds them in the corresponding group).

### How can I get configs automatically?
Configs are generated automatically.
1. Download the newest clients from [GitHub](https://github.com/rustdesk/rustdesk/releases/latest).
2. On the main page in the web console click on `Windows EXE`.
3. Fill in the host and API (if different from your config).
4. Click `Submit`.
5. Scan QR Code on Android and rename exe to what has been generated.

### Do you offer hosting for RustDesk Server Pro?
Please get in touch with our [sales](mailto://sales@rustdesk.com) team.

### Is there somewhere I can see video setup guides?
Yes! We have a [YouTube Channel](https://youtube.com/@RustDesk).

### Why are my logs / device names are empty?
Ensure API is set correctly on the device being controlled, https://github.com/rustdesk/rustdesk-server-pro/issues/21#issuecomment-1637935750.

### How can I uninstall RustDesk Server Pro?
Run the following commands:
```sh
sudo systemctl stop rustdesk-hbbs.service
sudo systemctl disable rustdesk-hbbs.service
sudo systemctl stop rustdesk-hbbr.service
sudo systemctl disable rustdesk-hbbr.service
sudo systemctl daemon-reload
sudo rm /etc/systemd/system/rustdesk-hbbs.service
sudo rm etc/systemd/system/rustdesk-hbbr.service
sudo rm /usr/bin/hbbs
sudo rm /usr/bin/hbbr
sudo rm -rf /var/lib/rustdesk-server/
sudo rm -rf /var/log/rustdesk-server/
```
If the script installed Nginx then remove using:
```sh
sudo apt remove nginx
```

### How can I remove devices from the device list in the web console?
Disable and then delete will now be available.

### How can I update RustDesk with PowerShell?
```ps
$ErrorActionPreference= 'silentlycontinue'

$rdver = ((Get-ItemProperty  "HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall\RustDesk\").Version)

if ($rdver -eq "1.2.6")
{
    Write-Output "RustDesk $rdver is the newest version."
    Exit
}

if (!(Test-Path C:\Temp))
{
    New-Item -ItemType Directory -Force -Path C:\Temp > null
}

cd C:\Temp

Invoke-WebRequest "https://github.com/rustdesk/rustdesk/releases/download/1.2.6/rustdesk-1.2.6-x86_64.exe" -Outfile "rustdesk.exe"
Start-Process .\rustdesk.exe --silent-install -wait
```

### `Key mismatch` error
Please configure your client with [correct key](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/relay/).

### `Failed to connect to relay server` error
Please make sure `hbbr` is running. More information about `hbbr`, you can find [here](https://rustdesk.com/docs/en/self-host/rustdesk-server-oss/install/).
If your `hbbr` does not run on the same machine of `hbbs`, or you have multiple relay servers, or you do not run it on default port `21117`, you have to tell it to `hbbs` explicitly. Please check [here](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/relay/).

### Reset MFA for Admin account
https://github.com/rustdesk/rustdesk/discussions/6576

### Set up HTTPS for web console manually

#### 1. Buy a domain name and resolve it to your server's IP address.
* Buy a domain name from a domain registrar like GoDaddy, Namecheap, or Namesilo.
* Resolve the domain name to your server's IP address with one of the following:
    - Your domain registrar's control panel (recommended)
    - [DNS providers](https://en.wikipedia.org/wiki/List_of_managed_DNS_providers)

For example, if you buy a domain name `example.com` from `Namesilo` and your server's IP address is `123.123.123.123`, you want to use `rustdesk.example.com` subdomain as your HTTPS web console address. You need to open [link](https://www.namesilo.com/account_domains.php), click the button with tooltip `Manage dns for the domain`, add add a `A` record with the hostname name `rustdesk` and the IP address of your server.
![](/docs/en/self-host/rustdesk-server-pro/faq/images/namesilo-dns-button.png)
![](/docs/en/self-host/rustdesk-server-pro/faq/images/namesilo-add-a-record.png)
![](/docs/en/self-host/rustdesk-server-pro/faq/images/namesilo-dns-table.png)
* It takes some time for DNS to take effect, https://www.whatsmydns.net and check whether the domain name has been resolved to your server's IP address. Step 6 depends on the correct resolve result. In the following steps, replace `<YOUR_DOMAIN>` with your subdomain, e.g. `rustdesk.example.com`.

#### 2. Install Nginx
* Debian/Ubuntu: `sudo apt-get install nginx`
* Fedora/CentOS: `sudo dnf install nginx` or `sudo yum install nginx`
* Arch: `sudo pacman -S install nginx`
* openSUSE: `sudo zypper install nginx`
* Gentoo: `sudo emerge -av nginx`
* Appine: `sudo apk add --no-cache nginx`

Run `nginx -h` to check whether it has been installed successfully.

#### 3. Install Certbot
* Method 1: If `snap` is installed, run `sudo snap install certbot --classic`.
* Method 2: Using `python3-certbot-nginx` instead, e.g. `sudo apt-get install python3-certbot-nginx` for Ubuntu.
* Method 3: If the above two methods failed, try install `certbot-nginx`, e.g. `sudo yum install certbot-nginx` for CentOS 7.

Run `certbot -h` to check whether it has been installed successfully.

#### 4. Config Nginx
There are two ways:
* If directory `/etc/nginx/sites-available` and `/etc/nginx/sites-enabled` exists, replace `<YOUR_DOMAIN>` of the following command with your domain name and run it.
```sh
cat > /etc/nginx/sites-available/rustdesk.conf << EOF
server {
    server_name <YOUR_DOMAIN>;
    location / {
        proxy_set_header        X-Real-IP       \$remote_addr;
        proxy_set_header        X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_pass http://127.0.0.1:21114/;
    }
}
EOF
```
Then run `sudo ln -s /etc/nginx/sites-available/rustdesk.conf /etc/nginx/sites-enabled/rustdesk.conf`.

Run `cat /etc/nginx/sites-available/rustdesk.conf` to make sure its content is correct.

* If directory `/etc/nginx/sites-available` and `/etc/nginx/sites-enabled` don't exist and directory `/etc/nginx/conf.d` exists, replace `<YOUR_DOMAIN>` of the following command with your domain name and run it.
```sh
cat > /etc/nginx/conf.d/rustdesk.conf << EOF
server {
    server_name <YOUR_DOMAIN>;
    location / {
        proxy_set_header        X-Real-IP       \$remote_addr;
        proxy_set_header        X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_pass http://127.0.0.1:21114/;
    }
}
EOF
```
Run `cat /etc/nginx/conf.d/rustdesk.conf` to make sure its content is correct.

#### 5. Enable firewall rules for the domain
Run the following commands:

```sh
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw --force enable
sudo ufw --force reload
```

#### 6. Generate SSL certificate
Replace `$YOUR_DOMAIN` with your domain name, then run
`sudo certbot --nginx --cert-name $YOUR_DOMAIN --key-type ecdsa --renew-by-default --no-eff-email --agree-tos --server https://acme-v02.api.letsencrypt.org/directory -d $YOUR_DOMAIN`.

If it prompts `Enter email address (used for urgent renewal and security notices)`, enter your email address.

Finally, the content of `rustdesk.conf` should be like this:
```
server {
    server_name <YOUR_DOMAIN>;
    location / {
        proxy_set_header        X-Real-IP       $remote_addr;
        proxy_set_header        X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_pass http://127.0.0.1:21114/;
    }

    listen 443 ssl; # managed by Certbot
    ssl_certificate /etc/letsencrypt/live/<YOUR_DOMAIN>/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/<YOUR_DOMAIN>/privkey.pem; # managed by Certbot
    include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot
}

server {
    if ($host = <YOUR_DOMAIN>) {
        return 301 https://$host$request_uri;
    } # managed by Certbot

    server_name <YOUR_DOMAIN>;
    listen 80;
    return 404; # managed by Certbot
}
```

Here are some common errors:

* The console prints `Successfully deployed certificate for <YOUR_DOMAIN> to /etc/nginx/.../default`  rather than `Successfully deployed certificate for <YOUR_DOMAIN> to /etc/nginx/.../rustdesk.conf`.

The reason may be Certbot doesn't find the `rustdesk.conf` file, you can try one of the following solutions:
- Check the result of the step 5, run `sudo service nginx restart`.
- Copy the server configs `server{...}` which contain `<YOUR_DOMAIN>` to `rustdesk.conf`, and change `location{...}` to the content below.

```sh
location / {
           proxy_set_header        X-Real-IP       \$remote_addr;
           proxy_set_header        X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_pass http://127.0.0.1:21114/;
      }
```

* `too many certificates (5) already issued for this exact set of domains in the last 168 hours`

Solution: Add another domain name to DNS and change `<YOUR_DOMAIN>` to it, e.g. `rustdesk2.example.com`. Then repeat step 1, 4, 6.

* `Error getting validation data`

Solution: it may be caused by firewall, please refer to https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/faq/#firewall

Notice: Run `sudo service nginx restart` if you change the `rustdesk.conf` manually.

#### 7. Login to the web page
* Open `https://<YOUR_DOMAIN>` in the browser, log in using the default user name "admin" and password "test1234", then change the password to your own.

#### 8. Add WebSocket Secure (WSS) support for the id server and relay server to enable secure communication for the web client.

Add the following configuration to the first `server` section of the `/etc/nginx/.../rustdesk.conf` file, then restart the `Nginx` service.

```
    location /ws/id {
        proxy_pass http://localhost:21118;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "Upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    location /ws/relay {
        proxy_pass http://localhost:21119;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "Upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
```

The full configuration is

```
server {
    server_name <YOUR_DOMAIN>;
    location / {
        proxy_set_header        X-Real-IP       $remote_addr;
        proxy_set_header        X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_pass http://127.0.0.1:21114/;
    }

    location /ws/id {
        proxy_pass http://localhost:21118;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "Upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    location /ws/relay {
        proxy_pass http://localhost:21119;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "Upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    listen 443 ssl; # managed by Certbot
    ssl_certificate /etc/letsencrypt/live/<YOUR_DOMAIN>/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/<YOUR_DOMAIN>/privkey.pem; # managed by Certbot
    include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot
}

server {
    if ($host = <YOUR_DOMAIN>) {
        return 301 https://$host$request_uri;
    } # managed by Certbot

    server_name <YOUR_DOMAIN>;
    listen 80;
    return 404; # managed by Certbot
}
```

#### 9. Log in to your server from RustDesk public web client at `https://rustdesk.com/web`.

You need to add below in the `location /` section of the `/etc/nginx/.../rustdesk.conf` to bypass CORS limitation of browsers.

```
        if ($http_origin ~* (https?://(www\.)?rustdesk\.com)) {
            add_header 'Access-Control-Allow-Origin' "$http_origin" always;
            add_header 'Access-Control-Allow-Methods' 'GET, POST, PUT, DELETE, PATCH, OPTIONS' always;
            add_header 'Access-Control-Allow-Headers' 'Origin, Content-Type, Accept, Authorization' always;
            add_header 'Access-Control-Allow-Credentials' 'true' always;
        }
        if ($request_method = 'OPTIONS') {
            add_header 'Access-Control-Allow-Origin' "$http_origin" always;
            add_header 'Access-Control-Allow-Methods' 'GET, POST, PUT, DELETE, PATCH, OPTIONS' always;
            add_header 'Access-Control-Allow-Headers' 'Origin, Content-Type, Accept, Authorization' always;
            add_header 'Access-Control-Allow-Credentials' 'true' always;
            add_header 'Content-Length' 0;
            add_header 'Content-Type' 'text/plain charset=UTF-8';
            return 204;
        }
```


### SELinux

If `Waiting for RustDesk Relay service to become active...` appears when install, it may be caused by SELinux. You can try the following commands:

```sh
sudo semanage fcontext -a -t NetworkManager_dispatcher_exec_t 'hbbs'
sudo semanage fcontext -a -t NetworkManager_dispatcher_exec_t 'hbbr'
sudo restorecon -v '/usr/bin/hbbs'
sudo restorecon -v '/usr/bin/hbbr'
```

### Firewall

#### Firewall of cloud
If you run on AWS/Azure/Google/DigitalOcean cloud, please open UDP (21116) and TCP (21114-21119) inbound port on cloud vendor's dashboard.

- [AWS] https://docs.aws.amazon.com/network-firewall/latest/developerguide/getting-started.html
- [Azure] https://learn.microsoft.com/en-us/azure/virtual-network/network-security-groups-overview
- [Google] https://cloud.google.com/firewall/docs/firewalls
- [DigitalOcean] https://docs.digitalocean.com/products/networking/firewalls/

#### Firewall of on-premise server
RustDesk set firewall with `ufw`. It may not work on some distros like CentOS 9, you can try with `firewall-cmd`:

```sh
sudo firewall-cmd --permanent --add-port=21115/tcp
sudo firewall-cmd --permanent --add-port=21116/tcp
sudo firewall-cmd --permanent --add-port=21117/tcp
sudo firewall-cmd --permanent --add-port=21118/tcp
sudo firewall-cmd --permanent --add-port=21119/tcp
sudo firewall-cmd --permanent --add-port=21116/udp
```

If you use IP:

```sh
sudo firewall-cmd --permanent --add-port=21114/tcp
```

If you use DNS/Domain:

```sh
sudo firewall-cmd --permanent --add-port=80/tcp
sudo firewall-cmd --permanent --add-port=443/tcp
```

After above, run `sudo firewall-cmd --reload` to reload firewall.

### After changing the admin password in the web console I cannot log in. Is there a simple way to reset the password?
1. Ensure you have `rustdesk-utils` installed. If not you can get it [here](https://github.com/rustdesk/rustdesk-server-pro). Also you need to execute the command from the folder where the database is, i.e. `/var/lib/rustdesk-server`.
2. The command is `rustdesk-utils set_password username password`. If it works it will say *Done*.

You also have the following other commands `genkeypair`, `validatekeypair [public key] [secret key]`, `doctor [rustdesk-server]`, `reset_email_verification` and `reset_2fa_verification` which can be used with `rustdesk-utils`.

https://github.com/rustdesk/rustdesk-server-pro/discussions/183

### Add root CA certificate into Docker container (for TLS failure with SMTP, OIDC etc.)
https://github.com/rustdesk/rustdesk-server-pro/issues/99#issuecomment-2235014703
