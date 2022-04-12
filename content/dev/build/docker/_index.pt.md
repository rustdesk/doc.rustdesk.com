---
title: Docker 
weight: 30
---

## Como compilar com Docker

Comece clonando o repositório e montando o container docker:

```sh
git clone https://github.com/rustdesk/rustdesk
cd rustdesk
docker build -t "rustdesk-builder" .
```

Então, sempre que precisar compilar a aplicação, execute este comando:

```sh
docker run --rm -it -v $PWD:/home/user/rustdesk -v rustdesk-git-cache:/home/user/.cargo/git -v rustdesk-registry-cache:/home/user/.cargo/registry -e PUID="$(id -u)" -e PGID="$(id -g)" rustdesk-builder
```

Note que a primeira compilação pode demorar mais antes que as dependências sejam armazenadas em cache, as compilações subsequentes serão mais rápidas. Adicionalmente, se você precisar especificar argumentos diferentes para o comando de compilação, você pode fazê-lo ao final do comando na posição do `<OPTIONAL-ARGS>`. Por exemplo, se você gostaria de compilar uma versão de release otimizada, você executaria o comando acima seguido de `--release`. O executável gerado estará disponível no diretório alvo no seu sistema, e pode ser executado com:

```sh
target/debug/rustdesk
```

Ou, se estiver rodando um executável de release:

```sh
target/release/rustdesk
```

Por favor verifique que está executando estes comandos da raiz do repositório do RustDesk, senão a aplicação pode não encontrar os recursos necessários. Note também que outros subcomandos do cargo como `install` ou `run` não são suportados atualmente via este método, já que eles iriam instalar ou rodar o programa dentro do container ao invés do host.
