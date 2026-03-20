---
title: Windows
weight: 20
description: "Documentación de RustDesk sobre Windows. Consulta guías de instalación, configuración, despliegue y solución de problemas."
keywords: ["build rustdesk windows", "rustdesk windows build", "rustdesk vcpkg windows", "rustdesk sciter dll", "rustdesk llvm libclang"]
---

## ¿Que necesitas antes de compilar en Windows?

Para compilar RustDesk en Windows necesitas la toolchain C++ de Visual Studio, Rust, `vcpkg`, `sciter.dll` y LLVM con `LIBCLANG_PATH` configurado correctamente. Ejecuta los comandos en Git Bash para que la sintaxis y las variables de entorno funcionen como estan documentadas.

## Checklist de compilacion en Windows

- Instala Visual Studio con la carga de trabajo de C++.
- Instala Rust con `rustup-init.exe`.
- Clona e inicializa `vcpkg` y configura `VCPKG_ROOT`.
- Descarga `sciter.dll` para la interfaz de escritorio.
- Instala LLVM y apunta `LIBCLANG_PATH` a su directorio `bin`.
- Clona RustDesk y ejecuta los pasos de compilacion predeterminados en Git Bash.

{{% notice note %}}
Los comandos de línea de comandos aquí deben ejecutarse en Git Bash, no en el símbolo del sistema o obtendrá errores de sintaxis.
{{% /notice %}}

## Dependencias

### Entorno de compilación C++

Descargar [MSVC](https://visualstudio.microsoft.com/) e instalar.
Seleccione `Windows` como SO de máquina de desarrollador y marque `C++`, luego descargue la versión Visual Studio Community e instale. La instalación puede tardar un tiempo.

### Entorno de desarrollo Rust

Descargue [rustup-init.exe](https://static.rust-lang.org/rustup/dist/x86_64-pc-windows-msvc/rustup-init.exe) y ejecútelo como administrador para instalar `rust`.

### vcpkg

Vaya a la carpeta donde desea clonar vcpkg y use [Git Bash](https://git-scm.com/download/win) para ejecutar los siguientes comandos, descargue `vcpkg`, instale la versión de 64 bits de `libvpx`, `libyuv` y `opus`.
Si no tiene `Git` instalado, obtenga `Git` [aquí](https://git-scm.com/download/win).

```sh
git clone https://github.com/microsoft/vcpkg
vcpkg/bootstrap-vcpkg.bat
export VCPKG_ROOT=$PWD/vcpkg
vcpkg/vcpkg install libvpx:x64-windows-static libyuv:x64-windows-static opus:x64-windows-static aom:x64-windows-static
```

Agregar variable de entorno del sistema `VCPKG_ROOT`=`<path>\vcpkg`. El `<path>` debe ser la ubicación que eligió arriba para clonar `vcpkg`.

![](/docs/en/dev/build/windows/images/env.png)

### Sciter

Las versiones de escritorio usan [Sciter](https://sciter.com/) para GUI, por favor descargue [sciter.dll](https://raw.githubusercontent.com/c-smile/sciter-sdk/master/bin.win/x64/sciter.dll).

### LLVM

`rust-bindgen` depende de `clang`, descargue [LLVM](https://github.com/llvm/llvm-project/releases) e instale, agregue la variable de entorno del sistema `LIBCLANG_PATH`=`<llvm_install_dir>/bin`.

Puede descargar la versión 15.0.2 de los binarios de LLVM aquí: [64 bit](https://github.com/llvm/llvm-project/releases/download/llvmorg-15.0.2/LLVM-15.0.2-win64.exe) / [32 bit](https://github.com/llvm/llvm-project/releases/download/llvmorg-15.0.2/LLVM-15.0.2-win32.exe).

## Construir

### Por defecto

```sh
git clone --recurse-submodules https://github.com/rustdesk/rustdesk
cd rustdesk
mkdir -p target/debug
wget https://raw.githubusercontent.com/c-smile/sciter-sdk/master/bin.win/x64/sciter.dll
mv sciter.dll target/debug
cargo run
```
