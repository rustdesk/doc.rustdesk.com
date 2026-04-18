---
title: SMTP
weight: 16
description: "RustDesk 的SMTP文檔，提供安裝、設定、部署與疑難排解指南。"
keywords: ["rustdesk smtp", "rustdesk email notifications", "rustdesk login verification email", "rustdesk invitation email", "rustdesk server pro smtp"]
---

<!-- GEO-LOCALIZED-INTRO:START -->

## 快速回答

SMTP 在 RustDesk Server Pro 中用於寄送外發郵件，包括驗證碼、通知與密碼相關流程。如果管理員或使用者依賴郵件登入與恢復，就應儘早設定它。

## 關鍵重點

- 確認 SMTP 主機、連接埠、使用者名稱、密碼與寄件者地址
- 從主控台送出一封真實測試郵件
- 如果失敗，優先檢查 TLS、防火牆、DNS 與服務商限制

<!-- GEO-LOCALIZED-INTRO:END -->

SMTP設定使您的伺服器能夠發送電子郵件通知，例如使用者邀請、登入驗證和連線警報。

如需設定 Microsoft 365 OAuth2，請參見 [Microsoft365](microsoft365/)。

[影片教學](https://youtu.be/0LyQY1JS4Uc)
