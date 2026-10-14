---
publishDate: 2026-07-06T08:31:00Z
updateDate: 2026-10-14T00:00:00Z
lang: en
translationKey: rustdesk-connected-waiting-for-image
draft: false
title: 'RustDesk Connected Waiting for Image: Full Fix Guide'
excerpt: 'Diagnose RustDesk “Connected, waiting for image”: display availability, capture permissions, codecs, GPU drivers, Wayland builds and relay connectivity.'
image: ~/assets/images/blog/rustdesk-connected-waiting-for-image-og.webp
category: Troubleshooting
tags:
  - RustDesk
  - troubleshooting
author: RustDesk Team
faq:
  - question: 'Why does RustDesk say "Connected, waiting for image"?'
    answer: 'The session connected but no image is arriving. The most commonly reported cause is that the remote machine has nothing to capture: no monitor, a sleeping display, or missing screen-recording permission. Attach a monitor, HDMI dummy plug or virtual display, wake the screen, grant permission, then try another codec such as VP9.'
  - question: 'How do I fix RustDesk waiting for image on a headless computer?'
    answer: 'Give the headless computer a display to capture. Attach a monitor or an inexpensive HDMI dummy plug, which makes the GPU behave as if a display is connected, or configure a virtual display. Then keep the display awake, confirm screen-capture permission, and switch to a software codec such as VP9 if the image still does not appear.'
  - question: 'Does changing the video codec fix the black screen?'
    answer: 'Often, yes. In the remote session toolbar or settings you can switch codecs — VP8, VP9, AV1, or H.264/H.265 where hardware supports them. A codec the remote hardware cannot encode will show a blank or frozen image, and falling back to a software codec such as VP9 usually restores the picture.'
  - question: 'RustDesk shows the image on one PC but not another. Why?'
    answer: "A difference between two PCs points to something local on the failing machine: an asleep or absent display, missing screen-recording permission on macOS, an outdated GPU driver, a hardware-acceleration conflict, or a codec the hardware can't handle. Apply the per-cause fixes on the machine that fails, not the one that works."
  - question: 'Could my self-hosted server cause "waiting for image"?'
    answer: 'Usually not. By the time RustDesk shows "Connected, waiting for image", the ID server has already done its job. A blocked relay port or an overloaded relay can still stall the video stream. On a self-hosted server, allow TCP 21115-21117 and UDP 21116, and allow TCP 21118-21119 only if you use WebSocket clients.'

metadata:
  description: '"RustDesk connected, waiting for image"? Fix the black screen: headless displays, sleep/lock, video codecs, GPU drivers, Wayland, and firewall ports.'
  keywords: 'RustDesk connected waiting for image, RustDesk black screen, RustDesk waiting for image fix, RustDesk no image, RustDesk HDMI dummy plug, RustDesk video codec, RustDesk hardware acceleration'
---

If RustDesk says **"Connected, waiting for image"** and then shows a black screen, the hard part already worked: the two ends found each other and the session is established. What's missing is the _picture_. Most often the remote machine has nothing to capture; less often a codec, GPU driver or relay path stalls the stream. This guide walks through each cause, from the most commonly reported one to the edge cases, with a concrete fix for each.

## The short answer

The session connected, but no image is arriving. The most commonly reported cause is a remote machine with nothing to capture: **no monitor, an asleep display, or missing screen-recording permission**. Give RustDesk a real, awake display (a monitor, an HDMI dummy plug or a virtual display) and the right permission, then switch to another codec such as VP9 if the image still doesn't appear. If it still stays black, update the GPU driver and check that the relay ports are reachable.

## Start here: is there anything to capture?

The most commonly reported cause is a **headless machine** — a server, mini-PC, or workstation running with no monitor attached, or with the display asleep. With no active display there is often no framebuffer to capture, so RustDesk connects but has nothing to send. This pattern shows up repeatedly in the RustDesk issue tracker, including [reports of black screens specifically when the target's monitor is off](https://github.com/rustdesk/rustdesk/issues/9884) and the long-running ["Connected, waiting for image" thread](https://github.com/rustdesk/rustdesk/issues/222).

Two ways to give it something to capture:

- **Attach a monitor** and make sure it's powered on and awake.
- **Use an HDMI (or DisplayPort) dummy plug.** These inexpensive adapters make the GPU believe a display is connected, so it keeps rendering a framebuffer for RustDesk to grab. This is the standard fix for headless desktops and home servers.

If a monitor _is_ attached, the next suspect is that it went to sleep.

## Fix by cause

| Cause                          | Signal                              | Fix                                                                                                                                      |
| ------------------------------ | ----------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| Headless / no display          | Black screen on a server or mini-PC | Attach a monitor or add an HDMI dummy plug                                                                                               |
| Screen asleep / locked         | Worked earlier, black after idle    | Wake the screen; keep the display awake during access hours; keep password-protected locking enabled                                    |
| Missing permission (macOS)     | Connects, permanent black           | Grant Screen Recording in Privacy & Security; install the helper for the login screen                                                    |
| Codec mismatch                 | Blank or frozen image               | Switch codec (VP8 / VP9 / AV1 / H.264 / H.265); fall back to a software codec                                                            |
| Hardware acceleration conflict | Black on specific GPUs              | Turn off hardware codec in the session toolbar or Settings, or switch codec                                                              |
| Outdated GPU driver            | Black after a driver/OS update      | Update the GPU driver (NVIDIA especially)                                                                                                |
| Wayland session (Linux)        | No consent prompt, blank            | Accept the PipeWire/portal prompt and confirm the desktop portal is installed; an X11 session also works where a distro still offers one |
| Network / relay stall          | Sticks on "waiting for image"       | Allow TCP 21115-21117 and UDP 21116; add TCP 21118-21119 for WebSocket clients                                                           |

### Screen sleep, lock, and screensavers

If it worked earlier and went black after the machine sat idle, the display went to sleep.

- **Windows:** set the power plan so the display and the machine stay awake during the hours you need remote access. With RustDesk installed as a service you can connect at the lock screen, so keep password-protected locking enabled.
- **macOS:** stop the display from sleeping during the hours you need remote access — set it in **System Settings → Displays** (or Lock Screen / Energy settings), and keep the Mac on a power adapter, since sleep behaves differently on battery.
- **Android:** the screen must be on to be shared, so touch the display to wake it before connecting. Connecting from iOS to a dozing Android device with the screen off is a [known "waiting for image" case](https://github.com/rustdesk/rustdesk/issues/11479) — wake the target first.

### macOS permissions

macOS refuses to let any app record the screen without explicit consent. If RustDesk connects but stays black on a Mac, open **System Settings → Privacy & Security → Screen Recording** and enable RustDesk, then restart the app. A black screen specifically _at the login window_ means the RustDesk service/helper isn't installed to run before a user logs in — install it for pre-login capture.

### Video codec mismatch

RustDesk can encode the stream several ways, and the default doesn't always suit the remote hardware. In the session toolbar (or Settings), switch the codec — **VP8, VP9, AV1, or H.264/H.265 where hardware supports them** — and watch for the image to appear. If a hardware codec produces a blank image on a particular GPU, dropping back to a software codec such as VP9 is the reliable move.

### Hardware acceleration and GPU drivers

Some GPUs — NVIDIA configurations come up most often — clash with RustDesk's hardware-accelerated capture and render paths. Two levers help:

- **Turn off the hardware codec.** In the session toolbar (or Settings), disable **Use hardware codec** so encoding falls back to a software path — this clears the black screen on many problem GPUs.
- **Update the GPU driver.** A black screen that started after a driver or OS update is frequently fixed by moving to a current driver, particularly on NVIDIA hardware.

### Linux and Wayland

On Linux, standard RustDesk builds capture Wayland desktops, including multiple monitors since 1.4.3, through **PipeWire and the `xdg-desktop-portal`** in a logged-in session. The portal asks you to pick a display to share, and portal v4 and newer can remember the choice. If you get a blank screen on Wayland, accept the portal's screen-share prompt and confirm `xdg-desktop-portal` and PipeWire are installed and running. Logging into an X11/Xorg session also avoids the portal path where a distribution still offers one. A black screen at the login greeter is expected with standard builds, which capture the logged-in session; the separate [Wayland unattended preview](/blog/unattended-remote-access-wayland) for **x86_64 Debian/Ubuntu-based systems** adds unattended access and login-screen access after reboot.

### Network and relay

Because the message contains the word "connected," the session is usually already up — but the _video_ can still stall if the relay is overloaded or a relay port is blocked. For the standard server path, make sure **TCP 21115-21117 and UDP 21116** are reachable end to end. Open **TCP 21118-21119 only if you use WebSocket clients**. The public demo server is shared and its throughput isn't guaranteed, so if you rely on RustDesk daily, self-hosting your relay gives you control over capacity and monitoring. If the session itself is dropping or never establishing, that's a different problem — see the [RustDesk Server Pro FAQ](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/faq/).

## Keep everything current

Old builds carry old capture bugs. Update **both** the controlling client and the controlled client to the latest release, and if you self-host, update the server too. Several black-screen reports simply disappear after an update on both ends.

## The open-source advantage

When a black screen defies the checklist, RustDesk gives you something closed-source tools don't: the actual capture code under an AGPL license. You (or a contractor) can read exactly how capture works on your platform, reproduce the issue, and file a precise report against the public repository — instead of waiting on a vendor's support queue.

## Fewer variables when the server is yours

Run [your own relay and ID server](/blog/why-self-host-remote-desktop-software), and the shared public infrastructure drops out of the picture — one less unknown when you are chasing a capture problem, and full control over the parts you can tune. That is a quiet bonus on top of keeping the data.
