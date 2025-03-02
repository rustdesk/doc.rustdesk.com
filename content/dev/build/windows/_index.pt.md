---
title: Windows
weight: 20
---

{{% notice note %}}
Os comandos de linha de comando aqui devem ser executados no Git Bash, não no prompt de comando, ou você obterá erros de sintaxe.
{{% /notice %}}

### Dependências

#### Ambiente de desenvolvimento C++

Baixe o [MSVC](https://visualstudio.microsoft.com/) e instale-o.
Selecione `Windows` como SO da máquina do desenvolvedor e marque `C++`, depois baixe a versão Visual Studio Community e instale-a. A instalação pode demorar um pouco.

#### Ambiente de desenvolvimento Rust

Baixe o [rustup-init.exe](https://static.rust-lang.org/rustup/dist/x86_64-pc-windows-msvc/rustup-init.exe) e execute-o como administrador para instalar o `rust`.

#### vcpkg

Vá para a pasta onde deseja clonar o vcpkg e use o [Git Bash](https://git-scm.com/download/win) para executar os seguintes comandos: baixe o `vcpkg`, instale a versão de 64 bits do `libvpx`, `libyuv` e `opus`.
Se você não tem o `Git` instalado, baixe-o [aqui](https://git-scm.com/download/win).

```sh
git clone https://github.com/microsoft/vcpkg
vcpkg/bootstrap-vcpkg.bat
export VCPKG_ROOT=$PWD/vcpkg
vcpkg/vcpkg install libvpx:x64-windows-static libyuv:x64-windows-static opus:x64-windows-static aom:x64-windows-static
```

Adicione a variável de ambiente do sistema `VCPKG_ROOT`=`<caminho>\vcpkg`. O `<caminho>` deve ser o local que você escolheu acima para clonar o `vcpkg`.

![](/docs/en/dev/build/windows/images/env.png)

#### Sciter

As versões para desktop usam o [Sciter](https://sciter.com/) para a interface gráfica. Faça o download do [sciter.dll](https://raw.githubusercontent.com/c-smile/sciter-sdk/master/bin.win/x64/sciter.dll).

#### LLVM

`rust-bindgen` depende do `clang`. Faça o download do [LLVM](https://github.com/llvm/llvm-project/releases) e instale-o. Em seguida, adicione a variável de ambiente do sistema `LIBCLANG_PATH`=`<diretório_instalação_llvm>/bin`.

Você pode baixar a versão 15.0.2 dos binários do LLVM aqui: [64 bits](https://github.com/llvm/llvm-project/releases/download/llvmorg-15.0.2/LLVM-15.0.2-win64.exe) / [32 bits](https://github.com/llvm/llvm-project/releases/download/llvmorg-15.0.2/LLVM-15.0.2-win32.exe).

### Compilação

#### Padrão

```sh
git clone --recurse-submodules https://github.com/rustdesk/rustdesk
cd rustdesk
mkdir -p target/debug
wget https://raw.githubusercontent.com/c-smile/sciter-sdk/master/bin.win/x64/sciter.dll
mv sciter.dll target/debug
cargo run
```
