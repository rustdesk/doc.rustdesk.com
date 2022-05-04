---
title: Linux 
weight: 4
---

### Installation
------

- Ubuntu (>= 16)
```
# please ignore the wrong disk usage report
sudo apt install -fy ./rustdesk-<version>.deb
```

- CentOS/Fedora
```
sudo yum localinstall ./rustdesk-<version>.yum
```

- Arch/Manjaro
```
sudo pacman -U ./rustdesk-<version>.pkg.tar.zst
```

### X11 Required 
RustDesk does not support wayland yet, you need switch to X11. RustDesk will guide you to switch to X11. 

| Pleaes click on "Fix it" | fix for login screen | Input your password |
| ---- | ---- | --- |
|![](/docs/en/manual/linux/images/fix1.png)|![](/docs/en/manual/linux/images/fix3.png)|![](/docs/en/manual/linux/images/fix2.png)|

{{% notice note %}}
Please **reboot** to make above changes taking effect
{{% /notice %}}

#### You can also do above changes manually

#### Display Server
Ubuntu: https://askubuntu.com/questions/1260142/ubuntu-set-default-login-desktop

Fedora: https://docs.fedoraproject.org/en-US/quick-docs/configuring-xorg-as-default-gnome-session/

Arch: https://bbs.archlinux.org/viewtopic.php?id=218319

##### Login Screen

Modify below line to `WaylandEnable=false` in `/etc/gdm/custom.conf` or `/etc/gdm3/custom.conf`.
```
#WaylandEnable=false
```

