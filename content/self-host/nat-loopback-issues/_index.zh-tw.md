---
title: NAT Loopback 問題
weight: 500
pre: "<b>2.5. </b>"
---

{{% notice note %}}
此說明牽涉到複雜的網路知識，我們需要您的指導來增加它的可讀性。
{{% /notice %}}
 
當您將您的伺服器部署在您的家中，或任何其他會將您的伺服器和客戶端放在**同一區網或同一路由器之後**的環境，您可能會發現您無法透過 **``公共 IP``** or **``網域``** (在理論上也是指向同一個公共IP)連結至您的伺服器。

更多有關 NAT Loopback 的詳情，請參閱 [維基百科(英文)](https://en.wikipedia.org/wiki/Network_address_translation#NAT_hairpinning)

用較簡單的方式說明:

舉例來說: 您的路由器的公共IP是 ``8.8.8.8``，您的伺服器的區網IP是 ``192.168.11.20`` 您所希望的網域是 ``rustdesk.example.com``，然後路由器的 port forwarding 已正確設置。

您的客戶端和伺服器在同一臺路由器之後，所以當您區域網路的裝置要連線到 ``rustdesk.example.com`` 的時候，首先，它會解析這個網域的IP，也就是 ``8.8.8.8``，然後連接到這個IP，接著您的路由器可能會直接**不知道**這條連線該去哪裡，然後它會覺得這個連接應該會想要去路由器它自己，接著您的連結就會失敗。

# 解決方法
有3個方式可以解決這個問題。
 
## 1. 在您的路由器設置 NAT Loopback

如果您知道如何設置的話您可以直接設置，但是設定這個需要網路知識，而且有些路由器可能沒有調整這個設定的能力，所以這不是最好的解決方案。

{{% notice note %}}
一篇來自 [MikroTik](https://help.mikrotik.com/docs/display/ROS/NAT#NAT-HairpinNAT) 的文章解釋這個的非常棒，您可以從這開始學習。
{{% /notice %}}

## 2. 在您的區域網路部署一個DNS伺服器
首先，挑一個您喜歡的 [AdGuard Home](https://github.com/AdguardTeam/AdGuardHome/wiki/Docker) 或 [PiHole](https://github.com/pi-hole/docker-pi-hole)，您可以使用 docker 部署，也可以部署這個跟 RustDesk Server 在同一台伺服器。以下範例會使用它們作為範例。

它們都是基於 DNS 的廣告攔截器，如果您不想要封鎖廣告，您可以關閉此功能。

首先，指向您的 ``網域`` 至您的 RustDesk Server 的 LAN IP (例如: ``192.168.11.20``)，接著到您的路由器的 ``DHCP`` 設定 **(警告: 不是 WAN 網際網路)**

請看範例:
### AdGuard Home
封鎖廣告可能會造成問題，如果您不想要尋找解決方法，並且想要關閉這個功能，請選擇"禁用保護"按鈕。

![](images/adguard_home_disable_protection.png)
<br>

去 "DNS 改寫" 設定。

![](images/adguard_home_click_dns_rewrites.png)
<br>

點擊 "新增 DNS 改寫"，接著輸入 ``網域`` 和伺服器的 ``LAN IP`` 至輸入框。

![](images/adguard_home_dns_rewrite_dialog.png)
最終結果看起來像這樣。

![](images/adguard_home_dns_rewrite_final_result.png)
***別忘記指派 AdGuard Home 到您路由器的LAN DHCP!***
<hr>

## PiHole
封鎖廣告可能會造成問題，如果您不想要尋找解決方法，並且想要關閉這個功能，請選擇 "Disable Blocking" 中的 "Indefinitely" 按鈕。

![](images/pi_hole_disable_blocking.png)

前往 Local DNS >  DNS Records
輸入 ``網域`` 和伺服器的 ``LAN IP`` 至輸入框， 接著點擊 "Add"。

要檢查最終結果，請檢查圖片中的黃線。

![](images/pi_hole_local_dns_dns_records.png)

***別忘記指派 PiHole 到您路由器的LAN DHCP!***

## 3. 在您的 hosts 檔案中添加規則
只當您只有幾臺設備時建議採用此做法，如果您有很多的設備，DNS 方法是更推薦的。

{{% notice warning %}}
如果您的環境有筆記型電腦，請**不要**使用此方法，因為這臺筆電會在你的區域網路之外時，沒辦法連接到您的伺服器。
{{% /notice %}}

 

不同作業系統的路徑:

> Windows
```plaintext
C:\Windows\system32\drivers\etc\hosts
```
複製這個檔案到 ``桌面`` 然後編輯它，在您編輯完它之後，把他複製回原來的位置。

> macOS
```plaintext
/etc/hosts
```
可以使用已預先安裝的 ``vim``。
```bash
sudo vim /etc/hosts
```


> Linux
```plaintext
/etc/hosts
```
您可以使用 ``vim`` 或 ``nano``
```bash
sudo vim /etc/hosts
```

<hr>

這些作業系統的格式都是相同的，都是 ``IP`` 先然後 ``網域``

例如:
```plaintext
192.168.11.20   rustdesk.example.com
```
