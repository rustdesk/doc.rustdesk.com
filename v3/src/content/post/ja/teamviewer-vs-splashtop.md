---
publishDate: 2026-07-02T12:27:00Z
updateDate: 2026-10-14T00:00:00Z
lang: 'ja'
translationKey: 'teamviewer-vs-splashtop'
draft: false
title: 'TeamViewer vs Splashtop:料金・パフォーマンス・セルフホスティングを比較'
excerpt: 'TeamViewerとSplashtopを料金・パフォーマンス・セキュリティの観点で比較。さらに、セルフホスト型の第三の選択肢が判断をどう変えるかも解説します。'
image: ~/assets/images/blog/teamviewer-vs-splashtop-og.webp
category: '比較'
tags: ['TeamViewer', 'Splashtop', '比較']
author: 'RustDesk Team'
slug: 'teamviewer-vs-splashtop-ja'
faq:
  - question: 'Splashtopにはオンプレミス版がありますか？'
    answer: 'はい。Splashtopはエンタープライズ向けに、別ライセンスのOn-Prem製品を販売しています。顧客が自社のDMZまたはファイアウォールの内側に設置して運用するSplashtop Gatewayを使う製品で、標準のベンダーホスト型Splashtopサブスクリプションとは別物です。そのため、SaaSプランを試用してもOn-Premの評価にはなりません。'
  - question: 'SplashtopはTeamViewerより安いですか？'
    answer: 'エントリーレベルでは多くの場合そうです。Splashtopは一部のリモートアクセスプランで、より低いエントリー価格を公開しています。ただし妥当な比較には、必要なユーザー数、管理対象エンドポイント数、同時セッション数、ガバナンス機能、アドオン、地域、更新条件を含める必要があります。各ベンダーの最新のプランページと、日付入りの書面見積もりで比較してください。'
  - question: 'TeamViewerとSplashtopのどちらを選ぶかを決める前に、チームは何をテストすべきですか？'
    answer: '代表的なエンドポイントとネットワークで両製品をテストしてください。有人アクセスと無人アクセス、マルチモニターの挙動、オーディオ、ファイル転送、モバイル対応、ID連携、監査要件、展開方法、技術者の同時セッション数を含めます。製品ごとに、接続にかかる時間、操作の遅延、画質、失敗率、技術者の作業負荷を記録してください。'
metadata:
  description: 'TeamViewer vs Splashtop。料金モデル、パフォーマンス、セキュリティを比較し、セルフホスト型の代替製品が判断をどう変えるかを解説します。'
  keywords: 'TeamViewer Splashtop 比較, Splashtop TeamViewer どちらがいい, TeamViewer Splashtop 料金, TeamViewer Splashtop 違い'
---

TeamViewerとSplashtopはどちらもリモートアクセスとリモートサポートをカバーしていますが、正しい比較は単純な「プレミアム製品か格安製品か」ではありません。購入者が比較すべきなのは、ライセンスの単位、管理機能、展開モデル、そして自社のエンドポイントでのパフォーマンスです。この記事では、個々の顧客の体験談ではなく、現在公開されている製品情報と日付のあるベンダーの開示情報を使っています。

## TeamViewer vs Splashtop：早わかりまとめ

| | TeamViewer | Splashtop |
| --- | --- | --- |
| 公開プラン | Business、Premium、Corporate、およびエンタープライズ向けプラン。機能とセッション容量はプランごとに異なる | Remote Access Solo、Pro、Performance、Enterprise。Remote Supportは別のパッケージ |
| 展開モデル | ベンダーが運用するサービス | ベンダーが運用するSaaSプラン。エンタープライズ向けに別ライセンスのOn-Prem製品もある |
| 管理機能 | ポリシー管理、レポート、一括展開、エンタープライズ連携はエディションによって異なる | 該当プランではロール、アクセス管理、セッション録画。SSO、きめ細かな管理、SIEM連携などはEnterpriseに集中 |
| パフォーマンス | 操作の遅延、画質、エンドポイントとの互換性をテストする | Performanceは4:4:4カラー、高品質オーディオ、240FPSに対応とうたう。必要なハードウェアとワークフローで検証する |
| 向いている購入者 | 実績あるマネージドサービス、体系的な管理機能、幅広い連携を重視するチーム | 公開されている低めのエントリー価格、マルチメディア機能、個別見積もりのOn-Prem展開を比較検討する個人やチーム |
| ソースモデル | プロプライエタリ | プロプライエタリ |

料金に関する行は確認時点の情報として扱ってください。両ベンダーとも頻繁に価格を改定します。

## 料金：ワークロード全体で比較する

Splashtopの[公式料金ページ](https://www.splashtop.com/pricing)（2026年7月8日確認）では、Remote Access Solo、Pro、Performanceのエントリー価格が公開されていますが、EnterpriseとOn-Premは営業への問い合わせが必要です。TeamViewerは地域ごとの料金を公開しており、[料金概要ページ](https://www.teamviewer.com/en/pricing/overview/)でエディションごとに機能と容量をパッケージ化しています。表示されている開始価格だけでは、IT部門にとっての総コストはわかりません。

実際のワークロードに基づいて比較を組み立てましょう。

- ライセンスユーザー数または技術者数
- 無人アクセスの対象となるエンドポイント数と、有人サポートの要件
- 同時リモートセッション数
- SSO、監査、アクセス制御、連携、録画に関する要件
- アドオン、地域ごとの税金、契約期間、更新条件

同じワークロードで、日付入りの書面見積もりを依頼してください。過去の価格や他社の契約内容は、予算策定の根拠として信頼できません。

## 展開：SaaSとOn-Premは別製品

Splashtopの主力であるRemote AccessとRemote Supportのサブスクリプションは、ベンダーが運用するサービスです。Splashtopは**別ライセンスのOn-Prem**製品も販売しています。[公式製品ページ](https://www.splashtop.com/products/on-prem)によると、これは顧客のDMZまたはファイアウォールの内側に**Splashtop On-Prem Gateway**を置くセルフホスト型の展開です。

この違いは重要です。標準のSplashtopサブスクリプションを購入しても、On-Premを展開することにはなりません。また、Splashtop On-Premの評価は標準のSaaSプランの試用とは別物です。On-Premでは、顧客側のインフラ、ネットワーク設計、TLS、アップグレード、バックアップ、監視、キャパシティプランニングが加わります。Splashtopの[システム要件](https://support-splashtoponprem.splashtop.com/hc/en-us/articles/360035393074-Splashtop-On-Prem-System-Requirements)には、専用のGatewayとサーバーのサイジング要件が記載されています。

TeamViewerの標準的な比較対象は、そのマネージドサービスです。顧客が運用する仲介インフラが必須要件である購入者は、Splashtop On-Premをほかのセルフホスト型製品と比較してください。SaaS版は別の展開形態です。

## パフォーマンス：見出しの数値ではなく、実際のワークフローで検証する

Splashtop Performanceは、4:4:4カラー、高品質オーディオ、USBパススルー、最大240FPSへの対応をうたっています。これらの機能は、映像制作やCADなど、視覚的な精度が求められる作業で重要になる場合があります。一方TeamViewerは、幅広いエンドポイント対応、マネージドな管理機能、サービスデスク向けのワークフローを重視しています。

どちらの訴求内容も、自社環境でのパフォーマンスを予測するものではありません。両製品を同じ条件でパイロット検証しましょう。

- オフィス、自宅、モバイル、高遅延のネットワーク経路
- サポート対象のWindows、macOS、Linux、モバイルの組み合わせ
- 有人セッションと無人セッション
- マルチモニター、オーディオ、ファイル転送、印刷、権限昇格の作業
- 想定される技術者の同時セッション数

接続にかかる時間、操作の遅延、画質、失敗率、技術者の作業負荷を記録してください。短くても条件を管理したテストのほうが、ネット上の個別の不満やベンダーのベンチマークより役に立ちます。

## セキュリティ：「安いか高いか」では語れない

セキュリティに関する主張には、日付と適用範囲が欠かせません。Splashtopの[2025年9月18日の発表](https://www.splashtop.com/press/splashtop-achieves-iso-iec-27001-2022-certification)ではISO/IEC 27001:2022認証の取得が報告されており、現行の[セキュリティページ](https://www.splashtop.com/security)にはSOC 2、TLS 1.2、256-bit AESによるセッション保護が記載されています。認証はある時点での証明なので、購入時に各ベンダーの最新の開示情報を確認してください。

TeamViewerの現行の[Trust Center](https://www.teamviewer.com/en/resources/trust-center/)にはSOC 2/SOC 3とISO/IEC 27001が記載されており、[技術的セキュリティ概要](https://teamviewer.scene7.com/is/content/teamviewergmbh/teamviewer/central-image-hub/pdf/en/teamviewer-security-technical-overview-en.pdf)では現行のアーキテクチャと暗号化方式が説明されています。

## それぞれの製品が向いているケース

TeamViewerは、体系的なポリシー管理、レポート、一括展開、エンタープライズ連携を備えたマネージドサービスを求める組織に向いている場合があります。これらの管理機能はエディションによって異なるため、必要な機能ごとに対応するプランを確認してください。

Splashtop SaaSは、シンプルな展開、公開されているエントリー価格、パフォーマンス重視の機能セットを優先するチームに向いている場合があります。Splashtop EnterpriseとOn-Premは異なる要件に対応する製品なので、それぞれ個別に見積もりを取ってください。

インフラの管理権限、ソースコードの可視性、あるいは異なるライセンスモデルが要件になると、判断は変わります。そこで、セルフホスト型の選択肢を評価に加える意味が出てきます。

## RustDeskも比較検討に加えるチームがいる理由

率直に言うと、RustDeskは私たちの製品です。このセクションでは、RustDeskがなぜこの候補リストに入るのかを説明します。

**RustDeskはSaaSではなくOn-Premの列に入る。** 上の比較では、Splashtopをベンダーホスト型のSaaSプランと別ライセンスのOn-Prem製品に分けて扱ってきました。RustDeskは完全にセルフホストの側にあります。Server ProはID/ランデブーサーバー、リレー、コンソール、保存される展開データを自社管理のインフラ上で動かすので、SaaS版ではなくSplashtop On-Premと比べてください。チームがそもそもなぜこの運用負担を引き受けるのかについては、[リモートデスクトップソフトウェアをセルフホストすべき理由](/ja/blog/why-self-host-remote-desktop-software-ja)をご覧ください。

**公開されたライセンスモデル。** RustDesk Server Proの標準プランは**ログインユーザー数と管理対象デバイス数**でライセンスされ、無制限の同時接続が含まれます。同時接続数を一定数でライセンスするのは[Customized V2](https://rustdesk.com/pricing#custom2)のみです。最新の[料金表](https://rustdesk.com/pricing)をご覧ください。

**パフォーマンスも「自分でテストする」が原則。** Splashtopは色、オーディオ、フレームレートについて具体的な数値を掲げていますが、RustDeskはそれに対抗する宣伝用の数値を公開していません。また、直接接続が確立されると、セッションはベンダーのリレーを通らず、エンドポイント間をピアツーピアで流れます。上のSplashtopやTeamViewerの数値と同じく、判断材料になるのは自社のエンドポイントとネットワークで実測した数値だけです。

**オープンなクライアントと無料のServer OSS、そして商用のPro管理機能。** RustDeskのクライアントとRustDesk Server OSS（無料のコミュニティサーバー）はAGPLライセンスなので、Proを購入する前にソースコードを確認し、基本的なセルフホストを試せます。Server Proは商用のプロプライエタリなセルフホスト型サーバーソフトウェアで、Webコンソール、デバイスグループ、共有アドレス帳、ユーザー単位・デバイスグループ単位のアクセス制御を追加し、BasicからはLDAP/OIDCによるSSOとカスタムクライアント生成機能も利用できます。[MSP向けRustDesk](/ja/blog/rustdesk-for-msps-ja)と[セルフホスト型Splashtop代替製品の比較](/ja/blog/rustdesk-vs-splashtop-ja)もご覧ください。

## セルフホスト側の選択肢

SplashtopはすでにOn-Premというセルフホストの選択肢を示しています。顧客が運用する仲介インフラを必要とするチームにとって、本当の選択は「サーバーを運用するかどうか」ではなく「誰のサーバーを運用するか」です。無料のServer OSSとオープンなクライアントを持つ代替製品も同じ評価シートに載せ、月額SaaSの表示価格ではなく、管理権限、ワークロード、総コストで判断してください。

## 試してみる

Server OSSにはライセンス料も有効期限もありません。Pro機能が決め手になる場合は、[sales@rustdesk.com](mailto:sales@rustdesk.com)まで現在の評価条件をメールでお問い合わせください。プランの詳細は[rustdesk.com/pricing](https://rustdesk.com/pricing)にあります。何かをインストールする前に動作を見てみたい場合は、[RustDeskのYouTubeチャンネル](https://www.youtube.com/@rustdesk)のウォークスルー動画をご覧ください。
