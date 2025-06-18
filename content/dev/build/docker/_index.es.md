---
title: Docker 
weight: 30
---


## Cómo compilar con Docker
### Esto no funcionará en Windows

Comience clonando el repositorio y construyendo el contenedor docker:

```sh
git clone --recurse-submodules https://github.com/rustdesk/rustdesk
cd rustdesk
docker build -t "rustdesk-builder" .
```

Luego, cada vez que necesite compilar la aplicación, ejecute el siguiente comando:

```sh
docker run --rm -it -v $PWD:/home/user/rustdesk -v rustdesk-git-cache:/home/user/.cargo/git -v rustdesk-registry-cache:/home/user/.cargo/registry -e PUID="$(id -u)" -e PGID="$(id -g)" rustdesk-builder
```

Tenga en cuenta que la primera compilación puede demorar más antes de que las dependencias se almacenen en caché, las compilaciones posteriores serán más rápidas. Además, si necesita especificar diferentes argumentos para el comando de compilación, puede hacerlo al final del comando en el `<OPTIONAL-ARGS>` posición. Por ejemplo, si quisiera crear una versión de lanzamiento optimizada, ejecutaría el comando anterior seguido de `--release`. El ejecutable resultante estará disponible en la carpeta de destino de su sistema y se puede ejecutar con:

```sh
target/debug/rustdesk
```

O, si está ejecutando un ejecutable de versión:

```sh
target/release/rustdesk
```

Asegúrese de ejecutar estos comandos desde la raíz del repositorio de RustDesk; de lo contrario, es posible que la aplicación no pueda encontrar los recursos necesarios. También tenga en cuenta que otros subcomandos de carga como `install` o `run` actualmente no se admiten a través de este método, ya que instalarían o ejecutarían el programa dentro del contenedor en lugar del host.