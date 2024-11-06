---
title: NAT Loopback issues
weight: 500
pre: "<b>2.5. </b>"
---

{{% notice note %}}
This explanation involves complex networking knowledge, we need your assistance to improve its readability.
{{% /notice %}}


For more details about NAT Loopback, please check the [Wikipedia](https://en.m.wikipedia.org/wiki/Network_address_translation#NAT_hairpinning) page.

When you're deploying RustDesk server on your home network or any other network environment, the RustDesk server and your clients **MUST** be on the **same LAN or behind the same router**, you may notice you are unable to connect to your server through your **Public IP** or **Domain** (Which in theory points to your public IP). The self-hosted server is not intended for access outside of the network without additional configuration which is beyond the scope of this explanation.

## Problem 
In this example we will follow what happens when LAN devices try connecting to `rustdesk.example.com`. Assume your router's public IP will be `8.8.8.8`, the LAN IP of your server is `192.168.11.20` and the domain you desire is `rustdesk.example.com`. 
First, the LAN device will query the router to get the IP for `rustdesk.example.com`, which will be `8.8.8.8` because the router doesn't have an entry in its DNS for `rustdesk.example.com`. It will try to establish a connection to this IP assuming you want to connect to the router, not the server. However, since the router is not configured to accept that connection, it will not know what to do with that request and the connection will fail.

## Solutions
There are three ways to solve this issue.

### 1. Set up NAT Loopback on your router
You could set up NAT Loopback on your router if you know how to, but setting this requires knowledge of networking. Some routers don't have the ability to adjust this setting, so this is not the best option for everyone.

{{% notice note %}}
An article from [MikroTik](https://help.mikrotik.com/docs/display/ROS/NAT#NAT-HairpinNAT) explains this very well. You could start learning from here.
{{% /notice %}}

### 2. Deploy a DNS server on your LAN
First, choose which you prefer, [AdGuard Home](https://github.com/AdguardTeam/AdGuardHome/wiki/Docker) or [Pi-hole](https://github.com/pi-hole/docker-pi-hole). You could deploy it through docker, or you could deploy on the same server as your RustDesk Server. The example below will show you some steps for this example.

Both of them are DNS based adblockers, but you could disable this functionality if you don't want to block ads.

First, point your `domain` to your RustDesk server's LAN IP (for example `192.168.11.20`). Then go to your router's `DHCP` setting (Caution: NOT WAN) and set your `First` DNS IP to the server that you deployed AdGuard Home or Pi-hole. `Secondary` DNS could be your ISP's DNS or other public DNS, e.g. `1.1.1.1` for Cloudflare or `8.8.8.8` for Google, and you're done!

Here is an example:
#### AdGuard Home
Blocking ads may cause problems, if you don't want to figure out the solution and want to disable this functionality, click "Disable protection" button.

![](images/adguard_home_disable_protection.png)
<br>

Go to "DNS rewrites" setting.

![](images/adguard_home_click_dns_rewrites.png)
<br>

Click "Add DNS rewrite", then type your `domain` and server's `LAN IP` in the field.

![](images/adguard_home_dns_rewrite_dialog.png)

Here is what the final result looks like.

![](images/adguard_home_dns_rewrite_final_result.png)

***Don't forget to assign your AdGuard Home to your router's LAN DHCP!***
<hr>

#### Pi-hole
Blocking ads may cause problems, if you don't want to figure out the solution and want to disable this functionality, click "Indefinitely" button within the "Disable Blocking" submenu.

![](images/pi_hole_disable_blocking.png)

Go to "Local DNS → DNS Records".
Type your `domain` and `IP` to the box, than click "Add".

To check the final results, check the yellow lines in this picture.

![](images/pi_hole_local_dns_dns_records.png)

***Don't forget to assign your Pi-hole to your router's LAN DHCP!***

### 3. Add rules to your hosts file
This method is only recommended if you have a small number of devices. If you have many devices the DNS method is preferred. Otherwise you would have to manually do this on each device that needs access to the server.

{{% notice warning %}}
If this method is used on a portable device like a laptop, it will not be able to connect to the server when outside your LAN.
{{% /notice %}}

Path for different OS:

#### Windows
```text
C:\Windows\system32\drivers\etc\hosts
```
You can edit with elevated privilages or you can copy this file to `Desktop` and edit it. After you edit it, copy back to original path.

#### macOS
```text
/etc/hosts
```
You could use `vim`, it is pre-installed.
```sh
sudo vim /etc/hosts
```

#### Linux
```text
/etc/hosts
```
You could use `vim` or `nano`.
```sh
sudo vim /etc/hosts
```

<hr>

The format is the same in all three operating systems. `IP` first followed by `domain`. One entry per line.

For example:
```text
192.168.11.20   rustdesk.example.com
```
