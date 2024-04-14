---
title: Windows
weight: 4
---

### 权限

#### SAS (Secure Attention Sequence)

SAS (Secure Attention Sequence) 是指开始登录或注销过程的按键序列。 默认顺序是 CTRL+ALT+DEL。

Windows 有 [SendSAS](https://learn.microsoft.com/en-us/windows/win32/api/sas/nf-sas-sendsas) 的 API 可以模拟这个按键序列。
但需要注册表的[相关配置](https://admx.help/?Category=Windows_10_2016&Policy=Microsoft.Policies.WindowsLogon2::SoftwareSASGeneration)允许才行。

![](/docs/en/client/windows/images/1-registry.png)

RustDesk 需要修改这个注册表的值，以调用 `SendSAS()` 。

在 RustDesk 中，有两个地方可以修改这个配置。

主页。如果您曾经点击过这个卡片右上角的关闭按钮，那么这个卡片将不再显示。您可以在设置页更改。

![](/docs/en/client/windows/images/2-home.png)

设置页

![](/docs/en/client/windows/images/3-settings.png)

**注**：这是一个全局配置。修改后对计算机的所有服务都生效。


### 参考

1. [SAS](https://learn.microsoft.com/en-us/windows/win32/secgloss/s-gly#:~:text=clients%20and%20servers.-,secure%20attention%20sequence,-(SAS)%20A%20key)
1. [SendSAS](https://learn.microsoft.com/en-us/windows/win32/api/sas/nf-sas-sendsas)
1. [admx.help-SoftwareSASGeneration](https://admx.help/?Category=Windows_10_2016&Policy=Microsoft.Policies.WindowsLogon2::SoftwareSASGeneration)
