---
publishDate: 2026-06-30T19:07:00Z
lang: en
translationKey: rustdesk-for-mac
draft: false
title: 'RustDesk for Mac: Install, Permissions & Unattended'
excerpt: 'Install RustDesk on Apple Silicon or Intel Macs, grant the right macOS permissions, set up unattended access and file transfer, and connect to your own server.'
image: ~/assets/images/blog/rustdesk-for-mac-og.png
category: Guides
tags:
  - RustDesk
  - macOS
author: RustDesk Team
faq:
  - question: 'Which RustDesk build do I need for Apple Silicon?'
    answer: 'Download the current macOS build from the RustDesk releases and pick the one matching your chip. Recent releases publish separate Apple Silicon (aarch64) and Intel (x86_64) disk images, so choose the aarch64 build for M-series Macs and the x86_64 build for Intel Macs. If a universal build is offered it runs on both.'
  - question: 'Which macOS permissions does RustDesk need?'
    answer: "To be controlled, a Mac needs Screen Recording (so RustDesk can capture the display) and Accessibility (so it can move the mouse and type). Some setups also need Input Monitoring. Grant them under System Settings, Privacy and Security. If the remote screen stays black after you granted Screen Recording, remove RustDesk's entry with the minus button and add it back, or reset it with tccutil, then relaunch."
  - question: 'How do I set up unattended access on a Mac?'
    answer: 'Open RustDesk, click Install to register it as a background service, set a strong permanent password, and confirm it starts at boot. Then grant Screen Recording and Accessibility so control actually works. For fleet deployment there is an install_service.sh script and MDM path that installs the LaunchDaemon and LaunchAgent, but privacy permissions still have to be granted separately, typically via an MDM PPPC profile.'
  - question: 'Can RustDesk transfer files to and from a Mac?'
    answer: 'Yes. RustDesk supports two-way file transfer between the local and remote machine, including to and from macOS, alongside remote view and control. Granting Full Disk Access can help RustDesk reach protected locations.'
metadata:
  description: 'RustDesk on macOS: pick the right build for your chip, fix the black-screen permission quirk, enable unattended access, and point it at your own server.'
  keywords: 'RustDesk for Mac, RustDesk macOS, RustDesk Apple Silicon, RustDesk mac permissions, RustDesk screen recording accessibility, RustDesk mac unattended access, RustDesk mac install'
---

RustDesk runs natively on macOS, on both Apple Silicon and Intel Macs, and it's one of the few remote desktop tools that is fully [open source](/blog/open-source-remote-desktop-software) and can be pointed at a server you host yourself. The install itself takes a minute. The part that actually determines whether it works is macOS's privacy model — Apple deliberately makes screen capture and input control opt-in, so a couple of permission toggles stand between "installed" and "I can control this Mac." This guide covers the install, exactly which permissions to grant and why, file transfer, unattended access, and connecting to your own server.

## Installing RustDesk on macOS

Download the current macOS build from the [RustDesk releases page](https://github.com/rustdesk/rustdesk/releases) or the [macOS docs](https://rustdesk.com/docs/en/client/mac/), open the `.dmg`, and drag **RustDesk** into your **Applications** folder.

Pick the build that matches your hardware:

- **Apple Silicon (M-series):** the `aarch64` build.
- **Intel:** the `x86_64` build.

If a universal build is published it runs on both, but when separate images are offered, choosing the right one avoids Rosetta overhead. Because RustDesk is distributed outside the App Store, the first launch may trigger Gatekeeper — if macOS blocks it, open **System Settings → Privacy & Security**, scroll to the security notice, and click **Open Anyway**.

## The permissions that make or break it

This is the section to read carefully, because nearly every "RustDesk connects but the screen is black" report on macOS comes down to a missing permission. macOS gates the two capabilities remote control depends on, and it won't warn you loudly when they're absent.

| Permission           | What it enables                           | Required for                                |
| -------------------- | ----------------------------------------- | ------------------------------------------- |
| **Screen Recording** | Capturing and streaming the Mac's display | Seeing the remote screen at all             |
| **Accessibility**    | Moving the mouse and sending keystrokes   | Controlling the Mac                         |
| **Input Monitoring** | Reading certain input events              | Some control scenarios                      |
| **Full Disk Access** | Reaching protected file locations         | File transfer to protected paths (optional) |

Grant them under **System Settings → Privacy & Security**, then find each category (Screen Recording, Accessibility, Input Monitoring) and enable RustDesk. On first launch macOS usually prompts for these automatically; if you dismissed the prompt, you can add RustDesk manually.

A known wrinkle: sometimes Screen Recording _looks_ granted but the remote side still shows a black screen — a [documented macOS permission quirk](https://github.com/rustdesk/rustdesk/issues/3261). The fix is to remove RustDesk from the Screen Recording list with the **minus (−)** button, click **plus (+)** to re-add it from Applications, or reset the permission from Terminal with `tccutil reset ScreenCapture` (and `tccutil reset Accessibility`), then relaunch RustDesk. If you're chasing a black screen, our [connected but waiting for image](/blog/rustdesk-connected-waiting-for-image) guide covers the macOS case in detail.

One more thing to expect: **major macOS upgrades can reset these permissions.** After a big system update, it's worth re-checking that Screen Recording and Accessibility are still enabled for RustDesk, especially on machines you rely on for unattended access.

## File transfer

RustDesk supports two-way file transfer between the local and remote machine, so you can push files to a Mac or pull them off it during a session — no separate tool required. If you need to reach protected folders (Desktop, Documents, or system-managed locations), granting **Full Disk Access** to RustDesk clears the way. For everyday transfers into your user folders, Screen Recording and Accessibility are usually enough.

## Unattended access on a Mac

Unattended access lets you connect to a Mac when nobody's there to click "accept" — the everyday remote-support and remote-work scenario. The manual setup is short:

1. Open RustDesk and click **Install** to register it as a background service (this is what lets it accept connections without a logged-in user clicking through).
2. Set a strong **permanent password** in the connection settings, and enable **two-factor authentication** if you want the extra layer.
3. Confirm the RustDesk **service is installed and running** — once installed it starts at boot via its LaunchDaemon — and that Screen Recording plus Accessibility are granted; without them the service runs but control silently fails.

For deploying across many Macs, RustDesk provides a scriptable path. Per the [macOS auto-start service setup wiki](<https://github.com/rustdesk/rustdesk/wiki/macOS-Auto%E2%80%90Start-Service-Setup-(for-Remote---MDM-Deployment)>), an `install_service.sh` script installs RustDesk (or your custom-branded client) as a service without needing the GUI **Install** button, creating a LaunchDaemon at `/Library/LaunchDaemons/com.carriez.RustDesk_service.plist` and a LaunchAgent at `/Library/LaunchAgents/com.carriez.RustDesk_server.plist`. The daemon starts at boot; the agent starts at the login-window session and persists through login.

One thing to plan for: **that script does not grant the privacy permissions.** Screen Recording, Accessibility and Input Monitoring must still be provisioned separately — in a managed environment, that means shipping an MDM **PPPC** (Privacy Preferences Policy Control) profile so the permissions are pre-approved. Skip that step and the service will be running but remote control won't work. For the full walk-through beyond macOS specifics, see the [unattended access setup guide](/blog/rustdesk-unattended-access-setup).

## Connecting to your own server

The reason many people choose RustDesk on macOS over a proprietary tool is the same reason it's chosen anywhere: you can run the server yourself. Point the client at your own [self-hosted RustDesk server](/blog/why-self-host-remote-desktop-software)—the free community server or Server Pro—under **Settings → Network → ID/Relay Server**. The ID and relay services are then operated by you; direct sessions still flow between endpoints.

If your workflow crosses desktop and mobile devices, check the separate [Android and iOS control matrix](/blog/rustdesk-remote-control-android-ios), because mobile hosting and control capabilities are not symmetric.

The trade worth naming: self-hosting means _you_ run and secure that server — a modest task, given the low hardware requirements and light upkeep. For teams with data-residency requirements especially, that control is exactly the point, and RustDesk support is there if you need it.

## Getting started

Drag RustDesk into Applications, grant Screen Recording and Accessibility, set a permanent password if you need unattended access, and — if you care about keeping session data on your own infrastructure — connect it to the free community server. Current plan details live at [rustdesk.com/pricing](https://rustdesk.com/pricing); for Server Pro questions, email [sales@rustdesk.com](mailto:sales@rustdesk.com). Prefer to watch first? [See RustDesk in action](/blog/see-rustdesk-in-action).
