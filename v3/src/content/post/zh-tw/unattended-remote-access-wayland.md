---
publishDate: 2026-08-14T10:00:00Z
updateDate: 2026-10-14T00:00:00Z
lang: 'zh-tw'
translationKey: 'unattended-remote-access-wayland'
draft: false
title: 'RustDesk Wayland 預覽版：無人值守與登入畫面存取'
excerpt: '適用於 x86_64、Debian/Ubuntu 系系統的 RustDesk 預覽版，增加 Wayland 無人值守存取，支援多螢幕與重新開機後的登入畫面。'
image: '~/assets/images/blog/unattended-remote-access-wayland-og.webp'
category: '發布'
tags: ['RustDesk', 'Wayland', 'Linux', '無人值守存取']
author: 'RustDesk Team'
slug: 'unattended-remote-access-wayland-zh-tw'

metadata:
  description: '試用適用於 x86_64、Debian/Ubuntu 系系統的 RustDesk Wayland 預覽版：跨多螢幕的無人值守存取，以及重新開機後的登入畫面存取。'
  keywords: 'RustDesk Wayland, Wayland 無人值守存取, Wayland 遠端桌面, Linux 遠端桌面 Wayland, RustDesk Linux, 無人值守遠端存取'
---

Wayland 支援一直是 Linux 遠端桌面中較難處理的部分之一。

標準 RustDesk 版本已經能透過 PipeWire 與 `xdg-desktop-portal`，在已登入的工作階段中擷取 Wayland 桌面，自 1.4.3 版起也支援多螢幕。新的**適用於 x86_64、Debian/Ubuntu 系系統的 RustDesk Wayland 預覽版**則在 Wayland 上增加了**真正的無人值守存取**：完成初始設定後，遠端電腦旁不需要有人核准每一次工作階段。**無人值守工作階段同樣支援多螢幕。**

即使沒有人登入，你也能連線——包括重新開機後的**登入畫面**。

<div class="twitter-embed" style="display:flex;justify-content:center;">
<blockquote class="twitter-video" data-media-max-width="560"><a href="https://twitter.com/rustdesk/status/2087945266855026744">在 X 上觀看示範影片</a></blockquote>
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

目前，我們以獨立預覽版的形式，為 **x86_64、Debian/Ubuntu 系的系統**發布這項功能：

**[下載 Wayland 無人值守存取版本](https://github.com/rustdesk/rustdesk/releases/download/nightly/rustdesk-unattended-wayland-1.4.9-x86_64.deb)**

相較之下，[AnyDesk 文件記載 Linux 接受連入連線時需要 Xorg](https://support.anydesk.com/anydesk-for-linux-raspberry-pi)，而 [TeamViewer 則將其 Wayland 支援描述為實驗性功能](https://community.teamviewer.com/English/discussion/122410)。

在將它設為預設之前，我們希望先取得更多真實環境的測試。

實作穩定之後，我們計劃把 Wayland 無人值守存取帶到更多 Linux 發行版，包括 **Fedora 與 Arch Linux**，並最終納入標準 RustDesk 版本。

如果你使用 Wayland，尤其是多螢幕環境，歡迎試用這個預覽版，並告訴我們哪些正常、哪些有問題。建議檢查的項目：重新開機後、在任何人登入之前連線；登出後重新連線；以及逐一選擇每個螢幕。回報時請附上你的發行版、桌面環境、顯示管理員與版本編號，並在這些檢查通過之前，保留你現有的存取方式。

## 延伸閱讀

- [RustDesk for Linux](/zh-tw/blog/rustdesk-for-linux-zh-tw)
- [RustDesk 無人值守存取](/zh-tw/blog/rustdesk-unattended-access-setup-zh-tw)
- [RustDesk vs AnyDesk](/zh-tw/blog/rustdesk-vs-anydesk-zh-tw)
- [RustDesk vs TeamViewer](/zh-tw/blog/rustdesk-vs-teamviewer-zh-tw)
- [Wayland 擷取實作（DRM/KMS）](https://github.com/rustdesk/rustdesk/pull/15420)
