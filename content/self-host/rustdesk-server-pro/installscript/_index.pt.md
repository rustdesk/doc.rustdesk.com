---
title: Installation
weight: 2
---

## Docker (Recomendado)

```
bash <(wget -qO- https://get.docker.com)
wget rustdesk.com/pro.yml -O compose.yml
docker compose up -d
```

Para mais detalhes, por favor, verifique [Docker](/docs/pt/self-host/rustdesk-server-pro/installscript/docker/).

## install.sh

Se você é proficiente em Linux, por favor, utilize o script abaixo. Caso contrário, você pode encontrar problemas significativos se ele falhar, e pode ser difícil determinar por que não está funcionando.

`bash <(wget -qO- https://raw.githubusercontent.com/rustdesk/rustdesk-server-pro/main/install.sh)`

Para mais detalhes, por favor, verifique [install.sh](/docs/pt/self-host/rustdesk-server-pro/installscript/script/).

## Converter da versão de código aberto

### Docker
Se você instalou a versão de código aberto usando Docker, não há uma maneira direta de convertê-la. Em vez disso, você precisará executar um novo contêiner com a imagem Pro. Antes de fazer isso, faça backup de sua chave privada (o arquivo `id_ed25519`, não `id_ed25519.pub`). Depois que o novo contêiner estiver configurado, copie o arquivo de chave privada `id_ed25519` antigo para o diretório de trabalho do novo contêiner e, em seguida, reinicie o contêiner.

### install.sh
Se você instalou a versão de código aberto usando install.sh, por favor, siga [isso](/docs/pt/self-host/rustdesk-server-pro/installscript/script/#convert-from-open-source).
