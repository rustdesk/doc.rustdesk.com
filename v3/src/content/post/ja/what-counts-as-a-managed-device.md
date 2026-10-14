---
publishDate: 2026-07-02T14:43:00Z
updateDate: 2026-10-14T00:00:00Z
lang: 'ja'
translationKey: 'what-counts-as-a-managed-device'
draft: false
title: 'RustDeskでは何が「管理対象デバイス」としてカウントされるのか？'
excerpt: 'RustDesk Server Proの標準プランでは、アクセスできるように設定したデバイスを1台につき1回カウントします。Customized V2では、グループかユーザーに割り当てたデバイスだけを数え、アドホックなデバイスはカウントしません。'
image: ~/assets/images/blog/what-counts-as-a-managed-device-og.webp
category: '料金'
tags: ['RustDesk', '料金', 'ライセンス']
author: 'RustDesk Team'
slug: 'what-counts-as-a-managed-device-ja'
faq:
  - question: 'RustDeskは管理対象デバイスをどのようにカウントしますか？'
    answer: '標準プランでは、アクセスできるように設定したデバイスはすべて、有人か無人か、接続するのが1回か1,000回かにかかわらず、1台の管理対象デバイスとして1回だけカウントされます。Customized V2では数え方が異なり、デバイスグループまたはユーザーに割り当てたデバイスだけが、ライセンスされたデバイス数にカウントされます。'
  - question: 'アドホックな単発サポートのデバイスはどのようにカウントされますか？'
    answer: 'Customized V2プランでは、デバイスグループまたはユーザーに割り当てたデバイスだけが管理対象デバイスとしてカウントされます。突発的なサポートで一度だけ接続し、割り当てなかったマシンは、ライセンスされたデバイス数にカウントされず、無効化もされません。業務の大半がアドホックなサポートなら、すべてのエンドポイントを数えるよりCustomized V2のほうが適しています。'

metadata:
  description: 'RustDeskの管理対象デバイスの数え方を解説。標準プランは接続できるデバイスを1台につき1回カウントし、Customized V2はグループかユーザーに割り当てたデバイスだけを数えます。'
  keywords: '管理対象デバイス カウント方法, RustDesk デバイス数, RustDesk TeamViewer ライセンス比較, 無人 有人 デバイス ライセンス, RustDesk アドホックサポート, MSP リモートサポート ライセンス'
---

RustDesk Server Proは、認可されたログインユーザーと管理対象デバイスをカウントします。標準プランでは、**アクセスしたいデバイスは1台につき1台の管理対象デバイスとして、1回だけカウントされます。** <strong>[Customized V2](https://rustdesk.com/pricing#custom2)</strong>プランは数え方が異なり、グループかユーザーに割り当てたデバイスだけを数えます。これが、アドホックなサポートの多い業務にCustomized V2が合う理由です。

## 結論から言うと

標準プランでの「管理対象デバイス」とは、接続できるようにしておきたいすべてのマシンのことで、サーバーは1台ずつ1回だけ数えます。次の点は関係ありません。

- デバイスが**有人**（誰かが前に座っている）か、**無人**（ヘッドレスのサーバー、キオスク端末、常時稼働のワークステーション）か
- 接続するのが**1回**か**何度も**か
- どのくらいの頻度でアクセスするか

業務の大半が突発的な単発サポートなら、以下で説明する、対象を絞った<strong>[Customized V2](https://rustdesk.com/pricing#custom2)</strong>の数え方がまさにそのために用意されています。

## 詳しく

数え方を変えるのはプランです。<strong>[Customized V2](https://rustdesk.com/pricing#custom2)</strong>プランでは管理対象デバイスの定義が狭くなり、**デバイスグループかユーザーに割り当てた**デバイスだけが、ライセンスされたデバイス数にカウントされます。アドホックな単発サポートのためだけに接続し、割り当てなかったマシンはカウントされず、無効化もされません。こうした未割り当てのデバイスをコンソールにまったく表示させたくない場合は、[クライアントの`register-device`設定](https://rustdesk.com/docs/ja/self-host/client-configuration/advanced-settings/#register-device)で制御でき、この設定はライセンスされた同時接続数が2以上のときに有効になります。実際、このようなクイックサポートのセッションでは、1回限りの有人の接続のためにIDとワンタイムパスワードが表示されるだけなので、本当に単発のやり取りなら、フリートに恒久的な枠を用意する必要はありません。業務の多くがこうした形なら、たいていはCustomized V2が適しています。現在の条件は、状況を添えて[sales@rustdesk.com](mailto:sales@rustdesk.com)にメールでお問い合わせいただくか、[rustdesk.com/pricing](https://rustdesk.com/pricing)でご確認ください。

たとえば、20人の技術者で約1,000台の顧客マシンをサポートしている[MSP](/ja/blog/rustdesk-for-msps-ja)を考えてみましょう。このMSPは、20人の技術者全員分のログインユーザーと、接続できる状態に保つマシン分の管理対象デバイスという、ライセンスの**両方**の要件を満たす必要があります。本当に一度きりのサポート対応のエンドポイントには、上記のCustomized V2のルールが適用されます。現在の枠は[rustdesk.com/pricing](https://rustdesk.com/pricing)でご確認ください。

## 同時接続は別のライセンス単位

Server Proの標準プラン（Individual、Basic、Customized）には無制限の同時接続が含まれ、同時接続数をライセンスで定めるのは[Customized V2](https://rustdesk.com/pricing#custom2)だけです。RustDeskの[同時接続の定義](https://github.com/rustdesk/rustdesk/wiki/FAQ#concurrent-connections)では、同時接続とは発信するセッションタブの数ではなく、操作中の制御側デバイス、つまり「チャネル」のことです。1台の技術者端末が5つのセッションタブを開いていても1チャネル、3台の制御側マシンが同時に操作していれば3チャネルです。Customized V2では、ログインユーザー、管理対象デバイス、チャネルをそれぞれ別に見積もってください。

## こんな方からよく聞かれます

TeamViewerやAnyDeskのシート数をRustDeskの単位に置き換えようとすると、まずこの定義に行き当たります。ライセンスの単位が一対一で対応しないからです。RustDeskの有料プランでは、ログインする人と、管理下に置くデバイスの両方の分の容量が必要です。

## 関連する質問

- ユーザー単位とデバイス単位のライセンス、同時接続、Server Proでのデバイスの数え方：[RustDeskの料金](https://rustdesk.com/pricing)をご覧ください。
- [TeamViewerからの移行：MSPにとってRustDeskの料金はどう違うのか](/ja/blog/rustdesk-vs-teamviewer-ja)

フリートの規模を見積もっていて、単発のサポートをデバイス数に含めるべきか迷っていますか？購入前に[rustdesk.com/pricing](https://rustdesk.com/pricing)で現在の条件を確認するか、チームにお問い合わせください。
