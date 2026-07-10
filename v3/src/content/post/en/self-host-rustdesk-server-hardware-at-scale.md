---
publishDate: 2026-07-03T18:08:00Z
lang: en
translationKey: self-host-rustdesk-server-hardware-at-scale
draft: false
title: 'RustDesk Self-Host Hardware for Large Fleets'
excerpt: 'Planning to self-host RustDesk for thousands of devices? Size for concurrent sessions, relay traffic, storage, and OS limits rather than inventory alone.'
image: ~/assets/images/blog/self-host-rustdesk-server-hardware-at-scale-og.png
category: Deployment
tags:
  - RustDesk
  - deployment
  - self-hosting
author: RustDesk Team
faq:
  - question: 'How much hardware do I need to self-host RustDesk for a large fleet?'
    answer: 'RustDesk Server Pro requirements depend more on concurrent sessions, relay traffic, storage, and operating-system limits than on raw device inventory. Many deployments can start with an SSD-backed host and validate whether they actually need more RAM, CPU, or bandwidth.'
  - question: 'Does RustDesk Server Pro need PostgreSQL or MySQL, or is SQLite enough?'
    answer: 'RustDesk Server Pro uses a built-in SQLite database (db.sqlite3) — there is no separate PostgreSQL or MySQL to run, and none is needed even for fleets in the thousands. Scale by giving the host enough CPU, RAM, SSD storage, and relay bandwidth for your session load rather than by swapping the database engine.'
  - question: 'What OS socket and file-descriptor limits should I set for a large deployment?'
    answer: 'Concurrent TCP/WebSocket connections and relayed streams stress operating-system socket and file-descriptor limits more than device count does. Raise your ulimit and file-descriptor ceilings and give the host adequate network throughput rather than piling on RAM you will not use.'
  - question: 'How much RAM and CPU does a self-hosted RustDesk server use per session?'
    answer: 'Load is driven by concurrent active sessions and relay traffic, not by the number of registered devices. Size CPU and bandwidth for your peak simultaneous sessions and any heavy relay reliance; RAM is rarely the bottleneck.'

metadata:
  description: 'RustDesk server sizing for large fleets: concurrent sessions, relay bandwidth, SSD storage, and OS socket limits matter more than device inventory.'
  keywords: 'self-host RustDesk server hardware, RustDesk Server Pro requirements, RustDesk hardware requirements at scale, RustDesk Server Pro SQLite database, RustDesk self-hosted performance, RustDesk server sizing'
---

Self-hosting RustDesk at scale is often less hardware-hungry than IT teams expect. The important thing is sizing for the traffic and operating pattern you actually have, not guessing from inventory alone.

## The short answer

RustDesk Server Pro requirements vary by workload. What actually stresses the server is active TCP/WebSocket connections, relay traffic, storage performance, and operating-system socket and file-descriptor limits — not the size of your device inventory by itself.

## In detail

The key insight for capacity planning is that the number of _registered_ devices is not the same thing as the number of active, relayed, or simultaneously managed sessions. A large inventory does not, by itself, force you into a big box.

The real load comes from concurrent activity. Each active remote session opens TCP/WebSocket connections, and any session that can't connect peer-to-peer falls back to the relay, which passes traffic through your server. The more simultaneous sessions and relayed streams you run, the more the CPU, network, and — critically — the OS socket and file-descriptor limits matter. When you tune your server, raise those `ulimit`/file-descriptor ceilings and give the box adequate network throughput rather than piling on RAM you won't use.

On the database question, teams often assume a fleet in the thousands automatically demands a separate PostgreSQL or MySQL server. RustDesk Server Pro does not work that way: it ships with a built-in SQLite database that stays simple and holds up well into the thousands of devices. SSD storage matters because it keeps that database and its logging responsive under load; scale the host's CPU, RAM, and relay bandwidth rather than the database engine.

The practical takeaway: size for concurrency and network, not headcount. If you expect an unusually high ratio of simultaneous active sessions, or heavy reliance on relay because peer-to-peer is blocked in your network, plan for more CPU and bandwidth and confirm your OS limits are raised. For larger fleets or unusual edge cases, validate your sizing assumptions with RustDesk at [rustdesk.com](https://rustdesk.com).

## Who asks this

Capacity planners speccing a Server Pro host before rollout are the usual askers — infrastructure teams at enterprises and [MSPs](/blog/rustdesk-for-msps) that have just licensed a large fleet. It's a recurring question from organizations managing thousands to tens of thousands of endpoints who need to right-size a server without guesswork.

## Related questions

- [Can one RustDesk server handle 10,000+ devices, or do I need to cluster?](/blog/rustdesk-scale-50000-200000-devices)
- [Can I deploy RustDesk Server Pro without Docker?](/blog/rustdesk-server-pro-without-docker)
- [Is there a managed cloud option, or is Server Pro self-hosted only?](/blog/rustdesk-self-hosted-vs-cloud-saas-option)

Planning a large self-hosted rollout? Size for concurrent sessions and relay traffic first, then scale RAM, storage, bandwidth, and database complexity only where your real usage demands it.
