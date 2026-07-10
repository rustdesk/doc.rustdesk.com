---
publishDate: 2026-06-30T13:50:00Z
lang: en
translationKey: rustdesk-server-pro-without-docker
draft: false
title: 'Run RustDesk Server Pro Without Docker (VM & Offline)'
excerpt: "No, Docker isn't required for RustDesk Server Pro. Install on a plain VM or bare metal, even offline — but the license must reach rustdesk.com to activate."
image: ~/assets/images/blog/rustdesk-server-pro-without-docker-og.png
category: Deployment
tags:
  - RustDesk
  - deployment
  - self-hosting
author: RustDesk Team
faq:
  - question: 'Do I need Docker to run RustDesk Server Pro?'
    answer: 'No, you are not forced to use Docker. RustDesk Server Pro ships as plain binaries you can install directly on a VM or bare-metal server (for example a Debian box) using install.sh, and you can even install offline by downloading the release files first. The one hard requirement: the server must be able to reach https://rustdesk.com to activate its license — the license cannot be activated fully offline, though a proxy is supported.'
  - question: 'How do I install RustDesk Server Pro on Debian or Ubuntu without Docker?'
    answer: 'Download the Server Pro release for your architecture and run the bundled install.sh on the host to set up the hbbs (ID/rendezvous) and hbbr (relay) services directly under systemd — no container runtime needed. Open only the ports you use (native clients need TCP 21115-21117 and UDP 21116; the Pro API/console is on 21114 and web/WebSocket on 21118-21119) and front the console with an HTTPS reverse proxy on 443.'
  - question: 'Can I activate the license behind a proxy or without direct internet access?'
    answer: 'The server must reach https://rustdesk.com to activate and keep its license, but you do not need to expose it directly: an outbound HTTP/HTTPS proxy is supported for the license check. A fully air-gapped, offline-forever activation is not available.'
  - question: 'How do I move a non-Docker Server Pro license to a new VM?'
    answer: 'Only the hbbs ID server carries the license — the hbbr relay does not — and it binds to one machine at a time. Log in to the self-service portal at rustdesk.com/self-host/account/ with the email you used on the payment page, unbind the old machine, then set the license on the new server and let it re-register. If you no longer know which email you used, contact support@rustdesk.com.'

metadata:
  description: "Run RustDesk Server Pro straight on a VM or bare metal with install.sh — no container runtime needed; keep one outbound HTTPS path for license activation."
  keywords: 'RustDesk Server Pro without Docker, install RustDesk Server Pro on a VM, RustDesk Server Pro offline install, RustDesk Server Pro bare metal, RustDesk license activation offline, RustDesk Server Pro Debian'
---

No, Docker is not mandatory. RustDesk Server Pro is distributed as standalone binaries that install straight onto a VM or bare-metal host, so spinning up a plain Debian VM and installing to it is a fully supported path. The only firm rule is licensing: the server must reach `https://rustdesk.com` to activate.

## The short answer

You can run RustDesk Server Pro without Docker. The `install.sh` script and the binary releases both work on a normal host — a VM, a bare-metal box, whatever you already run. Docker is one option, not a requirement.

You can also install completely offline by grabbing the files from the rustdesk-server-pro releases beforehand. But license activation is a separate matter: it is not offline-capable. Your server needs network access to RustDesk's validation endpoint to activate and stay licensed. If your box sits behind a proxy, that is supported.

## In detail

There are two distinct questions hiding inside "do I need Docker," and it helps to separate them.

The first is _how the software is installed_. Here you have full flexibility. `install.sh` pulls what it needs from the internet, but if you would rather not run the script against a live connection — or your server has no direct internet at all — you can download the binaries from the rustdesk-server-pro releases and place them on the server yourself. Nothing about the install ties you to a container runtime. A Debian VM, an Ubuntu LXC, or a dedicated physical server are all valid targets.

The second is _license activation_, and this is where the offline story ends. Activation is an online-only step. Your server has to be able to reach `https://rustdesk.com` to validate the license — both at activation time and on an ongoing basis while running. An [air-gapped](/blog/rustdesk-server-pro-offline-air-gapped), never-phones-home deployment is not supported for the licensed product. The practical takeaway: if you are planning a locked-down or isolated network, you still need to allow outbound access to the license endpoint (directly or via a proxy, which is supported).

So the honest summary for an IT admin is: install however you like, on whatever OS you like, with or without Docker — but budget for one outbound HTTPS path to `rustdesk.com`.

## Who asks this

Sysadmins and [MSP](/blog/rustdesk-for-msps) engineers with an established VM, hypervisor, or bare-metal estate ask this because they see no reason to add a container layer just to run one more service. It is especially common among businesses migrating off TeamViewer or AnyDesk who want a self-hosted server on infrastructure they already control, and among security-conscious shops probing whether a fully offline deployment is possible before they commit.

## Related questions

- Can I install RustDesk Server Pro on Debian or Ubuntu without Docker?
- Does RustDesk Server Pro work in an air-gapped network?
- How do I activate a RustDesk Server Pro license behind a corporate proxy?
- What outbound domains does RustDesk Server Pro need to reach?
- Can I move my RustDesk Server Pro license to a different VM later?

Planning your deployment? Provision the VM or host you prefer, keep an outbound path to `rustdesk.com` open for licensing, and you are set — [check current install steps at rustdesk.com](https://rustdesk.com) before you begin.
