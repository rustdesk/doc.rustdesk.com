---
publishDate: 2026-07-08T11:04:00Z
updateDate: 2026-10-14T00:00:00Z
lang: en
translationKey: rustdesk-unattended-access-setup
draft: false
title: 'RustDesk Unattended Access: Setup Guide'
excerpt: 'Set up RustDesk unattended access the right way: a permanent password, run as a service so it starts on boot, and deploy at scale with a pre-configured client.'
image: ~/assets/images/blog/rustdesk-unattended-access-setup-og.webp
category: Deployment
tags:
  - RustDesk
  - deployment
  - unattended-access
author: RustDesk Team
faq:
  - question: 'How do I set up unattended access in RustDesk?'
    answer: 'Two steps: set a permanent password in Settings → Security, and install RustDesk so its system service starts with the machine. The default approval mode already accepts the permanent password; macOS also needs Screen Recording and Accessibility permissions. With both steps done, you can reach the online machine at any time, including at the Windows login screen, without anyone present.'
  - question: 'Why does my RustDesk connection drop when the user logs out?'
    answer: 'Because RustDesk is running as a portable executable instead of an installed service. A portable process lives inside the user session, so it stops at logout, and without elevation it cannot operate the Windows UAC secure desktop. Install RustDesk and keep its system service enabled; the service runs independently of any logged-in user. Portable elevation remains available for attended Windows support.'
  - question: 'Is unattended access with a permanent password safe?'
    answer: 'Yes, when it is configured well. Use a long, unique permanent password that differs from the operating-system login, enable connection 2FA on the controlled device, and restrict who can connect with an IP or ID allowlist and, on Server Pro, Access Control. Keep clients patched and review logs. Self-hosting puts the rendezvous, relay and console on servers you run.'
  - question: 'Can I deploy RustDesk unattended access to many computers at once?'
    answer: "Yes. On Basic and higher self-hosted plans, the Custom Client Generator produces a pre-configured installer with your server address, key, and settings baked in, so end users don't type anything. Push it with your existing deployment tooling and each device installs the service and registers against your server automatically."
  - question: 'Does unattended access work at the Windows login screen?'
    answer: 'Yes, once RustDesk is installed as a service. The installed service starts with the system before any user logs in, so you can connect to the login screen, authenticate, and even trigger a reboot and reconnect. Running the portable executable cannot do this because it only exists inside a user session.'

metadata:
  description: 'Set up RustDesk unattended access: permanent password, run as a service for start on boot, per-platform notes for Windows/macOS/Linux, and fleet deployment.'
  keywords: 'RustDesk unattended access, RustDesk permanent password, RustDesk start on boot, RustDesk service install, RustDesk unattended setup, RustDesk deploy at scale, unattended remote access'
---

Unattended access means reaching a computer when no one is sitting in front of it — a server in a rack, a kiosk, a family member's PC across the country. RustDesk does this well once two things are in place: a **permanent password**, so no one has to approve each connection, and RustDesk running **as a service**, so it's available before login and after logout. This guide covers both, the per-platform permissions, and how to roll it out across a fleet.

## The short answer

Set a **permanent password** (Settings → Security) and **install RustDesk as a system service**, which starts with the machine. The default approval mode already accepts the permanent password, so no one has to click accept; the service runs independently of any logged-in user, so you can connect at any time, including at the Windows login screen. macOS also needs Screen Recording and Accessibility permissions. To deploy at scale, generate a pre-configured client so every machine installs itself against your server.

## Step 1: Set a permanent password

By default, RustDesk shows a rotating one-time password that a person on the remote end would read to you. For unattended access you replace that with a fixed credential:

1. Open RustDesk on the machine you want to reach.
2. Go to **Settings → Security** (older builds: the password area on the main screen).
3. Choose **Set permanent password** and enter a strong, unique value.

The defaults already accept that password: sessions are accepted via both password and click, and both password types are allowed. If someone changed the approval mode to click-only or the password type to one-time-only, switch back to **Accept sessions via password** (or **via both**) and **Use permanent password** (or **Use both passwords**). For managed deployments, the matching [config keys](https://rustdesk.com/docs/en/self-host/client-configuration/advanced-settings/#approve-mode) are `approve-mode` (default `password-click`) and `verification-method` (default `use-both-passwords`).

The [RustDesk client documentation](https://rustdesk.com/docs/en/client/) describes this as the core of unattended access. One rule worth emphasizing: **do not reuse the operating-system login password.** Use a dedicated, high-entropy password for RustDesk so a leak of one credential doesn't compromise the other.

## Step 2: Install as a service and start on boot

This is the step people miss. A portable `.exe` or `.app` runs inside the user's session, so it stops when the user logs out, and on Windows it cannot operate the UAC secure desktop without elevation ([portable elevation](https://rustdesk.com/docs/en/client/windows/windows-portable-elevation/) exists for attended support). To be truly unattended, RustDesk must run as a background **system service**.

- Run the RustDesk **installer** (not the portable build) and complete installation.
- In **Settings → General**, make sure the **Service** is running — use **Start** if it shows as stopped. Once installed, the service starts with the machine automatically.

Once RustDesk runs as a service, it loads before anyone logs in, which is what lets you connect to the **login screen**, authenticate remotely, and even reboot and reconnect without a person present. macOS and Linux add their own screen-capture and display-session requirements, covered below.

## Per-platform notes

| Platform | What to do                                                  | Watch out for                                                                                                                                              |
| -------- | ----------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Windows  | Install; keep the service running (starts with the machine) | Portable exe stops at logout and can't operate UAC prompts without elevation; use the installer                                                            |
| macOS    | Install, set permanent password, grant permissions          | Screen Recording and Accessibility must be granted; login-screen capture needs the helper installed                                                        |
| Linux    | Install the service package                                 | Standard Wayland builds capture the logged-in session; the [unattended preview](/blog/unattended-remote-access-wayland) adds login-screen access (x86_64 Debian/Ubuntu) |
| Android  | Set permanent password; enable capture                      | Screen must be awake; grant the screen-capture (MediaProjection) consent and input permission                                                              |

### Windows

The cleanest path. Install, toggle the service on, set the permanent password, done. Because the service runs at boot, unattended access to the login screen and through reboots works as expected.

### macOS

macOS gates screen capture and input behind permissions. After installing, open **System Settings → Privacy & Security** and grant RustDesk both **Screen Recording** and **Accessibility**. For access at the _login window_ (before any user logs in), the RustDesk service/helper must be installed so it can capture pre-login — otherwise you'll get a black screen there, the same [capture issue covered in our black-screen guide](/blog/rustdesk-connected-waiting-for-image).

### Linux

Install RustDesk so its service runs at boot. Standard RustDesk builds capture Wayland desktops, including multiple monitors since 1.4.3, through PipeWire and `xdg-desktop-portal` in a logged-in session. For a machine that sits at the login greeter, the separate [Wayland unattended preview](/blog/unattended-remote-access-wayland) for **x86_64 Debian/Ubuntu-based systems** adds unattended access and login-screen access after a reboot. Where a distribution still offers one, an X11 login greeter is another option; on a headless box, add a dummy plug or virtual display. See [RustDesk for Linux](/blog/rustdesk-for-linux) for the details.

## Step 3: Deploy at scale with a pre-configured client

Configuring one machine by hand is fine. Configuring fifty isn't. On **Basic and higher self-hosted plans**, the **Custom Client Generator** in the web console builds an installer with your **server address, public key, and settings pre-baked**, so end users type nothing. Combined with your existing deployment tool (Group Policy, Intune, an MSP RMM, a shell script), each device installs the service and registers against _your_ server on first run.

This is where self-hosting pays off for teams: the whole fleet registers against ID/rendezvous and relay servers you run (see [RustDesk for MSPs](/blog/rustdesk-for-msps)). Server Pro plans license **login users and managed devices**. Standard plans include unlimited concurrent connections; only [Customized V2](https://rustdesk.com/pricing#custom2) licenses a set number of concurrent connections. Budget by how many machines and admins you have — see [what counts as a managed device](/blog/what-counts-as-a-managed-device). Serve the web console [over HTTPS](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/faq/#set-up-https-for-web-console-manually) behind a reverse proxy.

## Lock it down

Unattended access is a standing door into a machine, so treat the credentials seriously:

- **Strong, unique permanent password**, rotated periodically.
- **Connection 2FA** on the controlled device and, on Server Pro, [Access Control](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/permissions/), which decides who can reach which devices through user and device-group rules (user-group and device-group permissions are cumulative). The shared address book only organizes entries; it is not an access boundary. [Control Role](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/control-role/) limits what a technician can do inside a session.
- **Self-host the server**, so the rendezvous, relay, console and stored management data run on infrastructure you choose. The RustDesk client and Server OSS are AGPL-licensed, so their authentication code can be reviewed; Server Pro is commercial, proprietary self-hosted server software.

## Unattended access you actually control

Point an always-on fleet at a server you run and the standing access to those machines stays brokered by hardware you own, not a cloud you rent. For permanent access, keeping that path in your own hands is worth the short setup.
