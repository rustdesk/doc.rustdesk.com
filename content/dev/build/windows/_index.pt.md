---
title: Windows  
weight: 20
---

{{% notice note %}}
Os comandos de linha de comando aqui devem ser executados no Git Bash, não no prompt de comando, ou você receberá erros de sintaxe.
{{% /notice %}}

### Dependências

#### Ambiente de compilação C++

Baixe [MSVC](https://visualstudio.microsoft.com/) e instale.
Selecione `Windows` como SO da máquina de desenvolvimento e marque `C++`, depois baixe a versão Visual Studio Community e instale. A instalação pode demorar um pouco.

#### Ambiente de desenvolvimento Rust

Baixe [rustup-init.exe](https://static.rust-lang.org/rustup/dist/x86_64-pc-windows-msvc/rustup-init.exe) e execute como administrador para instalar `rust`.

#### vcpkg

Vá para a pasta onde você quer clonar o vcpkg e use [Git Bash](https://git-scm.com/download/win) para executar os seguintes comandos, baixar `vcpkg`, instalar versão 64-bit de `libvpx`, `libyuv` e `opus`.
Se você não tem `Git` instalado, obtenha o `Git` [aqui](https://git-scm.com/download/win).

```sh
git clone https://github.com/microsoft/vcpkg
vcpkg/bootstrap-vcpkg.bat
export VCPKG_ROOT=$PWD/vcpkg
vcpkg/vcpkg install libvpx:x64-windows-static libyuv:x64-windows-static opus:x64-windows-static aom:x64-windows-static
```

Adicione variável de ambiente do Sistema `VCPKG_ROOT`=`<path>\vcpkg`. O `<path>` deve ser a localização que você escolheu acima para clonar `vcpkg`.

![](/docs/en/dev/build/windows/images/env.png)

#### Sciter

As versões desktop usam [Sciter](https://sciter.com/) para GUI, por favor baixe [sciter.dll](https://raw.githubusercontent.com/c-smile/sciter-sdk/master/bin.win/x64/sciter.dll).

#### LLVM

`rust-bindgen` depende de `clang`, baixe [LLVM](https://github.com/llvm/llvm-project/releases) e instale, adicione variável de ambiente do Sistema `LIBCLANG_PATH`=`<llvm_install_dir>/bin`.

Você pode baixar a versão 15.0.2 dos binários LLVM aqui: [64 bit](https://github.com/llvm/llvm-project/releases/download/llvmorg-15.0.2/LLVM-15.0.2-win64.exe) / [32 bit](https://github.com/llvm/llvm-project/releases/download/llvmorg-15.0.2/LLVM-15.0.2-win32.exe).

### Compilar

#### Padrão

```sh
git clone --recurse-submodules https://github.com/rustdesk/rustdesk
cd rustdesk
mkdir -p target/debug
wget https://raw.githubusercontent.com/c-smile/sciter-sdk/master/bin.win/x64/sciter.dll
mv sciter.dll target/debug
cargo run
```