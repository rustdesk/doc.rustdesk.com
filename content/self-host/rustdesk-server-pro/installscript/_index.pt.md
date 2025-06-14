---
title: Instalação
weight: 2
---

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