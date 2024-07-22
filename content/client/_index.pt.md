---
title: RustDesk Client
weight: 2
pre: "<b>1. </b>"
---

### Introdução
O Cliente RustDesk é usado em dispositivos para se conectar através do nosso Servidor RustDesk, seja open source ou Pro. Ele está disponível para download no [GitHub](https://github.com/rustdesk/rustdesk/releases/latest).

### Plataformas Suportadas
- Microsoft Windows
- macOS
- Debian Derivatives (Ubuntu ≥ 16, Linux Mint, etc.)
- Red Hat Derivatives (CentOS, Fedora ≥ 18, Rocky Linux, etc.)
- Arch Linux/Manjaro
- openSUSE
- NixOS
- AppImage / Flatpak
- Android
- iOS (not support being controlled)
- Web

### Instalação

#### Windows

Baixe o instalador (.exe) do GitHub e execute-o.

Para instalar silenciosamente, execute o instalador com o parâmetro `--silent-install`.

#### macOS

Baixe o arquivo dmg do GitHub. Mais informações podem ser encontradas na página do [macOS page](https://rustdesk.com/docs/pt/client/mac/).

Abra o arquivo dmg e arraste o `RustDesk` para a pasta `Aplicativos`.

Permita a execução do RustDesk.

Habilite as permissões solicitadas e siga os prompts no lado esquerdo do RustDesk para concluir a configuração.

#### Linux

Veja as instruções abaixo para instalar as várias "distros" do Linux (os instaladores estão no GitHub ou disponíveis no repositório da distribuição).

##### Derivativos Debian

```sh
# ignore o aviso de uso incorreto do disco
sudo apt install -fy ./rustdesk-<versão>.deb
```

##### Derivativos Red Hat

```sh
sudo yum localinstall ./rustdesk-<versão>.rpm
```

##### Arch Linux/Manjaro

```sh
sudo pacman -U ./rustdesk-<versão>.pkg.tar.zst
```

##### openSUSE (≥ Leap 15.0)

```sh
sudo zypper install --allow-unsigned-rpm ./rustdesk-<versão>-suse.rpm
```

##### Nix / NixOS (≥ 22.05)

Entre temporariamente em um shell com o `rustdesk` pronto para ser executado:

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

#### Android
Instale o aplicativo do nosso GitHub. Mais informações podem ser encontradas na página do [Android page](https://rustdesk.com/docs/pt/client/android/).

#### iOS (iPhone, iPad)
Baixe o aplicativo na [App Store](https://apps.apple.com/br/app/rustdesk-remote-desktop/id1581225015).

### Uso
Uma vez instalado (ou executado como um executável temporário), o RustDesk se conectará aos servidores públicos. Você verá uma mensagem na parte inferior dizendo (1) "Pronto, para uma conexão mais rápida, configure seu próprio servidor". No canto superior esquerdo, você verá sua (2) ID, (3) Senha Única e à direita uma caixa (4) para você se conectar a outro computador se souber a ID dele.

![](/docs/en/client/images/client.png)

Para acessar as configurações, clique no botão (5) Menu [ &#8942; ] à direita da ID.

Em Configurações, você encontrará:
- Geral - Controle de Serviço, Tema, Codec de Hardware, Áudio, Gravação e Idioma
- Segurança - Permissões para alguém assumir o controle, Opções de senha, capacidade de alterar sua ID e Configurações de segurança avançadas
- Rede - Defina suas próprias configurações de servidor e proxy aqui
- Display - Controle as configurações de exibição para sessões remotas e outras opções padrão, sincronize a área de transferência etc.
- Conta - Pode ser usada em conjunto com o Servidor Pro para fazer login na API
- Sobre - Mostra informações sobre o software.

### Configurando o RustDesk
Existem algumas maneiras de configurar o RustDesk.

A maneira mais fácil é usar o RustDesk Server Pro. Ele permite obter uma string de configuração criptografada, que pode ser usada em conjunto com `--config` para importar as configurações. Para fazer isso:
1. Abra o prompt de comando no sistema operacional que você usa e navegue até a pasta onde o RustDesk está instalado. Por exemplo, `C:\Program Files\RustDesk` no Windows ou `/usr/bin` no Linux.
2. Use o comando `rustdesk.exe --config sua-string-criptografada`, por exemplo, `rustdesk.exe --config 9JSPSvJzNrBDasJjNSdXOVVBlERDlleoNWZzIHcOJiOikXZr8mcw5yazVGZ0NXdy5CdyciojI0N3boJye`.

Você também pode configurar o cliente manualmente. Para fazer isso:
1. Clique em ≡ (Configurações).
2. Clique em Rede.
3. Clique em Desbloquear configurações de rede.
4. Insira sua ID, Relay, API (se estiver usando o servidor Pro) e sua key.

![](/docs/en/client/images/network-settings.png)

Se você configurar o cliente manualmente, poderá recuperar o arquivo RustDesk2.toml (na pasta do usuário) e usar --import-config de maneira semelhante ao exemplo anterior.

Parâmetros da linha de comando
- `--password`: pode ser usado para definir uma senha permanente.
- `--get-id`: pode ser usado para recuperar a ID do cliente.
- `--set-id`: pode ser usado para definir uma ID personalizada. Lembre-se que as IDs devem começar com uma letra.
- `--silent-install`: pode ser usado para instalar o RustDesk silenciosamente no Windows.

 Parâmetros avançados adicionais podem ser encontrados [aqui](https://github.com/rustdesk/rustdesk/blob/bdc5cded221af9697eb29aa30babce75e987fcc9/src/core_main.rs#L242).

 {{% children depth="3" showhidden="true" %}}
