---
publishDate: 2026-07-09T08:32:00Z
lang: 'zh-tw'
translationKey: 'rustdesk-for-linux'
draft: false
title: 'RustDesk for Linux：開源遠端桌面軟體'
excerpt: '在 Linux 上安裝並執行 RustDesk：.deb、.rpm、Flatpak 與 AppImage 安裝包、X11 與 Wayland 的差異、無頭與無人值守存取，以及自行架設伺服器。'
image: '~/assets/images/blog/rustdesk-for-linux-og.webp'
category: '指南'
tags: ['RustDesk', 'Linux', '自架']
author: 'RustDesk Team'
slug: 'rustdesk-for-linux-zh-tw'
faq:
  - question: 'RustDesk 支援 Wayland 嗎？'
    answer: '支援——在所有遠端桌面工具中，RustDesk 對 Wayland 的支援可說是數一數二完整，包括 1.4.3 版新增的多螢幕分享功能。在 Wayland 環境下，RustDesk 會透過 PipeWire 與 XDG 桌面入口（desktop portal）擷取畫面，系統會跳出同意對話框，讓你選擇要分享的顯示畫面——多數情況下這個選擇會被記住，之後不會再次詢問——而且此功能僅在目前已登入的工作階段中運作。這個「需要同意」的步驟，是 Wayland 的安全性設計，所有螢幕分享應用程式都是如此，並非 RustDesk 獨有。若是登入前存取，或需要完全無人值守的機器，目前建議使用無頭虛擬顯示器設定（或是在仍提供 X11 工作階段的發行版上改用 X11，因為有不少發行版正逐步轉為純 Wayland）；完整的無人值守 Wayland 擷取功能仍在積極開發中（詳見 github.com/rustdesk/rustdesk/pull/15420）。'
  - question: '我在 Linux 上應該安裝哪一種安裝包？'
    answer: '在 Debian、Ubuntu 與 Linux Mint 上使用 .deb；在 Fedora、RHEL 與 openSUSE 上使用 .rpm；如果想要沙盒化、相容性較廣的版本，可使用 Flathub 上的 Flatpak；若需要單一檔案的可攜式備援方案，則可選擇 AppImage。.deb 與 .rpm 安裝包會自動註冊並啟動 systemd 服務，讓 RustDesk 在重新開機後依然存在；Flatpak 與 AppImage 預設則不會這麼做。'
  - question: '為什麼我的無頭 Linux 主機畫面是黑的？'
    answer: '只要沒有接上顯示器，X 或 Wayland 就不會配置畫面緩衝區，因此 RustDesk 沒有任何畫面可以擷取，檢視端就會顯示黑畫面或「等待影像」畫面。你可以接上假的 HDMI/DisplayPort 接頭，設定像 xserver-xorg-video-dummy 或 VKMS 這類虛擬顯示器，或是啟用 RustDesk 內建的 Linux 無頭模式（選用），讓系統自動為你建立虛擬顯示器。'
  - question: '我可以在 Linux 上自行架設 RustDesk 伺服器嗎？'
    answer: '可以。RustDesk 伺服器（包含 hbbs ID/集合處理程序與 hbbr 中繼處理程序）是為 Linux 打造的，也是最標準的執行方式。免費開源的社群版伺服器可以無限期免費執行，而 Server Pro 則在此基礎上額外提供網頁管理主控台、裝置群組與自訂用戶端產生器等功能。兩者都能安裝在一般的 Linux VM 或裸機主機上。'
metadata:
  description: '完整介紹 RustDesk 在 Linux 上的使用：各發行版與 ARM 開發板的安裝包選擇、Wayland 與 X11 畫面擷取、無頭設定，以及如何自行架設伺服器。'
  keywords: 'RustDesk Linux 版, RustDesk Ubuntu 安裝, RustDesk Wayland 支援, RustDesk X11, RustDesk Linux 安裝教學'
---

Linux 使用者向來沒有太多優質的遠端桌面工具可以選擇，市面上現有的產品不是閉源商用軟體，就是老舊的 VNC 系統。RustDesk 走的是不同的路線：它是採用 AGPL 授權的開源遠端桌面用戶端，能在所有主流發行版上原生執行，而且你可以將它連接到自己架設的伺服器。原始碼可受公開審查、原生 Linux 用戶端，再加上可自行架設的基礎架構——這樣的組合，正是當有人詢問「適用於 Linux 的開源遠端桌面工具」時，RustDesk 經常成為首選答案的原因。

本指南將說明如何安裝 RustDesk、幾乎所有人都會碰到的關鍵問題（X11 與 Wayland 的差異）、如何設定無人值守與無頭（headless）存取，以及伺服器在整個架構中扮演的角色。

## 在 Linux 上安裝 RustDesk

RustDesk 為每一種常見的 Linux 封裝格式都提供了安裝包，因此你幾乎不需要自行編譯原始碼。請前往 [GitHub 上的 RustDesk 版本頁面](https://github.com/rustdesk/rustdesk/releases)，或參考 [Linux 安裝文件](https://rustdesk.com/docs/en/client/linux/)，取得目前的版本，並選擇符合你所用發行版的安裝格式。

| 格式     | 最適合                        | 是否自動啟動服務？ | 備註                                                                                                         |
| -------- | ----------------------------- | ------------------ | ------------------------------------------------------------------------------------------------------------ |
| `.deb`   | Debian、Ubuntu、Linux Mint    | 是（systemd）      | `sudo apt install ./rustdesk-*.deb`                                                                          |
| `.rpm`   | Fedora、RHEL/CentOS、openSUSE | 是（systemd）      | `sudo dnf install ./rustdesk-*.rpm`                                                                          |
| Flatpak  | 任何發行版，沙盒環境          | 否                 | `flatpak install flathub com.rustdesk.RustDesk`（[Flathub](https://flathub.org/apps/com.rustdesk.RustDesk)） |
| AppImage | 任何發行版，可攜式            | 否                 | 較新版本的 Ubuntu 可能需要 `libfuse2`；先執行 `chmod +x` 再執行                                              |
| AUR      | Arch、Manjaro                 | 依套件而定         | 由社群維護（`rustdesk-bin`、`rustdesk-appimage`）                                                            |

如果你希望 RustDesk 能以背景服務的方式執行，並在重新開機後依然存在，`.deb` 與 `.rpm` 安裝包是最佳選擇——兩者都會自動註冊並啟動 systemd 單元。Flatpak（[Flathub](https://flathub.org/apps/com.rustdesk.RustDesk) 上的 `com.rustdesk.RustDesk`）則是沙盒化的建置版本，方便桌面使用，但預設不會安裝系統服務。若你所用的發行版沒有 RustDesk 直接提供的安裝包，建議優先選擇 **Flatpak**——因為它內建自己的執行環境，相容性通常最廣。AppImage 則是可攜式的單一檔案替代方案，但實務上相容性較不穩定（例如在較新版本的 Ubuntu 上可能需要 `libfuse2`）。

實務上，RustDesk 廣泛用於 Ubuntu、Debian、Fedora、RHEL/CentOS、openSUSE、Arch 與 NixOS 等發行版，並提供 **x86_64、ARM64（aarch64）與 ARM32（ARMv7）** 架構的建置版本——因此不論是標準 PC，還是 ARM 開發板或伺服器，都能執行 RustDesk。

## X11 與 Wayland：真正需要注意的重點

這是在 Linux 上使用 RustDesk 時最重要的一個觀念，因為它決定了遠端控制是「馬上就能用」，還是需要先做一點小設定調整。

**X11（Xorg）：最直接的擷取路徑，前提是你的發行版仍有提供。** 在 X11 環境下，RustDesk 會直接讀取畫面緩衝區（framebuffer）並直接注入輸入事件，因此畫面擷取與滑鼠/鍵盤控制都相當直接，螢幕變動也能動態偵測。許多顯示管理員（display manager）在登入畫面的齒輪選單中，仍可選擇「Xorg」/「X11」。不過要注意，有不少發行版正逐漸轉向純 Wayland，並淘汰 X11 工作階段——因此請把 X11 視為「剛好可用時的便利選項」，而不要把整個部署方案建立在它之上。

**Wayland：可以說是所有遠端桌面工具中支援度最完整的。** RustDesk 從 1.2.0 版起就開始支援 Wayland，而且持續在擴充相關功能。由於 Wayland 合成器（compositor）不允許直接存取畫面緩衝區，RustDesk 會透過 `xdg-desktop-portal` 服務與 [PipeWire](https://deepwiki.com/rustdesk/rustdesk/6.3.1-wayland-support) 擷取畫面，並透過核心的 `uinput` 模組注入輸入事件。這樣的設計會帶來兩個後果，而且這是 Wayland 架構本身的特性——所有 Wayland 螢幕分享工具都會遇到，並非 RustDesk 獨有：

- **每次連線都需要同意。** 系統的入口（portal）會跳出同意對話框，要求你選擇要分享哪個顯示畫面。這是 Wayland 刻意設計的安全機制，而不是 RustDesk 的錯誤——背景應用程式不能悄悄地開始錄製你的畫面。Portal v4 以上版本支援「還原權杖」（restore token），因此不會每次都要求你重新確認，但第一次分享時仍需要你在畫面上點擊確認。
- **僅限已登入的工作階段。** Wayland 擷取功能綁定在已登入的圖形工作階段上。目前尚不支援擷取 Wayland 的登入畫面（login greeter），這項功能仍在積極開發中（[PR #15420](https://github.com/rustdesk/rustdesk/pull/15420)）。若你現在就需要在登入前存取畫面，請使用下方的無頭／虛擬顯示器設定，或是在仍提供 X11 工作階段的發行版上改用 X11。

Wayland 支援仍在持續進步——例如 RustDesk 1.4.3 版（2025 年 10 月）就[為 Wayland 新增了多螢幕分享功能](https://ubuntuhandbook.org/index.php/2025/10/rustdesk-released-1-4-3-with-multi-monitor-for-wayland-virtual-mouse/)。但如果你連線到 Wayland 主機後畫面卻是黑的，幾乎都是因為 portal／PipeWire 這條路徑沒有被正確滿足所致。我們另外撰寫的專文[《RustDesk 已連線但仍在等待影像》](/zh-tw/blog/rustdesk-connected-waiting-for-image-zh-tw)，就詳細說明了 Wayland 黑畫面的情況。

## Linux 上的無人值守存取

無人值守存取（unattended access）指的是連線到一台前面沒有人操作的機器——這是遠端技術支援最常見的情境。在 Linux 上，設定步驟如下：

1. 透過 `.deb` 或 `.rpm` 安裝，讓 systemd 服務自動註冊，或是在應用程式中點選**啟用服務**（Enable Service）。
2. 在 RustDesk 的連線設定中，設定一組高強度的**永久密碼**，並建議同時啟用雙重驗證。
3. 若需要在使用者登入前，或跨越不同使用者登入時存取畫面，請使用下方的無頭虛擬顯示器設定（前面提到的 Wayland 登入畫面擷取限制，在此同樣適用）。

有一個 Wayland 的現實狀況需要事先規劃：在還在開發中的無人值守支援功能正式推出之前，前面 Wayland 小節提到的「需要同意」的入口機制，會讓完全無人值守的畫面擷取比在 X11 上更困難——因此，對於完全無人看管的機器，請預先規劃採用無頭虛擬顯示器設定。

## 無頭 Linux：沒有螢幕的伺服器

一個非常常見的 Linux 使用情境，是一台完全沒有接顯示器的主機——例如家用伺服器、實驗室機器或虛擬機（VM）。在這種情況下，問題並不出在 RustDesk 身上，而是出在繪圖堆疊：只要沒有接上顯示器，X 或 Wayland 就完全不會配置畫面緩衝區，因此根本沒有畫面可以擷取，你看到的就會是黑畫面。

以下三種方式，可以讓系統有畫面可以渲染：

- **假接頭（dummy plug）**——一種便宜的實體 HDMI/DisplayPort「無頭」轉接器，能讓顯示卡誤以為已經接上了顯示器。
- **虛擬顯示器驅動程式**——在 X11 上可使用 `xserver-xorg-video-dummy`，或是採用像 VKMS 這類核心層級的方案。
- **RustDesk 內建的無頭模式（選用）**——可透過 `sudo rustdesk --option allow-linux-headless Y` 啟用。根據 [Headless Linux 支援 Wiki](https://github.com/rustdesk/rustdesk/wiki/Headless-Linux-Support) 的說明，此功能預設為停用，主要在搭載 GNOME 的 Ubuntu 上測試，並需要 `xserver-xorg-video-dummy` 與 `lightdm` 等套件。你可以用 `sudo rustdesk --get-id` 取得該主機的 ID，並用 `sudo rustdesk --password <password>` 設定密碼。

無頭模式目前仍不夠成熟，細節上還有不少粗糙之處，比較適合視為「小心使用即可運作」，而非開箱即用的完整方案。

## 在 Linux 上自行架設 RustDesk 伺服器

以上談的都是 _用戶端_。RustDesk 在 Linux 上的另一半故事，是它的**伺服器**——也就是 `hbbs` ID/集合（rendezvous）服務與 `hbbr` 中繼服務——本身就是原生的 Linux 應用程式，Linux 可說是它最自然的執行環境。這也代表你可以把連線協商與中繼流量，都留在自己擁有的基礎架構上，而不必經由廠商的雲端服務轉送。

你有兩種選擇。免費、開源的**社群版伺服器（community server）**可以無限期免費執行，涵蓋核心的連線與中繼功能。**RustDesk Server Pro** 則額外提供自架的網頁管理主控台、裝置群組、共用通訊錄、可自訂品牌的用戶端產生器，以及 [LDAP/Active Directory 與 OIDC 單一登入（SSO）](https://rustdesk.com/docs/zh-tw/self-host/rustdesk-server-pro/ldap/)。你也不是非用 Docker 不可——若想以一般 VM 或裸機方式安裝，可參考[不使用 Docker 執行 Server Pro](https://rustdesk.com/docs/zh-tw/self-host/rustdesk-server-pro/installscript/)。如果你正在為大規模部署評估硬體規格，請在投入前，根據你實際的同時連線數與中繼流量特性來規劃容量。

關於自行架設，有一點值得說明：無論是免費的社群版伺服器，還是 Server Pro，執行、修補與資安維護的責任都在你自己手上。硬體需求不高，而且一旦設定完成，後續維護的負擔也很輕——如果遇到問題，RustDesk 的支援團隊也能協助處理。這種「掌控權在自己手上」正是自架的核心價值所在。（另外，Server Pro 的授權仍需要對外連線至 rustdesk.com，才能完成啟用並維持授權有效。）

## 開始使用

安裝適合你所用發行版的安裝包，設定一組永久密碼以啟用無人值守存取；如果你來到這裡是為了資料主權（data sovereignty）的考量，不妨直接架設免費的社群版伺服器。想了解目前的方案詳情，請以 [rustdesk.com/pricing](https://rustdesk.com/pricing) 的資訊為準；若想進一步了解 Server Pro，可以聯絡 [sales@rustdesk.com](mailto:sales@rustdesk.com)。想先看看實際運作效果嗎？歡迎參考實際體驗 RustDesk。
