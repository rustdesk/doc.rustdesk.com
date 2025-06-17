---
title: Synology DSM 7.2
weight: 20
---
<!-- For translators: When translating elements like "buttons", don't just translate, please refer actual naming in their interface. -->
Após a atualização DSM 7.2, a Synology renomeou seu pacote "Docker" para "Container Manager". Traz uma nova GUI, e vem com "docker-compose" dentro de sua GUI, o que torna mais fácil criar Docker.

## Modelos suportados e requisitos

O Container Manager traz suporte ARM64 para alguns modelos de entrada, como a série J, para lista detalhada de modelos suportados, verifique o [site da Synology](https://www.synology.com/en-us/dsm/packages/ContainerManager).
Na maioria das vezes você não precisará instalar RAM extra para instalar Docker e RustDesk Server.

## 1. Instalar Container Manager (Docker)

Abra "Central de Pacotes", pesquise e instale "Container Manager".

![](/docs/en/self-host/rustdesk-server-oss/synology/dsm-7/images/dsm7_install_container_manager_though_package_center.png)

## 2. Criar pasta

Após instalar "Container Manager", ele criará uma Pasta Compartilhada chamada `docker`, vamos colocar os dados do nosso servidor aqui.

Abra seu File Station, crie uma pasta chamada `rustdesk-server` (ou como desejar). Em seguida, crie uma pasta chamada `data` nela como na imagem.

![](/docs/en/self-host/rustdesk-server-oss/synology/dsm-7/images/dsm7_create_required_folders.png)

## 3. Criar contêiner

Abra seu Container Manager, vá para Projeto e clique em Criar.

Digite o nome do projeto `rustdesk-server` e mude Origem de "Carregar compose.yml" para "Criar compose.yml", e copie o seguinte conteúdo para a caixa.

![](/docs/en/self-host/rustdesk-server-oss/synology/dsm-7/images/dsm7_creating_project_init.png?v2)

```yaml
services:
  hbbs:
    container_name: hbbs
    image: rustdesk/rustdesk-server:latest # Por favor, mude isto para rustdesk/rustdesk-server-pro:latest se quiser instalar Pro.
    command: hbbs
    volumes:
      - ./data:/root
    network_mode: host
    depends_on:
      - hbbr
    restart: always

  hbbr:
    container_name: hbbr
    image: rustdesk/rustdesk-server:latest # Por favor, mude isto para rustdesk/rustdesk-server-pro:latest se quiser instalar Pro.
    command: hbbr
    volumes:
      - ./data:/root
    network_mode: host
    restart: always

# Porque está usando modo host docker
# Caso esqueça as portas:
# 21114 TCP para console web, disponível apenas na versão Pro
# 21115 TCP para teste de tipo NAT
# 21116 TCP TCP hole punching
# 21116 UDP heartbeat/servidor ID
# 21117 TCP relay
```

Por favor, pule `Configurações do portal web` e termine.

## 4. Verificar se está funcionando

Abra seu File Station, você deve ver `id_ed25519`, `id_ed25519.pub` na sua pasta `docker/rustdesk-server/data`. Você pode baixá-lo e abri-lo através de qualquer editor de texto ou usar [Synology Text Editor](https://www.synology.com/en-us/dsm/packages/TextEditor). Esta é a chave pública que você precisa para seu cliente RustDesk.

A chave pública ficará assim:

![](/docs/en/self-host/rustdesk-server-oss/synology/dsm-7/images/dsm7_viewing_public_key_though_syno_text_editor.png)

Verifique [aqui](/docs/en/client) para configurar seu cliente. Apenas `servidor ID` e `Chave` são necessários. `Servidor relay` não é necessário porque definimos em `hbbs`, `hbbs` fornecerá esta informação automaticamente.

## 5. Configurar encaminhamento de porta no seu roteador

Vá para a página web de administração do seu roteador, encontre qualquer coisa relacionada a `Encaminhamento de porta`, deve aparecer nas configurações `WAN` ou `Firewall`.

Se ainda não conseguir encontrar a configuração, pesquise no Google `{Marca do roteador} + encaminhamento de porta` ou `{Modelo do roteador} + encaminhamento de porta`. Se este dispositivo é do seu ISP, pergunte a eles.

Abra essas portas necessárias:
  * `21114` TCP para console web, disponível apenas na versão Pro
  * `21115` TCP para teste de tipo NAT
  * `21116` TCP TCP hole punching
  * `21116` UDP heartbeat/servidor ID
  * `21117` TCP relay