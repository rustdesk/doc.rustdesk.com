---
title: macOS
weight: 21
description: "Homebrew, vcpkg, Rust ve Sciter ya da Flutter ile macOS'ta RustDesk derleyin. Masaüstü derlemeleri için araç zinciri kurulumu, bağımlılıklar ve paketleme akışı."
keywords: ["rustdesk macos derleme", "rustdesk mac derleme", "rustdesk sciter mac", "rustdesk flutter macos derleme", "rustdesk vcpkg macos"]
---

`Xcode`, `Homebrew`, `vcpkg`, Rust ve Sciter ya da Flutter masaüstü yığını ile macOS üzerinde RustDesk derlemek için bu kılavuzu kullanın.

Bunu yapmanın birden çok yolu vardır; bu kılavuz `Xcode`, `Git` ve `Homebrew` araçlarının sisteminizde zaten kurulu olduğunu varsayar.

## Hangi macOS derleme yolunu kullanmalısınız?

| İhtiyaç | En İyi Yol |
| --- | --- |
| Geleneksel masaüstü arayüzünü derlemek | Sciter |
| Yeni nesil masaüstü yığınını derlemek | Flutter |
| Ortak yerel bağımlılıkları hazırlamak | Homebrew + `vcpkg` + Rust |

## macOS derleme kontrol listesi

- `Xcode`, `Git` ve `Homebrew`'un kurulu olduğunu doğrulayın.
- Homebrew'dan gerekli paketleri yükleyin.
- `vcpkg` deposunu klonlayıp bootstrap edin, ardından `VCPKG_ROOT` değişkenini export edin.
- `rustup` ile Rust'ı kurun ve yapılandırın.
- RustDesk kaynak deposunu ve alt modüllerini klonlayın.
- Derlemeden önce Sciter çalışma zamanını veya Flutter araç zincirini ekleyin.

En büyük zorluk muhtemelen birlikte sorunsuz çalışan araç sürümlerini bulmaktır; özellikle Xcode ve LLVM gibi araç zinciri parçaları macOS sürümünüze bağlıdır. Bu kılavuzda kullanılan sürümler doğrudan sizin kullanmanız gereken sürümler olmayabilir. Hangi sürümleri kullanacağınızı belirlemek için iyi bir başlangıç noktası, derlemek istediğiniz RustDesk sürümünün [GitHub derleme iş akışını](https://github.com/rustdesk/rustdesk/blob/master/.github/workflows/flutter-build.yml) incelemektir. Ancak GitHub çalıştırıcısında bulunan araçlar yerel sisteminizdekilerle birebir aynı olmayabilir.

### Export
`export`, çeşitli ortam değişkenlerini ayarlamak için kullanılır. `export` çalıştırdığınızda o değişken yalnızca geçerli terminal oturumu için ayarlanır; bu nedenle RustDesk'i derlemek için açacağınız her yeni terminal penceresinde tekrarlanmalıdır. Genellikle tüm `export` komutlarını her terminal açıldığında otomatik olarak çalıştırılan bir betiğe (örneğin `~/.bash_profile`) eklemek tercih edilir.

## Kullanacağımız araçları Homebrew ile yükleyin

```sh
brew install python3 create-dmg nasm cmake gcc wget ninja pkg-config wget rustup
```

Hedef klasörlerden bazıları sisteminizde bulunmadığından bazı yüklemeler başarısız olabilir. Bu durumda klasörü oluşturun, sahip ve izinleri ayarlayın ve `brew` komutunu tekrar çalıştırın. Örneğin `/usr/local/include` mevcut değilse:
```sh
sudo mkdir /usr/local/include
sudo chown <username>:admin /usr/local/include
sudo chmod 775 /usr/local/include
```

## vcpkg Kurulumu
Vcpkg, RustDesk tarafından kullanılan C/C++ bağımlılıklarını yönetmek için kullanılır. Kurulumun nerede olmasını istediğinize karar verin ve `vcpkg` klasörünün bulunmasını istediğiniz dizinden aşağıdaki komutları çalıştırın. Bu örnekte `/Users/<username>/repos/` konumu ve `2023.04.15` sürüm etiketi kullanılmıştır.

```sh
git clone https://github.com/microsoft/vcpkg
cd vcpkg
git checkout 2023.04.15
./bootstrap-vcpkg.sh -disableMetrics
./vcpkg install libvpx libyuv opus aom
export VCPKG_ROOT=~/repos/vcpkg
```

## Rust Kurulumu ve Yapılandırması
Rust'ı yönetmek için yukarıda Homebrew ile kurulan `rustup` aracını kullanıyoruz. Ancak yine de yapılandırılması gerekir. Talimatları izleyin ve hem `rustup` hem de `rustc` araçlarının `PATH` üzerinde olduğundan emin olun. Bu örnekte Rust sürümü `1.75.0` kullanılmıştır:

```sh
rustup-init
rustup default 1.75.0
rustup component add rustfmt
```
Yüklü ve varsayılan Rust araç zincirlerine genel bakış için `rustup show` komutunu çalıştırın.

## RustDesk kaynak dosyalarını indirin

RustDesk kaynak dosyalarının nerede durmasını istediğinize karar verin ve aşağıdaki komutları çalıştırın:

```sh
git clone --recurse-submodules https://github.com/rustdesk/rustdesk
cd rustdesk/libs/portable/
python3 -m pip install --upgrade pip
pip3 install -r requirements.txt
```

Eğer `python3` veya `pip` komutları tanınmıyorsa, gerçek klasör adlarını kullanarak bunları `PATH` değişkenine ekleyin:
```sh
export PATH=~/Library/Python/3.9/bin:$PATH
```
Ardından başarısız olan komutları tekrar çalıştırın. `~/.bash_profile` dosyasını da güncellemeyi unutmayın.

## Kullanıcı arayüzü bileşenlerini kurun
RustDesk hem [Sciter](https://sciter.com/) hem de [Flutter](https://flutter.dev/) kullanılarak derlenebilir. İkisi de ek bileşenler gerektirir.

### Sciter

`rustdesk` klasöründen şu komutu çalıştırın:
```sh
wget https://github.com/c-smile/sciter-sdk/raw/master/bin.osx/libsciter.dylib
```

### Flutter

[FVM](https://fvm.app/), hangi Flutter sürümünün kullanılacağını yönetmenizi sağlar ve farklı sürümleri denemenin en kolay yoludur.

```sh
brew tap leoafarias/fvm
brew install fvm cocoapods
```
Örneğin Flutter `3.16.9` sürümünü kurup kullanmak için:

```sh
fvm global 3.16.9
```
FVM tarafından sağlanan varsayılan Flutter konumunu `PATH` yolunuza ekleyin:

```sh
export PATH=$HOME/fvm/default/bin:$PATH
```

Bunu yaptıktan sonra telemetriyi devre dışı bırakıp her şeyin yolunda olup olmadığını kontrol edin:

```sh
flutter --disable-analytics
dart --disable-analytics
flutter doctor -v
```
Önemli olan kullanmayı düşündüğünüz ortamın (`Xcode`) sorunsuz doğrulanmasıdır. Bir sorun bildirilirse devam etmeden önce çözün.

Flutter hazır olduğunda Rust ve Flutter'ı birbirine bağlayan köprüyü kurma zamanı gelmiştir (bu örnekte `1.80.1` kullanılmıştır):

```sh
cargo install flutter_rust_bridge_codegen --version "1.80.1" --features "uuid"
```

## Derleme

Derlemeyi `rustdesk` klasöründen yapın. Sciter sürümünü derlemek için:

```sh
python3 ./build.py
```

Flutter sürümünü derlemek için:
```sh
flutter_rust_bridge_codegen --rust-input ./src/flutter_ffi.rs --dart-output ./flutter/lib/generated_bridge.dart --c-output ./flutter/macos/Runner/bridge_generated.h
python3 ./build.py --flutter
```
Her şey yolunda giderse `rustdesk` klasörünüzde yüklenmeye hazır bir `dmg` dosyası oluşacaktır.
