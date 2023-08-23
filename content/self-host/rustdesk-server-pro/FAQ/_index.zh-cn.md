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
1. 转到[此页面](https://rustdesk.com/docs/zh-cn/self-host/rustdesk-server-pro/installscript/#upgrade)。
2. 将命令复制并粘贴到 Linux 终端中。
3. 按照提示进行升级。

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
