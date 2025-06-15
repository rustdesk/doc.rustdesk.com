---
title: NAT 环回问题
weight: 500
pre: "<b>2.5. </b>"
---

{{% notice note %}}
此解释涉及复杂的网络知识，我们需要您的帮助来改进其可读性。
{{% /notice %}}

有关 NAT 环回的更多详细信息，请查看 [维基百科](https://en.m.wikipedia.org/wiki/Network_address_translation#NAT_hairpinning) 页面。

当您在家庭网络或 NAT 防火墙后面的任何其他网络环境中部署 RustDesk 服务器时，RustDesk 服务器和您的客户端**必须**：
A：使用本地 IP 地址相互访问 或：
B：拥有支持并启用了 NAT 环回的防火墙。

您可能会注意到无法通过**公共 IP** 或**域名**（理论上指向您的公共 IP）连接到您的服务器。

## 问题
在此示例中，我们将跟踪 LAN 设备尝试连接到 `rustdesk.example.com` 时发生的情况。假设您的路由器的公共 IP 为 `172.16.16.1`，服务器的 LAN IP 为 `192.168.11.20`，您想要的域名为 `rustdesk.example.com`，并且您有一个使用 '192.168.11.2' 的客户端。

当您在路由器的 NAT 后面设置服务器时，您可以在路由器中添加端口转发规则，将任何传入到公共 IP 172.16.16.1 的消息转发到 192.168.11.20 的服务器。

当 LAN 设备想要访问互联网时，比如 8.8.8.8 上的网络服务器，它会发送来自 192.168.11.2 的请求，并将其发送到路由器。路由器将拦截该请求并将其重写为来自 172.16.16.1 的对 8.8.8.8 的请求。当 8.8.8.8 回复 172.16.16.1 时，路由器将检查之前的连接并将响应重新路由回 192.168.11.2。

如果 8.8.8.8 的用户使用 172.16.16.1 向我们的网络发送消息，端口转发规则将重写 172.16.16.1 的目标到 192.168.11.20 的服务器，保留请求的源为 8.8.8.8，以便服务器可以（或多或少）直接响应 8.8.8.8。

如果 8.8.8.8 的用户决定尝试攻击我们的网络并声称从 192.168.11.2 发送消息，路由器知道来自 192.168.11.2 的流量只有来自 LAN 设备才有效，通常会阻止该流量。

问题出现在您尝试回环到 LAN 时。如果 LAN 设备尝试连接到 `rustdesk.example.com`，这将是 `172.16.16.1`。此时路由器有很多选择要做。它刚刚从其 LAN 端口向其 WAN 端口发送了一条消息，来自 192.168.11.2 去往 172.16.16.1。一旦它到达 WAN 端口，这条消息本身就无法与上面的示例区分开来，在上面的示例中，互联网上的某人试图攻击我们的网络。

NAT 环回功能将有效地在过程早期更改源"从 192.168.11.2"地址部分，以便它知道必须使用 NAT 表在服务器和客户端之间传递消息。

如果只有在您在 LAN 内部时连接才有问题，但从异地工作正常，这可能就是您遇到的问题。

## 解决方案
有三种方法可以解决此问题。

### 1. 在路由器上设置 NAT 环回
如果您知道如何操作，您可以在路由器上设置 NAT 环回，但这需要网络知识。某些路由器没有调整此设置的能力，因此这不是每个人的最佳选择。

{{% notice note %}}
来自 [MikroTik](https://help.mikrotik.com/docs/display/ROS/NAT#NAT-HairpinNAT) 的文章很好地解释了这一点。您可以从这里开始学习。
{{% /notice %}}

### 2. 在您的 LAN 上部署 DNS 服务器
首先，选择您偏好的，[AdGuard Home](https://github.com/AdguardTeam/AdGuardHome/wiki/Docker) 或 [Pi-hole](https://github.com/pi-hole/docker-pi-hole)。您可以通过 docker 部署它，或者可以部署在与 RustDesk 服务器相同的服务器上。下面的示例将为您展示此示例的一些步骤。

它们都是基于 DNS 的广告拦截器，但如果您不想拦截广告，可以禁用此功能。

首先，将您的`域名`指向您的 RustDesk 服务器的 LAN IP（例如 `192.168.11.20`）。然后转到路由器的 `DHCP` 设置（注意：不是 WAN）并将您的`第一` DNS IP 设置为您部署了 AdGuard Home 或 Pi-hole 的服务器。`第二` DNS 可以是您的 ISP 的 DNS 或其他公共 DNS，例如 Cloudflare 的 `1.1.1.1` 或 Google 的 `8.8.8.8`，您就完成了！

这里是一个示例：
#### AdGuard Home
拦截广告可能会导致问题，如果您不想找出解决方案并想禁用此功能，请点击"禁用保护"按钮。

![](images/adguard_home_disable_protection.png)
<br>

转到"DNS 重写"设置。

![](images/adguard_home_click_dns_rewrites.png)
<br>

点击"添加 DNS 重写"，然后在字段中输入您的`域名`和服务器的`LAN IP`。

![](images/adguard_home_dns_rewrite_dialog.png)

这是最终结果的样子。

![](images/adguard_home_dns_rewrite_final_result.png)

***不要忘记将您的 AdGuard Home 分配给路由器的 LAN DHCP！***
<hr>

#### Pi-hole
拦截广告可能会导致问题，如果您不想找出解决方案并想禁用此功能，请在"禁用拦截"子菜单中点击"无限期"按钮。

![](images/pi_hole_disable_blocking.png)

转到"本地 DNS → DNS 记录"。
在框中输入您的`域名`和`IP`，然后点击"添加"。

要检查最终结果，请查看此图片中的黄色线条。

![](images/pi_hole_local_dns_dns_records.png)

***不要忘记将您的 Pi-hole 分配给路由器的 LAN DHCP！***

### 3. 向您的 hosts 文件添加规则
仅在您有少量设备时才推荐此方法。如果您有很多设备，首选 DNS 方法。否则，您必须在需要访问服务器的每个设备上手动执行此操作。

{{% notice warning %}}
如果在笔记本电脑等便携式设备上使用此方法，它将无法在您的 LAN 外部连接到服务器。
{{% /notice %}}

不同操作系统的路径：

#### Windows
```text
C:\Windows\system32\drivers\etc\hosts
```
您可以使用提升的权限进行编辑，或者可以将此文件复制到`桌面`并编辑它。编辑后，复制回原始路径。

#### macOS
```text
/etc/hosts
```
您可以使用 `vim`，它已预安装。
```sh
sudo vim /etc/hosts
```

#### Linux
```text
/etc/hosts
```
您可以使用 `vim` 或 `nano`。
```sh
sudo vim /etc/hosts
```

<hr>

在所有三个操作系统中格式都相同。首先是 `IP`，然后是`域名`。每行一个条目。

例如：
```text
192.168.11.20   rustdesk.example.com
```