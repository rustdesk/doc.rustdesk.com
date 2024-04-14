---
title: Windows
weight: 4
---

### Permissions

#### SAS (Secure Attention Sequence)

SAS (Secure Attention Sequence) is key sequence that begins the process of logging on or off. The default sequence is CTRL+ALT+DEL.

Windows has a [SendSAS](https://learn.microsoft.com/en-us/windows/win32/api/sas/nf-sas-sendsas) API that can simulate this key sequence.

But it needs to be allowed by [the relevant configuration](https://admx.help/?Category=Windows_10_2016&Policy=Microsoft.Policies.WindowsLogon2::SoftwareSASGeneration) of the registry.

![](/docs/en/client/windows/images/1-registry.png)

RustDesk needs to modify this registry value in order to call `SendSAS()`.

In RustDesk, there are two places where you can modify this configuration.

The home page. If you ever click the close button in the upper right corner of this card, the card will no longer be displayed. You can change this on the settings page.

![](/docs/en/client/windows/images/2-home.png)

The settings page.

![](/docs/en/client/windows/images/3-settings.png)

**Note**: This is a global configuration. The modification will take effect on all services on the computer.


### Refs

1. [SAS](https://learn.microsoft.com/en-us/windows/win32/secgloss/s-gly#:~:text=clients%20and%20servers.-,secure%20attention%20sequence,-(SAS)%20A%20key)
1. [SendSAS](https://learn.microsoft.com/en-us/windows/win32/api/sas/nf-sas-sendsas)
1. [admx.help-SoftwareSASGeneration](https://admx.help/?Category=Windows_10_2016&Policy=Microsoft.Policies.WindowsLogon2::SoftwareSASGeneration)
