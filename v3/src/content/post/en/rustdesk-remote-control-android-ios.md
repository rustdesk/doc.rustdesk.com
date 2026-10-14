---
publishDate: 2026-07-07T17:09:00Z
updateDate: 2026-10-14T00:00:00Z
lang: en
translationKey: rustdesk-remote-control-android-ios
draft: false
title: 'RustDesk Android & iOS Remote Control: What Works'
excerpt: 'RustDesk can remote-control Android phones and turns Android, iPhone and iPad into controllers for your computers. The iOS app is a controller only.'
image: ~/assets/images/blog/rustdesk-remote-control-android-ios-og.webp
category: Guides
tags:
  - RustDesk
  - mobile
author: RustDesk Team
faq:
  - question: 'Can I remotely control an Android phone with RustDesk?'
    answer: "Yes. On the Android device you start RustDesk's screen-capture service (which requires an on-screen consent prompt) and enable the RustDesk Input accessibility service so remote taps and swipes are injected. Screen sharing needs Android 6 or newer; sharing internal system audio needs Android 10 or newer. Some manufacturers restrict accessibility for sideloaded apps, so you may have to allow restricted settings first."
  - question: 'Can RustDesk control an iPhone or iPad?'
    answer: 'No. The RustDesk iOS/iPadOS app is a controller only: use an iPhone or iPad to control Windows, macOS, Linux and Android devices. RustDesk does not implement iOS hosting, screen sharing or remote input. Some other vendors offer attended iOS screen viewing, and Apple offers consent-based remote control in FaceTime calls.'
  - question: 'Can I use my phone to control my computer?'
    answer: 'Yes. The Android and iOS RustDesk apps are full controllers: connect to a Windows, macOS or Linux machine by its ID and control it with an on-screen touchpad or mouse mode and a software keyboard. Some clipboard, file-transfer and special-key workflows differ by mobile OS. Controlling a computer from a phone is the most reliable mobile use case.'
  - question: 'Are the RustDesk mobile apps open source?'
    answer: 'Yes. The mobile clients share the same open-source AGPL codebase as the desktop client. Android builds are available from the official RustDesk GitHub releases and F-Droid as com.carriez.flutter_hbb; the iOS controller is available from the Apple App Store. RustDesk is not currently distributed through Google Play.'
  - question: 'Can I leave an Android device set up for unattended control?'
    answer: 'Partially. RustDesk can keep its capture service alive with a foreground notification and restart it on boot, but the screen-capture consent, a blocked lock-screen keyboard, and needing to unlock manually after a reboot make truly unattended Android control unreliable. Treat Android control as attended support rather than set-and-forget access.'
metadata:
  description: 'RustDesk on Android and iOS: control Android remotely, use either mobile app to drive your desktops, and why the iPhone and iPad app is a controller only.'
  keywords: 'RustDesk Android iOS remote control, remote control phone with RustDesk, RustDesk Android host, control Android remotely, RustDesk iOS, control iPhone remotely, RustDesk mobile app'
---

RustDesk can genuinely control an Android device once its owner grants screen-capture and input permissions, and both mobile apps make excellent _controllers_ for your computers. The iOS app is a controller only: RustDesk does not implement iOS hosting or screen sharing, so you cannot remote into an iPhone or iPad with RustDesk. This guide explains what works, what doesn't, and why, so you can plan around real capabilities.

Both mobile apps share the AGPL-licensed RustDesk client codebase; RustDesk Server OSS (the free community server) is AGPL-licensed too, while Server Pro is commercial, proprietary self-hosted server software. Android builds are available from the [official RustDesk GitHub releases](https://github.com/rustdesk/rustdesk/releases) and [F-Droid](https://f-droid.org/packages/com.carriez.flutter_hbb/) as `com.carriez.flutter_hbb`, with wide device coverage — arm64, arm32, and x86_64 builds, plus a universal APK; the iOS controller is on the App Store. RustDesk is [not currently distributed through Google Play](/blog/rustdesk-and-remote-access-scams): it voluntarily unpublished the Android app in response to scam abuse. Same codebase, same auditable core.

## The one-table summary

| Scenario                                          | Supported? | Notes                                                  |
| ------------------------------------------------- | ---------- | ------------------------------------------------------ |
| Control a Windows/macOS/Linux PC **from** Android | Yes        | Full controller; touchpad or mouse mode                |
| Control a PC **from** iPhone/iPad                 | Yes        | Full controller; touchpad or mouse mode                |
| Control **an Android device** (as the host)       | Yes        | Needs screen-capture consent + accessibility service   |
| Control **an iOS device** with RustDesk           | **No**     | RustDesk iOS is a controller app                       |
| View an iOS screen remotely with RustDesk         | **No**     | Incoming screen viewing is not implemented in RustDesk |

The rest of the article is just the detail behind each row.

## Using your phone as a controller (the easy part)

This is the use case that "just works." Install RustDesk on your Android or iOS device and it becomes a full controller for any RustDesk host — your Windows desktop, your [Mac](https://rustdesk.com/docs/en/client/mac/), your [Linux box](/blog/rustdesk-for-linux). Enter the target ID and password, and you get the remote screen with an on-screen touchpad, a mouse mode and a software keyboard. Some clipboard, file and special-key workflows differ by mobile OS. Nothing special is required on the phone side because you're only _sending_ control, not being controlled.

If your job is "fix a computer from wherever I am," a phone running RustDesk is a legitimately good tool.

## Controlling an Android device (as the host)

RustDesk can turn an Android phone or tablet into a controllable host. Screen capture and remote input use separate Android services, and both need setup.

**Screen capture.** RustDesk uses Android's `MediaProjection` API to capture the display. When you tap **Start Service** in the app, Android shows a consent prompt asking permission to record the screen — that dialog is mandatory and cannot be silently bypassed. Screen sharing requires **Android 6 or newer**; capturing the phone's **internal system audio** requires **Android 10 or newer**. Until that capture permission is granted, no incoming connection can see anything.

**Remote input.** Seeing the screen isn't the same as controlling it. To inject taps, swipes and key events, RustDesk registers an [`AccessibilityService`](https://deepwiki.com/rustdesk/rustdesk/6.5-mobile-platforms) called **RustDesk Input**, which you enable under **Settings → Accessibility**. It translates remote mouse and gesture events into Android gestures and can trigger system actions like Back, Home and Recents.

**Staying alive.** RustDesk keeps a foreground-service notification and, optionally, a floating overlay window so Android doesn't kill the capture process, and it can restart the service on boot.

Now the limitations, because Android's security model imposes real ones:

- **Consent is required to start capture.** Someone (or a pre-approval) has to accept the screen-recording prompt.
- **The lock screen blocks input.** Android does not let an accessibility service type into the secure lock screen, so if the device locks you generally can't enter the unlock code remotely — a limitation [documented by hands-on users](https://blog.wirelessmoves.com/2025/10/remote-android-support-with-rustdesk-part-1.html).
- **Reboots need a manual unlock.** After a restart the device usually has to be unlocked in person before control resumes.
- **OEM restrictions.** On some manufacturers' builds, the **RustDesk Input** accessibility toggle is greyed out for sideloaded apps until you grant "restricted settings" (long-press the app icon → App info → allow restricted settings). Aggressive battery managers on certain OEMs can also kill the background service.

The practical takeaway: Android control is excellent for **attended support** — helping someone who is holding their phone — while **set-and-forget unattended** access is a job the desktop host does best, because mobile operating systems restrict persistent background access. Match the platform to the job. (For desktops, the [unattended access setup guide](/blog/rustdesk-unattended-access-setup) covers the real thing.)

## iOS: RustDesk controllers, screen viewing and input control

**RustDesk for iOS is a controller, not a host.** Use it to control supported computers or Android devices. Incoming iOS screen viewing and input control are not implemented in RustDesk, as discussed in the [iOS host feature request](https://github.com/rustdesk/rustdesk/discussions/4839).

Other vendors take a different approach. Apple's broadcast APIs permit user-initiated screen sharing, and [AnyDesk documents incoming remote viewing on iOS/iPadOS 12 and later](https://support.anydesk.com/docs/anydesk-for-ios-ipados-tvos), without remote input control. A technician viewing a screen while its owner taps is a different workflow from controlling it.

Apple also provides [consent-based remote control in FaceTime](https://support.apple.com/guide/iphone/request-give-remote-control-a-facetime-call-iph5d70f34a3/ios), subject to its device, region and OS requirements. If your support workflow requires viewing an iPhone screen, use a tool that implements that workflow; for controlling computers from an iPhone or iPad, the RustDesk controller app is the right fit.

## A note on privacy and self-hosting

Because the mobile apps are open source and speak the same protocol as the desktop client, you can point them at your own [self-hosted RustDesk server](/blog/why-self-host-remote-desktop-software) instead of the public network — so mobile sessions are brokered by infrastructure you control, ID and all. For remote-support workflows that touch personal devices, that data-sovereignty angle matters more than usual.

The trade-off is the same as always: you run and secure that server yourself — including updates, monitoring, backups and capacity planning — and for many teams, keeping session data on your own turf is well worth it.

## Getting started

Download Android builds from the [official GitHub releases](https://github.com/rustdesk/rustdesk/releases) or install the package from [F-Droid](https://f-droid.org/packages/com.carriez.flutter_hbb/). RustDesk is [not currently distributed through Google Play](/blog/rustdesk-and-remote-access-scams); the iOS controller remains available from Apple's App Store. To control a phone, that phone must be Android — accept the screen-capture prompt and enable the RustDesk Input accessibility service. To control your computers from a phone, either mobile app works out of the box. Current plans are at [rustdesk.com/pricing](https://rustdesk.com/pricing), and [sales@rustdesk.com](mailto:sales@rustdesk.com) can help with Server Pro. Want to see it first? [See RustDesk in action](https://www.youtube.com/@rustdesk).
