---
title: macOS
weight: 21
---

Existem várias maneiras de fazer isso, este guia assume que `Xcode`, `Git` e `Homebrew` já estão instalados.

O maior desafio é provavelmente encontrar versões de todas as ferramentas que funcionem juntas, especialmente desde que partes da cadeia de ferramentas como Xcode e LLVM são ditadas pela sua versão do macOS. As versões usadas neste guia provavelmente não são as que você deve usar. Como ponto de partida para descobrir quais versões usar, consulte o [workflow de compilação do GitHub](https://github.com/rustdesk/rustdesk/blob/master/.github/workflows/flutter-build.yml) para a versão RustDesk que você quer compilar. Escolha a tag para ver o arquivo no canto superior esquerdo da página. Mas isso não necessariamente funcionará porque as ferramentas do macOS que vêm com o runner do GitHub podem não ser as mesmas versões que as do seu sistema local.

#### Export
`export` é usado para definir várias variáveis ambientais. Quando você executa `export`, essa variável é definida apenas para a sessão atual do terminal, e essas devem ser repetidas para cada nova janela do terminal que você quiser usar para compilar RustDesk, agora ou no futuro. Geralmente, é preferível adicionar todos os `export`s a um script que é executado automaticamente para cada terminal que é aberto, por exemplo `~/.bash_profile`. Os comandos `export` completos listados aqui podem simplesmente ser anexados ao arquivo, mas também devem ser executados no terminal atual porque o arquivo não é lido até que um *novo* terminal seja aberto.

### Instalar as ferramentas que vamos usar do Homebrew

```sh
brew install python3 create-dmg nasm cmake gcc wget ninja pkg-config wget rustup
```

Algumas das instalações podem falhar porque algumas das pastas de destino não existem no nosso sistema. Nesse caso, crie a pasta, defina o proprietário e permissões e execute o comando `brew` novamente. Exemplo se `/usr/local/include` não existir:
```sh
sudo mkdir /usr/local/include
sudo chown <nome_usuario>:admin /usr/local/include
sudo chmod 775 /usr/local/include
```

### Instalar vcpkg
Vcpkg é usado para gerenciar as dependências C/C++ usadas pelo RustDesk. Decida onde você quer a instalação e execute o seguinte da pasta na qual você quer que a pasta `vcpkg` resida. Neste exemplo `/Users/<nome_usuario>/repos/` é usado como localização, e a tag `2023.04.15` é usada como versão.

```sh
git clone https://github.com/microsoft/vcpkg
cd vcpkg
git checkout 2023.04.15
./bootstrap-vcpkg.sh -disableMetrics
./vcpkg install libvpx libyuv opus aom
export VCPKG_ROOT=~/repos/vcpkg
```

### Instalar e configurar Rust
Usamos `rustup` para gerenciar o Rust, que já foi instalado acima usando Homebrew. Mas, ainda precisa ser configurado. Siga as instruções e certifique-se de que tanto `rustup` quanto `rustc` estão no `PATH`. Neste exemplo usamos a versão `1.75.0` do Rust, mas você pode precisar usar uma versão diferente. Você pode instalar e gerenciar múltiplas versões do Rust com `rustup`.

```sh
rustup-init
rustup default 1.75.0
rustup component add rustfmt
```
Para uma visão geral sobre as cadeias de ferramentas Rust instaladas e padrão, execute `rustup show`.

### Baixar os arquivos fonte do RustDesk

Decida onde você quer os arquivos fonte do RustDesk e execute o seguinte da pasta na qual você quer que a pasta `rustdesk` resida. Neste exemplo `/Users/<nome_usuario>/repos/` é usado como localização.

```sh
git clone --recurse-submodules https://github.com/rustdesk/rustdesk
cd rustdesk/libs/portable/
python3 -m pip install --upgrade pip
pip3 install -r requirements.txt
```

Se `python3` ou `pip` for desconhecido, adicione-os ao `PATH` com algo como (use seus nomes de pasta reais):
```sh
export PATH=~/Library/Python/3.9/bin:$PATH
```
Uma vez feito isso, execute o(s) comando(s) falhado(s) novamente. Lembre-se de também editar `~/.bash_profile`.

### Instalar componentes da interface do usuário
RustDesk pode ser compilado usando tanto [Sciter](https://sciter.com/) quanto [Flutter](https://flutter.dev/). Ambos precisam de componentes adicionais, então siga os passos para a versão relevante, ou ambos.

#### Sciter

Da pasta `rustdesk`, execute:
```sh
wget https://github.com/c-smile/sciter-sdk/raw/master/bin.osx/libsciter.dylib
```

#### Flutter

[FVM](https://fvm.app/) permite gerenciar qual versão do Flutter é usada, e é provavelmente a maneira mais fácil de poder facilmente testar diferentes versões do Flutter.

```sh
brew tap leoafarias/fvm
brew install fvm cocoapods
```
Instale e use, por exemplo Flutter `3.16.9`, com:

```sh
fvm global 3.16.9
```
FVM é destinado a usar uma configuração mais complexa onde pode fornecer diferentes versões do Flutter para diferentes projetos, mas isso está além do escopo deste guia. Em vez disso, simplesmente adicione a localização do Flutter padrão fornecido pelo FVM ao seu `PATH` manualmente, o que significa que você deve usar `fvm global` para trocar a versão do Flutter:

```sh
export PATH=$HOME/fvm/default/bin:$PATH
```

Uma vez feito isso, você deve desabilitar a telemetria e verificar se tudo está OK:

```sh
flutter --disable-analytics
dart --disable-analytics
flutter doctor -v
```
Não importa se algumas das verificações falharem, elas geralmente falharão, o que é importante é que a verificação para o ambiente que você pretende usar esteja OK, nomeadamente `Xcode`. Se houver problemas relatados, resolva-os antes de prosseguir.

Uma vez que o Flutter esteja funcionando, é hora de instalar a "ponte" que liga Rust e Flutter juntos. Aqui está outra das versões que devem funcionar juntas com todo o resto, neste exemplo usamos `1.80.1`:

```sh
cargo install flutter_rust_bridge_codegen --version "1.80.1" --features "uuid"
```

### Compilar

Compile da pasta `rustdesk`. Compile a versão Sciter com:

```sh
python3 ./build.py
```

Compile a versão Flutter com:
```sh
flutter_rust_bridge_codegen --rust-input ./src/flutter_ffi.rs --dart-output ./flutter/lib/generated_bridge.dart --c-output ./flutter/macos/Runner/bridge_generated.h
python3 ./build.py --flutter
```
Se tudo correr bem, você deve agora ter um arquivo `dmg` pronto para instalar na sua pasta `rustdesk`.