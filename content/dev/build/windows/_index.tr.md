---
title: Windows
weight: 20
description: "MSVC, Rust, vcpkg, Sciter ve LLVM ile Windows'ta RustDesk derleyin. Masaüstü uygulamasını kaynaktan derlemeden önce gerekli araç zinciri kurulumu."
keywords: ["rustdesk windows derleme", "rustdesk windows derleme rehberi", "rustdesk vcpkg windows", "rustdesk sciter dll", "rustdesk llvm libclang"]
---

MSVC araç zincirini, Rust, `vcpkg`, Sciter ve LLVM'yi hazırlayarak Windows üzerinde RustDesk derlemek için bu kılavuzu kullanın.

{{% notice note %}}
Sözdizimi hatası almamak için buradaki komut satırı komutları komut istemi (cmd) yerine Git Bash üzerinde çalıştırılmalıdır.
{{% /notice %}}

## Windows'ta derlemeden önce nelere ihtiyacınız var?

Windows üzerinde RustDesk derlemek için bir Visual Studio C++ araç zinciri, Rust, `vcpkg`, `sciter.dll` ve `LIBCLANG_PATH` tanımlanmış LLVM gerekir. Örneklerin ve ortam değişkeni sözdiziminin yazıldığı gibi çalışması için kabuk komutlarını Git Bash üzerinden çalıştırın.

## Windows derleme kontrol listesi

- C++ iş yükü ile Visual Studio'yu yükleyin.
- `rustup-init.exe` aracılığıyla Rust'ı kurun.
- `vcpkg` deposunu klonlayıp bootstrap edin, ardından `VCPKG_ROOT` değişkenini ayarlayın.
- Masaüstü arayüzü için `sciter.dll` dosyasını indirin.
- LLVM'yi kurun ve `LIBCLANG_PATH` değişkenini `bin` dizinine yönlendirin.
- RustDesk'i klonlayın ve varsayılan derleme adımlarını Git Bash içinde çalıştırın.

## Bağımlılıklar

### C++ derleme ortamı

[MSVC](https://visualstudio.microsoft.com/) indirin ve kurun.
Geliştirici makine işletim sistemi olarak `Windows`'u seçin ve `C++` kutusunu işaretleyin, ardından Visual Studio Community sürümünü indirip kurun. Kurulum biraz zaman alabilir.

### Rust geliştirme ortamı

[rustup-init.exe](https://static.rust-lang.org/rustup/dist/x86_64-pc-windows-msvc/rustup-init.exe) dosyasını indirin ve `rust` kurmak için yönetici olarak çalıştırın.

### vcpkg

vcpkg'yi klonlamak istediğiniz klasöre gidin ve aşağıdaki komutları çalıştırmak, `vcpkg` indirmek, `libvpx`, `libyuv` ve `opus` bileşenlerinin 64 bit sürümlerini yüklemek için [Git Bash](https://git-scm.com/download/win) kullanın.

```sh
git clone https://github.com/microsoft/vcpkg
vcpkg/bootstrap-vcpkg.bat
export VCPKG_ROOT=$PWD/vcpkg
vcpkg/vcpkg install libvpx:x64-windows-static libyuv:x64-windows-static opus:x64-windows-static aom:x64-windows-static
```

Sistem ortam değişkenine `VCPKG_ROOT`=`<yol>\vcpkg` ekleyin. `<yol>`, `vcpkg` klonlamak için yukarıda seçtiğiniz konum olmalıdır.

![](/docs/en/dev/build/windows/images/env.png)

### Sciter

Masaüstü sürümleri GUI için [Sciter](https://sciter.com/) kullanır, lütfen [sciter.dll](https://raw.githubusercontent.com/c-smile/sciter-sdk/master/bin.win/x64/sciter.dll) dosyasını indirin.

### LLVM

`rust-bindgen` bileşeni `clang`'e bağımlıdır, [LLVM](https://github.com/llvm/llvm-project/releases) indirip kurun ve `LIBCLANG_PATH`=`<llvm_kurulum_dizini>/bin` sistem ortam değişkenini ekleyin.

LLVM 15.0.2 ikili dosyalarını buradan indirebilirsiniz: [64 bit](https://github.com/llvm/llvm-project/releases/download/llvmorg-15.0.2/LLVM-15.0.2-win64.exe) / [32 bit](https://github.com/llvm/llvm-project/releases/download/llvmorg-15.0.2/LLVM-15.0.2-win32.exe).

## Derleme

### Varsayılan

```sh
git clone --recurse-submodules https://github.com/rustdesk/rustdesk
cd rustdesk
mkdir -p target/debug
wget https://raw.githubusercontent.com/c-smile/sciter-sdk/master/bin.win/x64/sciter.dll
mv sciter.dll target/debug
cargo run
```
