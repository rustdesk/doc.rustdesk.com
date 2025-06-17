---
title: macOS
weight: 21
---

Hay múltiples formas de hacer esto, esta guía asume que `Xcode`, `Git` y `Homebrew` ya están instalados.

El mayor desafío es probablemente encontrar versiones de todas las herramientas que funcionen juntas, especialmente porque partes de la cadena de herramientas como Xcode y LLVM están dictadas por tu versión de macOS. Las versiones utilizadas en esta guía probablemente no sean las que deberías usar. Un punto de partida para determinar qué versiones usar es mirar en el [flujo de trabajo de compilación de GitHub](https://github.com/rustdesk/rustdesk/blob/master/.github/workflows/flutter-build.yml) para la versión de RustDesk que deseas compilar. Elige la etiqueta para ver el archivo en la esquina superior izquierda de la página. Pero eso no necesariamente funcionará porque las herramientas de macOS que vienen con el runner de GitHub podrían no ser las mismas versiones que las de tu sistema local.

### Export
`export` se utiliza para establecer varias variables de entorno. Cuando ejecutas `export`, esa variable se establece solo para la sesión de terminal actual, y por lo tanto debe repetirse para cada nueva ventana de terminal que quieras usar para compilar RustDesk, ahora o en el futuro. Generalmente, es preferible agregar todos los `export`s a un script que se ejecute automáticamente para cada terminal que se abra, por ejemplo `~/.bash_profile`. Los comandos `export` completos listados aquí pueden simplemente agregarse al archivo, pero también deben ejecutarse en la terminal actual porque el archivo no se lee hasta que se abre una *nueva* terminal.

## Instalar las herramientas que vamos a usar desde Homebrew

```sh
brew install python3 create-dmg nasm cmake gcc wget ninja pkg-config wget rustup
```

Algunas de las instalaciones podrían fallar porque algunas de las carpetas de destino no existen en nuestro sistema. En ese caso, crea la carpeta, establece el propietario y los permisos y ejecuta el comando `brew` nuevamente. Por ejemplo, si `/usr/local/include` no existe:
```sh
sudo mkdir /usr/local/include
sudo chown <nombre de usuario>:admin /usr/local/include
sudo chmod 775 /usr/local/include
```

## Instalar vcpkg
Vcpkg se utiliza para gestionar las dependencias de C/C++ utilizadas por RustDesk. Decide dónde quieres la instalación y ejecuta lo siguiente desde la carpeta en la que quieres que resida la carpeta `vcpkg`. En este ejemplo se usa `/Users/<nombre de usuario>/repos/` como ubicación, y la etiqueta `2023.04.15` se usa como versión.

```sh
git clone https://github.com/microsoft/vcpkg
cd vcpkg
git checkout 2023.04.15
./bootstrap-vcpkg.sh -disableMetrics
./vcpkg install libvpx libyuv opus aom
export VCPKG_ROOT=~/repos/vcpkg
```

## Instalar y configurar Rust
Usamos `rustup` para gestionar Rust, que ya se instaló anteriormente usando Homebrew. Pero aún necesita configurarse. Sigue las instrucciones y asegúrate de que tanto `rustup` como `rustc` estén en el `PATH`. En este ejemplo usamos la versión de Rust `1.75.0`, pero es posible que necesites usar una versión diferente. Puedes instalar y gestionar múltiples versiones de Rust con `rustup`.

```sh
rustup-init
rustup default 1.75.0
rustup component add rustfmt
```
Para obtener una descripción general de las cadenas de herramientas de Rust instaladas y predeterminadas, ejecuta `rustup show`.

## Descargar los archivos fuente de RustDesk

Decide dónde quieres los archivos fuente de RustDesk y ejecuta lo siguiente desde la carpeta en la que quieres que resida la carpeta `rustdesk`. En este ejemplo se usa `/Users/<nombre de usuario>/repos/` como ubicación.

```sh
git clone --recurse-submodules https://github.com/rustdesk/rustdesk
cd rustdesk/libs/portable/
python3 -m pip install --upgrade pip
pip3 install -r requirements.txt
```

Si `python3` o `pip` son desconocidos, agrégalos al `PATH` con algo como (usa tus nombres de carpeta reales):
```sh
export PATH=~/Library/Python/3.9/bin:$PATH
```
Una vez hecho esto, ejecuta nuevamente el/los comando(s) que fallaron. Recuerda también editar `~/.bash_profile`.

## Instalar componentes de interfaz de usuario
RustDesk se puede compilar usando tanto [Sciter](https://sciter.com/) como [Flutter](https://flutter.dev/). Ambos necesitan componentes adicionales, así que sigue los pasos para la versión relevante, o ambas.

### Sciter

Desde la carpeta `rustdesk`, ejecuta:
```sh
wget https://github.com/c-smile/sciter-sdk/raw/master/bin.osx/libsciter.dylib
```

### Flutter

[FVM](https://fvm.app/) te permite gestionar qué versión de Flutter se usa, y es probablemente la forma más fácil de poder probar diferentes versiones de Flutter fácilmente.

```sh
brew tap leoafarias/fvm
brew install fvm cocoapods
```
Instala y usa, por ejemplo Flutter `3.16.9`, con:

```sh
fvm global 3.16.9
```
FVM está diseñado para usar una configuración más compleja donde puede proporcionar diferentes versiones de Flutter para diferentes proyectos, pero eso está más allá del alcance de esta guía. En su lugar, simplemente agrega la ubicación del Flutter predeterminado proporcionado por FVM a tu `PATH` manualmente, lo que significa que debes usar `fvm global` para cambiar la versión de Flutter:

```sh
export PATH=$HOME/fvm/default/bin:$PATH
```

Una vez hecho esto, deberías desactivar la telemetría y verificar si todo está bien:

```sh
flutter --disable-analytics
dart --disable-analytics
flutter doctor -v
```
No importa si algunas de las verificaciones fallan, generalmente lo harán, lo importante es que la verificación del entorno que pretendes usar esté bien, es decir, `Xcode`. Si se reportan problemas, resuélvelos antes de continuar.

Una vez que Flutter esté funcionando, es hora de instalar el "puente" que une Rust y Flutter. Aquí hay otra de las versiones que deben funcionar juntas con todo lo demás, en este ejemplo usamos `1.80.1`:

```sh
cargo install flutter_rust_bridge_codegen --version "1.80.1" --features "uuid"
```

## Compilar

Compila desde la carpeta `rustdesk`. Compila la versión Sciter con:

```sh
python3 ./build.py
```

Compila la versión Flutter con:
```sh
flutter_rust_bridge_codegen --rust-input ./src/flutter_ffi.rs --dart-output ./flutter/lib/generated_bridge.dart --c-output ./flutter/macos/Runner/bridge_generated.h
python3 ./build.py --flutter
```
Si todo va bien, ahora deberías tener un archivo `dmg` listo para instalar en tu carpeta `rustdesk`.