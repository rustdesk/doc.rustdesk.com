---
title: LDAP
weight: 17
---

## 配置
請進入如下所示的`LDAP`設定頁面。

![](/docs/en/self-host/rustdesk-server-pro/ldap/images/ldap.png)

- **LDAP 主機：** 這是LDAP伺服器的主機名或IP位址。例如，`ldap.example.com` 或 `192.0.2.1`。

- **LDAP 連接埠：** 這是LDAP伺服器監聽的連接埠號。LDAP的預設連接埠是`389`，LDAPS（SSL上的LDAP）的預設連接埠是`636`。

- **基礎DN：** 這是LDAP搜尋的起始點。例如，dc=example,dc=com。

- **範圍：** 這決定了LDAP目錄中搜尋的範圍。可以是one（基礎DN直接下級的條目），或sub（基礎DN直接下級的條目）。

- **綁定DN / 密碼：** 您的服務帳戶的管理員使用者名稱和密碼。此帳戶用於綁定到LDAP以驗證其他使用者。通常是像`cn=admin,dc=example,dc=com`這樣的使用者DN。

- **篩選器：** 這是LDAP查詢的搜尋篩選器。例如，`(objectClass=person)`，或`(&(age=28)(!(name=Bob)))`。

- **使用者名稱屬性：** 這是包含使用者名稱的屬性。例如，`uid` 或 `sAMAccountName`。預設情況下，它使用`uid`和`cn`。這裡有一個關於此的[討論](https://github.com/rustdesk/rustdesk-server-pro/issues/140#issuecomment-1916804393)。

- **StartTLS：** 這決定是否使用StartTLS將連線升級為安全連線。

- **NoTLSVerify：** 這決定是否跳過TLS憑證驗證。建議將此設定為false（即執行憑證驗證），除非您確定知道自己在做什麼。

## 工作原理？
- LDAP登入如何工作，例如我需要先建立新使用者嗎，RustDesk在首次登入時建立使用者等？
  > RustDesk在首次登入時建立使用者
- 如何檢查LDAP是否工作（最好是可以提供給RustDesk的指令來返回發現的使用者）？
  > 當您提交配置時，它將使用您提供的binddn/password連線到您的LDAP伺服器並驗證它是否工作。
- 如何將本地使用者更改為LDAP使用者？
  > 暫不支援
- 是否支援LDAP群組？
  > 暫不支援