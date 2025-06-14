---
title: Cliente RustDesk
weight: 2
pre: "<b>1. </b>"
---

## Introdução
O cliente RustDesk é usado em dispositivos para conectar via nosso servidor RustDesk, seja de código aberto ou Pro. Está disponível para download no [GitHub](https://github.com/rustdesk/rustdesk/releases/latest).

## Plataformas Suportadas
- Microsoft Windows
- macOS
- Derivados Debian (Ubuntu ≥ 16, Linux Mint, etc.)
- Derivados Red Hat (CentOS, Fedora ≥ 18, Rocky Linux, etc.)
- Arch Linux/Manjaro
- openSUSE
- NixOS
- AppImage / Flatpak
- Android
- iOS (não suporta ser controlado)
- Web

## Instalação

### Windows

Baixe o exe do GitHub e instale.

Para instalar silenciosamente, chame o exe de instalação com `--silent-install`.

### macOS

Baixe o arquivo dmg do GitHub. Mais informações podem ser encontradas na [página macOS](https://rustdesk.com/docs/en/client/mac/).

Abra o arquivo dmg e arraste `RustDesk` para `Applications`.

Permita que o RustDesk execute.

Ative as permissões solicitadas e siga as instruções no lado esquerdo do RustDesk para finalizar a configuração.

### Linux

Consulte as instruções abaixo para instalar nas várias "versões" do Linux (instaladores estão no GitHub ou disponíveis no repositório da distribuição).

#### Derivados Debian

```sh
# por favor ignore o relatório incorreto de uso do disco
sudo apt install -fy ./rustdesk-<version>.deb
```

#### Derivados Red Hat

```sh
sudo yum localinstall ./rustdesk-<version>.rpm
```

#### Arch Linux/Manjaro

```sh
sudo pacman -U ./rustdesk-<version>.pkg.tar.zst
```

#### openSUSE (≥ Leap 15.0)

```sh
sudo zypper install --allow-unsigned-rpm ./rustdesk-<version>-suse.rpm
```

#### Nix / NixOS (≥ 22.05)

Entre temporariamente em um shell com `rustdesk` pronto para executar:

```sh
nix shell nixpkgs#rustdesk
```

Instale no perfil do usuário atual:

```sh
nix profile install nixpkgs#rustdesk
```

Para instalar em todo o sistema no NixOS, execute `nixos-rebuild switch --flake /etc/nixos` após editar `configuration.nix`:

```
  environment.systemPackages = with pkgs; [
    ...
    rustdesk
  ];
```

### Android
Instale o apk do nosso GitHub. Mais informações podem ser encontradas na [página Android](https://rustdesk.com/docs/en/client/android/).

### iOS (iPhone, iPad)
Baixe o aplicativo da [App Store](https://apps.apple.com/us/app/rustdesk-remote-desktop/id1581225015).

## Uso
Uma vez instalado (ou executado como um executável temporário), o RustDesk se conectará aos servidores públicos. Você verá uma mensagem na parte inferior dizendo (1) "Pronto, Para conexão mais rápida, configure seu próprio servidor". No canto superior esquerdo você verá seu (2) ID, (3) Senha de uso único e à direita uma (4) caixa para você se conectar a outro computador se souber o ID dele.

![](/docs/en/client/images/client.png)

Para acessar as configurações, clique no botão (5) Menu [ &#8942; ] à direita do ID.

Nas Configurações você encontrará:
- Geral - Controle de Serviço, Tema, Codec de Hardware, Áudio, Gravação e Idioma
- Segurança - Permissões para alguém assumir o controle, Opções de senha, capacidade de alterar seu ID e Configurações de Segurança Avançadas
- Rede - Configure suas próprias configurações de servidor e proxy aqui
- Display - Controle as configurações de display para sessões remotas e outras opções padrão, sincronização da área de transferência, etc.
- Conta - Isso pode ser usado em conjunto com o servidor Pro para fazer login na API
- Sobre - Mostra informações sobre o software.

## Configurando RustDesk
Há várias maneiras de configurar o RustDesk.

A maneira mais fácil é usar o RustDesk Server Pro. Você pode obter uma string de configuração criptografada, que pode ser usada em conjunto com `--config` para importar configurações. Para fazer isso:
1. Abra a linha de comando no SO que você usa, na pasta onde o RustDesk está instalado, ou seja, `C:\Program Files\RustDesk` no Windows, `/usr/bin` no Linux.
2. Use o comando `rustdesk.exe --config sua-string-criptografada`, por exemplo `rustdesk.exe --config 9JSPSvJzNrBDasJjNSdXOVVBlERDlleoNWZzIHcOJiOikXZr8mcw5yazVGZ0NXdy5CdyciojI0N3boJye`.

Você pode configurar manualmente um cliente. Para fazer isso:
1. Clique em Configurações.
2. Clique em Rede.
3. Clique em Desbloquear Configurações de Rede.
4. Digite seu ID, Relay, API (se usando servidor pro) e sua chave.

![](/docs/en/client/images/network-settings.png)

Se você configurar manualmente um cliente, pode recuperar o arquivo `RustDesk2.toml` (na pasta dos usuários) e usar `--import-config` de forma similar ao exemplo acima.

## Parâmetros de Linha de Comando
- `--password` pode ser usado para definir uma senha permanente.
- `--get-id` pode ser usado para recuperar o ID.
- `--set-id` pode ser usado para definir um ID. Note que IDs devem começar com uma letra.
- `--silent-install` pode ser usado para instalar o RustDesk silenciosamente no Windows.

Parâmetros avançados adicionais podem ser encontrados [aqui](https://github.com/rustdesk/rustdesk/blob/bdc5cded221af9697eb29aa30babce75e987fcc9/src/core_main.rs#L242).

{{% children depth="3" showhidden="true" %}}