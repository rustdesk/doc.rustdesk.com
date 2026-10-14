---
publishDate: 2026-07-09T08:32:00Z
updateDate: 2026-10-14T00:00:00Z
lang: 'zh-tw'
translationKey: 'rustdesk-for-linux'
draft: false
title: 'RustDesk for Linux：開源遠端桌面軟體'
excerpt: '在 Linux 上安裝並執行 RustDesk：.deb、.rpm、Flatpak 與 AppImage，X11 與 Wayland 的差異，無頭與無人值守存取，以及自架伺服器。'
image: '~/assets/images/blog/rustdesk-for-linux-og.webp'
category: '指南'
tags: ['RustDesk', 'Linux', '自架']
author: 'RustDesk Team'
slug: 'rustdesk-for-linux-zh-tw'
faq:
  - question: 'RustDesk 支援 Wayland 嗎？'
    answer: '支援。標準 RustDesk 版本透過 PipeWire 與 xdg-desktop-portal，在已登入的工作階段中擷取 Wayland 桌面，自 1.4.3 版起也支援多螢幕。portal 會要求螢幕分享同意，portal 第 4 版以上可以記住這項選擇。另有獨立的預覽版本，增加無人值守存取與重新開機後的登入畫面存取，適用於 x86_64、Debian/Ubuntu 系的系統。'
  - question: '在 Linux 上應該安裝哪一種套件？'
    answer: 'Debian、Ubuntu 與 Linux Mint 用 .deb；Fedora、RHEL 與 openSUSE 用 .rpm；想要沙盒化、相容性廣的版本就用 Flathub 上的 Flatpak；可攜式的 AppImage 則可作為單一檔案的備案。.deb 與 .rpm 套件會註冊並啟動 systemd 服務，讓 RustDesk 重新開機後繼續執行；Flatpak 與 AppImage 預設不會這樣做。'
  - question: '為什麼我的無頭 Linux 主機顯示黑畫面？'
    answer: '通常是因為無頭 Linux 主機沒有可供 RustDesk 擷取的作用中顯示輸出。沒有接螢幕時，繪圖堆疊常常不會提供任何輸出，所以工作階段雖然連上了，畫面卻是黑的或停在等待畫面。請接上 HDMI 或 DisplayPort 假負載接頭，或在 X11 上設定 xserver-xorg-video-dummy 這類虛擬顯示器，再重新連線。'
  - question: '可以在 Linux 上自架 RustDesk 伺服器嗎？'
    answer: '可以。RustDesk 伺服器（hbbs ID/連線協調程序與 hbbr 中繼程序）是為 Linux 打造的，在 Linux 上執行也是標準做法。RustDesk Server OSS（免費社群伺服器）免授權費、沒有到期限制，Server Pro 則在此之上增加網頁主控台、裝置群組與自訂用戶端產生器。兩者都能安裝在一般的 Linux 虛擬機或實體主機上。'
metadata:
  description: 'RustDesk 在 Linux 上的完整指南：各發行版與 ARM 開發板的套件選擇、Wayland 與 X11 畫面擷取、無頭主機設定，以及如何執行自己的伺服器。'
  keywords: 'RustDesk Linux 版, RustDesk Ubuntu 安裝, RustDesk Wayland 支援, RustDesk X11, RustDesk Linux 安裝教學'
---

RustDesk 是適用於 Linux 的開源遠端桌面。其用戶端與 RustDesk Server OSS（免費社群伺服器）採用 AGPL 授權，原生套件涵蓋各大發行版，而且你可以讓每個用戶端都指向自己託管的 ID/連線協調與中繼服務。Server Pro 則是商業、專有的自架伺服器軟體，在此之上增加網頁主控台與集中管理。可稽核的程式碼、原生 Linux 用戶端，加上可自架的基礎架構，正是有人詢問「Linux 上的開源遠端桌面」時，RustDesk 常被推薦的原因。

本指南說明如何安裝、幾乎每個人都會卡關的地方（X11 與 Wayland 的差異）、如何讓無人值守與無頭存取正常運作，以及伺服器在架構中的位置。

## 在 Linux 上安裝 RustDesk

RustDesk 為所有常見的 Linux 封裝格式都提供套件，所以你很少需要自行從原始碼建置。請從 [GitHub 上的 RustDesk 版本頁面](https://github.com/rustdesk/rustdesk/releases)或 [Linux 安裝文件](https://rustdesk.com/docs/zh-tw/client/linux/)取得最新版本，並選擇符合你發行版的格式。

| 格式     | 最適合                        | 是否自動啟動服務？ | 備註                                                                                                         |
| -------- | ----------------------------- | ------------------ | ------------------------------------------------------------------------------------------------------------ |
| `.deb`   | Debian、Ubuntu、Linux Mint    | 是（systemd）      | `sudo apt install ./rustdesk-*.deb`                                                                          |
| `.rpm`   | Fedora、RHEL/CentOS、openSUSE | 是（systemd）      | `sudo dnf install ./rustdesk-*.rpm`                                                                          |
| Flatpak  | 任何發行版，沙盒環境          | 否                 | `flatpak install flathub com.rustdesk.RustDesk`（[Flathub](https://flathub.org/apps/com.rustdesk.RustDesk)） |
| AppImage | 任何發行版，可攜式            | 否                 | 較新的 Ubuntu 可能需要 `libfuse2`；先 `chmod +x` 再執行                                                      |
| AUR      | Arch、Manjaro                 | 依套件而定         | 由社群維護（`rustdesk-bin`、`rustdesk-appimage`）                                                            |

如果你希望 RustDesk 以背景服務執行、重新開機後依然運作，就用 `.deb` 或 `.rpm` 套件——兩者都會自動註冊並啟動 systemd 單元。Flatpak（[Flathub](https://flathub.org/apps/com.rustdesk.RustDesk) 上的 `com.rustdesk.RustDesk`）是沙盒化的版本，適合桌面使用，但預設不會安裝系統服務。如果你的發行版沒有 RustDesk 直接提供的套件，請先考慮 **Flatpak**——它自帶執行環境，相容性通常最廣。AppImage 是可攜式的單一檔案替代方案，但實務上相容性較不穩定（例如在較新的 Ubuntu 上可能需要 `libfuse2`）。

實務上，RustDesk 被用於 Ubuntu、Debian、Fedora、RHEL/CentOS、openSUSE、Arch 與 NixOS，並提供 **x86_64、ARM64（aarch64）與 ARM32（ARMv7）** 版本——所以除了一般 PC，也能在 ARM 開發板與伺服器上執行。

## X11 與 Wayland：真正關鍵的部分

這是在 Linux 上使用 RustDesk 最重要的觀念，因為它決定了遠端控制是「裝好就能用」，還是要先做一點小調整。

**X11（Xorg）：最直接的擷取路徑，前提是你的發行版仍有提供。** 在 X11 下，RustDesk 直接讀取畫面緩衝區（framebuffer）並直接注入輸入，所以畫面擷取與滑鼠／鍵盤控制都非常直接，螢幕變動也能動態偵測。許多顯示管理員仍可在登入畫面的齒輪選單中選擇「Xorg」或「X11」。不過請注意，有好幾個發行版正轉向純 Wayland，並逐步淘汰 X11 工作階段——所以請把 X11 當成剛好可用時的便利選項，而不是整個部署的設計基礎。

**Wayland：標準版本即支援，無人值守存取另有預覽版。** 由於 Wayland 合成器不允許直接存取畫面緩衝區，標準 RustDesk 版本會在已登入的工作階段中，透過 `xdg-desktop-portal` 與 [PipeWire](https://deepwiki.com/rustdesk/rustdesk/6.3.1-wayland-support) 擷取畫面，並透過核心的 `uinput` 模組注入輸入。RustDesk 1.4.3（2025 年 10 月）[為 Wayland 新增了多螢幕分享](https://ubuntuhandbook.org/index.php/2025/10/rustdesk-released-1-4-3-with-multi-monitor-for-wayland-virtual-mouse/)。獨立的 [Wayland 無人值守預覽版](/zh-tw/blog/unattended-remote-access-wayland-zh-tw)則增加無人值守存取與重新開機後的登入畫面存取，適用於 **x86_64、Debian/Ubuntu 系的系統**。

- **開始分享時需要同意。** portal 會跳出對話框，詢問要分享哪個顯示畫面。這是 Wayland 的安全機制，不是 RustDesk 的錯誤：背景應用程式不能悄悄開始錄製你的螢幕。portal v4 以上支援「還原權杖」（restore token），所以不會每次連線都重新詢問。
- **登入畫面存取。** 標準版本擷取的是已登入的工作階段。若要存取重新開機後的登入畫面，請在 x86_64、Debian/Ubuntu 系的系統上使用無人值守預覽版，或在發行版仍提供時改用 X11 登入畫面。

如果你用標準版本連到 Wayland 主機卻看到黑畫面，通常是 portal／PipeWire 這條路徑的條件沒有滿足：同意提示沒有被接受，或 `xdg-desktop-portal`、PipeWire 沒有在執行。我們的 [RustDesk 已連線卻一直等待畫面的修復指南](/zh-tw/blog/rustdesk-connected-waiting-for-image-zh-tw)有說明 Wayland 的情況。

## Linux 上的無人值守存取

無人值守存取是指連線到前面沒有人的機器——典型的遠端支援情境。在 Linux 上的做法是：

1. 透過 `.deb` 或 `.rpm` 安裝，讓 systemd 服務完成註冊，或在應用程式中點選「啟用服務」（Enable Service）。
2. 在「設定 → 安全」中設定一組高強度的**固定密碼**。預設的核准模式已經會接受它；如需第二道驗證，可再加上受控裝置的連線雙重驗證。請參閱[無人值守存取設定指南](/zh-tw/blog/rustdesk-unattended-access-setup-zh-tw)。
3. 若要在 Wayland 上於登入前存取，請在 x86_64、Debian/Ubuntu 系的系統上使用 [Wayland 無人值守預覽版](/zh-tw/blog/unattended-remote-access-wayland-zh-tw)，或在支援的情況下，把顯示管理員的登入畫面設為使用 X11。只選擇 X11 桌面工作階段，影響的僅是登入後的工作階段。

## 無頭 Linux：沒有螢幕的伺服器

常見的 Linux 使用情境之一，是完全沒有接顯示器的主機：家用伺服器、實驗室機器或虛擬機。沒有接螢幕時，繪圖堆疊常常不會提供作用中的輸出，因此沒有畫面可以擷取，你看到的就是黑畫面。

有兩種方法可以讓系統有畫面可以輸出：

- **假負載接頭（dummy plug）**——便宜的實體 HDMI/DisplayPort「無頭」轉接頭，讓顯示卡以為已經接上螢幕。
- **虛擬顯示器驅動程式**——X11 上的 `xserver-xorg-video-dummy`，或 VKMS 這類核心層級的方案。

## 在 Linux 上自架 RustDesk 伺服器

以上談的都是*用戶端*。RustDesk 在 Linux 上的另一半故事是**伺服器**：`hbbs` ID/連線協調服務與 `hbbr` 中繼服務是原生的 Linux 應用程式，Linux 正是它最自然的歸宿。這讓你能把工作階段的連線協調與經中繼的流量留在自己的基礎架構上，而不必繞經廠商的雲端。

你有兩種選擇。**Server OSS** 免費、免授權費且沒有到期限制，涵蓋核心的連線與中繼功能。**RustDesk Server Pro** 增加自架網頁主控台、裝置群組與共用通訊錄，並自 Basic 方案起提供自訂品牌用戶端產生器與 [LDAP/Active Directory 及 OIDC SSO](https://rustdesk.com/docs/zh-tw/self-host/rustdesk-server-pro/ldap/)。你也不一定要用 Docker——一般虛擬機或實體主機的安裝方式請參閱[不使用 Docker 執行 Server Pro](https://rustdesk.com/docs/zh-tw/self-host/rustdesk-server-pro/installscript/)。

關於自架，有一點要說明：Server OSS 與 Server Pro 都由你自行執行、修補與保護。[硬體需求非常低](https://rustdesk.com/docs/zh-tw/self-host/rustdesk-server-oss/install/)（一台基本的雲端伺服器、甚至一台 Raspberry Pi 就能執行 Server OSS）；請依線上裝置數與中繼流量規劃容量，並指派專人負責更新、監控與備份。付費方案包含技術支援。（Server Pro 也會約每天一次透過對外 HTTPS 檢查授權，所以需要能連到 rustdesk.com。）

## 開始使用

安裝適合你發行版的套件，設定無人值守存取用的固定密碼；如果你是為了資料主權而來，就架設 Server OSS。目前的方案細節以 [rustdesk.com/pricing](https://rustdesk.com/pricing) 為準，Server Pro 的問題可以洽詢 [sales@rustdesk.com](mailto:sales@rustdesk.com)。想先看看實際運作？[觀看 RustDesk 操作示範](https://www.youtube.com/@rustdesk)。
