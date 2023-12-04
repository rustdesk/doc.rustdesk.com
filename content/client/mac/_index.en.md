---
title: Mac
weight: 3
---

### Installation

Open the .dmg file and drag `RustDesk` to `Applications` as below.

![](/docs/en/client/mac/images/dmg.png)

Make sure you have quit all running RustDesk. Also make sure you quit the RustDesk service shown on the tray.

![](/docs/en/client/mac/images/tray.png)

### Allow RustDesk run

| Unlock to change | Click on "App Store and identified developers" |
| --- | --- |
| ![](/docs/en/client/mac/images/allow2.png) | ![](/docs/en/client/mac/images/allow.png) |

### Enable permissions

{{% notice note %}}
Due to macOS security policy change, our api which captures input on local side does not work any
more. You have to enable "Input Monitoring" permission on local Mac side.
Please follow this
[https://github.com/rustdesk/rustdesk/issues/974#issuecomment-1185644923](https://github.com/rustdesk/rustdesk/issues/974#issuecomment-1185644923).

In 1.2.4, you can try out `Input source 2` which can be seen by clicking on keyboard icon on the toolbar.
{{% /notice %}}

To capture screen, you need to grant RustDesk **Accessibility** permission and **Screen Recording** permission. RustDesk will guide you to the settings window.

| RustDesk window | Settings window |
| --- | --- |
| ![](/docs/en/client/mac/images/acc.png) | ![](/docs/en/client/mac/images/acc3.png?v2) |

If you have enabled it in the settings window, but RustDesk still warns. Please remove RustDesk from the settings windows by the `-` button, and click on `+` button, select RustDesk in `/Applications`.

{{% notice note %}}
Other helpless attempts:

```
tccutil reset ScreenCapture com.carriez.RustDesk
tccutil reset Accessibility com.carriez.RustDesk
```
Reboot is still required.
{{% /notice %}}

| `-` and `+` button | Select RustDesk |
| --- | --- |
| ![](/docs/en/client/mac/images/acc2.png) | ![](/docs/en/client/mac/images/add.png?v2) |

Please copy above steps for **Screen Recording** permission.

![](/docs/en/client/mac/images/screen.png?v2)
