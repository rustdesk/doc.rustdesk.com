---
title: Docker
weight: 30
---

### Como compilar com Docker
#### Isto não funcionará no Windows

Comece clonando o repositório e compilando o container Docker:

```sh
git clone --depth=1 https://github.com/rustdesk/rustdesk
cd rustdesk
docker build -t "rustdesk-builder" .
```

Em seguida, sempre que precisar compilar a aplicação, execute o seguinte comando:

```sh
docker run --rm -it -v $PWD:/home/user/rustdesk -v rustdesk-git-cache:/home/user/.cargo/git -v rustdesk-registry-cache:/home/user/.cargo/registry -e PUID="$(id -u)" -e PGID="$(id -g)" rustdesk-builder
```

Note que a primeira compilação pode demorar mais antes das dependências serem armazenadas em cache, compilações subsequentes serão mais rápidas. Além disso, se precisar especificar argumentos diferentes para o comando de compilação, pode fazê-lo no final do comando na posição `<OPTIONAL-ARGS>`. Por exemplo, se quiser compilar uma versão de lançamento otimizada, executaria o comando acima seguido de `--release`. O executável resultante estará disponível na pasta target do seu sistema e pode ser executado com:

```sh
target/debug/rustdesk
```

Ou, se estiver executando um executável de lançamento:

```sh
target/release/rustdesk
```

Certifique-se de que está executando estes comandos a partir da raiz do repositório RustDesk, caso contrário a aplicação pode não conseguir encontrar os recursos necessários. Note também que outros subcomandos do cargo como `install` ou `run` não são atualmente suportados através deste método, pois instalariam ou executariam o programa dentro do container em vez do host.