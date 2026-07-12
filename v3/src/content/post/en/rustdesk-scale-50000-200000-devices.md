---
publishDate: 2026-07-09T10:47:00Z
lang: en
translationKey: rustdesk-scale-50000-200000-devices
draft: false
title: 'Can RustDesk Scale to 200,000 Devices?'
excerpt: 'See RustDesk first-party operational context for large-fleet planning, what the public-server observation shows, and what a self-hosted rollout must still validate.'
image: ~/assets/images/blog/rustdesk-scale-50000-200000-devices-og.png
category: Deployment
tags:
  - RustDesk
  - deployment
  - enterprise
author: RustDesk Team
faq:
  - question: 'How many devices can a self-hosted RustDesk server handle?'
    answer: 'RustDesk internal telemetry recorded more than two million online endpoints on one 12-core, 32 GB public-server host on July 7, 2026.'
  - question: 'What has to be tuned to reach 200,000 devices?'
    answer: 'Validate online-device churn, simultaneous remote sessions, relay bandwidth, caching, database write performance, and management-console activity against your own workload.'
  - question: 'Does RustDesk Server Pro support high availability or load balancing?'
    answer: 'The architecture scales out — you can run multiple relays and place them regionally — but high availability is a design exercise, not an out-of-the-box default. Validate relay redundancy, database failover, and session distribution with RustDesk.'

metadata:
  description: 'See RustDesk first-party operational context for planning 200,000 devices and the workload variables a self-hosted Server Pro deployment must validate.'
  keywords: 'rustdesk scale 200000 devices, rustdesk 50000 devices, rustdesk self-hosted server scalability, rustdesk enterprise deployment, rustdesk server pro capacity, remote desktop for large fleets'
---

RustDesk internal telemetry recorded **more than two million online endpoints** on one public-server host with a **12-core CPU and 32 GB of RAM** on July 7, 2026.

Two caveats define its scope. First, "online endpoints" means devices reported online at that moment, not two million simultaneous remote-control sessions. Second, it is an internal production observation, not an independently audited benchmark or a Server Pro guarantee — there is no public dashboard or downloadable dataset, and a Server Pro deployment carries different database writes, audit activity, console use, policy processing, and relay traffic. Treat the figure as first-party context for sizing, and validate any target against your own workload.

## The short answer

Yes — 200,000 online devices is a credible planning target. The observation above sat an order of magnitude higher on a single 12-core, 32 GB host, so the ceiling is not the constraint; the real work is validating your specific workload, which the rest of this article breaks down.

## In detail

Scale questions are among the most common we hear from IT teams migrating off TeamViewer or AnyDesk, especially those planning fleets in the tens or hundreds of thousands. The answer depends on how many devices stay online, how often their state changes, how many remote sessions run at once, and how much traffic uses the relay.

For a Server Pro rollout, validate the parts the public-server figure does not cover. Caching and database write performance matter as devices come and go. Relay bandwidth and CPU depend on the number, duration, resolution, and codec of simultaneous relayed sessions. Console queries, audit retention, device groups, policies, and integrations add load that endpoint presence alone does not measure. Capture your intended online count, connection churn, simultaneous direct and relayed sessions, database retention, and administrative activity in a representative load test.

High availability and load balancing deserve the same treatment. For very large fleets they are worth designing in, but the specifics — relay redundancy, database failover, and how sessions are distributed — should be validated with RustDesk rather than assumed as out-of-the-box defaults.

Then confirm licensing: at this scale RustDesk uses per-user and per-device models, so verify the exact tier for your fleet at [rustdesk.com/pricing](https://rustdesk.com/pricing).

## Who asks this

Fleet architects planning multi-year rollouts — at enterprises, large [MSPs](/blog/rustdesk-for-msps), and public-sector IT programs — put this near the top of their diligence list. These buyers are usually leaving a commercial tool for cost or data-sovereignty reasons and need confidence that a self-hosted platform will grow with them rather than hit a wall mid-contract.

## Related questions

- Concurrent-connection limits and licensing for large device counts: see [RustDesk pricing](https://rustdesk.com/pricing).
- [Can I migrate an existing TeamViewer or AnyDesk fleet to RustDesk?](/blog/self-hosted-teamviewer-alternative)

Planning a large-scale rollout? Reach out to the [RustDesk team](mailto:sales@rustdesk.com) to size a self-hosted deployment for your device count, performance requirements, and growth timeline.
