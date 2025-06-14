---
title: Configurar servidores de retransmissão
weight: 17
---

## RustDesk Pro - Instalar servidores de retransmissão adicionais com geolocalização usando docker

{{% notice note %}}
[A instalação simples](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/installscript/) cria um servidor de retransmissão (o processo `hbbr`) implicitamente na mesma máquina, você não precisa especificar o servidor de retransmissão explicitamente.

Se você quiser criar um servidor de retransmissão adicional explicitamente em outra máquina, execute `hbbr` seguindo a [instalação OSS](https://rustdesk.com/docs/en/self-host/rustdesk-server-oss/install/). Você pode encontrar `hbbr` em `rustdesk-server-linux-amd64.tar.gz`, `rustdesk-server-hbbr_<version>-<arch>.deb`, `rustdesk-server-windows-x86_64.tar.gz` ou em `docker` (`sudo docker run ... rustdesk/rustdesk-server-pro hbbr`).

`hbbr` não requer uma licença e é igual à versão de código aberto.
{{% /notice %}}

Você pode ter vários servidores de retransmissão rodando pelo mundo e aproveitar a geolocalização automaticamente para usar o servidor de retransmissão mais próximo, proporcionando uma experiência mais rápida ao conectar com computadores remotos. `hbbs` verifica automaticamente se esses servidores de retransmissão estão online a cada alguns segundos, ele só escolhe servidores de retransmissão online.

{{% notice note %}}
Problema conhecido: https://github.com/rustdesk/rustdesk/discussions/7934
{{% /notice %}}

> Você precisará do par de chaves privadas `id_ed25519` e `id_ed25519.pub`.

1 - Se o docker já estiver instalado, conecte-se ao seu servidor via SSH e crie um volume para hbbr.

```
# docker volume create hbbr
```

O volume hbbr deve estar localizado em `/var/lib/docker/volumes/hbbr/_data`.

2 - Copie o par de chaves privadas para a localização do volume, neste caso usaremos SCP para copiar os arquivos.

A sintaxe do comando é `scp <caminho/nome_arquivo> usuario@servidor:</caminho/destino>`.

```
# scp id_ed25519 root@100.100.100.100:/var/lib/docker/volumes/hbbr/_data
# scp id_ed25519.pub root@100.100.100.100:/var/lib/docker/volumes/hbbr/_data
```

3 - Implante o contêiner hbbr usando o volume criado anteriormente. Este volume tem o par de chaves privadas necessário para executar seu servidor de retransmissão privado.

```
# sudo docker run --name hbbr -v hbbr:/root -td --net=host rustdesk/rustdesk-server hbbr -k _
```

4 - Verifique os logs de execução para verificar se o hbbr está rodando usando seu par de chaves.

```
# docker logs hbbr

INFO [src/common.rs:121] **Private key comes from id_ed25519**
NFO [src/relay_server.rs:581] Key: XXXXXXXXXXXXXXXXXXXXX
INFO [src/relay_server.rs:60] #blacklist(blacklist.txt): 0
INFO [src/relay_server.rs:75] #blocklist(blocklist.txt): 0
INFO [src/relay_server.rs:81] Listening on tcp :21117
```

Dependendo do seu SO, você pode querer bloquear/permitir IPs usando um firewall.

No nosso caso, rodando Ubuntu queremos permitir qualquer conexão TCP, para as portas 21117 e 21119.

```
# sudo ufw allow proto tcp from any to any port 21117,21119
```

**Habilitar o firewall**
```
# sudo ufw enable
```

**Verificar o status**
```
# ufw status

Status: active

To                         Action      From
--                         ------      ----
21117,21119/tcp            ALLOW       Anywhere
21117,21119/tcp (v6)       ALLOW       Anywhere (v6)
```

## Configurar RustDesk Pro para geolocalização usando o console web

### Registrar e baixar o arquivo de banco de dados GeoLite2 City

Para usar geolocalização, hbbs precisa de acesso ao banco de dados MaxMind GeoLite2 City. O banco de dados é gratuito e você pode se registrar para baixar o arquivo e obter uma chave API.

Comece criando uma conta (se você não tiver uma) indo ao [site](https://www.maxmind.com/en/account/login).
Vá para `Download Databases` e baixe GeoLite2 City, escolha o arquivo gzip e você deve ter o arquivo `mmdb` ao descompactar.

<img width="500" alt="image" src="https://github.com/rustdesk/doc.rustdesk.com/assets/642149/e14318fb-ec52-463c-af77-d08c9479c1b5">

Se você instalou RustDesk Pro usando o script de instalação em uma máquina Linux, o arquivo `mmdb` precisa ser movido para `/var/lib/rustdesk-server/`.

Para instalações Docker, o arquivo deve estar no volume que você mapeou ao implantar o contêiner mapeado para `/root`.

### Obter uma chave API para automatizar o processo - servidores Linux

Você precisa atualizar este arquivo regularmente e podemos usar um cronjob para isso. Você precisará de uma chave API para acessar o link de download que é gratuito.

Vá para `Manage License Keys` e gere uma nova chave de licença. <br>
<img width="500" alt="image" src="https://github.com/rustdesk/doc.rustdesk.com/assets/642149/632aeb33-4f5d-4a31-9010-38e01c22d3c9">
<br>
<img width="500" alt="image" src="https://github.com/rustdesk/doc.rustdesk.com/assets/642149/3e178174-5fbf-46b7-a335-01f77125dfad">

Você pode automatizar o [processo de download](https://dev.maxmind.com/geoip/updating-databases) de algumas maneiras, mas adicione o seguinte comando ao seu crontab substituindo {Your Access Key} pela chave API que você obteve do passo anterior.

```
/usr/bin/curl -L --silent 'https://download.maxmind.com/app/geoip_download?edition_id=GeoLite2-City&license_key={Your Access Key}&suffix=tar.gz' | /bin/tar -C '/var/lib/rustdesk-server/' -xvz --keep-newer-files --strip-components=1 --wildcards '*GeoLite2-City.mmdb'
```

### Alterar configurações no console web RustDesk Pro

Adicione seus endereços IP ou nomes DNS de servidores de retransmissão (DNS é suportado a partir da versão 1.1.11) aos `Servidores de retransmissão`. **A porta não é necessária, a porta `21117` é usada explicitamente.** <br>
<img width="500" alt="image" src="https://github.com/rustdesk/doc.rustdesk.com/assets/642149/c4452ba4-5e1d-437a-ae1d-fc0070bfa26c">

Adicione uma substituição geográfica adicionando o endereço IP do servidor e as coordenadas onde o servidor está localizado. <br>
<img width="500" alt="image" src="https://github.com/rustdesk/doc.rustdesk.com/assets/642149/41c558e3-423b-4296-90d3-cb0769f4a369">

Clique em `Reload Geo` e sua lista deve parecer similar a esta. <br>
<img width="500" alt="image" src="https://github.com/rustdesk/doc.rustdesk.com/assets/642149/5a0d39a9-4fec-46b4-a7a2-7ed38b6baeb7">

Para confirmar os resultados, verifique seus logs hbbs ao clicar em `Reload Geo`, você deve ver uma mensagem mostrando os endereços IP dos servidores de retransmissão e suas coordenadas.

> Se você está rodando RustDesk Pro em uma máquina Linux use o comando `RUST_LOG=debug ./hbbs` para ver os logs. Se você está rodando em um contêiner Docker use `docker logs hbbs`.

```
RUST_LOG=debug ./hbbs

INFO [src/common.rs:130] GEOIP_FILE: ./GeoLite2-City.mmdb
INFO [src/common.rs:159] override 1xx.xxx.xxx.x7: -1.xx 5x.xxx
[src/common.rs:159] override 1xx.xxx.xxx.xx8: -3.xxx 5x.xxxx
[src/common.rs:159] override 7xx.xxx.xxxx.xx1: 6.xxx 5x.xxxx
GEOIP_FILE loaded, #overrides 3
INFO [src/common.rs:119] relay-servers=["1xx.xxx.xxx.x7", "1xx.xxx.xxx.xx8", "7xx.xxx.xxx.xx1"]
NFO [src/rendezvous_server.rs:1467] parsed relay servers: [("1xx.xxxx.xxx.xx7", Some((-1x, xxx))), ("1xx.xxx.xxx.xx8", Some((-3x, xxx))), ("7xx.xxx.xxx.xx1", Some((6x, xxx)))]
```

Você também pode confirmar as solicitações de retransmissão diretamente em suas instâncias hbbr, simplesmente verificando os logs do contêiner.

```
# docker logs hbbr

INFO [src/relay_server.rs:436] Relayrequest 0593e64e-4fe8-4a59-a94f-b3420ab043eb from [::ffff:100.100.123.233]:52038 got paired
INFO [src/relay_server.rs:442] Both are raw
```