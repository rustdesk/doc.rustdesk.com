---
publishDate: 2026-07-06T10:09:00Z
updateDate: 2026-10-14T00:00:00Z
lang: 'ja'
translationKey: 'rustdesk-vs-splashtop'
draft: false
title: 'セルフホスト型Splashtop代替製品:最初に評価すべきこと'
excerpt: 'ライセンス、インフラ、信頼性の実例、ワークフローのテスト、移行リスクを網羅した、セルフホスト型Splashtop代替製品の評価ガイドです。'
image: '~/assets/images/blog/rustdesk-vs-splashtop-og.webp'
category: '比較'
tags: ['RustDesk', 'Splashtop', '比較']
author: 'RustDesk Team'
slug: 'rustdesk-vs-splashtop-ja'
faq:
  - question: 'RustDeskとSplashtopはどちらもセルフホストできますか？'
    answer: 'はい。ただし製品モデルが異なります。RustDesk Server OSS（無料のコミュニティサーバー）と商用のServer Proは、どちらもセルフホストを前提に作られています。Splashtopは、主力であるベンダー運用のSaaSプランに加えて、顧客が運用するGatewayを使う、別ライセンスのプロプライエタリなOn-Prem製品を提供しています。'
  - question: 'Splashtop On-Premにはどのようなインフラが必要ですか？'
    answer: 'Splashtop On-Premでは、顧客が運用するSplashtop GatewayをDMZまたは企業のファイアウォールの内側に設置します。サーバー容量、ネットワーク、TLS、監視、バックアップ、アップグレード、可用性の計画は組織側で行います。SplashtopはGatewayの対応OS、ハードウェアのサイジング、ポートを記載したシステム要件を公開しています。'
  - question: 'セルフホストとベンダー運用のサービス、どちらを選ぶべきですか？'
    answer: 'サーバー側のサービスを自社で運用したく、更新、監視、バックアップ、復旧を担えるならセルフホストを選びます。RustDeskはAGPLのクライアント、無料のRustDesk Server OSS、商用のServer Proの管理機能によってセルフホストを標準としており、Splashtopはこれを別製品のOn-Premとして販売しています。サービスの運用を他社に任せたいなら、ベンダー運用のSaaSを選んでください。'
  - question: 'IT部門はSplashtopの代替製品をどのようにテストすべきですか？'
    answer: '代表的なユーザー、エンドポイント、ネットワーク、サポートワークフローで並行パイロットを実施してください。接続の信頼性、リモートオーディオ、モニターの割り当て、モバイルアクセス、管理機能、セキュリティ管理について受け入れ基準を定め、代替製品がそれらを満たすまでは、文書化したロールバック手順を用意したうえで既存製品を稼働させ続けてください。'
metadata:
  description: 'ライセンス、インフラ、ワークフローの互換性、セキュリティ管理、パイロット設計、移行リスクの観点から、セルフホスト型Splashtop代替製品を評価します。'
  keywords: 'セルフホスト型Splashtop代替, Splashtop代替製品, Splashtopからの移行, RustDesk Splashtop 比較, IT部門向けSplashtop代替'
---

セルフホスト型のSplashtop代替製品は、IT部門がサーバー側サービスの管理権限、監査できるソースコード、あるいは自社のユーザー数・デバイス数・同時セッション数に合ったライセンスモデルを求めている場合に、検討する価値があります。RustDeskはまさにそのために作られています。それでも評価は欠かせません。移行によって、機能比較表では見えないワークフロー上のギャップが表面化することがあるからです。

ここで重要なのは、**「クラウドかセルフホストか」ではなく、3つの運用モデルがある**という点です。Splashtopはマネージド型のSaaSプランを販売する*と同時に*、別ライセンスの**On-Prem**製品も提供しています。一方RustDeskは、RustDesk Server OSS（無料のコミュニティサーバー）とServer Proによって、セルフホストを中核の展開モデルとしています。

## 結論から言うと

| 判断基準 | RustDesk | Splashtop SaaS | Splashtop On-Prem |
| --- | --- | --- | --- |
| サーバーの運用 | 顧客が運用するServer OSSまたはServer Pro | ベンダーが運用 | 顧客が運用するSplashtop On-Prem Gateway |
| ソースモデル | クライアントとServer OSSはAGPL、Server Proはプロプライエタリ | プロプライエタリ | プロプライエタリ |
| ライセンス | Server Proのプランはログインユーザー数と管理対象デバイス数でライセンス。[Customized V2](https://rustdesk.com/pricing#custom2)では同時接続数も一定数でライセンス | Remote Access、Remote Support、Enterpriseのどのプランかで異なる | 別ライセンスの営業主導型。書面見積もりで確認すること |
| 同時セッション数 | 標準プランでは無制限、Customized V2ではライセンスされた同時接続枠 | プランに依存 | ライセンスに依存 |
| ガバナンス | Server ProのWebコンソール、ユーザー単位・デバイスグループ単位のアクセス制御、共有アドレス帳。BasicプランからLDAP/OIDCによるSSO | エンタープライズ向けの管理機能はプランに依存 | ユーザー／グループの権限、Active Directory連携、IP制限などの機能はエディションに依存 |
| インフラ運用の負担 | 展開、TLS、ネットワークへの公開、監視、バックアップ、アップグレード、可用性は自社チームが担う | サービスのインフラはベンダーが担う | Gatewayのサイジング、ネットワーク配置、TLS、監視、バックアップ、アップグレード、可用性は自社チームが担う |
| 最適な出発点 | 基本的な評価には無料のServer OSS、管理機能の評価には[sales@rustdesk.com](mailto:sales@rustdesk.com)を通じたServer Proの評価 | マネージドサービスを求めるチームにはSaaSトライアル | 直接営業と、範囲を定めたインフラ評価 |

個別の機能を比べる前に、運用モデルを選んでください。サービスの運用をベンダーに任せたいなら、RustDeskを自社で運用する手間とSplashtop SaaSを比較します。インフラの管理権限が必須なら、RustDesk Server ProとSplashtop On-Premを比較してください。SaaSトライアルからはOn-Premについてほとんど何もわからないため、比較の対象にはなりません。

## 比較すべきSplashtop製品を正しく選ぶ

Splashtopの標準的なRemote AccessプランとRemote Supportプランは、ベンダーが運用します。[料金ページ](https://www.splashtop.com/pricing)にはエンタープライズ向け製品の中にOn-Premの選択肢が記載されており、[On-Prem製品ページ](https://www.splashtop.com/products/on-prem)では、DMZまたは企業のファイアウォールの内側に**Splashtop On-Prem Gateway**を設置する構成が説明されています。対応OS、ハードウェアのサイジング、ポートについては、専用の[システム要件](https://support-splashtoponprem.splashtop.com/hc/en-us/articles/360035393074-Splashtop-On-Prem-System-Requirements)があります。

つまりOn-Premは実在する選択肢ですが、すべてのSplashtopサブスクリプションの標準ではなく、直接営業と顧客側のインフラを伴う別個のプロプライエタリ製品です。RustDeskはその反対側から出発しています。Server OSSとServer Proは標準でセルフホストです。Server Proでは、ID/ランデブーサーバー、リレー、コンソール、保存される展開データが自社管理のインフラ上で動き、直接接続のセッションはエンドポイント間を直接流れます。

## オープンソースと信頼モデル

RustDeskの**クライアントとServer OSSはAGPLライセンス**です。セキュリティチームやエンジニアリングチームは、商用ライセンスを買わなくてもコードを読み、クライアントをビルドし、Server OSSを運用できます。**Server Proは商用のプロプライエタリなセルフホスト型サーバーソフトウェア**で、その上に集中管理機能を追加します。Splashtop SaaSとOn-Premはどちらもプロプライエタリで、On-Premが変えるのはサーバーを*どこで*動かすかであり、コードがオープンかどうかではありません。この判断は、次の2つの独立した問いで決まります。

1. サーバー側のサービスを自社管理のインフラ上で動かす必要があるか？ _（On-PremとRustDeskはどちらも「はい」）_
2. ソースコードを確認でき、クライアントを自社でビルドできる必要があるか？ _（「はい」はRustDeskのみ）_

## ライセンスとコスト

RustDeskの標準のServer Proプランは**ログインユーザー数と管理対象デバイス数**で規模が決まり、無制限の同時接続が含まれます。同時接続数を一定数でライセンスするのは[Customized V2](https://rustdesk.com/pricing#custom2)のみです。Splashtopの料金は、要件がRemote Access、Remote Support、Enterprise SaaS、On-Premのどれかによって変わり、EnterpriseとOn-Premは営業主導型です。

技術者数またはログインユーザー数、管理対象エンドポイント数、同時セッション数、実際に必要なID管理・監査・録画機能、サーバー運用といった同じ項目を、日付入りの書面の条件に基づいて両者で比較し、初年度の価格ではなく更新時の費用で試算してください。安い導入価格や他社の過去の見積もりは、自社に必要な展開の費用を示すものではありません。RustDeskの最新の料金は[RustDeskの料金ページ](https://rustdesk.com/pricing)をご覧ください。

## 信頼性に関する報告：頻度ではなくシグナルとして読む

公開されているスレッドの内容は一様ではありません。2025年の[Splashtopコミュニティ](https://www.reddit.com/r/Splashtop_Official/comments/1ltgest/constant_crashing_on_local_win10_computer/)のスレッドにはWindowsクライアントのクラッシュが記録されている一方、2026年の[Ateraのディスカッション](https://www.reddit.com/r/atera/comments/1qucbx3/is_splashtop_just_terrible_for_you_guys/)には、不満の声と、何年も安定して使っているという管理者の報告の両方があります。その中には、単体製品ではなくRMM連携経由で提供されるSplashtopに関するものも含まれています。これらは、導入ベース全体でどの程度問題が起きているかの証拠ではなく、自社のエンドポイント構成、ネットワーク、RMMでのパッケージング、OSバージョンを使ったパイロットで再現すべきシナリオとして扱ってください。

## 実際にテストすべきこと

一般的な機能比較のチェックリストは省き、Splashtopからの移行の成否を実際に左右する項目をテストしてください。

- **リモートオーディオ**とマイクのパススルー。再接続後のオーディオデバイスの挙動を含む。
- **マルチモニター**のレイアウトと、セッション間でモニターの割り当てが維持されるかどうか。
- **モバイルとブラウザ**からのアクセス。どのプラットフォームが*操作する側*になれて、どれが*操作される側*にしかなれないのかを確認し、ブラウザ／WebSocketのセッションはネイティブクライアントとは別に検証する。
- **RMMでのパッケージング**と、本番環境で使っているOSバージョンでの無人展開。
- **直接接続とリレーへのフォールバック**、そして高遅延の環境や制限されたネットワークでの再接続の挙動。
- **ガバナンス**。SSOまたはディレクトリ連携、被操作デバイスの2FA、監査ログ、デバイスグループ、そしてデバイスIDを知っているだけでは自社の認可モデルを回避できないことの確認。Webコンソール、アクセス制御、[LDAP/SSO](https://rustdesk.com/docs/ja/self-host/rustdesk-server-pro/ldap/)はServer Proの機能なので、ガバナンスはServer OSSではなくServer Proの評価環境でテストしてください。

これは、代表的な技術者、エンドポイント、ネットワークの一部を対象とした**並行パイロット**として実施してください。代替製品が必要なワークフローに合格するまで既存製品を稼働させ続け、展開を広げる前にロールバックの判断基準を文書化しておきます。

## RustDeskがより有力な候補となる場合

次のような場合、RustDeskがより有力な候補になります。

- **セルフホストを標準にしたい。** Server OSSとServer Proはどちらも自分で選んだインフラ上で動きます。Splashtopでこれに相当するのは、別ライセンスのOn-Prem製品です。
- **同時接続数で費用を左右されたくない。** Server Proの標準プランはログインユーザー数と管理対象デバイス数でライセンスされ、無制限の同時接続が含まれます。
- **ディレクトリ連携によるサインインが重要。** LDAP/Active DirectoryとOIDCによるSSOはBasicプラン以上で利用できます。
- **無料でパイロットを行い、クライアントを監査したい。** Server OSSにはライセンス料も有効期限もなく、クライアントはソースコードを読んでビルドできます。

RustDeskとSplashtop On-Premの両方に共通する注意点がひとつあります。サーバーのプロビジョニング、セキュリティ確保、監視、バックアップ、更新は自社チームが担います。

## 全社展開を決める前にRustDeskを評価する

まずServer OSSで基本的な接続性を確認し、集中管理によるガバナンスが必要ならServer Proを評価してください。その際は、Splashtopに適用するのと同じエンドポイント、ネットワーク、技術者のワークフロー、受け入れ基準を使います。最新のServer Proの評価条件は[sales@rustdesk.com](mailto:sales@rustdesk.com)までメールでお問い合わせいただくか、[RustDeskの料金ページ](https://rustdesk.com/pricing)をご確認ください。
