---
publishDate: 2026-07-06T00:00:00Z
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
    answer: 'RustDesk internal telemetry recorded more than two million online endpoints on one 12-core, 32 GB public-server host on July 7, 2026. This was a point-in-time observation, not an independently audited benchmark or a Server Pro guarantee. Simultaneous sessions, relay traffic, database writes, and management features can change the hardware requirement.'
  - question: 'What has to be tuned to reach 200,000 devices?'
    answer: 'Validate online-device churn, simultaneous remote sessions, relay bandwidth, caching, database write performance, and management-console activity against your own workload. The public-server result demonstrates endpoint-presence scale; it does not reproduce every Server Pro workload.'
  - question: 'Does RustDesk Server Pro support high availability or load balancing?'
    answer: 'For very large fleets, high availability and load balancing are worth designing in, but the specifics such as relay redundancy, database failover, and how sessions are distributed should be validated with RustDesk against your workload rather than assumed as out-of-the-box defaults.'
  - question: 'Is public RustDesk infrastructure sized the same as a self-hosted deployment?'
    answer: 'Not necessarily. The public-server figure measures online endpoints, not two million simultaneous remote-control sessions. A self-hosted Server Pro deployment can add different database, console, policy, audit, and relay loads, so reproduce your expected concurrency and traffic profile before final sizing.'

metadata:
  description: 'See RustDesk first-party operational context for planning 200,000 devices and the workload variables a self-hosted Server Pro deployment must validate.'
  keywords: 'rustdesk scale 200000 devices, rustdesk 50000 devices, rustdesk self-hosted server scalability, rustdesk enterprise deployment, rustdesk server pro capacity, remote desktop for large fleets'
---

RustDesk internal telemetry recorded **more than two million online endpoints** on one public-server host with a **12-core CPU and 32 GB of RAM** on July 7, 2026. This is a point-in-time internal production observation recorded on July 7, 2026, not a multi-day stability measurement.

The scope matters: this is a production observation, not a reproducible Server Pro benchmark. It was not independently audited and has no public monitoring dashboard or downloadable dataset. “Online endpoints” means devices reported online at that point in time, not two million simultaneous remote-control sessions. RustDesk is intentionally publishing this limited topology summary without host identifiers or network details. A Server Pro deployment may also have different database writes, audit activity, console use, policy processing, and relay traffic.

## The short answer

Yes, 200,000 online devices is a credible planning target: RustDesk's point-in-time internal observation recorded more than ten times that number on one 12-core, 32 GB public-server host. Do not translate that ratio directly into a hardware guarantee. Size the deployment against online-device churn, simultaneous sessions, relay bandwidth, and Server Pro database and management workloads.

## In detail

Scale questions like this are among the most common we hear from IT teams migrating off TeamViewer or AnyDesk, especially those planning fleets in the tens or hundreds of thousands. The answer depends on how many devices stay online, how frequently their state changes, how many remote sessions run at once, and how much traffic uses the relay.

The public-server observation provides a RustDesk-reported reference point: more than two million online endpoints on a single 12-core, 32 GB machine at the recorded moment. It is useful first-party operational context, but readers cannot independently reproduce it from a public report and should not treat it as proof of a monitoring period or service-level target.

For a Server Pro rollout, validate the parts that do not follow from that public-server figure. Caching and database write performance matter as devices come and go. Relay bandwidth and CPU depend on the number, duration, resolution, and codec of simultaneous relayed sessions. Console queries, audit retention, device groups, policies, and integrations can add load that endpoint presence alone does not measure.

Public and self-hosted environments are not identical. The public result is evidence that 200,000 online endpoints is within RustDesk's demonstrated operating scale; it is not evidence that every Server Pro workload will fit the same machine. Capture the intended online count, connection churn, simultaneous direct and relayed sessions, database retention, and administrative activity in a representative load test.

High availability and load balancing fall into the same category. For very large fleets they are worth designing in, but the specifics — relay redundancy, database failover, and how sessions are distributed — should be validated with RustDesk against your workload rather than assumed as out-of-the-box defaults.

For planning purposes, use the public server's more than two million online endpoints as first-party point-in-time context, then validate 200,000 devices against your Server Pro feature and session profile before procurement. Licensing at this scale uses per-user and per-device models, so confirm the exact tier for your fleet at [rustdesk.com/pricing](https://rustdesk.com/pricing).

## Who asks this

This question typically comes from enterprises, [MSPs](/blog/rustdesk-for-msps), and public-sector IT teams planning multi-year rollouts. These buyers are usually leaving a commercial tool for cost or data-sovereignty reasons and need confidence that a self-hosted platform will grow with them rather than hit a wall mid-contract.

## Related questions

- [How many concurrent sessions can a self-hosted RustDesk server handle?](/blog/rustdesk-concurrent-connections-limit)
- What [server hardware](/blog/self-host-rustdesk-server-hardware-at-scale) do I need for a large RustDesk deployment?
- Does RustDesk Server Pro support high availability or load balancing?
- [How does RustDesk licensing work for tens of thousands of devices?](/blog/rustdesk-pro-license-cost-how-to-pay)
- Can I migrate an existing TeamViewer or AnyDesk fleet to RustDesk?

Planning a large-scale rollout? Reach out to the [RustDesk team](mailto:sales@rustdesk.com) to size a self-hosted deployment for your device count, performance requirements, and growth timeline.
