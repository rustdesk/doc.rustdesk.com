---
publishDate: 2026-08-14T10:00:00Z
updateDate: 2026-10-14T00:00:00Z
lang: en
translationKey: unattended-remote-access-wayland
draft: false
title: 'RustDesk Wayland Preview: Unattended and Login-Screen Access'
excerpt: 'A RustDesk preview for x86_64 Debian/Ubuntu-based systems adds unattended Wayland access, including multi-monitor setups and the login screen after reboot.'
image: ~/assets/images/blog/unattended-remote-access-wayland-og.webp
category: Release
tags:
  - RustDesk
  - Wayland
  - Linux
  - unattended-access
author: RustDesk Team

metadata:
  description: 'Try the RustDesk Wayland preview for x86_64 Debian/Ubuntu-based systems: unattended access across multiple monitors and at the login screen after reboot.'
  keywords: 'RustDesk Wayland, Wayland unattended access, Wayland remote desktop, Linux remote desktop Wayland, RustDesk Linux, unattended remote access'
---

Wayland support has been one of the harder parts of Linux remote desktop.

Standard RustDesk builds already capture Wayland desktops, including multiple monitors since version 1.4.3, through PipeWire and `xdg-desktop-portal` in a logged-in session. The new **RustDesk Wayland preview for x86_64 Debian/Ubuntu-based systems** adds **true unattended access on Wayland**: after the initial setup, no one at the remote machine has to approve each session. **Multi-monitor setups work in unattended sessions as well.**

You can connect even when no one is logged in — including from the **login screen** after a reboot.

<div class="twitter-embed" style="display:flex;justify-content:center;">
<blockquote class="twitter-video" data-media-max-width="560"><a href="https://twitter.com/rustdesk/status/2087945266855026744">Watch the demo video on X</a></blockquote>
</div>
<script data-astro-rerun>
(function () {
  if (window.twttr && window.twttr.widgets) {
    window.twttr.widgets.load();
  } else if (!document.getElementById('twitter-wjs')) {
    var s = document.createElement('script');
    s.id = 'twitter-wjs';
    s.async = true;
    s.src = 'https://platform.twitter.com/widgets.js';
    document.head.appendChild(s);
  }
})();
</script>

For now, we are releasing this as a separate preview build for **x86_64 Debian/Ubuntu-based systems**:

**[Download the Wayland unattended access build](https://github.com/rustdesk/rustdesk/releases/download/nightly/rustdesk-unattended-wayland-1.4.9-x86_64.deb)**

For comparison, [AnyDesk documents Xorg as required for incoming Linux connections](https://support.anydesk.com/anydesk-for-linux-raspberry-pi), while [TeamViewer describes its Wayland support as experimental](https://community.teamviewer.com/English/discussion/122410).

We would like to get more real-world testing before making this the default.

Once the implementation is stable, we plan to bring unattended Wayland access to more Linux distributions, including **Fedora and Arch Linux**, and eventually include it in the standard RustDesk releases.

If you use Wayland, especially with multiple monitors, please give the preview build a try and let us know what works and what doesn't. Useful checks: connect after a reboot before anyone logs in, reconnect after logout, and select each monitor. Include your distribution, desktop, display manager and build version in your feedback, and keep your existing access path until those checks pass.

## Related reading

- [RustDesk for Linux](/blog/rustdesk-for-linux)
- [RustDesk Unattended Access](/blog/rustdesk-unattended-access-setup)
- [RustDesk vs AnyDesk](/blog/rustdesk-vs-anydesk)
- [RustDesk vs TeamViewer](/blog/rustdesk-vs-teamviewer)
- [Wayland capture implementation (DRM/KMS)](https://github.com/rustdesk/rustdesk/pull/15420)
