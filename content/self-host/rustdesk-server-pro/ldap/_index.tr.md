---
title: LDAP
weight: 17
description: "Sunucu adresi, port, temel DN (base DN), kapsam ve dizin eşleme seçeneklerini belirleyerek RustDesk Server Pro'da LDAP kimlik doğrulamasını yapılandırın."
keywords: ["rustdesk ldap", "rustdesk server pro ldap", "rustdesk ldap kimlik doğrulama", "rustdesk base dn", "rustdesk ldaps"]
---

Merkezi kimlik doğrulama ve kullanıcı araması için RustDesk Server Pro'yu LDAP dizininize bağlamak üzere bu kılavuzu kullanın.

## LDAP, RustDesk Server Pro'da ne işe yarar?

LDAP; her hesap için ayrı yerel kimlik bilgileri yönetmek yerine, RustDesk Server Pro'nun kullanıcıları dizin servisiniz üzerinden doğrulamasını sağlar. İlk başarılı oturum açmada RustDesk, LDAP kimliğini temel alarak kullanıcıyı otomatik olarak oluşturur.

## LDAP kurulum kontrol listesi

1. LDAP ana bilgisayarınızı, portunuzu ve şifreleme modunuzu (`389`, `636` veya StartTLS) belirleyin.
2. Geçerli bir Bind DN ve parolaya sahip bir servis hesabı seçin.
3. Doğru Base DN, kapsam (scope) ve kullanıcı filtresini ayarlayın.
4. `uid` veya `sAMAccountName` gibi doğru kullanıcı adı özniteliğini ayarlayın.
5. Dağıtmadan önce yapılandırmayı RustDesk web konsolunda test edin.

## LDAP hızlı yanıtlar

- RustDesk, ilk başarılı LDAP oturum açma işleminde kullanıcıyı otomatik oluşturur
- Yapılandırmayı gönderdiğinizde konsol LDAP bağlantısını doğrular
- Yerel kullanıcıları LDAP kullanıcılarına dönüştürme henüz desteklenmemektedir
- LDAP grupları henüz desteklenmemektedir

## Yapılandırma
Lütfen aşağıda gösterildiği gibi `LDAP` ayarları sayfasına gidin:

![](/docs/en/self-host/rustdesk-server-pro/ldap/images/ldap.png)

- **LDAP Host:** LDAP sunucusunun ana bilgisayar adı veya IP adresidir. Örneğin `ldap.example.com` veya `192.0.2.1`.

- **LDAP Port:** LDAP sunucusunun dinlediği port numarasıdır. Standart LDAP için varsayılan port `389`, LDAPS (SSL üzerinden LDAP) için `636`'dır.

- **Base DN:** LDAP aramasının başlangıç noktasıdır. Örneğin `dc=example,dc=com`.

- **Scope:** LDAP dizinindeki aramanın kapsamını belirler. `one` (temel DN'nin hemen altındaki girdiler) veya `sub` (temel DN ve altındaki tüm alt girdiler) olabilir.

- **Bind DN / Password:** Servis hesabınızın yönetici kullanıcı adı ve parolasıdır. Bu hesap, diğer kullanıcıların kimliğini doğrulamak üzere LDAP'a bağlanmak için kullanılır. Genellikle `cn=admin,dc=example,dc=com` gibi bir kullanıcı DN'sidir.

- **Filter:** LDAP sorgusu için arama filtresidir. Örneğin `(objectClass=person)` veya `(&(age=28)(!(name=Bob)))`.

- **Username Attribute:** Kullanıcı adını içeren özniteliktir. Örneğin `uid` veya `sAMAccountName`. Varsayılan olarak `uid` ve `cn` kullanır. Bununla ilgili bir [tartışma buradadır](https://github.com/rustdesk/rustdesk-server-pro/issues/140#issuecomment-1916804393).

- **StartTLS:** Bağlantıyı güvenli bir bağlantıya yükseltmek için StartTLS kullanılıp kullanılmayacağını belirler.

- **NoTLSVerify:** TLS sertifikası doğrulamasının atlanıp atlanmayacağını belirler. Ne yaptığınızdan emin olmadığınız sürece bunu `false` (yani sertifika doğrulamasını gerçekleştir) olarak bırakmanız önerilir.

## Nasıl çalışır?
- LDAP girişleri nasıl çalışır (önce yeni bir kullanıcı oluşturulması gerekir mi, RustDesk ilk girişte kullanıcı oluşturur mu)?
  > RustDesk ilk oturum açmada kullanıcıyı otomatik oluşturur.
- LDAP'ın çalışıp çalışmadığı nasıl kontrol edilir?
  > Yapılandırmayı kaydettiğinizde, verdiğiniz binddn/parola ile LDAP sunucunuza bağlanacak ve çalışıp çalışmadığını doğrulayacaktır.
- Yerel kullanıcılar LDAP kullanıcılarına nasıl dönüştürülür?
  > Henüz desteklenmemektedir.
- LDAP grupları destekleniyor mu?
  > Henüz desteklenmemektedir.
