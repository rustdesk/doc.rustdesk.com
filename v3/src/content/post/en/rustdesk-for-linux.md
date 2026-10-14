---
publishDate: 2026-07-09T08:32:00Z
updateDate: 2026-10-14T00:00:00Z
lang: en
translationKey: rustdesk-for-linux
draft: false
title: 'RustDesk for Linux: The Open-Source Remote Desktop'
excerpt: 'Install and run RustDesk on Linux: .deb, .rpm, Flatpak and AppImage, X11 vs Wayland, headless and unattended access, and self-hosting the server.'
image: ~/assets/images/blog/rustdesk-for-linux-og.webp
category: Guides
tags:
  - RustDesk
  - Linux
  - self-hosting
author: RustDesk Team
faq:
  - question: 'Does RustDesk work on Wayland?'
    answer: 'Yes. Standard RustDesk builds capture Wayland desktops through PipeWire and xdg-desktop-portal in a logged-in session, including multiple monitors since version 1.4.3. The portal asks for screen-sharing consent, and portal version 4 and newer can remember the choice. A separate preview build adds unattended access and login-screen access after a reboot. The preview targets x86_64 Debian/Ubuntu-based systems.'
  - question: 'Which package should I install on Linux?'
    answer: 'Use the .deb on Debian, Ubuntu and Linux Mint, the .rpm on Fedora, RHEL and openSUSE, the Flatpak from Flathub for a sandboxed, broadly compatible build, or the portable AppImage as a single-file fallback. The .deb and .rpm packages register and start a systemd service so RustDesk survives reboots; the Flatpak and AppImage do not by default.'
  - question: 'Why does my headless Linux box show a black screen?'
    answer: 'Usually because the headless Linux box has no active display for RustDesk to capture. Without a monitor, the graphics stack often exposes no output, so the session connects but shows a black or waiting-for-image screen. Attach an HDMI or DisplayPort dummy plug, or configure a virtual display such as xserver-xorg-video-dummy on X11, then reconnect.'
  - question: 'Can I self-host the RustDesk server on Linux?'
    answer: 'Yes. The RustDesk server (the hbbs ID/rendezvous and hbbr relay processes) is built for Linux, and Linux is the standard way to run it. RustDesk Server OSS (the free community server) has no license fee or expiry, and Server Pro adds a web console, device groups and a custom client generator on top. Both install on a plain Linux VM or bare-metal host.'
metadata:
  description: 'RustDesk on Linux, end to end: package choices for every distro and ARM board, Wayland and X11 capture, headless setup, and running your own server.'
  keywords: 'RustDesk for Linux, RustDesk Ubuntu, RustDesk Wayland, RustDesk X11, RustDesk Linux install'
---

RustDesk is an open-source remote desktop for Linux. Its client and RustDesk Server OSS (the free community server) are AGPL-licensed, native packages cover the major distributions, and you can point every client at ID/rendezvous and relay services you host yourself. Server Pro is commercial, proprietary self-hosted server software that adds a web console and centralized management on top. Auditable code, a native Linux client and self-hostable infrastructure are why RustDesk is a common answer when someone asks for an open-source remote desktop for Linux.

This guide covers how to install it, the one thing that trips everyone up (X11 versus Wayland), how to get unattended and headless access working, and where the server fits in.

## Installing RustDesk on Linux

RustDesk ships packages for every common Linux packaging format, so you rarely have to build from source. Grab the current release from the [RustDesk releases page on GitHub](https://github.com/rustdesk/rustdesk/releases) or from the [Linux install docs](https://rustdesk.com/docs/en/client/linux/) and pick the format that matches your distribution.

| Format   | Best for                      | Auto-starts a service? | Notes                                                                                                       |
| -------- | ----------------------------- | ---------------------- | ----------------------------------------------------------------------------------------------------------- |
| `.deb`   | Debian, Ubuntu, Linux Mint    | Yes (systemd)          | `sudo apt install ./rustdesk-*.deb`                                                                         |
| `.rpm`   | Fedora, RHEL/CentOS, openSUSE | Yes (systemd)          | `sudo dnf install ./rustdesk-*.rpm`                                                                         |
| Flatpak  | Any distro, sandboxed         | No                     | `flatpak install flathub com.rustdesk.RustDesk` ([Flathub](https://flathub.org/apps/com.rustdesk.RustDesk)) |
| AppImage | Any distro, portable          | No                     | May need `libfuse2` on recent Ubuntu; `chmod +x` then run                                                   |
| AUR      | Arch, Manjaro                 | Depends on package     | Community-maintained (`rustdesk-bin`, `rustdesk-appimage`)                                                  |

The `.deb` and `.rpm` packages are the ones to use if you want RustDesk running as a background service that survives reboots — both register and start a systemd unit automatically. The Flatpak (`com.rustdesk.RustDesk` on [Flathub](https://flathub.org/apps/com.rustdesk.RustDesk)) is a sandboxed build that is convenient for desktop use but does not install a system service by default. For a distribution RustDesk doesn't package directly, reach for the **Flatpak** first — because it bundles its own runtime it tends to be the most broadly compatible. The AppImage is a portable single-file alternative, but its compatibility is more hit-or-miss in practice (for example it may need `libfuse2` on recent Ubuntu).

In practice RustDesk is used across Ubuntu, Debian, Fedora, RHEL/CentOS, openSUSE, Arch and NixOS, with builds for **x86_64, ARM64 (aarch64) and ARM32 (ARMv7)** — so it runs on ARM boards and servers as well as standard PCs.

## X11 vs Wayland: the part that matters

This is the single most important thing to understand about RustDesk on Linux, because it determines whether remote control "just works" immediately or needs one small setup tweak first.

**X11 (Xorg): the most direct capture path, where your distribution still offers it.** Under X11, RustDesk reads the framebuffer directly and injects input directly, so capture and mouse/keyboard control are as direct as it gets and monitor changes are detected dynamically. Many display managers still let you pick "Xorg"/"X11" from a gear menu at login. Keep in mind, though, that several distributions are moving to Wayland-only and retiring the X11 session — so treat X11 as a convenience where it happens to be available, not something to design your deployment around.

**Wayland: supported in standard builds, with a preview for unattended access.** Because Wayland compositors don't allow direct framebuffer access, standard RustDesk builds capture the screen through `xdg-desktop-portal` and [PipeWire](https://deepwiki.com/rustdesk/rustdesk/6.3.1-wayland-support) in the logged-in session, and inject input via the kernel's `uinput` module. RustDesk 1.4.3 (October 2025) [added multi-monitor sharing for Wayland](https://ubuntuhandbook.org/index.php/2025/10/rustdesk-released-1-4-3-with-multi-monitor-for-wayland-virtual-mouse/). A separate [unattended Wayland preview](/blog/unattended-remote-access-wayland) adds unattended access and login-screen access after a reboot; it targets **x86_64 Debian/Ubuntu-based systems**.

- **Consent when sharing starts.** The portal shows a dialog asking which display to share. That is a Wayland security feature, not a RustDesk bug: a background app cannot silently start recording your screen. Portal v4 and newer support a "restore token", so you aren't re-prompted on every connection.
- **Login-screen access.** Standard builds capture the logged-in session. For the login greeter after a reboot, use the unattended preview on x86_64 Debian/Ubuntu-based systems, or an X11 login greeter where your distribution still offers one.

If you connect to a Wayland box and see a black screen with a standard build, the portal/PipeWire path usually isn't satisfied: the prompt wasn't accepted, or `xdg-desktop-portal` or PipeWire isn't running. Our guide to [RustDesk connected but waiting for image](/blog/rustdesk-connected-waiting-for-image) walks through the Wayland case.

## Unattended access on Linux

Unattended access means connecting to a machine with nobody sitting in front of it — the classic remote-support scenario. On Linux the recipe is:

1. Install via `.deb` or `.rpm` so the systemd service is registered, or click **Enable Service** in the app.
2. Set a strong **permanent password** in **Settings → Security**. The default approval mode already accepts it; add controlled-device connection 2FA for a second factor. See the [unattended setup guide](/blog/rustdesk-unattended-access-setup).
3. For access before login on Wayland, use the [unattended Wayland preview](/blog/unattended-remote-access-wayland) on x86_64 Debian/Ubuntu-based systems, or configure the display manager's login greeter to use X11 where supported. Choosing an X11 desktop session alone affects only the session after login.

## Headless Linux: servers with no monitor

A common Linux use case is a box with no display attached at all: a home server, a lab machine, a VM. Without a monitor, the graphics stack often exposes no active output, so there is no image to capture and you get a black screen.

Two ways to give it something to render:

- **A dummy plug** — a cheap physical HDMI/DisplayPort "headless" dongle that makes the GPU think a monitor is attached.
- **A virtual display driver** — `xserver-xorg-video-dummy` on X11, or a kernel-level option like VKMS.

## Self-hosting the RustDesk server on Linux

Everything above is the _client_. The other half of RustDesk's Linux story is that the **server** — the `hbbs` ID/rendezvous service and the `hbbr` relay — is a Linux-native application and Linux is its natural home. That's what lets you keep session brokering and relayed traffic on infrastructure you own instead of routing through a vendor's cloud.

You have two options. **Server OSS** is free, with no license fee or expiry, and covers the core connect-and-relay function. **RustDesk Server Pro** adds a self-hosted web console, device groups and a shared address book, plus, from the Basic plan up, a custom-branded client generator and [LDAP/Active Directory and OIDC SSO](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/ldap/). You are not forced into Docker either — see [running Server Pro without Docker](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/installscript/) for a plain-VM or bare-metal install.

One note on self-hosting: Server OSS and Server Pro are yours to run, patch, and secure. The [hardware requirements are very low](https://rustdesk.com/docs/en/self-host/rustdesk-server-oss/install/) (a basic cloud server or even a Raspberry Pi runs Server OSS); size for your online devices and relay traffic, and assign someone to updates, monitoring and backups. Paid plans include support. (Server Pro also checks its license over outbound HTTPS about once a day, so it needs a path to rustdesk.com.)

## Getting started

Install the package for your distro, set a permanent password for unattended access, and — if data sovereignty is your reason for being here — stand up Server OSS. For current plan details, [rustdesk.com/pricing](https://rustdesk.com/pricing) is the source of truth, and [sales@rustdesk.com](mailto:sales@rustdesk.com) can talk through Server Pro. Want to see it working first? [See RustDesk in action](https://www.youtube.com/@rustdesk).
