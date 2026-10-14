---
publishDate: 2026-07-09T10:47:00Z
updateDate: 2026-10-14T00:00:00Z
lang: en
translationKey: rustdesk-scale-50000-200000-devices
draft: false
title: 'Can RustDesk Scale to 200,000 Devices?'
excerpt: 'See RustDesk first-party operational context for large-fleet planning, what the public-server observation shows, and what a self-hosted rollout must still validate.'
image: ~/assets/images/blog/rustdesk-scale-50000-200000-devices-og.webp
category: Deployment
tags:
  - RustDesk
  - deployment
  - enterprise
author: RustDesk Team
faq:
  - question: 'How many devices can a self-hosted RustDesk server handle?'
    answer: "RustDesk's public server recorded more than two million online endpoints on one 12-core, 32 GB host on July 7, 2026 (internal telemetry, not an audited benchmark). For RustDesk Server Pro, treat 200,000 devices as a planning target and validate database, console and relay load in a pilot."
  - question: 'What has to be tuned to reach 200,000 devices?'
    answer: 'Database writes, relay capacity and console load matter most at 200,000 devices. Load-test RustDesk Server Pro in stages for online-device churn, simultaneous remote sessions, relay bandwidth, caching, database write performance and management-console activity, using your own workload rather than endpoint presence alone.'
  - question: 'Does RustDesk Server Pro support high availability or load balancing?'
    answer: 'Yes, for relays: RustDesk Server Pro supports multiple relay servers placed by region, and hbbr relays need no license. A Pro license binds to one hbbs (ID/rendezvous) server, so high availability for the ID server and database is a design exercise; plan failover and recovery with RustDesk before rollout.'

metadata:
  description: 'See RustDesk first-party operational context for planning 200,000 devices and the workload variables a self-hosted Server Pro deployment must validate.'
  keywords: 'rustdesk scale 200000 devices, rustdesk 50000 devices, rustdesk self-hosted server scalability, rustdesk enterprise deployment, rustdesk server pro capacity, remote desktop for large fleets'
---

RustDesk internal telemetry recorded **more than two million online endpoints** on one public-server host with a **12-core CPU and 32 GB of RAM** on July 7, 2026.

Two caveats define its scope. First, "online endpoints" means devices reported online at that moment, not two million simultaneous remote-control sessions. Second, it is an internal production observation, not an independently audited benchmark or a Server Pro guarantee: a Server Pro deployment adds database writes, audit activity, console use, policy processing and relay traffic.

## The short answer

**200,000 online devices is a realistic planning target for Server Pro.** The public-server observation above sits an order of magnitude higher on a single 12-core, 32 GB host. What you validate in a pilot is the load Server Pro adds on top of endpoint presence: device churn, policies, audit writes, console use and concurrent relayed sessions.

## In detail

Scale questions are among the most common we hear from IT teams migrating off TeamViewer or AnyDesk, especially those planning fleets in the tens or hundreds of thousands. The answer depends on how many devices stay online, how often their state changes, how many remote sessions run at once, and how much traffic uses the relay.

For a Server Pro rollout, validate the parts the public-server figure does not cover. Caching and database write performance matter as devices come and go. Relay bandwidth and CPU depend on the number, duration, resolution, and codec of simultaneous relayed sessions. Console queries, audit retention, device groups, policies, and integrations add load that endpoint presence alone does not measure. Capture your intended online count, connection churn, simultaneous direct and relayed sessions, database retention, and administrative activity in a representative load test.

For a repeatable Server Pro pilot, record the client/server versions, hardware, database and relay placement. Increase online-device presence and churn in stages while running the expected console queries, policy updates and audit writes. Measure registration/reconnect success, connection setup time, database latency, CPU/RAM, disk growth and relay throughput. Include peak concurrent sessions and a recovery exercise; keep those measurements separate from the online-endpoint count.

High availability and load balancing deserve the same treatment. Relays scale out: you can run several, place them by region, and hbbr relays need no license. A Pro license binds to one hbbs server, so design ID-server and database failover explicitly and review it with RustDesk for very large fleets.

Then size licensing: Server Pro licenses login users and managed devices, and standard plans include unlimited concurrent connections. Pick the tier for your fleet at [rustdesk.com/pricing](https://rustdesk.com/pricing).

## Who asks this

Fleet architects planning multi-year rollouts — at enterprises, large [MSPs](/blog/rustdesk-for-msps), and public-sector IT programs — put this near the top of their diligence list. These buyers are usually leaving a commercial tool for cost or data-sovereignty reasons and need confidence that a self-hosted platform will grow with them rather than hit a wall mid-contract.

## Related questions

- Concurrent-connection limits and licensing for large device counts: see [RustDesk pricing](https://rustdesk.com/pricing).
- [Can I migrate an existing TeamViewer or AnyDesk fleet to RustDesk?](/blog/self-hosted-teamviewer-alternative)

Planning a large-scale rollout? Reach out to the [RustDesk team](mailto:sales@rustdesk.com) to size a self-hosted deployment for your device count, performance requirements, and growth timeline.
