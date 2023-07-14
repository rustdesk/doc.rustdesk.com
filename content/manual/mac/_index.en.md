---
title: Mac
weight: 3
---

### Installation

Open the .dmg file and drag `RustDesk` to `Applications` as below.

![](/docs/en/manual/mac/images/dmg.png)

Make sure you have quit all running RustDesk. Also make sure you quit the RustDesk service shown on the tray.

![](/docs/en/manual/mac/images/tray.png)

### Allow RustDesk run

| Unlock to change | Click on "App Store and identified developers" |
| ---- | ---- |
| ![](/docs/en/manual/mac/images/allow2.png) | ![](/docs/en/manual/mac/images/allow.png) |

### Enable permissions

{{% notice note %}}
Due to macOS security policy change, our api which captures input on local side does not work any
more. You have to enable "Input Monitoring" permission on local Mac side.
Please follow this
[https://github.com/rustdesk/rustdesk/issues/974#issuecomment-1185644923](https://github.com/rustdesk/rustdesk/issues/974#issuecomment-1185644923).

It seems no quick fix, we need to fix together with our Flutter version.
{{% /notice %}}

To capture screen, you need to grant `RustDesk` **accessibility** permission and **screen recording** permission. RustDesk will guide you to the settings window.

| RustDesk window | Settings window |
| ---- | ---- |
| ![](/docs/en/manual/mac/images/acc.png) | ![](/docs/en/manual/mac/images/acc3.png?v2) |

If you have enabled it in the settings window, but RustDesk still warns. Please Remove RustDesk from the settings windows by the `-` button, and click on `+` button, select RustDesk in `/Applications`.

| `-` and `+` button | Select RustDesk |
| ---- | ---- |
| ![](/docs/en/manual/mac/images/acc2.png) | ![](/docs/en/manual/mac/images/add.png?v2) |

Please copy above steps for **screen recording** permission.

![](/docs/en/manual/mac/images/screen.png?v2)
