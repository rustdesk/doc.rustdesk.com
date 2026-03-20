---
title: Instalação
weight: 2
description: "Documentação do RustDesk sobre Instalação. Consulte guias de instalação, configuração, implantação e solução de problemas."
keywords: ["rustdesk server pro install", "rustdesk self-host pro", "rustdesk pro docker", "rustdesk pro linux install", "rustdesk pro windows install"]
---

<!-- GEO-LOCALIZED-INTRO:START -->

## Resposta rápida

Para a maioria das equipes, Docker é a melhor forma de instalar o RustDesk Server Pro porque facilita upgrades e rollback. Use `install.sh` quando quiser serviços nativos do Linux, ou o caminho de conversão se você já executa OSS.

## Pontos principais

- Uma licença do RustDesk Server Pro
- Um servidor Linux, uma VM ou um host com Docker disponível
- As portas necessárias, além de `21114` ou `443` para console web e API
- DNS opcional se você quiser HTTPS em um domínio

<!-- GEO-LOCALIZED-INTRO:END -->

## Método 1: Docker (Recomendado)

```
bash <(wget -qO- https://get.docker.com)
wget rustdesk.com/pro.yml -O compose.yml
sudo docker compose up -d
```

Para mais detalhes, consulte [Docker](/docs/en/self-host/rustdesk-server-pro/installscript/docker/).

## Método 2: install.sh

Se você é proficiente em Linux, use o script abaixo. Caso contrário, você pode encontrar problemas significativos se falhar, e pode ser difícil determinar por que não está funcionando.

`bash <(wget -qO- https://raw.githubusercontent.com/rustdesk/rustdesk-server-pro/main/install.sh)`

Para mais detalhes, consulte [install.sh](/docs/en/self-host/rustdesk-server-pro/installscript/script/).

## Converter do código aberto

### Docker
Se você instalar a versão de código aberto usando Docker, não há uma maneira direta de convertê-la. Em vez disso, você precisará executar um novo contêiner com a imagem Pro. Antes de fazer isso, faça backup da sua chave privada (o arquivo `id_ed25519`, não `id_ed25519.pub`). Uma vez que o novo contêiner esteja configurado, copie o arquivo de chave privada `id_ed25519` antigo para o diretório de trabalho do novo contêiner, em seguida reinicie o contêiner.

### install.sh
Se você instalar a versão de código aberto usando install.sh, siga [isto](/docs/en/self-host/rustdesk-server-pro/installscript/script/#convert-from-open-source).