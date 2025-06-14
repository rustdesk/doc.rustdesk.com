---
title: LDAP
weight: 17
---

## 配置
请进入如下所示的`LDAP`设置页面。

![](/docs/en/self-host/rustdesk-server-pro/ldap/images/ldap.png)

- **LDAP 主机：** 这是LDAP服务器的主机名或IP地址。例如，`ldap.example.com` 或 `192.0.2.1`。

- **LDAP 端口：** 这是LDAP服务器监听的端口号。LDAP的默认端口是`389`，LDAPS（SSL上的LDAP）的默认端口是`636`。

- **基础DN：** 这是LDAP搜索的起始点。例如，dc=example,dc=com。

- **范围：** 这决定了LDAP目录中搜索的范围。可以是one（基础DN直接下级的条目），或sub（基础DN直接下级的条目）。

- **绑定DN / 密码：** 您的服务帐户的管理员用户名和密码。此帐户用于绑定到LDAP以验证其他用户。通常是像`cn=admin,dc=example,dc=com`这样的用户DN。

- **过滤器：** 这是LDAP查询的搜索过滤器。例如，`(objectClass=person)`，或`(&(age=28)(!(name=Bob)))`。

- **用户名属性：** 这是包含用户名的属性。例如，`uid` 或 `sAMAccountName`。默认情况下，它使用`uid`和`cn`。这里有一个关于此的[讨论](https://github.com/rustdesk/rustdesk-server-pro/issues/140#issuecomment-1916804393)。

- **StartTLS：** 这决定是否使用StartTLS将连接升级为安全连接。

- **NoTLSVerify：** 这决定是否跳过TLS证书验证。建议将此设置为false（即执行证书验证），除非您确定知道自己在做什么。

## 工作原理？
- LDAP登录如何工作，例如我需要先创建新用户吗，RustDesk在首次登录时创建用户等？
  > RustDesk在首次登录时创建用户
- 如何检查LDAP是否工作（最好是可以提供给RustDesk的命令来返回发现的用户）？
  > 当您提交配置时，它将使用您提供的binddn/password连接到您的LDAP服务器并验证它是否工作。
- 如何将本地用户更改为LDAP用户？
  > 暂不支持
- 是否支持LDAP组？
  > 暂不支持