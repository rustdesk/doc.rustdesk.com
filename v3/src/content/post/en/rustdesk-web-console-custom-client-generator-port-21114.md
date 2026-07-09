---
publishDate: 2026-06-28T18:34:00Z
lang: en
translationKey: rustdesk-web-console-custom-client-generator-port-21114
draft: false
title: 'RustDesk Web Console Access: Port 21114 and HTTPS Basics'
excerpt: "Can't reach the RustDesk Pro web console or Custom Client Generator on port 21114? Here are the URLs, TLS notes, and first-login checks."
image: ~/assets/images/blog/rustdesk-web-console-custom-client-generator-port-21114-og.png
category: Deployment
tags:
  - RustDesk
  - deployment
author: RustDesk Team
faq:
  - question: 'How do I reach the RustDesk Server Pro Web Console?'
    answer: 'RustDesk Server Pro serves plain HTTP on port 21114, but you must not send credentials over that connection on a public or untrusted network. Configure HTTPS first. If TLS is not yet available, complete the first login only through localhost, an SSH tunnel, or a trusted private network, then rotate the initial credentials. The Custom Client Generator requires Basic or a higher plan.'
  - question: 'How do I put the RustDesk Web Console behind HTTPS with a valid certificate?'
    answer: 'Port 21114 serves plain HTTP and does not provision a certificate for a bare domain. For production HTTPS, put the console behind a supported reverse proxy such as Nginx or IIS, install a valid certificate, expose port 443, and update the client API address to the HTTPS endpoint.'
  - question: "Why can't I reach the console on port 21114?"
    answer: 'If none of the URLs respond, the container is usually running but the port is closed. Confirm the Pro container is up and that TCP 21114 is open end to end — in the host firewall and in any cloud security group or NAT/forwarding rule in front of the server. A blocked or unforwarded 21114 is the typical cause.'
  - question: 'Which ports does RustDesk Server Pro need open besides 21114?'
    answer: 'Besides the Web Console on 21114 (or 443 behind a reverse proxy), Server Pro also needs its standard ID/rendezvous and relay ports open for clients to connect. Exact port numbers change between releases, so check the current RustDesk docs for the full list before locking down your firewall.'
  - question: 'Can I white-label or rebrand the RustDesk client?'
    answer: 'Yes, on Basic and higher plans. The Custom Client Generator lets you set your own client name, logo, and icon and bake in preset settings such as the server address, address book, device group, or strategy, so the client is branded and pre-configured before users install it. The Individual tier includes the Web Console but not the generator.'
  - question: "Why is my custom RustDesk client built on RustDesk's servers instead of my own?"
    answer: "Chiefly because of cross-platform builds: from one configuration the generator can produce clients for Windows, macOS, Linux, and Android, and you cannot cross-compile and sign all of those targets on a single operating system — a Windows build needs Windows and a code-signing certificate, a macOS build needs Apple hardware and an Apple Developer account for notarization, and so on. Because those platform-specific requirements cannot be met on a Linux server alone, RustDesk runs the complete multi-platform build environment centrally and returns the signed installers for you to download."
  - question: 'How long is a generated custom client available to download?'
    answer: 'About a day. Generated builds are automatically deleted from the build server after roughly 24 hours, so download the installer and save it locally as soon as it is ready, then re-generate it later if you need it again.'
  - question: 'Is my custom-client build configuration saved by RustDesk?'
    answer: "No. The build configuration you submit is not stored on RustDesk's build server — it is deleted automatically once the build finishes, so your branding, server address, and preset settings do not linger on RustDesk infrastructure."
  - question: 'What is the RustDesk web client, and which plan includes it?'
    answer: 'The web client lets you start and run remote sessions from a browser tab, with nothing to install on the controlling side — distinct from the web console, which is the admin site on port 21114. It is a controller: it can drive other devices, but a browser tab cannot act as an unattended host. Self-hosting it (served from your own server at https://your-server/web) requires a plan large enough to satisfy (users × 10) + devices ≥ 400; the RustDesk web client V2 preview article covers self-hosting, customization, and pointing the public client at your own server.'
  - question: 'I changed the admin password and locked myself out — how do I reset it?'
    answer: 'Admin password recovery depends on how your Server Pro instance is deployed and stored, and the procedure can change between releases. Rather than following an outdated screenshot, check the current RustDesk Server Pro docs for the supported reset path, or contact RustDesk support with non-sensitive deployment details.'

metadata:
  description: "Can't reach the RustDesk Pro web console or Custom Client Generator on port 21114? Here are the URLs, TLS notes, and first-login checks."
  keywords: 'RustDesk web console port 21114, RustDesk Custom Client Generator, RustDesk Pro web console login, RustDesk self-hosted admin console, access RustDesk console port 21114, RustDesk reverse proxy'
---

If you have a RustDesk Server Pro license but cannot reach the Web Console, first check the URL, scheme, firewall, and proxy configuration. The console is available on all Pro plans, while the Custom Client Generator requires **Basic or a higher plan**.

## The short answer

Port 21114 serves plain HTTP and can be used to confirm that the console is reachable, but **do not enter credentials over plain HTTP on a public or untrusted network.** Configure `https://[your_domain]` with a certificate and reverse proxy, normally on port 443, before signing in. If HTTPS is not ready, complete the first login only through localhost, an SSH tunnel, or a trusted private network. On Basic and higher plans, the Custom Client Generator appears inside the console.

## In detail

Port 21114 serves HTTP by default; it does not automatically provision a certificate for a bare domain. For production HTTPS, put the console behind a supported reverse proxy such as Nginx or IIS, install a valid certificate, expose port 443, and configure the client API address accordingly.

If the console does not respond, the container is reachable but the port likely isn't. Confirm the Pro container is running, and make sure TCP 21114 is open end to end - both in the host firewall and in any cloud security group or NAT rule in front of the server. A blocked or unforwarded 21114 is the typical culprit behind "port not available."

Initial admin credentials should be treated as temporary, but changing them after an exposed HTTP login does not undo credential or session interception. First establish HTTPS or one of the protected bootstrap paths above; then sign in, change the password immediately, and move on to generating clients.

On Basic and higher plans, the Custom Client Generator lets you produce **branded, pre-configured client builds** so end users do not need to enter server settings manually. You can white-label the client — set your own name, logo, and icon — and bake in preset configuration (for example the server address, an address book, a device group, or a strategy) so the client is ready to connect the moment it is installed rather than requiring per-machine setup. Individual includes the Web Console but not the generator. For pushing those builds across a fleet, see [mass deployment via MSI, GPO, and Intune](/blog/rustdesk-for-enterprise).

## How the custom client is built — and what happens to your data

One detail catches people off guard: the custom client is **compiled on RustDesk's build server, not on your own Server Pro.** The reason is **cross-platform builds.** From a single branding configuration the generator produces clients for Windows, macOS, Linux, and Android, and no single machine can cross-compile and sign all of those targets — each one needs its own operating system, toolchain, and signing credentials:

- **Windows** builds must run on Windows with a full development environment (Visual Studio, the Windows SDK, build tools) and a valid **code-signing certificate**.
- **macOS** (and iOS) builds must run on Apple hardware with a separate toolchain (Xcode and its command-line tools) and an **Apple Developer account** for notarization and signing.

As the RustDesk maintainers put it, these "platform-specific requirements cannot be fully satisfied on a Linux server alone." You could in principle stitch together paid CI/CD runners for each platform, but it is costly — their blunt summary is that _"cross-platform desktop distribution is painful and expensive by design, and there's no way around it if you want officially signed, store-ready, or notarized binaries."_ So RustDesk runs the complete multi-platform build environment centrally: the generator sends your branding and preset configuration to RustDesk's build service, which compiles the signed installers and makes them available to download. ([RustDesk maintainers, discussion #866](https://github.com/rustdesk/rustdesk-server-pro/discussions/866#discussioncomment-15220939))

Two consequences follow, and both matter:

- **Download and keep the installer — it isn't stored for long.** A generated build is available for a limited window (about a day) and is then automatically deleted from the build server. As soon as your build is ready, download the installer and save it somewhere you control; don't rely on it staying available, and simply re-generate it if you need it again later.
- **Your configuration isn't retained.** The build configuration you submit is **not saved** on RustDesk's build server — it is deleted automatically once the build finishes. Your branding, server address, and preset settings do not linger on RustDesk infrastructure after the installer is produced.

## The web client vs the web console

It is easy to conflate two Server Pro features that both live in the browser:

- The **web console** — this article's subject, on port 21114 (or 443 behind a proxy) — is the **admin** site, where you manage users, devices, permissions, strategies, and licenses.
- The **web client** is different: it lets you **start and run remote sessions from a browser tab**, with nothing to install on the controlling side. It is a controller — you can drive other devices from the browser, but a browser tab cannot act as an unattended host.

Self-hosting the web client (serving it from your own server at `https://your-server/web`) requires a plan large enough to satisfy **(users × 10) + devices ≥ 400** (for example 10 users / 300 devices, or 20 users / 200 devices), and you can alternatively point the public browser client at your own server or customize a self-hosted one. The [web client V2 preview](/blog/rustdesk-web-client-v2-preview) covers all of that — access, WSS/CORS setup, self-hosting, and customization.

## Who asks this

This comes up most often with IT admins and [MSPs](/blog/rustdesk-for-msps) standing up a self-hosted RustDesk Server Pro for the first time. Two separate checks are required: confirm that the console is reachable, then confirm that the selected plan includes the generator.

## Related questions

- [How do I open or forward port 21114 on a cloud-hosted RustDesk server?](https://rustdesk.com/docs)
- [How do I put the RustDesk Web Console behind HTTPS with a valid certificate?](https://rustdesk.com/docs)
- [How does the Custom Client Generator brand and pre-configure a client build?](/blog/rustdesk-for-msps)
- [I changed the admin password and locked myself out — how do I reset it?](https://rustdesk.com/docs)
- [Which ports does RustDesk Server Pro need open besides 21114?](https://rustdesk.com/docs)

Still stuck? Confirm the server process is running and that either TCP 21114 is reachable through a protected bootstrap path or your configured TCP 443 reverse proxy is reachable over HTTPS. Never submit credentials to port 21114 across the public internet; rotate the initial admin credentials after the protected first login.
