---
publishDate: 2026-07-07T16:17:00Z
lang: en
translationKey: rustdesk-not-connecting-troubleshooting
draft: false
title: 'RustDesk Not Connecting: Troubleshooting Guide'
excerpt: "RustDesk won't connect? Work through ID/relay server settings, firewall and NAT, key mismatches after a reinstall, and when to stop using the public server."
image: ~/assets/images/blog/rustdesk-not-connecting-troubleshooting-og.png
category: Troubleshooting
tags:
  - RustDesk
  - troubleshooting
author: RustDesk Team
faq:
  - question: "Why won't RustDesk connect at all?"
    answer: 'When the session never establishes, the usual causes are a wrong or unreachable ID/rendezvous server, a firewall or NAT blocking the required ports, or a key mismatch after a self-hosted server was reinstalled. Confirm the ID server and key on both clients, then confirm the ports are reachable end to end. That resolves most cases.'
  - question: 'What is a RustDesk "Key Mismatch" error?'
    answer: 'It means the public key configured on the client no longer matches the key pair on the server. It commonly appears after you reinstall or migrate a self-hosted server, which generates a fresh key. Copy the current public key from the server and set it in every client under Settings, Network, Key so the client and server agree again.'
  - question: 'Which ports does RustDesk need open to connect?'
    answer: 'Core self-hosted ports are TCP 21115-21117 and UDP 21116. TCP 21118-21119 are used for WebSocket clients. Server Pro may use TCP 21114 for HTTP/API access without an SSL proxy, while an HTTPS reverse proxy normally exposes 443. Open only the ports required by your deployment.'
  - question: "What's the difference between a direct and a relayed connection?"
    answer: 'RustDesk first tries a direct peer-to-peer link by punching through NAT. If that fails, traffic falls back through the relay server so the session still works, just with more latency. You can force relay mode to sidestep flaky NAT traversal, but relay throughput matters, which is a reason to self-host rather than lean on the public server.'
  - question: 'Should I stop using the public RustDesk server?'
    answer: 'The public rendezvous and relay servers are shared and offered without a performance guarantee, so under load they can be slow or refuse new sessions. If connections are unreliable, self-hosting your own server on a VPS or local machine gives you dedicated capacity, a stable key, and full control. The community server is free to run indefinitely.'
  - question: 'RustDesk Server Pro says the license is "already in use by another machine" — how do I move it?'
    answer: 'A Server Pro license binds to one server (the hbbs component; the relay hbbr needs no license). After a reinstall, migration, or hardware change, log in to the self-service license portal at rustdesk.com/self-host/account/ with the email you used on the payment page when you bought the license — if you no longer know which email that was, contact support@rustdesk.com — then unbind the old machine and set the license in the new server web console, where it re-registers automatically. If you run Pro in Docker and hit this on every restart, give the containers a stable hostname or use host network mode so the license is not tied to a random container ID.'

metadata:
  description: 'RustDesk not connecting? Fix ID/relay server settings, firewall and NAT, key mismatch after a reinstall, direct vs relay, and public server overload.'
  keywords: "RustDesk not connecting, RustDesk won't connect, RustDesk key mismatch, RustDesk failed to connect to relay server, RustDesk ID server, RustDesk firewall ports, RustDesk relay"
---

When RustDesk connects but shows a black screen, that's a _capture_ problem — covered in our guide to [RustDesk "Connected, waiting for image"](/blog/rustdesk-connected-waiting-for-image). This article is about the other failure: when the **session never establishes at all**. The client spins, times out, or throws an error like "Key Mismatch" or "Failed to connect to relay server." Here's how to diagnose it methodically.

## The short answer

A session that never connects almost always comes down to one of three things: the **ID/rendezvous server is wrong or unreachable**, a **firewall/NAT is blocking the required ports**, or the **client's key no longer matches the server** after a reinstall. Verify the ID server and key on both ends, confirm the ports are open, and most connections come back.

## Diagnose by symptom first

| Symptom                                         | Most likely layer                          | First check                                                                            |
| ----------------------------------------------- | ------------------------------------------ | -------------------------------------------------------------------------------------- |
| Client shows “Not ready” or cannot obtain an ID | ID server or DNS reachability              | Resolve the server name and test TCP/UDP 21116 from that client network                |
| “Key mismatch” or “invalid public key”          | Client/server configuration                | Compare the client key with the server's current `id_ed25519.pub`                      |
| Peer is found but the session times out         | Firewall, NAT, or relay path               | Test TCP 21117 and review cloud security groups, host firewall, and NAT rules          |
| Direct connection fails but forced relay works  | NAT traversal                              | Check UDP 21116 and accept relay for symmetric NAT or restrictive networks             |
| Both direct and relay fail                      | Server address, key, or relay availability | Confirm both peers use the same ID server and inspect `hbbs`/`hbbr` logs               |
| Session connects but no desktop image appears   | Capture/display permissions                | Use the separate [waiting-for-image guide](/blog/rustdesk-connected-waiting-for-image) |
| Web console works only over `http://host:21114` | TLS/reverse proxy                          | Configure a certificate and HTTPS reverse proxy on 443                                 |

Change one layer at a time and record the result. Randomly editing the ID server, relay, key, and firewall together makes the root cause harder to identify.

## Step 1: Confirm the ID and relay server settings

RustDesk's ID (rendezvous) server is what lets two peers find each other. If it's wrong, blank, or pointing at a server that's down, nothing connects.

On both the controlling and controlled clients, open **Settings → Network** and check:

- **ID/Rendezvous server** — the domain or IP of your server, entered _without_ a port (the default `21116` is implied). If you use the public network, leave it blank.
- **Relay server** — likewise entered without a port (`21117` implied) when self-hosting.
- **Key** — the server's public key (more on this below).

Both peers must point at the **same** server. A frequent mistake is configuring the host you're connecting _to_ but forgetting the machine you're connecting _from_. The [official client-configuration guide](https://rustdesk.com/docs/en/self-host/client-configuration/) explains the ID, relay, API, and public-key fields.

## Step 2: Fix "Key Mismatch"

The **"Key Mismatch"** (or "invalid public key") error means the public key configured on the client doesn't match the key pair the server is running. The classic trigger is **reinstalling or migrating a self-hosted server**, which generates a brand-new key while your clients still hold the old one. This is one of the most common self-hosting stumbles, discussed at length in [RustDesk discussion #1418](https://github.com/rustdesk/rustdesk/discussions/1418) and the [official FAQ](https://github.com/rustdesk/rustdesk/wiki/FAQ).

To fix it:

1. On the server, read the current public key. On a standard install it lives at `/var/lib/rustdesk-server/id_ed25519.pub` (or inside the Docker data volume).
2. In every client, go to **Settings → Network → Key** and paste that exact value.
3. Note the key normally **ends in `=`** — that character is part of the key, not a separator, so include it.
4. For Docker relay setups, make sure the same `id_ed25519` / `id_ed25519.pub` pair is present for both the `hbbs` and `hbbr` components, per the [relay configuration docs](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/relay/).

To avoid this entirely next time, **back up your key pair before you reinstall** and restore it afterward so clients never need reconfiguring.

## Step 3: Open the right ports

If the ID server and key are correct but sessions still fail — especially with "Failed to connect to relay server" — suspect the firewall or NAT. A self-hosted RustDesk server needs these open end to end:

| Port        | Protocol  | Role                                                  |
| ----------- | --------- | ----------------------------------------------------- |
| 21114       | TCP       | Pro web console / API (or 443 behind a reverse proxy) |
| 21115       | TCP       | NAT type test                                         |
| 21116       | TCP + UDP | ID registration, heartbeat, NAT hole punching         |
| 21117       | TCP       | Relay (hbbr)                                          |
| 21118-21119 | TCP       | Web client / WebSocket support                        |

Open only what your deployment uses: **TCP 21115-21117 and UDP 21116** are the core ports; **TCP 21118-21119** support WebSocket clients. Server Pro can use **TCP 21114** for HTTP/API access without an SSL proxy, while an HTTPS reverse proxy normally exposes **443**. Check every layer: the host firewall (`ufw`, `firewalld`, Windows Defender Firewall), cloud **security groups**, and router **NAT/port-forwarding** rules. The [official self-hosting port table](https://rustdesk.com/docs/en/self-host/) is the source of truth.

## Step 4: Understand direct vs. relayed connections

RustDesk tries a **direct peer-to-peer** connection first, using the ID server to coordinate NAT hole punching. When both peers sit behind cooperative NATs, you get a fast direct link. When hole punching fails—symmetric NAT, strict corporate firewalls, carrier-grade NAT—traffic **falls back to the relay** when that path is reachable, usually with extra latency ([self-hosting architecture](https://rustdesk.com/docs/en/self-host/)).

If direct connections are flaky, you can **force relay mode** to make sessions more deterministic. That trades a little latency for reliability — and it makes relay capacity matter, which is the next point.

Direct IP access is also available for LAN or port-forwarded scenarios: you can enter a target's IP directly to bypass the ID server, though you then lose automatic NAT traversal and relay failover, so both ends must be reachable on the network you configure.

## Step 5: Stop fighting the public server

The public rendezvous and relay are shared infrastructure and are not a substitute for a capacity plan or service commitment. If connections are unreliable and the client, network, and endpoint checks above pass, compare the result with a self-hosted test server before attributing the failure to the public service.

The durable fix is to **self-host**. Running your own server on a small VPS or a local machine gives you dedicated capacity, a stable key you control, and no dependence on someone else's uptime. The **free community server runs indefinitely** at no cost, and you don't need a container runtime to do it — see [running the server without Docker](/blog/rustdesk-server-pro-without-docker). Because the [client is open source](/blog/open-source-remote-desktop-software) and the server is yours, there's no black-box vendor deciding whether your session goes through.

## Step 6: Update everything

Version drift causes connection failures on its own. Older clients and servers can disagree on protocol and key formats, so update **both clients and the server** to current releases before deeper debugging. Several "won't connect" reports resolve at this step alone.

## A server you control is one you can fix

When the coordination runs on your own host, a connection failure is yours to diagnose and yours to resolve — no shared public server to wait on, no black box between endpoints. That is the durable fix behind the steps above.