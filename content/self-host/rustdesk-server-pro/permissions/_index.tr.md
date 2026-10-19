---
title: Erişim Kontrolü (Access Control)
weight: 16
description: "Cihazları kullanıcılara veya gruplara atayarak ve yönetilen cihazlara kimin ulaşabileceğini tanımlayarak RustDesk Server Pro'da erişim denetimini yapılandırın."
keywords: ["rustdesk erişim kontrolü", "rustdesk cihaz izinleri", "rustdesk kullanıcı grubu erişimi", "rustdesk server pro izinleri", "rustdesk cihaz atama"]
---

RustDesk Server Pro'da hangi kullanıcıların veya grupların hangi cihazlara bağlanabileceğine karar vermek için Erişim Kontrolünü (Access Control) kullanın.

## RustDesk Server Pro'da Erişim Kontrolü nedir?

Erişim Kontrolü, bir kullanıcının veya grubun bir cihaza erişmesine izin verilip verilmediğini belirler. Bağlantı başladıktan sonra operatörün neler yapabileceğiyle değil, bağlantı kurma yetkisiyle ilgilidir. Oturum içi izinler için [Kontrol Rolü](/docs/tr/self-host/rustdesk-server-pro/control-role/) özelliğini kullanın.

## Erişim Kontrolü hızlı yanıtlar

- Erişim Kontrolü kimin hangi cihazlara bağlanabileceğine karar verir
- Kullanıcı atamaları, cihaz grupları ve gruplar arası erişim ayarları aracılığıyla çalışır
- Bir cihaz tek bir kullanıcıya, tek bir cihaz grubuna veya her ikisine birden atanabilir
- Devre dışı bırakılmış kullanıcılar ve devre dışı bırakılmış cihazlara erişilemez
- Cihaz grubu izinleri ve kullanıcı grubu izinleri erişime izin vermek için birleşebilir

## Önce neyi yapılandırmalısınız?

1. Cihazların nasıl atanacağına karar verin: Doğrudan kullanıcılara, cihaz gruplarına veya her ikisine birden.
2. Kullanıcıların kendi grupları dışındaki cihazlara erişmesi gerekiyorsa kullanıcı grupları için gruplar arası kurallar belirleyin.
3. Grup tabanlı cihaz erişimini yönetmek kullanıcı bazlı atamadan daha kolaysa cihaz grubu kuralları ekleyin.

## Cihaz erişim izinleri

Cihaz tek bir kullanıcıya, tek bir cihaz grubuna veya her ikisine birden atanabilir.

Cihaz bir kullanıcıya atandığında; o kullanıcı, bir kullanıcı grubu veya uygun gruplar arası ayarlar aracılığıyla erişilebilir.

Cihaz bir cihaz grubuna atandığında, kullanıcı-cihaz grupları arası ayarlar aracılığıyla erişilebilir.

Bir cihazı bir kullanıcıya atamanın üç yolu vardır:
- Konsol cihaz sayfası üzerinden
- İstemci tarafında belirtilen kullanıcı hesabıyla oturum açarak
- Komut satırından atama yaparak
  
Bir cihazı bir cihaz grubuna atamanın iki yolu vardır:
- Konsol cihaz sayfası üzerinden
- Komut satırından atama yaparak

Aşağıdaki iki durum cihazın erişilmesini engeller:
- Konsol cihaz sayfasında cihazı `devre dışı` (disable) yapmak
- Konsol kullanıcı sayfasında kullanıcıyı `devre dışı` (disable) yapmak

## Kullanıcı Grubu Erişim Ayarları

Lütfen web konsolundaki gruplar sayfasına gidin, gruplar arası ayarları aşağıdaki gibi düzenlemek için `Düzenle`'ye tıklayın.

`Diğer gruplarla erişim` ayarında yaptığınız değişiklikler, `Tamam` düğmesine tıklamanıza gerek kalmadan hemen geçerli olur.

Hem `Şunlara erişebilir` hem de `Şunlardan erişilebilir` neredeyse aynı işleve hizmet eder, kolaylığınız için her iki seçeneği de sunuyoruz.

{{% notice note %}}
Kontrol eden tarafa atanan kullanıcı ve grup, web konsolundan atanan kullanıcı yerine oturum açan kullanıcı tarafından belirlenir. Bunu bu şekilde tasarladık çünkü iOS istemcisi ve web istemcisi gibi bazı kontrol eden tarafların bir cihaz kimliği (ID) yoktur.
{{% /notice %}}

![](/docs/en/self-host/rustdesk-server-pro/permissions/images/crossgrp.png)

## Cihaz Grubu Erişim Ayarları

Cihaz grupları erişim izinlerini yönetmek için başka bir yol sağlar. İşte temel kurallar:

1. Bir cihaz yalnızca bir cihaz grubuna eklenebilir
2. Cihaz gruplarına kullanıcılar veya kullanıcı grupları için erişim izinleri ayarlayabilirsiniz. Bu izinler, kullanıcı grubu erişim izinleriyle kümülatiftir; yani kullanıcı grubu izinleri veya cihaz grubu izinlerinden herhangi biri izin veriyorsa erişim sağlanır.
3. Atanmamış bir cihaz bir cihaz grubuna eklendiğinde artık "atanmamış" olarak kabul edilmez

{{% notice note %}}
Cihaz grubu özelliği RustDesk istemcisi >= 1.3.8 ve RustDesk Server Pro >= 1.5.0 gerektirir
{{% /notice %}}
