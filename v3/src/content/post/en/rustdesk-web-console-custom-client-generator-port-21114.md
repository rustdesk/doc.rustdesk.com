---
publishDate: 2026-07-06T00:00:00Z
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

If none of the three addresses respond, the container is reachable but the port likely isn't. Confirm the Pro container is running, and make sure TCP 21114 is open end to end - both in the host firewall and in any cloud security group or NAT rule in front of the server. A blocked or unforwarded 21114 is the typical culprit behind "port not available."

Initial admin credentials should be treated as temporary, but changing them after an exposed HTTP login does not undo credential or session interception. First establish HTTPS or one of the protected bootstrap paths above; then sign in, change the password immediately, and move on to generating clients.

On Basic and higher plans, the Custom Client Generator lets you produce branded, pre-configured client builds so end users do not need to enter server settings manually. Individual includes the Web Console but not the generator.

## Who asks this

This comes up most often with IT admins and [MSPs](/blog/rustdesk-for-msps) standing up a self-hosted RustDesk Server Pro for the first time. Two separate checks are required: confirm that the console is reachable, then confirm that the selected plan includes the generator.

## Related questions

- [How do I open or forward port 21114 on a cloud-hosted RustDesk server?](https://rustdesk.com/docs)
- [How do I put the RustDesk Web Console behind HTTPS with a valid certificate?](https://rustdesk.com/docs)
- [How does the Custom Client Generator brand and pre-configure a client build?](/blog/rustdesk-for-msps)
- [I changed the admin password and locked myself out — how do I reset it?](https://rustdesk.com/docs)
- [Which ports does RustDesk Server Pro need open besides 21114?](https://rustdesk.com/docs)

Still stuck? Confirm the server process is running and that either TCP 21114 is reachable through a protected bootstrap path or your configured TCP 443 reverse proxy is reachable over HTTPS. Never submit credentials to port 21114 across the public internet; rotate the initial admin credentials after the protected first login.
