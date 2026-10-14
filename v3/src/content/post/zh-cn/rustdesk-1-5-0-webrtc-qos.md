---
publishDate: 2026-10-14T00:00:00Z
lang: zh-cn
translationKey: rustdesk-1-5-0-webrtc-qos
title: 'RustDesk 1.5.0：WebRTC 直连与 QoS 改进'
excerpt: 'RustDesk 1.5.0 增加 WebRTC 直连路径，让 Web 客户端获得直连能力，并调整 QoS 对延迟波动、拥塞和目标帧率恢复的处理。'
image: ~/assets/images/blog/web-client.jpg
category: 发布
slug: rustdesk-1-5-0-webrtc-qos-zh-cn
tags:
  - WebRTC
  - QoS
  - Web 客户端
  - 发布
---

最近，我们分享了一次实际使用体验：升级到 1.5.0 后，从另一个大陆访问家中的 Mac，比以前顺畅了。[原帖](https://x.com/rustdesk/status/2110243829978898520)记录的是这次使用感受。1.5.0 在连接方式和画面传输自适应方面的具体改动如下。

[PR #15684](https://github.com/rustdesk/rustdesk/pull/15684) 引入了 WebRTC Data Channel，让 ICE 连接尝试与已有的 TCP、UDP 打洞和 IPv6 直连路径并行进行。当中继连接已经就绪，而直连仍在尝试时，RustDesk 会保留一个短暂的直连优先窗口；窗口结束或直连尝试失败后，仍可使用中继。这为原先只能中继的部分连接增加了直连机会。

**Web 客户端也因此获得了直连能力。** 以前，浏览器中的 RustDesk 会话只能经过中继服务器；现在，网络条件允许且 ICE 选中直连路径时，会话数据可以直接在浏览器与远程设备之间传输，有机会避开中继路径的延迟和带宽限制。通过 TURN 转发的 WebRTC 连接仍属于中继。本次使用 Data Channel 承载 RustDesk 协议，画面的编解码仍由 RustDesk 处理。

QoS 的改动来自 [PR #16082](https://github.com/rustdesk/rustdesk/pull/16082)。它针对的是旧策略遇到一次慢回复或短暂卡顿就大幅降帧、随后恢复较慢的问题。1.5.0 的调整包括：

- **改进延迟基线。** 从第一次回复起使用连接自身的低延迟基线，并逐步适应稳定的基线变化，减少对高延迟链路的误判。
- **先确认普通延迟波动。** 常规降帧需要连续三次异常回复确认；严重的额外延迟和探测超时仍会更快触发降帧。
- **在条件允许时优先调码率。** 在正常拥塞调整中，启用自适应码率且码率还能降低时，优先降低码率，避免仅靠降帧应对目标码率不变的编码器。
- **加快启动和目标帧率恢复。** 干净链路上的连续两次低额外延迟回复可加速提高启动目标；拥塞后的两次良好回复可恢复之前的目标帧率。如果恢复后很快再次拥塞，控制器会回退。

这些策略使用与画面共享传输路径的延迟反馈。反馈包含传输积压、网络往返和客户端回复调度等影响，用于判断负载变化，并不单独测量排队延迟。[1.5.0 QoS 实现](https://github.com/rustdesk/rustdesk/blob/1.5.0/src/server/video_qos.rs)

针对启动加速改动，PR 作者比较了该提交与其父提交：在一次本地链路办公场景测试中，达到 **60 FPS 目标值**的启动时间从 **7.99 秒缩短到 2.98 秒**。它衡量的是该项改动在这次测试下的目标帧率启动爬升速度。[测试记录](https://github.com/rustdesk/rustdesk/pull/16082#issuecomment-5597385117)

可以升级到 [RustDesk 1.5.0](https://github.com/rustdesk/rustdesk/releases/tag/1.5.0)，或在 [Web 客户端](https://rustdesk.com/web)尝试新的连接方式。WebRTC 需要连接双方和服务端支持；自建服务器默认关闭此选项，需显式启用 `enable-webrtc=Y`。使用 Server Pro 时，官方文档列出的支持版本为 1.8.7 起，具体配置见[设置说明](https://rustdesk.com/docs/zh-cn/self-host/client-configuration/advanced-settings/#enable-webrtc)。
