---
title: Synology DSM 6
weight: 22
---

> 第三方的另一個最新教學在[這裡](https://mariushosting.com/how-to-install-rustdesk-on-your-synology-nas/)。

本教學基於最新的 DSM v6 和 v7。

{{% notice note %}}
DSM 7.2 更新後，Docker 升級為新的 "Container Manager"，請查看[這篇文章](/docs/en/self-host/rustdesk-server-oss/synology/dsm-7)。
{{% /notice %}}

## 安裝 Docker

| 開啟套件中心 | 安裝 Docker |
| --- | --- |
| ![](/docs/en/self-host/rustdesk-server-oss/synology/dsm-6/images/package-manager.png) | ![](/docs/en/self-host/rustdesk-server-oss/synology/dsm-6/images/docker.png) |

## 安裝 RustDesk Server

| 在 Docker 註冊表中搜尋 rustdesk-server 並雙擊安裝 | 已安裝 rustdesk-server 映像，雙擊建立 rustdesk-server 容器 |
| --- | --- |
| ![](/docs/en/self-host/rustdesk-server-oss/synology/dsm-6/images/pull-rustdesk-server.png) | ![](/docs/en/self-host/rustdesk-server-oss/synology/dsm-6/images/rustdesk-server-installed.png) |

## 建立 hbbs 容器

如上所述，雙擊 rustdesk-server 映像建立新容器，設定名稱為 `hbbs`。
![](/docs/en/self-host/rustdesk-server-oss/synology/dsm-6/images/hbbs.png)

點擊上面的 `進階設定`。

- 啟用 `啟用自動重新啟動`。
![](/docs/en/self-host/rustdesk-server-oss/synology/dsm-6/images/auto-restart.png)

- 啟用 `使用與 Docker Host 相同的網路`。關於主機網路的更多資訊，請[查看](https://rustdesk.com/docs/en/self-host/rustdesk-server-oss/docker/#net-host)。
![](/docs/en/self-host/rustdesk-server-oss/synology/dsm-6/images/host-net.png)

- 掛載主機目錄（例如 `/home/rustdesk/`）到 `/root`，hbbs 將在此目錄中產生一些檔案（資料庫和 `key` 檔案），這些檔案需要在重啟後持久保存。

| 掛載 | 在主機目錄中產生的檔案 |
| --- | --- |
| ![](/docs/en/self-host/rustdesk-server-oss/synology/dsm-6/images/mount.png) | ![](/docs/en/self-host/rustdesk-server-oss/synology/dsm-6/images/mounted-dir.png) |

- 設定命令
{{% notice note %}}
Synology 的作業系統基於 Debian，所以主機網路 (--net=host) 工作良好，我們不需要用 `-p` 選項映射埠口。

{{% /notice %}}

![](/docs/en/self-host/rustdesk-server-oss/synology/dsm-6/images/hbbs-cmd.png?v3)

- 完成

## 建立 hbbr 容器

請重複上面的 `hbbs` 步驟，但將容器命名為 `hbbr`，命令（設定命令步驟）應該是 `hbbr`。

![](/docs/en/self-host/rustdesk-server-oss/synology/dsm-6/images/hbbr-config.png)

## hbbr/hbbs 容器

![](/docs/en/self-host/rustdesk-server-oss/synology/dsm-6/images/containers.png)

| 雙擊容器並查看日誌 | 再次確認 hbbs/hbbr 使用主機網路 |
| --- | --- |
| ![](/docs/en/self-host/rustdesk-server-oss/synology/dsm-6/images/log.png) | ![](/docs/en/self-host/rustdesk-server-oss/synology/dsm-6/images/network-types.png) |

## 獲取您的金鑰

使用 File Station 瀏覽到之前設定的資料夾，下載 `id_ed25519.pub` 並用文字編輯器開啟以查看您的金鑰。