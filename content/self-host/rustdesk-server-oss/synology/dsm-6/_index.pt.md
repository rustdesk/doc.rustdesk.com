---
title: Synology DSM 6
weight: 22
---

> Um tutorial alternativo atualizado de terceiros está [aqui](https://mariushosting.com/how-to-install-rustdesk-on-your-synology-nas/).

Este tutorial é baseado no DSM v6 e v7 mais recentes.

{{% notice note %}}
Após a atualização do DSM 7.2, o Docker foi atualizado para o novo "Container Manager", verifique [este artigo](/docs/en/self-host/rustdesk-server-oss/synology/dsm-7) em vez disso.
{{% /notice %}}

## Instalar Docker

| Abrir Central de Pacotes | Instalar Docker |
| --- | --- |
| ![](/docs/en/self-host/rustdesk-server-oss/synology/dsm-6/images/package-manager.png) | ![](/docs/en/self-host/rustdesk-server-oss/synology/dsm-6/images/docker.png) |

## Instalar RustDesk Server

| Procurar rustdesk-server no registro do Docker e instalar clicando duas vezes | Imagem rustdesk-server instalada, clique duas vezes para criar contêiner rustdesk-server |
| --- | --- |
| ![](/docs/en/self-host/rustdesk-server-oss/synology/dsm-6/images/pull-rustdesk-server.png) | ![](/docs/en/self-host/rustdesk-server-oss/synology/dsm-6/images/rustdesk-server-installed.png) |

## Criar contêiner hbbs

Como mencionado acima, clique duas vezes na imagem rustdesk-server para criar novo contêiner, defina o nome como `hbbs`.
![](/docs/en/self-host/rustdesk-server-oss/synology/dsm-6/images/hbbs.png)

Clique nas `Configurações Avançadas` acima.

- Habilite `Habilitar reinício automático`.
![](/docs/en/self-host/rustdesk-server-oss/synology/dsm-6/images/auto-restart.png)

- Habilite `Usar a mesma rede que o Host Docker`. Para mais sobre host net, verifique [aqui](https://rustdesk.com/docs/en/self-host/rustdesk-server-oss/docker/#net-host).
![](/docs/en/self-host/rustdesk-server-oss/synology/dsm-6/images/host-net.png)

- Monte um diretório host (ex. `/home/rustdesk/`) para `/root`, hbbs irá gerar alguns arquivos (banco de dados e arquivos `key`) neste diretório que precisam ser persistentes ao longo de reinicializações.

| Montar | Arquivos gerados no diretório host |
| --- | --- |
| ![](/docs/en/self-host/rustdesk-server-oss/synology/dsm-6/images/mount.png) | ![](/docs/en/self-host/rustdesk-server-oss/synology/dsm-6/images/mounted-dir.png) |

- Definir comando
{{% notice note %}}
O SO do Synology é baseado no Debian, então host net (--net=host) funciona bem, não precisamos mapear portas com a opção `-p`.

{{% /notice %}}

![](/docs/en/self-host/rustdesk-server-oss/synology/dsm-6/images/hbbs-cmd.png?v3)

- Concluído

## Criar contêiner hbbr

Repita os passos `hbbs` acima, mas nomeie o contêiner `hbbr` e o comando (para o Passo Definir Comando) deve ser `hbbr`.

![](/docs/en/self-host/rustdesk-server-oss/synology/dsm-6/images/hbbr-config.png)

## contêineres hbbr/hbbs

![](/docs/en/self-host/rustdesk-server-oss/synology/dsm-6/images/containers.png)

| Clique duas vezes no contêiner e verifique o log | Confirme novamente hbbs/hbbr usando rede host |
| --- | --- |
| ![](/docs/en/self-host/rustdesk-server-oss/synology/dsm-6/images/log.png) | ![](/docs/en/self-host/rustdesk-server-oss/synology/dsm-6/images/network-types.png) |

## Recuperar sua Chave

Navegue para a pasta configurada antes usando o File Station, baixe `id_ed25519.pub` e abra com um editor de texto para ver sua chave.