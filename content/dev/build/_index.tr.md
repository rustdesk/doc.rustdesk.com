---
title: Derleme
weight: 1
description: "RustDesk'i kaynaktan derleyin ve paketleyin. Desteklenen masaüstü platformları için geliştirici odaklı derleme kılavuzlarına buradan başlayın."
keywords: ["rustdesk derleme", "rustdesk kaynak derleme", "rustdesk paketleme", "rustdesk geliştirici derleme kılavuzu"]
---

Masaüstü platformları için RustDesk'i kaynaktan derlemek veya paketlemek istediğinizde bu kılavuzları kullanın. Masaüstü sürümünü paketlemek için [build.py](https://github.com/rustdesk/rustdesk/blob/master/build.py) dosyasını inceleyin.

## Derleme bölümü neleri kapsar?

Derleme bölümü; Linux, Windows ve macOS için masaüstü geliştirici ortamı kurulumunu kapsar. Bağımlılık kurulumu, `vcpkg` yapılandırması, Rust araç zincirinin hazırlanması ve son derleme veya paketleme komutları için platforma özel kılavuzu kullanın.

## Hangi derleme kılavuzunu seçmelisiniz?

| Platform | Kılavuz |
| --- | --- |
| Linux | [Linux](/docs/tr/dev/build/linux/) |
| Windows | [Windows](/docs/tr/dev/build/windows/) |
| macOS | [macOS](/docs/tr/dev/build/osx/) |
| Windows Sorun Giderme | [Windows için SSS](/docs/tr/dev/build/faq/) |

{{% children depth="3" showhidden="true" %}}
