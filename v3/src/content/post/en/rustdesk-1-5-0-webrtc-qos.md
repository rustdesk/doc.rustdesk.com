---
publishDate: 2026-10-14T00:00:00Z
lang: en
translationKey: rustdesk-1-5-0-webrtc-qos
title: 'RustDesk 1.5.0: WebRTC Direct Connections and QoS Improvements'
excerpt: 'RustDesk 1.5.0 adds WebRTC connection paths, enables direct access from the web client, and updates QoS handling of delay, congestion and FPS targets.'
image: ~/assets/images/blog/web-client.jpg
category: Release
slug: rustdesk-1-5-0-webrtc-qos
tags:
  - WebRTC
  - QoS
  - web client
  - release
---

We recently shared a practical experience: after upgrading to 1.5.0, accessing a Mac at home from another continent felt smoother than before. The [original post](https://x.com/rustdesk/status/2110243829978898520) describes that experience. Here are the specific connection and screen transmission adaptation changes in 1.5.0.

[PR #15684](https://github.com/rustdesk/rustdesk/pull/15684) introduced WebRTC Data Channel support, racing ICE connection attempts alongside the existing TCP and UDP hole punching and IPv6 direct paths. When a relay is ready but a direct attempt is still pending, RustDesk keeps a brief preference window for a direct connection. It can use the relay when that window expires or the direct attempts fail. This adds direct connection opportunities for some connections that previously required a relay.

**The web client can now connect directly, too.** Previously, RustDesk sessions in a browser had to pass through a relay server. When network conditions allow and ICE selects a direct path, session data can now travel directly between the browser and the remote device, potentially avoiding relay latency and bandwidth limits. A WebRTC connection forwarded through TURN is still relayed. The integration carries the RustDesk protocol over Data Channel; RustDesk continues to handle video encoding and decoding.

The QoS changes come from [PR #16082](https://github.com/rustdesk/rustdesk/pull/16082). It addresses the old policy's sharp frame rate reductions after one slow reply or a brief stall, followed by slow recovery. The changes in 1.5.0 include:

- **Improved delay baseline.** Use each connection's low-delay baseline from the first reply, gradually adapting to stable baseline changes to reduce misjudgments on high-latency links.
- **Confirmation of ordinary delay fluctuations.** Ordinary frame rate reductions require three consecutive bad replies. Severe excess delay and probe timeouts can still trigger faster reductions.
- **Bitrate first when conditions allow.** During ordinary congestion adjustment, reduce bitrate first when adaptive bitrate is enabled and the bitrate can still fall, rather than relying only on fewer frames with an encoder that keeps its target bitrate.
- **Faster startup and frame-rate target recovery.** Two consecutive low-excess-delay replies on a clean link can accelerate the startup target. After congestion, two good replies can restore the previous frame-rate target. The controller rolls back if congestion quickly returns after restoration.

These policies use delay feedback that shares the screen transmission path. That feedback includes transport backlog, network round trip and client reply scheduling. It signals changes in load rather than measuring queuing delay in isolation. [QoS implementation in 1.5.0](https://github.com/rustdesk/rustdesk/blob/1.5.0/src/server/video_qos.rs).

For the startup acceleration change, the PR author compared the change with its parent commit in a local-link office test: startup time to reach the **60 FPS target** fell from **7.99 seconds to 2.98 seconds**. This measures the change's effect on startup ramp-up of the frame-rate target in that test. [Test report](https://github.com/rustdesk/rustdesk/pull/16082#issuecomment-5597385117).

Upgrade to [RustDesk 1.5.0](https://github.com/rustdesk/rustdesk/releases/tag/1.5.0), or try the new connection path in the [web client](https://rustdesk.com/web). WebRTC requires support from both peers and the server. It is disabled by default for self-hosted servers; explicitly enable `enable-webrtc=Y`. For Server Pro, the documentation lists support from version 1.8.7. See the [settings guide](https://rustdesk.com/docs/en/self-host/client-configuration/advanced-settings/#enable-webrtc) for configuration.
