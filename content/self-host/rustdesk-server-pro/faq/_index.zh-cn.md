---
title: FAQ
weight: 600
---

## 如何使用简单安装脚本进行安装？
1. 从 [https://rustdesk.com/pricing.html](https://rustdesk.com/pricing.html) 获取许可证，查看 [license](/docs/zh-cn/self-host/rustdesk-server-pro/license) 页面了解更多详细信息。
2. 启动 VPS、裸机或 Linux VM。
3. 如果您想使用 DNS 和 SSL，请创建一个 DNS 名称，即`rustdesk.yourdomain.com`。
4. 转到[此页面](https://rustdesk.com/docs/zh-cn/self-host/rustdesk-server-pro/installscript/#install)。
5. 将命令复制并粘贴到 Linux 终端中。
6. 按照提示完成安装。
7. 安装完成后，转到`https://rustdesk.yourdomain.com`或`http://youripaddress:21114`。
8. 使用用户名`admin`和密码`test1234`登录。
9. 输入您在步骤 1 中购买的许可证代码。

## 如何从 RustDesk Server开源版本 转换为 RustDesk Server Pro？
1. 从 [https://rustdesk.com/pricing.html](https://rustdesk.com/pricing.html) 获取许可证，查看 [license](/docs/zh-cn/self-host/rustdesk-server-pro/license) 页面了解更多详细信息。
2. 打开 TCP 端口 21114。
3. 登录您的 RustDesk 服务器。
4. 如果您尚未使用 DNS 并且想要使用 SSL，请创建一个 DNS 名称，即`rustdesk.yourdomain.com`。
5. 转到[此页面](https://rustdesk.com/docs/zh-cn/self-host/rustdesk-server-pro/installscript/#convert-from-open-source)。
6. 将命令复制并粘贴到 Linux 终端中。
7. 按照提示完成安装。
8. 安装完成后，转到`https://rustdesk.yourdomain.com`或`http://youripaddress:21114`。
9. 使用用户名`admin`和密码`test1234`登录。
10. 输入您在步骤 1 中购买的许可证代码。

## RustDesk Server Pro 有新版本，如何升级？
您最好先备份数据文件（sqlite3 文件等），https://github.com/rustdesk/rustdesk-server-pro/discussions/184#discussioncomment-8013375。
- ### 如果您使用脚本（`install.sh`）安装
请运行 [update.sh](/docs/zh-cn/self-host/rustdesk-server-pro/installscript/script/#upgrade)。
- ### Docker Compose
```
sudo docker compose down
sudo docker compose pull 
sudo docker compose up -d
```
但这取决于您的 docker 版本，有关更多讨论，请查看[此处](https://stackoverflow.com/questions/37685581/how-to-get-docker-compose-to-use-the-latest-image-from-repository)。
- ### Docker
```
sudo docker ps
## 您也可以使用 <CONTAINER NAME>，例如，如果您按照我们的手册操作，则为 `hbbs` 和 `hbbr`。
sudo docker stop <CONTAINER ID>
sudo docker rm <CONTAINER ID>
sudo docker rmi <IMAGE ID>
sudo docker run ..... # 与您之前安装时相同
```

例如：

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

有关更多详细信息，请查看[此处](https://www.cherryservers.com/blog/how-to-update-docker-image)。

## 我使用脚本安装了，如何启动和停止服务？
这些服务使用 systemd，因此可以使用`sudo systemctl stop|start|restart rustdesk-hbbs|rustdesk-hbbr`来启动和停止，例如 `sudo systemctl restart rustdesk-hbbs`。

## 我用脚本安装了，如何查看Linux日志？
日志存储在 /var/log/rustdesk-server 中，您可以使用 `tail /var/log/rustdesk-server/hbbs.log` 或 `tail /var/log/rustdesk-server/hbbs.error` 查看它们。

## 我使用脚本安装了，如何检查 RustDesk 服务的状态？
要检查状态 `sudo systemctl status rustdesk-hbbs|rustdesk-hbbr` 例如 `sudo systemctl status rustdesk-hbbs`。

## 如何在 Windows 上安装 RustDesk Server Pro？
1. 从 [https://rustdesk.com/pricing.html](https://rustdesk.com/pricing.html) 获取许可证，查看 [license](/docs/zh-cn/self-host/rustdesk-server-pro/license) 页面了解更多详细信息。
2. 从 [GitHub](https://github.com/rustdesk/rustdesk-server-pro/releases/latest) 下载 Windows 安装程序。
3. 解压 Windows 安装程序。
4. 运行安装程序并按照屏幕上的步骤进行操作。
5. 完成后打开 RustDesk Server。
6. 按照提示完成安装。
7. 单击`服务`，然后单击`启动`。
8. 安装完成后，转到`http://youripaddress:21114`。
9. 使用用户名`admin`和密码`test1234`登录。
10. 输入您在步骤 1 中购买的许可证代码。

## 如何更改管理员密码？
1. 转到`https://rustdesk.yourdomain.com`或`http://youripaddress:21114`。
2. 使用用户名`admin`和密码`test1234`登录。
3. 单击右上角的`管理`。
4. 单击`设置`。
5. 在提供的框中输入您的新密码。

## 如何删除默认的`admin`用户？
1. 创建另一个启用`管理员`的帐户。
2. 使用新的管理帐户登录。
3. 删除`Users`页面上的`admin`。

## 如何设置我的中继服务器？
1. 转到左侧菜单上的`设置`。
2. 单击子菜单上的`中继`。
3. 单击`中继服务器`旁边的`+`。
4. 在现在显示的框中输入中继服务器 DNS 地址或 IP 地址，然后按 Enter。
5. 如果您有多个中继服务器，您可以继续单击`+`并根据需要调整地理设置（记住并将您的密钥复制到其他服务器）。

## 如何设置或更改许可证？
1. 转到左侧菜单上的`设置`。
2. 单击子菜单上的`许可证`。
3. 单击`编辑`并粘贴您的许可证代码。
4. 单击`确定`。

## 如何将我的许可证移至新服务器？
请参阅[此处](https://rustdesk.com/docs/zh-cn/self-host/rustdesk-server-pro/license/#invoices-and-migration)。

## 如何查看日志？
在左侧单击`日志`。

## 如何设置电子邮件？
本例中的 Gmail

1. 转到左侧菜单上的`设置`。
2. 单击子菜单上的`SMTP`。
3. 输入 SMTP 地址 `smtp.gmail.com`。
4. 在`SMTP 端口`中输入端口 587。
5. 在`邮件帐户`中输入 Gmail 帐户，即`myrustdeskserver@gmail.com`。
6. 输入您的密码（您可能需要应用程序密码）。
7. 在`发件人`中输入您的 Gmail 帐户，即`myrustdeskserver@gmail.com`。
8. 单击`检查`保存。

## 我的 VPS 无法发送电子邮件
许多 VPS 提供商会阻止端口 465 和 25。

一个简单的检查方法是使用 telnet。 要在 Linux 终端中测试，请输入`telnet your.mailserver.com 25`。 在 Windows 上，使用 PowerShell 和`Test-NetConnection -ComputerName your.mailserver.com -Port 25`。

您的邮件服务器可能未使用端口 25。请确保您使用的是正确的端口。

## 我可以使用 powershell 部署 RustDesk 吗？
当然，此脚本可以提供帮助，将`youraddress`和`yourkey`替换为 RustDesk Server Pro 地址和密钥的地址和密钥
```
$ErrorActionPreference= 'silentlycontinue'

$rdver = ((Get-ItemProperty  "HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall\RustDesk\").Version)

if($rdver -eq "1.2.1") 
{
write-output "RustDesk $rdver is the newest version"

exit
}

If (!(Test-Path c:\Temp)) {
  New-Item -ItemType Directory -Force -Path c:\Temp > null
}

cd c:\Temp

powershell Invoke-WebRequest "https://github.com/rustdesk/rustdesk/releases/download/1.2.1/rustdesk-1.2.1-x86_64.exe" -Outfile "rustdesk.exe"
Start-Process .\rustdesk.exe --silent-install -wait

$ServiceName = 'Rustdesk'
$arrService = Get-Service -Name $ServiceName -ErrorAction SilentlyContinue

if ($arrService -eq $null)
{
    Start-Sleep -seconds 20
}

while ($arrService.Status -ne 'Running')
{
    Start-Service $ServiceName
    Start-Sleep -seconds 5
    $arrService.Refresh()
}
net stop rustdesk

$username = ((Get-WMIObject -ClassName Win32_ComputerSystem).Username).Split('\')[1]
Remove-Item C:\Users\$username\AppData\Roaming\RustDesk\config\RustDesk2.toml
New-Item C:\Users\$username\AppData\Roaming\RustDesk\config\RustDesk2.toml
Set-Content C:\Users\$username\AppData\Roaming\RustDesk\config\RustDesk2.toml "rendezvous_server = 'youraddress' `nnat_type = 1`nserial = 0`n`n[options]`ncustom-rendezvous-server = 'youraddress'`nkey = 'yourkey'`nrelay-server = 'youraddress'`napi-server = 'https://youraddress'"
Remove-Item C:\Windows\ServiceProfiles\LocalService\AppData\Roaming\RustDesk\config\RustDesk2.toml
New-Item C:\Windows\ServiceProfiles\LocalService\AppData\Roaming\RustDesk\config\RustDesk2.toml
Set-Content C:\Windows\ServiceProfiles\LocalService\AppData\Roaming\RustDesk\config\RustDesk2.toml "rendezvous_server = 'youraddress' `nnat_type = 1`nserial = 0`n`n[options]`ncustom-rendezvous-server = 'youraddress'`nkey = 'yourkey'`nrelay-server = 'youraddress'`napi-server = 'https://youraddress'"

net start rustdesk
```

## 如何从网络上的代理或使用 RMM 类型系统获取 RustDesk ID？
在 Windows 上，您可以使用以下 PowerShell 脚本：
```
$ErrorActionPreference= 'silentlycontinue'

Start-Process "$env:ProgramFiles\RustDesk\RustDesk.exe" --get-id 
sleep 2
$rustdesk_id = (get-clipboard)
Write-Output $rustdesk_id
```

## 如何在我的网络上或使用 RMM 类型系统的代理上设置永久密码？
在 Windows 上，您可以使用以下 PowerShell 脚本：
```
$ErrorActionPreference = 'silentlycontinue'

net stop rustdesk > null
$ProcessActive = Get-Process rustdesk -ErrorAction SilentlyContinue
if($ProcessActive -ne $null)
{
stop-process -ProcessName rustdesk -Force
}

$rustdesk_pw = (-join ((65..90) + (97..122) | Get-Random -Count 12 | % {[char]$_}))
Start-Process "$env:ProgramFiles\RustDesk\RustDesk.exe" "--password $rustdesk_pw" -wait
Write-Output $rustdesk_pw

net start rustdesk > null
```

## 我已手动安装 RustDesk Server Pro，但 API Web 控制台不在 SSL 后面，我该如何保护它？
使用Nginx之类的代理，简单的安装脚本就有一个，非常简单。 [就在这里](https://github.com/rustdesk/rustdesk-server-pro/blob/493ad90daf8815c3052ff4d0d4aa9cc07e411efa/install.sh#L252)。

类似的配置应该适用于 Traefik v2、HAProxy、Apache Proxy 和 Cloudflare Tunnel。

## 我如何提交错误报告？
请通过 [GitHub](https://github.com/rustdesk/rustdesk-server-pro/issues) 提交。

## 为什么如果我是自托管，这不是免费和开源的吗？
1. RustDesk 已经成为维护者的全职工作，他们有生活，有妻子，有工作，有孩子，他们像你一样需要花钱生活！
2. 我们希望在未来的几年里继续取得巨大进步。
3. 开源版本将继续开源，我们鼓励其他人在符合AGPL许可的情况下进行开发。

## 我无法连接到不同组中的设备，这是为什么？
这很容易排序，您需要允许跨组访问。
1. 添加新群组。
2. 单击编辑。
3. 选择您想要访问的相关组（它会自动将它们添加到相应的组中）。

## 如何自动获取配置？
配置是自动生成的。
1. 从[GitHub](https://github.com/rustdesk/rustdesk/releases/latest)下载最新的客户端。
2. 在 Web 控制台的主页上单击 Windows EXE。
3. 填写主机和 API（如果与您的配置不同）。
4. 单击`提交`。
5. 扫描Android上的二维码并将exe重命名为生成的文件。

## 你们是否提供 RustDesk Server Pro 托管？
请联系我们的[销售](mailto://sales@rustdesk.com) 团队。

## 有什么地方可以看到视频设置指南吗？
是的！ 我们有一个 [YouTube 频道](https://youtube.com/@RustDesk)，稍后会创建B站频道。

## 手动设置 Web 控制台的 HTTPS

### 1. 购买域名并将其解析到您的服务器 IP 地址
* 从域名注册商（如 GoDaddy、Namecheap 或 Namesilo）购买域名
* 通过以下方式之一将域名解析到您的服务器 IP 地址：
    - 您的域名注册商的控制面板（推荐）
    - [DNS 提供商](https://en.wikipedia.org/wiki/List_of_managed_DNS_providers)

例如，如果您从 `Namesilo` 购买域名 `example.com`，您的服务器 IP 地址是 `123.123.123.123`，您想使用 `rustdesk.example.com` 子域名作为您的 HTTPS Web 控制台地址。您需要打开[链接](https://www.namesilo.com/account_domains.php)，点击带有工具提示 `Manage dns for the domain` 的按钮，添加一个主机名为 `rustdesk` 且 IP 地址为您的服务器 IP 的 `A` 记录。
![](/docs/en/self-host/rustdesk-server-pro/faq/images/namesilo-dns-button.png)
![](/docs/en/self-host/rustdesk-server-pro/faq/images/namesilo-add-a-record.png)
![](/docs/en/self-host/rustdesk-server-pro/faq/images/namesilo-dns-table.png)
* DNS 生效需要一些时间，访问 https://www.whatsmydns.net 检查域名是否已解析到您的服务器 IP 地址。第 6 步取决于正确的解析结果。在以下步骤中，将 `<YOUR_DOMAIN>` 替换为您的子域名，例如 `rustdesk.example.com`。

### 2. 安装 Nginx
* Debian/Ubuntu: `sudo apt-get install nginx`
* Fedora/CentOS: `sudo dnf install nginx` 或 `sudo yum install nginx`
* Arch: `sudo pacman -S install nginx`
* openSUSE: `sudo zypper install nginx`
* Gentoo: `sudo emerge -av nginx`
* Appine: `sudo apk add --no-cache nginx`

运行 `nginx -h` 检查是否安装成功。

### 3. 安装 Certbot
* 方法 1：如果已安装 `snap`，运行 `sudo snap install certbot --classic`
* 方法 2：使用 `python3-certbot-nginx`，例如 Ubuntu 的 `sudo apt-get install python3-certbot-nginx`
* 方法 3：如果上述两种方法失败，尝试安装 `certbot-nginx`，例如 CentOS 7 的 `sudo yum install certbot-nginx`

运行 `certbot -h` 检查是否安装成功。

### 4. 配置 Nginx
有两种方式：
* 如果存在目录 `/etc/nginx/sites-available` 和 `/etc/nginx/sites-enabled`，将以下命令中的 `<YOUR_DOMAIN>` 替换为您的域名并运行。
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
然后运行 `sudo ln -s /etc/nginx/sites-available/rustdesk.conf /etc/nginx/sites-enabled/rustdesk.conf`。

运行 `cat /etc/nginx/sites-available/rustdesk.conf` 确保其内容正确。

* 如果目录 `/etc/nginx/sites-available` 和 `/etc/nginx/sites-enabled` 不存在，但目录 `/etc/nginx/conf.d` 存在，将以下命令中的 `<YOUR_DOMAIN>` 替换为您的域名并运行。
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
运行 `cat /etc/nginx/conf.d/rustdesk.conf` 确保其内容正确。

### 5. 为域名启用防火墙规则
运行以下命令：

```sh
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw --force enable
sudo ufw --force reload
```

### 6. 生成 SSL 证书
将 `$YOUR_DOMAIN` 替换为您的域名，然后运行
`sudo certbot --nginx --cert-name $YOUR_DOMAIN --key-type ecdsa --renew-by-default --no-eff-email --agree-tos --server https://acme-v02.api.letsencrypt.org/directory -d $YOUR_DOMAIN`。

如果提示 `Enter email address (used for urgent renewal and security notices)`，输入您的电子邮件地址。

最后，`rustdesk.conf` 的内容应该如下：

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

以下是一些常见错误：

* 控制台打印 `Successfully deployed certificate for <YOUR_DOMAIN> to /etc/nginx/.../default` 而不是 `Successfully deployed certificate for <YOUR_DOMAIN> to /etc/nginx/.../rustdesk.conf`。

原因可能是 Certbot 找不到 `rustdesk.conf` 文件，您可以尝试以下解决方案之一：
- 检查第 5 步的结果，运行 `sudo service nginx restart`。
- 将包含 `<YOUR_DOMAIN>` 的服务器配置 `server{...}` 复制到 `rustdesk.conf`，并将 `location{...}` 更改为以下内容。

```sh
location / {
           proxy_set_header        X-Real-IP       \$remote_addr;
           proxy_set_header        X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_pass http://127.0.0.1:21114/;
      }
```

* `too many certificates (5) already issued for this exact set of domains in the last 168 hours`

解决方案：向 DNS 添加另一个域名并将 `<YOUR_DOMAIN>` 更改为它，例如 `rustdesk2.example.com`。然后重复步骤 1、4、6。

* `Error getting validation data`

解决方案：可能是由防火墙引起的，请参阅 https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/faq/#firewall

注意：如果您手动更改了 `rustdesk.conf`，请运行 `sudo service nginx restart`。

### 7. 登录网页
* 在浏览器中打开 `https://<YOUR_DOMAIN>`，使用默认用户名 "admin" 和密码 "test1234" 登录，然后将密码更改为您自己的密码。

### 8. 为 ID 服务器和中继服务器添加 WebSocket Secure (WSS) 支持，以启用所有平台的安全通信

将以下配置添加到 `/etc/nginx/.../rustdesk.conf` 文件的第一个 `server` 部分，然后重启 `Nginx` 服务。
Web客户端通过 `https://<YOUR_DOMAIN>/web`访问, 自定义客户端通过在高级选项中设置 `allow-websocket=Y`来使用websocket。如果自定义客户端中启用了websocket，该自定义客户端将不会被使用tcp/udp, 只能通过中继连接(除IP直连)。如果只使用这种启用了websocket的客户端, 也可以关闭服务器的21114~21119端口, 只开启443端口。
```
    location /ws/id {
        proxy_pass http://127.0.0.1:21118;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "Upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_read_timeout 120s;
    }

    location /ws/relay {
        proxy_pass http://127.0.0.1:21119;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "Upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_read_timeout 120s;
    }
```

完整配置如下：

```
server {
    server_name <YOUR_DOMAIN>;
    location / {
        proxy_set_header        X-Real-IP       $remote_addr;
        proxy_set_header        X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_pass http://127.0.0.1:21114/;
    }

    location /ws/id {
        proxy_pass http://127.0.0.1:21118;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "Upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_read_timeout 120s;
    }

    location /ws/relay {
        proxy_pass http://127.0.0.1:21119;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "Upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_read_timeout 120s;
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

{{% notice note %}}
如果您之前为 Web 客户端部署过，并想在所有平台上使用，您需要添加 `proxy_read_timeout`。
{{% /notice %}}

### 9. 如果您使用 RustDesk 公共 Web 客户端 `https://rustdesk.com/web`，需要绕过 CORS 限制

您需要在 `/etc/nginx/.../rustdesk.conf` 的 `location /` 部分添加以下内容，以绕过浏览器的 CORS 限制。如果您使用自己的 Web 客户端，可以跳过此步骤。

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

### 为什么我的日志/设备名称为空？
确保在被控制的设备上正确设置了 API，https://github.com/rustdesk/rustdesk-server-pro/issues/21#issuecomment-1637935750。

### 如何卸载 RustDesk Server Pro？
运行以下命令：
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
如果脚本安装了 Nginx，则使用以下命令删除：
```sh
sudo apt remove nginx
```

### 如何从 Web 控制台的设备列表中删除设备？
禁用然后删除现在可用。

### 如何使用 PowerShell 更新 RustDesk？
```ps
$ErrorActionPreference= 'silentlycontinue'

$rdver = ((Get-ItemProperty  "HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall\RustDesk\").Version)

if ($rdver -eq "1.2.6")
{
    Write-Output "RustDesk $rdver 是最新版本。"
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

### `Key mismatch` 错误
请使用[正确的密钥](https://rustdesk.com/docs/zh-cn/self-host/rustdesk-server-pro/relay/)配置您的客户端。

### `Failed to connect to relay server` 错误
请确保 `hbbr` 正在运行。有关 `hbbr` 的更多信息，您可以[在此处](https://rustdesk.com/docs/zh-cn/self-host/rustdesk-server-oss/install/)找到。
如果您的 `hbbr` 不在与 `hbbs` 相同的机器上运行，或者您有多个中继服务器，或者您不在默认端口 `21117` 上运行它，您必须明确告诉 `hbbs`。请查看[此处](https://rustdesk.com/docs/zh-cn/self-host/rustdesk-server-pro/relay/)。

### 重置管理员账户的 MFA
https://github.com/rustdesk/rustdesk/discussions/6576

### 在 Web 控制台中更改管理员密码后无法登录。是否有简单的方法重置密码？
1. 确保您已安装 `rustdesk-utils`。如果没有，您可以从[这里](https://github.com/rustdesk/rustdesk-server-pro)获取。此外，您需要从数据库所在的文件夹执行命令，即 `/var/lib/rustdesk-server`。
2. 命令是 `rustdesk-utils set_password username password`。如果成功，它将显示 *Done*。

您还可以使用以下其他命令 `genkeypair`、`validatekeypair [public key] [secret key]`、`doctor [rustdesk-server]`、`reset_email_verification` 和 `reset_2fa_verification`，这些命令可以与 `rustdesk-utils` 一起使用。

https://github.com/rustdesk/rustdesk-server-pro/discussions/183

## SELinux

如果安装时出现 `Waiting for RustDesk Relay service to become active...`，可能是由 SELinux 引起的。您可以尝试以下命令：

```sh
sudo semanage fcontext -a -t NetworkManager_dispatcher_exec_t 'hbbs'
sudo semanage fcontext -a -t NetworkManager_dispatcher_exec_t 'hbbr'
sudo restorecon -v '/usr/bin/hbbs'
sudo restorecon -v '/usr/bin/hbbr'
```

## 防火墙

### 云防火墙
如果您在 AWS/Azure/Google/DigitalOcean 云上运行，请在云供应商的仪表板上打开 UDP (21116) 和 TCP (21114-21119) 入站端口。

- [AWS] https://docs.aws.amazon.com/network-firewall/latest/developerguide/getting-started.html
- [Azure] https://learn.microsoft.com/en-us/azure/virtual-network/network-security-groups-overview
- [Google] https://cloud.google.com/firewall/docs/firewalls
- [DigitalOcean] https://docs.digitalocean.com/products/networking/firewalls/

### 本地服务器防火墙
RustDesk 使用 `ufw` 设置防火墙。它可能在某些发行版（如 CentOS 9）上不起作用，您可以尝试使用 `firewall-cmd`：

```sh
sudo firewall-cmd --permanent --add-port=21115/tcp
sudo firewall-cmd --permanent --add-port=21116/tcp
sudo firewall-cmd --permanent --add-port=21117/tcp
sudo firewall-cmd --permanent --add-port=21118/tcp
sudo firewall-cmd --permanent --add-port=21119/tcp
sudo firewall-cmd --permanent --add-port=21116/udp
```

如果您使用 IP：

```sh
sudo firewall-cmd --permanent --add-port=21114/tcp
```

如果您使用 DNS/域名：

```sh
sudo firewall-cmd --permanent --add-port=80/tcp
sudo firewall-cmd --permanent --add-port=443/tcp
```

完成上述操作后，运行 `sudo firewall-cmd --reload` 重新加载防火墙。

### 将根 CA 证书添加到 Docker 容器中（用于 SMTP、OIDC 等的 TLS 失败）
https://github.com/rustdesk/rustdesk-server-pro/issues/99#issuecomment-2235014703
