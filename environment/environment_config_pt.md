# Configuração do Ambiente para Build

## Dependencias

- C++ build environment
- Rust develop environment
- vcpkg
- sciter
- Python
- llvm (Versão 10.0.0)
- Dart
- Flutter ( V3.0.5 )

### C++ build environment

Instalar o C++ build caso não tenha o visual studio code instalado na maquina.

Link para o C++ Build 

- [https://visualstudio.microsoft.com/pt-br/](https://visualstudio.microsoft.com/pt-br/)

### Rust develop environment

Link para Instalar o Rust

Obs: Exige permissão de administrador para ser instalado e configurado

- [https://www.rust-lang.org/tools/install](https://www.rust-lang.org/tools/install)

### vcpkg

Instale o vcpkg para instalar as dependencias do sciter

Link para baixar o vcpkg

- [https://github.com/microsoft/vcpkg](https://github.com/microsoft/vcpkg)

Para instalar e configurar o vcpkg siga os passos abaixo:

1. Baixe o vcpkg
2. Abra o powershell como administrador
3. Execute o comando abaixo para fazer o clone do repositório do vcpkg

```bash

git clone https://github.com/microsoft/vcpkg
git checkout 2021.12.01

```

Após fazer o clone do repositório, navegue até a pasta do vcpkg e execute o comando abaixo para instalar o vcpkg

```bash
vcpkg/bootstrap-vcpkg.bat
```

Crie uma variável de ambiente no windows com o seguinte conteúdo:

| Nome da variável | Conteúdo |
| --- | --- |
| VCPKG_ROOT | Caminho para o local onde foi feito o clone do repositório Ex: ( C:\Users\seu_usuario\vcpkg ) |

Execute o comando abaixo para instalar as dependencias e habilitar o vcpgk

```bash
vcpkg/vcpkg install libvpx:x64-windows-static libyuv:x64-windows-static opus:x64-windows-static
```

### sciter

Link do Sciter

- [https://sciter.com/](https://sciter.com/)

Link da DLL do Sciter

- [Sciter DLL](https://raw.githubusercontent.com/c-smile/sciter-sdk/master/bin.win/x64/sciter.dll)

Copie a DLL do sciter para

```bash

...{Raiz do Projeto Rustdesk}.../target/debug
...{Raiz do Projeto Rustdesk}.../target/release

```

### Python

Obs:

- Baixe e instale seguindo as recomendações e aceite todas as opções.
- Ao final ele vai pedir para desabilitar o limite de tamanho dos paths, aceite e finalize a instalação
- Ao final da instalação vá na pasta em que o mesmo foi instalado, faça uma cópia dos executáveis python.exe e pip.exe
- Renomei as copias para python3.exe e pip3.exe respectivamente.

Link para baixar o Python

- [https://www.python.org/downloads/](https://www.python.org/downloads/)

### lvvm

Link para baixar o llvm (10)

- [https://releases.llvm.org/download.html](https://releases.llvm.org/download.html)
- [https://github.com/llvm/llvm-project/releases/download/llvmorg-10.0.0/LLVM-10.0.0-win64.exe](https://github.com/llvm/llvm-project/releases/download/llvmorg-10.0.0/LLVM-10.0.0-win64.exe)

Link para baixar o llvm (15)

- [https://github.com/llvm/llvm-project/releases](https://github.com/llvm/llvm-project/releases)

### Dart/Flutter

Obs: Versão 3.0.5

- [https://storage.googleapis.com/flutter_infra_release/releases/stable/windows/flutter_windows_3.0.5-stable.zip](https://storage.googleapis.com/flutter_infra_release/releases/stable/windows/flutter_windows_3.0.5-stable.zip)

## Finalizando a configuração

Para finalizar a instalação rode os comandos abaixo

```bash
cargo run
cargo build --release
```

Pronto, se não ocorreu nenhum problema até aqui, você está no caminho certo.

## Executar o projeto flutter (A cereja do bolo)

Na raiz do projeto flutter crie um arquivo chamado run.ps1 e cole o seguinte conteúdo:

```bash
dart pub global activate ffigen --version 5.0.1
flutter pub get
cargo build --features flutter
flutter run -d windows
```

Para executar o projeto flutter, siga os passos abaixo:

1. Abra o powershell como administrador

2. Execute o comando abaixo para instalar o flutter

```bash
dart pub global activate ffigen --version 5.0.1
$exists = Test-Path ~/.cargo/bin/flutter_rust_bridge_codegen.exe
Push-Location ..
git clone https://github.com/SoLongAndThanksForAllThePizza/flutter_rust_bridge --depth=1
Push-Location flutter_rust_bridge/frb_codegen ; cargo install --path . ; Pop-Location
Pop-Location
Push-Location flutter ; flutter pub get ; Pop-Location
~/.cargo/bin/flutter_rust_bridge_codegen --rust-input ./src/flutter_ffi.rs --dart-output ./flutter/lib/generated_bridge.dart
```

Se não apresentar problemas de compilação execute também o comando abaixo:

```bash
python3 .\build.py --portable --hwcodec --flutter
```

Finalizado execute o arquivo run.ps1

```bash
.\run.ps1
```

Pronto, agora ja pode navegar até a pasta do projeto flutter e executar o projeto.

Ao final das alterações, caso queira gerar o portable execute o script build.py na raiz do projeto e ele irá gerar um EXE com o projeto com as dependências embarcadas.
