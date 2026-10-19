---
title: Synology
weight: 22
description: "Synology NAS üzerinde RustDesk Server OSS barındırın. DSM 6 veya DSM 7.2 Container Manager için doğru kılavuzu seçin ve desteklenen modellerde Docker ile kurun."
keywords: ["rustdesk synology", "rustdesk nas", "rustdesk synology docker", "rustdesk dsm 7.2", "rustdesk synology container manager"]
---

DSM 6 veya DSM 7.2 Container Manager çalıştıran bir NAS üzerinde RustDesk Server OSS'i barındırmak için bu Synology kılavuzlarını kullanın.

Synology iki tür Docker paketine sahiptir: "Docker" ve "Container Manager". DSM 7.2 ve daha yenisini kullanıyorsanız lütfen DSM 7.2 kılavuzunu izleyin; daha eski bir sistemdeyseniz DSM 6 kılavuzunu takip edin.

## Hangi Synology kılavuzunu seçmelisiniz?

| Platform sürümü | En İyi Kılavuz |
| --- | --- |
| DSM 7.2 ve üzeri | [Synology DSM 7.2](/docs/tr/self-host/rustdesk-server-oss/synology/dsm-7/) |
| Eski Docker paketini kullanan eski Synology sistemleri | [Synology DSM 6](/docs/tr/self-host/rustdesk-server-oss/synology/dsm-6/) |

## Synology dağıtım kontrol listesi

1. NAS cihazınızın DSM 6 mı yoksa DSM 7.2+ mı çalıştırdığını doğrulayın.
2. Bu DSM sürümü için doğru Docker veya Container Manager paketini kurun.
3. Bu paket için eşleşen RustDesk dağıtım kılavuzunu izleyin.
4. Gerekli RustDesk portlarını açın ve konteyner verileri için kalıcı depolamayı doğrulayın.

Synology'yi Portainer ile kullanıyorsanız lütfen [bu eğitime](https://mariushosting.com/how-to-install-rustdesk-on-your-synology-nas/) bakın.

{{% children depth="3" showhidden="true" %}}
