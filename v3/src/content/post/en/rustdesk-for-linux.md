---
publishDate: 2026-07-07T00:00:00Z
lang: en
translationKey: rustdesk-for-linux
draft: false
title: 'RustDesk for Linux: The Open-Source Remote Desktop'
excerpt: 'Install and run RustDesk on Linux: .deb, .rpm, Flatpak and AppImage, X11 vs Wayland, headless and unattended access, and self-hosting the server.'
image: ~/assets/images/blog/rustdesk-for-linux-og.png
category: Guides
tags:
  - RustDesk
  - Linux
  - self-hosting
author: RustDesk Team
faq:
  - question: 'Does RustDesk work on Wayland?'
    answer: 'Yes, but Wayland support is still experimental. On Wayland, RustDesk captures the screen through PipeWire and the XDG desktop portal, which shows a consent dialog asking you to pick a display, and it works only for the active logged-in session. You cannot capture the Wayland login greeter, and unattended pre-login access still requires X11. For reliable unattended access on Linux, log in with an X11 (Xorg) session.'
  - question: 'Which package should I install on Linux?'
    answer: 'Use the .deb on Debian, Ubuntu and Linux Mint, the .rpm on Fedora, RHEL and openSUSE, the Flatpak from Flathub if you want a sandboxed build, or the portable AppImage on other distributions. The .deb and .rpm packages register and start a systemd service so RustDesk survives reboots; the Flatpak and AppImage do not by default.'
  - question: 'Why does my headless Linux box show a black screen?'
    answer: "With no monitor attached, X or Wayland never allocates a framebuffer, so there is nothing for RustDesk to capture and the viewer shows a black or waiting-for-image screen. Attach a dummy HDMI/DisplayPort plug, configure a virtual display such as xserver-xorg-video-dummy or VKMS, or enable RustDesk's experimental Linux headless mode so a virtual display is created for you."
  - question: 'Can I self-host the RustDesk server on Linux?'
    answer: 'Yes. The RustDesk server (the hbbs ID/rendezvous and hbbr relay processes) is built for Linux and is the standard way to run it. The free open-source community server runs indefinitely at no cost, and Server Pro adds a web console, device groups and a custom client generator on top. Both install on a plain Linux VM or bare-metal host.'
metadata:
  description: 'Install and run RustDesk on Linux: .deb, .rpm, Flatpak and AppImage, X11 vs Wayland, headless and unattended access, and self-hosting the server.'
  keywords: 'RustDesk for Linux, RustDesk Ubuntu, RustDesk Wayland, RustDesk X11, RustDesk Linux install'
---

Linux users have never had a huge choice of good remote desktop tools, and the ones that exist are usually either closed-source commercial products or aging VNC stacks. RustDesk sits in a different spot: it is an [open-source remote desktop](/blog/open-source-remote-desktop-software) client licensed under the AGPL, it runs natively on all the major distributions, and you can point it at a server you host yourself. That combination — auditable code, native Linux client, and self-hostable infrastructure — is why RustDesk has become one of the go-to answers when someone asks for an open-source remote desktop for Linux.

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

The `.deb` and `.rpm` packages are the ones to use if you want RustDesk running as a background service that survives reboots — both register and start a systemd unit automatically. The Flatpak (`com.rustdesk.RustDesk` on [Flathub](https://flathub.org/apps/com.rustdesk.RustDesk)) is a sandboxed build that is convenient for desktop use but does not install a system service by default. The AppImage is the truly distribution-independent option: one file, no installation, runs almost anywhere — handy on distros RustDesk does not package directly, though on newer Ubuntu you may need to install `libfuse2` first.

In practice RustDesk is used across Ubuntu, Debian, Fedora, RHEL/CentOS, openSUSE, Arch and NixOS. If your distribution isn't on that list, the AppImage almost always works.

## X11 vs Wayland: the part that matters

This is the single most important thing to understand about RustDesk on Linux, because it determines whether remote control "just works" or leaves you staring at a black screen.

**X11 (Xorg) is the reliable path.** Under X11, RustDesk reads the framebuffer directly and injects input directly, so screen capture and mouse/keyboard control behave the way you'd expect, and RustDesk can dynamically detect monitor changes. If you want the least-surprising experience — especially for unattended access — log in with an Xorg session. On many display managers you can pick "Xorg"/"X11" from a gear menu on the login screen.

**Wayland works, but it is experimental.** RustDesk has had experimental Wayland support since version 1.2.0. Because Wayland compositors don't allow direct framebuffer access, RustDesk captures the screen through the `xdg-desktop-portal` service and [PipeWire](https://deepwiki.com/rustdesk/rustdesk/6.3.1-wayland-support), and injects input via the kernel's `uinput` module. Two consequences follow from that design:

- **Consent per connection.** The portal shows a dialog asking you to select which display to share. That is a deliberate Wayland security feature, not a RustDesk bug — a background app cannot silently start recording your screen. Portal v4 and newer support a "restore token" so you aren't re-prompted every single time, but the first share requires an on-screen click.
- **Active session only.** Wayland capture is tied to the logged-in graphical session. You cannot capture the Wayland login greeter, and monitor changes aren't detected mid-session the way they are on X11. Remote access to the login screen still requires X11.

Wayland support keeps improving — RustDesk 1.4.3 (October 2025) [added multi-monitor sharing for Wayland](https://ubuntuhandbook.org/index.php/2025/10/rustdesk-released-1-4-3-with-multi-monitor-for-wayland-virtual-mouse/), for example. But if you connect and see a black screen on a Wayland box, that is almost always the portal/PipeWire path not being satisfied. Our dedicated write-up on [RustDesk connected but waiting for image](/blog/rustdesk-connected-waiting-for-image) walks through the Wayland black-screen case specifically.

## Unattended access on Linux

Unattended access means connecting to a machine with nobody sitting in front of it — the classic remote-support scenario. On Linux the recipe is:

1. Install via `.deb` or `.rpm` so the systemd service is registered, or click **Enable Service** in the app.
2. In RustDesk, set a strong **permanent password** under the connection settings (and ideally enable two-factor authentication).
3. Log the machine into an **X11 session** if you need access before or across user logins — Wayland's consent-per-connect model makes true unattended capture awkward.

The honest caveat: unattended access on Wayland is genuinely harder than on X11 because the portal is designed to require a human to approve screen sharing. If unattended reliability matters, choose X11 for that machine. This isn't unique to RustDesk; every Wayland screen-sharing tool wrestles with the same portal model.

## Headless Linux: servers with no monitor

A very common Linux use case is a box with no display attached at all — a home server, a lab machine, a VM. Here the problem isn't RustDesk, it's the graphics stack: with no monitor plugged in, X or Wayland never allocates a framebuffer, so there is literally no image to capture and you get a black screen.

Three ways to give it something to render:

- **A dummy plug** — a cheap physical HDMI/DisplayPort "headless" dongle that makes the GPU think a monitor is attached.
- **A virtual display driver** — `xserver-xorg-video-dummy` on X11, or a kernel-level option like VKMS.
- **RustDesk's experimental headless mode** — enable it with `sudo rustdesk --option allow-linux-headless Y`. Per the [Headless Linux Support wiki](https://github.com/rustdesk/rustdesk/wiki/Headless-Linux-Support) it is disabled by default, tested mainly on Ubuntu with GNOME, and expects packages like `xserver-xorg-video-dummy` and `lightdm`. You can fetch the machine's ID with `sudo rustdesk --get-id` and set a password with `sudo rustdesk --password <password>`.

Headless mode is still rough around the edges, so treat it as "works, with care" rather than turnkey.

## Self-hosting the RustDesk server on Linux

Everything above is the _client_. The other half of RustDesk's Linux story is that the **server** — the `hbbs` ID/rendezvous service and the `hbbr` relay — is a Linux-native application and Linux is its natural home. That's what lets you keep session brokering and relayed traffic on infrastructure you own instead of routing through a vendor's cloud.

You have two options. The free, open-source **community server** runs indefinitely at no cost and covers the core connect-and-relay function. **RustDesk Server Pro** adds a self-hosted web console, device groups, a shared address book, a custom-branded client generator, and [LDAP/Active Directory and OIDC SSO](/blog/rustdesk-active-directory-ldap-sso). You are not forced into Docker either — see [running Server Pro without Docker](/blog/rustdesk-server-pro-without-docker) for a plain-VM or bare-metal install. If you're sizing hardware for a large fleet, [self-hosting hardware at scale](/blog/self-host-rustdesk-server-hardware-at-scale) has the capacity planning.

One honest note on self-hosting, the same as everywhere in RustDesk's docs: the free community server and Server Pro are yours to run, patch, and secure. There's no managed NOC watching it for you. That ownership is the whole point — it's also real operational work, and worth being clear-eyed about before you commit. (Server Pro's license also needs an outbound path to rustdesk.com to activate and stay licensed.)

## Getting started

Install the package for your distro, log into an Xorg session if you want the smoothest experience, set a permanent password for unattended access, and — if data sovereignty is your reason for being here — stand up the free community server. For current plan details, [rustdesk.com/pricing](https://rustdesk.com/pricing) is the source of truth, and [sales@rustdesk.com](mailto:sales@rustdesk.com) can talk through Server Pro. Want to see it working first? [See RustDesk in action](/blog/see-rustdesk-in-action).
