---
title: MSI
weight: 49
description: "Sessiz dağıtım için MSI paketi ve komut satırı parametreleri ile RustDesk'i Windows'a kurun. msiexec ile kurulum klasörü, kısayollar, yazıcı desteği ve yükseltme seçeneklerini öğrenin."
keywords: ["rustdesk msi", "rustdesk sessiz kurulum", "rustdesk msiexec", "rustdesk windows msi", "rustdesk installfolder", "rustdesk yazıcı kurulumu"]
---

`msiexec` ve yükleme parametreleri ile sessiz bir Windows dağıtımına ihtiyaç duyduğunuzda RustDesk MSI paketini kullanın.

MSI paketi sessiz kurulum için komut satırı parametrelerini destekler.

## MSI paketini ne zaman kullanmalısınız?

`msiexec`, yönetilen paketleme araçları veya sessiz kurulum iş akışları aracılığıyla standart Windows yazılım dağıtımına ihtiyaç duyduğunuzda MSI paketini kullanın. Hali hazırda MSI tabanlı dağıtım ve yükseltme süreçlerini kullanan kurumsal ortamlar için en uygun seçenektir.

## MSI hızlı yanıtlar

- MSI, sessiz Windows dağıtımı için en iyisidir.
- Kurulum yolu, kısayol davranışı ve yazıcı kurulumunu parametrelerle ayarlayabilirsiniz.
- Yükseltmeler önceki kurulum ayarlarını yeniden kullanabilir.
- `2024-08-05` öncesi sürümlerde sessiz kurulum ve onarım sorunları olabilir.
- Ayrıntılı bir kurulum günlüğüne ihtiyaç duyduğunuzda `/l*v install.log` parametresini kullanın.

## Parametreler

## INSTALLFOLDER

Kurulum klasörü.

**Varsayılan**: `[ProgramFiles6432Folder]\[app name]`, genellikle `C:\Program Files\[app name]`.

## CREATESTARTMENUSHORTCUTS

Başlat menüsü kısayolunun oluşturulup oluşturulmayacağı.

**Varsayılan**:
1. İlk kurulum: Varsayılan olarak `1`.
2. Yükseltme: En son yüklenen seçenekler varsayılandır.

| No | Değer | Açıklama |
| :---: | :---: | :---: |
| 1 | `1` | Evet |
| 2 | `0` | Hayır |
| 3 | `Y` | Evet, `1` ile aynı |
| 4 | `N` | Hayır, `0` ile aynı |

## CREATEDESKTOPSHORTCUTS

Masaüstü kısayolunun oluşturulup oluşturulmayacağı.

**Varsayılan**:
1. İlk kurulum: Varsayılan olarak `1`.
2. Yükseltme: En son yüklenen seçenekler varsayılandır.

| No | Değer | Açıklama |
| :---: | :---: | :---: |
| 1 | `1` | Evet |
| 2 | `0` | Hayır |
| 3 | `Y` | Evet, `1` ile aynı |
| 4 | `N` | Hayır, `0` ile aynı |

## INSTALLPRINTER

Yazıcı kurulup kurulmayacağı. Yazıcı, kontrol edilen tarafın yazdırma işlerini yerel olarak yürütmek için kullanılır.

`1.3.9` sürümünden itibaren.

**Varsayılan**:
1. İlk kurulum: Varsayılan olarak `1`.
2. Yükseltme: En son yüklenen seçenekler varsayılandır.

| No | Değer | Açıklama |
| :---: | :---: | :---: |
| 1 | `1` | Evet |
| 2 | `0` | Hayır |
| 3 | `Y` | Evet, `1` ile aynı |
| 4 | `N` | Hayır, `0` ile aynı |

# Örnekler

**Dikkat**: `2024-08-05` tarihinden önceki sürümlerde sessiz kurulum ve onarım ile ilgili sorunlar bulunmaktadır. Lütfen önce mevcut sürümü kaldırın, ardından kurun.

## Kurulum parametreleri ile kurulum

Sessiz kurulum, yükleme yolunu belirleme, masaüstü kısayolu oluşturmama, başlat menüsü kısayolu oluşturma:

```
msiexec /i RustDesk-1.msi /qn INSTALLFOLDER="D:\Program Files\RustDesk" CREATESTARTMENUSHORTCUTS="Y" CREATEDESKTOPSHORTCUTS="N" INSTALLPRINTER="N" /l*v install.log
```

**Not**: `/l*v install.log`, yürütme günlüğünün `install.log` dosyasına yazdırılması anlamına gelir.

## Parametresiz yükseltme

Önceki kurulum yolu ve kurulum seçenekleriyle yükseltme yapın:

```
msiexec /i RustDesk-2.msi /qn /l*v install.log
```

## Kurulum seçeneklerini değiştirerek yükseltme

```
msiexec /i RustDesk-1.msi /qn INSTALLFOLDER="C:\Program Files\RustDesk" CREATESTARTMENUSHORTCUTS="N" CREATEDESKTOPSHORTCUTS="N" INSTALLPRINTER="N" /l*v install.log
```
