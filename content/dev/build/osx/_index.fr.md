---
title: macOS
weight: 21
---

Il existe plusieurs façons de faire cela, ce guide suppose que `Xcode`, `Git` et `Homebrew` sont déjà installés.

Le plus grand défi est probablement de trouver des versions de tous les outils qui fonctionnent ensemble, surtout que des parties de la chaîne d'outils comme Xcode et LLVM sont dictées par votre version de macOS. Les versions utilisées dans ce guide ne sont probablement pas celles que vous devriez utiliser. Un point de départ pour déterminer quelles versions utiliser est de consulter le [workflow de build GitHub](https://github.com/rustdesk/rustdesk/blob/master/.github/workflows/flutter-build.yml) pour la version de RustDesk que vous souhaitez compiler. Choisissez le tag pour lequel voir le fichier dans le coin supérieur gauche de la page. Mais cela ne fonctionnera pas nécessairement car les outils macOS fournis avec le runner GitHub pourraient ne pas être les mêmes versions que celles de votre système local.

### Export
`export` est utilisé pour définir diverses variables d'environnement. Lorsque vous exécutez `export`, cette variable est définie uniquement pour la session de terminal actuelle, et celles-ci doivent donc être répétées pour chaque nouvelle fenêtre de terminal que vous souhaitez utiliser pour compiler RustDesk, maintenant ou à l'avenir. Généralement, il est préférable d'ajouter tous les `export`s à un script qui est exécuté automatiquement pour chaque terminal ouvert, par exemple `~/.bash_profile`. Les commandes `export` complètes listées ici peuvent simplement être ajoutées au fichier, mais doivent également être exécutées dans le terminal actuel car le fichier n'est pas lu jusqu'à ce qu'un *nouveau* terminal soit ouvert.

## Installer les outils que nous allons utiliser depuis Homebrew

```sh
brew install python3 create-dmg nasm cmake gcc wget ninja pkg-config wget rustup
```

Certaines installations pourraient échouer car certains dossiers cibles n'existent pas sur notre système. Dans ce cas, créez le dossier, définissez le propriétaire et les permissions et exécutez à nouveau la commande `brew`. Par exemple si `/usr/local/include` n'existe pas :
```sh
sudo mkdir /usr/local/include
sudo chown <nom d'utilisateur>:admin /usr/local/include
sudo chmod 775 /usr/local/include
```

## Installer vcpkg
Vcpkg est utilisé pour gérer les dépendances C/C++ utilisées par RustDesk. Décidez où vous voulez l'installation et exécutez ce qui suit depuis le dossier dans lequel vous voulez que le dossier `vcpkg` réside. Dans cet exemple `/Users/<nom d'utilisateur>/repos/` est utilisé comme emplacement, et le tag `2023.04.15` est utilisé comme version.

```sh
git clone https://github.com/microsoft/vcpkg
cd vcpkg
git checkout 2023.04.15
./bootstrap-vcpkg.sh -disableMetrics
./vcpkg install libvpx libyuv opus aom
export VCPKG_ROOT=~/repos/vcpkg
```

## Installer et configurer Rust
Nous utilisons `rustup` pour gérer Rust, qui a déjà été installé ci-dessus en utilisant Homebrew. Mais il doit encore être configuré. Suivez les instructions et assurez-vous que `rustup` et `rustc` sont sur le `PATH`. Dans cet exemple, nous utilisons la version Rust `1.75.0`, mais vous pourriez avoir besoin d'utiliser une version différente. Vous pouvez installer et gérer plusieurs versions de Rust avec `rustup`.

```sh
rustup-init
rustup default 1.75.0
rustup component add rustfmt
```
Pour un aperçu des chaînes d'outils Rust installées et par défaut, exécutez `rustup show`.

## Télécharger les fichiers sources de RustDesk

Décidez où vous voulez les fichiers sources de RustDesk et exécutez ce qui suit depuis le dossier dans lequel vous voulez que le dossier `rustdesk` réside. Dans cet exemple `/Users/<nom d'utilisateur>/repos/` est utilisé comme emplacement.

```sh
git clone --recurse-submodules https://github.com/rustdesk/rustdesk
cd rustdesk/libs/portable/
python3 -m pip install --upgrade pip
pip3 install -r requirements.txt
```

Si `python3` ou `pip` sont inconnus, ajoutez-les au `PATH` avec quelque chose comme (utilisez vos noms de dossiers réels) :
```sh
export PATH=~/Library/Python/3.9/bin:$PATH
```
Une fois cela fait, exécutez à nouveau la ou les commandes qui ont échoué. N'oubliez pas de modifier également `~/.bash_profile`.

## Installer les composants d'interface utilisateur
RustDesk peut être compilé en utilisant à la fois [Sciter](https://sciter.com/) et [Flutter](https://flutter.dev/). Les deux nécessitent des composants supplémentaires, alors suivez les étapes pour la version pertinente, ou les deux.

### Sciter

Depuis le dossier `rustdesk`, exécutez :
```sh
wget https://github.com/c-smile/sciter-sdk/raw/master/bin.osx/libsciter.dylib
```

### Flutter

[FVM](https://fvm.app/) vous permet de gérer quelle version de Flutter est utilisée, et est probablement le moyen le plus simple de pouvoir essayer facilement différentes versions de Flutter.

```sh
brew tap leoafarias/fvm
brew install fvm cocoapods
```
Installez et utilisez, par exemple Flutter `3.16.9`, avec :

```sh
fvm global 3.16.9
```
FVM est conçu pour utiliser une configuration plus complexe où il peut fournir différentes versions de Flutter pour différents projets, mais cela dépasse le cadre de ce guide. Au lieu de cela, ajoutez simplement manuellement l'emplacement du Flutter par défaut fourni par FVM à votre `PATH`, ce qui signifie que vous devez utiliser `fvm global` pour changer de version de Flutter :

```sh
export PATH=$HOME/fvm/default/bin:$PATH
```

Une fois cela fait, vous devriez désactiver la télémétrie et vérifier si tout va bien :

```sh
flutter --disable-analytics
dart --disable-analytics
flutter doctor -v
```
Peu importe si certaines vérifications échouent, elles le feront généralement, ce qui est important c'est que la vérification de l'environnement que vous avez l'intention d'utiliser est OK, à savoir `Xcode`. Si des problèmes sont signalés, résolvez-les avant de continuer.

Une fois que Flutter est opérationnel, il est temps d'installer le "pont" qui lie Rust et Flutter ensemble. Voici une autre des versions qui doivent fonctionner ensemble avec tout le reste, dans cet exemple nous utilisons `1.80.1` :

```sh
cargo install flutter_rust_bridge_codegen --version "1.80.1" --features "uuid"
```

## Compiler

Compilez depuis le dossier `rustdesk`. Compilez la version Sciter avec :

```sh
python3 ./build.py
```

Compilez la version Flutter avec :
```sh
flutter_rust_bridge_codegen --rust-input ./src/flutter_ffi.rs --dart-output ./flutter/lib/generated_bridge.dart --c-output ./flutter/macos/Runner/bridge_generated.h
python3 ./build.py --flutter
```
Si tout se passe bien, vous devriez maintenant avoir un fichier `dmg` prêt à installer dans votre dossier `rustdesk`.