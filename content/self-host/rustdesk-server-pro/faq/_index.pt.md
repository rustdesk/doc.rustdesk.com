---
title: FAQ
weight: 600
---

## Como posso instalar com o script de instalação simples?
1. Obtenha sua licença em [https://rustdesk.com/pricing.html](https://rustdesk.com/pricing.html), consulte a página de [licença](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/license/) para mais detalhes.
2. Inicie um VPS, bare metal ou VM Linux.
3. Se você quiser usar DNS e SSL, crie um nome DNS como `rustdesk.yourdomain.com`.
4. [Esta página](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/installscript/#install).
5. Copie e cole o comando em seu terminal Linux.
6. Siga as instruções que o guiam pela instalação.
7. Após a instalação ser concluída, vá para `https://rustdesk.yourdomain.com` ou `http://youripaddress:21114`.
8. Faça login com o nome de usuário `admin` e senha `test1234`.
9. Digite seu código de licença comprado na etapa 1.

## Como posso converter do RustDesk Server Open Source para o RustDesk Server Pro?
1. Obtenha sua licença em [https://rustdesk.com/pricing.html](https://rustdesk.com/pricing.html), consulte a página de [licença](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/license/) para mais detalhes.
2. Abra a porta TCP 21114.
3. Faça login no seu RustDesk Server.
4. Se você ainda não usa DNS e quer usar SSL, crie um nome DNS como `rustdesk.yourdomain.com`.
5. [Esta página](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/installscript/#convert-from-open-source).
6. Copie e cole o comando em seu terminal Linux.
7. Siga as instruções que o guiam pela instalação.
8. Após a instalação ser concluída, vá para `https://rustdesk.yourdomain.com` ou `http://youripaddress:21114`.
9. Faça login com o nome de usuário `admin` e senha `test1234`.
10. Digite seu código de licença comprado na etapa 1.

## Há uma nova versão do RustDesk Server Pro, como posso atualizar?
É melhor fazer backup dos arquivos de dados (arquivos sqlite3, etc.) primeiro, https://github.com/rustdesk/rustdesk-server-pro/discussions/184#discussioncomment-8013375.
- ### Se você instalou com script (`install.sh`)
Execute [update.sh](/docs/en/self-host/rustdesk-server-pro/installscript/script/#upgrade).
- ### Docker Compose
```
sudo docker compose down
sudo docker compose pull 
sudo docker compose up -d
```
Mas isso depende da sua versão do docker, para mais discussão, verifique [isto](https://stackoverflow.com/questions/37685581/how-to-get-docker-compose-to-use-the-latest-image-from-repository).
- ### Docker
```
sudo docker ps
## você também pode usar <CONTAINER NAME>, ex. `hbbs` e `hbbr` se você seguir nosso manual.
sudo docker stop <CONTAINER ID>
sudo docker rm <CONTAINER ID>
sudo docker rmi <IMAGE ID>
sudo docker run ..... # igual a como você instalou antes
```

ex.

```
root@hz:~# sudo docker ps
CONTAINER ID   IMAGE                          COMMAND   CREATED          STATUS                         PORTS     NAMES
30822972c220   rustdesk/rustdesk-server-pro   "hbbr"    10 seconds ago   Restarting (1) 2 seconds ago             hbbr
0f3a6f185be3   rustdesk/rustdesk-server-pro   "hbbs"    15 seconds ago   Up 14 seconds                            hbbs
root@hz:~# sudo docker kill hbbr hbbs
hbbr
hbbs
root@hz:~# sudo docker ps
CONTAINER ID   IMAGE     COMMAND   CREATED   STATUS    PORTS     NAMES
root@hz:~# sudo docker rm hbbr hbbs
hbbr
hbbs
root@hz:~# sudo docker rmi rustdesk/rustdesk-server-pro
Untagged: rustdesk/rustdesk-server-pro:latest
Untagged: rustdesk/rustdesk-server-pro@sha256:401b8344323addf777622d0463bd7b964dd18a01599e42e20d8b3818dae71ad2
Deleted: sha256:a3d9d43a3d1dd84b10c39fe0abf7767b18a87819ff0981443ce9e9a52604c889
Deleted: sha256:65ae79ecc0f8b1c8a21085d04af7c8d8f368dd5ad844982d4c7b3ac1f38ba33a
Deleted: sha256:9274a824aef10f2ef106d8f85fbd1905037169cf610951f63dc5109dae4b0825
Deleted: sha256:aa89ac8b57a49f49f041c01b9c0f016060e611cf282e3fda281bc6bebbabaf3f
Deleted: sha256:4af9839016f72586a46f915cae8a5ccf3380ba88a2f79532692d3b1d7020387e
Deleted: sha256:e900a7ffc2fc14fa432cc04823740dcbb78c0aa3508abbbe287ce8b274541ada
Deleted: sha256:503eeab76c11e8316a2a450ef0790d31c5af203309e9c5b44d1bf8a601e6e587
Deleted: sha256:825683356e7dbfcbaabcbf469c9aeb34d36ebeab0308170432b9553e28203116
Deleted: sha256:24a48d4af45bab05d8712fe22abec5761a7781283500e32e34bdff5798c09399
root@hz:~# sudo docker images
REPOSITORY         TAG       IMAGE ID       CREATED        SIZE
rustdesk/makepkg   latest    86a981e2e18f   2 months ago   2.23GB
root@hz:~# sudo docker run --name hbbs -v ./data:/root -td --net=host --restart unless-stopped rustdesk/rustdesk-server-pro hbbs
Unable to find image 'rustdesk/rustdesk-server-pro:latest' locally
latest: Pulling from rustdesk/rustdesk-server-pro
4ce000a43472: Pull complete
1543f88421d3: Pull complete
9b209c1f5a8d: Pull complete
d717f548a400: Pull complete
1e60b98f5660: Pull complete
a86960d9bced: Pull complete
acb361c4bbf6: Pull complete
4f4fb700ef54: Pull complete
Digest: sha256:401b8344323addf777622d0463bd7b964dd18a01599e42e20d8b3818dae71ad2
Status: Downloaded newer image for rustdesk/rustdesk-server-pro:latest
0cc5387efa8d2099c0d8bc657b10ed153a6b642cd7bbcc56a6c82790a6e49b04
root@hz:~# sudo docker run --name hbbr -v ./data:/root -td --net=host --restart unless-stopped rustdesk/rustdesk-server-pro hbbr
4eb9da2dc460810547f6371a1c40a9294750960ef2dbd84168079e267e8f371a
root@hz:~# sudo docker ps
CONTAINER ID   IMAGE                          COMMAND   CREATED         STATUS                                  PORTS     NAMES
4eb9da2dc460   rustdesk/rustdesk-server-pro   "hbbr"    5 seconds ago   Restarting (1) Less than a second ago             hbbr
0cc5387efa8d   rustdesk/rustdesk-server-pro   "hbbs"    8 seconds ago   Up 7 seconds                                      hbbs
root@hz:~# sudo docker images
REPOSITORY                     TAG       IMAGE ID       CREATED        SIZE
rustdesk/rustdesk-server-pro   latest    a3d9d43a3d1d   5 days ago     193MB
rustdesk/makepkg               latest    86a981e2e18f   2 months ago   2.23GB
```

Para mais detalhes, verifique [isto](https://www.cherryservers.com/blog/how-to-update-docker-image).

## Instalei com o script, como posso iniciar e parar serviços?
Os serviços usam systemd então podem ser iniciados e parados usando `sudo systemctl stop|start|restart rustdesk-hbbs|rustdesk-hbbr` ex. `sudo systemctl restart rustdesk-hbbs`.

## Instalei com o script, como posso ver os logs do Linux?
Os logs são armazenados em `/var/log/rustdesk-server`, você pode vê-los usando `tail /var/log/rustdesk-server/hbbs.log` ou `tail /var/log/rustdesk-server/hbbs.error`.

## Instalei com o script, como posso verificar o status dos serviços RustDesk?
Para verificar o status `sudo systemctl status rustdesk-hbbs|rustdesk-hbbr` ex. `sudo systemctl status rustdesk-hbbs`.

## Como posso alterar a senha do admin?
1. Vá para `https://rustdesk.yourdomain.com` ou `http://youripaddress:21114`.
2. Faça login com o nome de usuário `admin` e senha `test1234`.
3. Clique em `admin` no canto superior direito.
4. Clique em `Configurações`.
5. Digite sua nova senha nas caixas fornecidas.

## Como posso mover minha licença para um novo servidor?
Veja [aqui](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/license/#invoices-and-migration).

## E-mails não estão funcionando do meu VPS
Muitos provedores de VPS bloqueiam as portas 465 e 25.

Uma maneira simples de verificar é usando telnet. Para testar no terminal Linux digite `telnet your.mailserver.com 25`. No Windows use PowerShell com `Test-NetConnection -ComputerName your.mailserver.com -Port 25`.

Seu servidor de e-mail pode não estar usando a porta 25. Certifique-se de estar usando as portas corretas.

## Posso implantar RustDesk usando PowerShell ou similar?
Claro, você pode encontrar scripts para auxiliar na implantação [aqui](https://rustdesk.com/docs/en/self-host/client-deployment/).

## Como posso relatar um bug?
Relate via [GitHub](https://github.com/rustdesk/rustdesk-server-pro/issues).

## Por que se estou auto-hospedando isso não é gratuito e código aberto?
1. RustDesk se tornou um trabalho em tempo integral para várias pessoas, elas têm vidas, esposas, empregos e filhos que exigem atenção e custam dinheiro!
2. Queremos estar aqui e continuar fazendo grandes progressos nos próximos anos.
3. A versão código aberto continuará sendo código aberto e encorajamos outros a fazer desenvolvimentos em linha com a licença AGPL.

## Não consigo me conectar a dispositivos em grupos diferentes, por quê?
Isso é facilmente resolvido, você precisa permitir acesso entre grupos.
1. Adicione novos grupos.
2. Clique em `Editar`.
3. Selecione os grupos relevantes aos quais você quer acesso.

## Como posso obter configurações automaticamente?
As configurações são geradas automaticamente.
1. Baixe os clientes mais recentes do [GitHub](https://github.com/rustdesk/rustdesk/releases/latest).
2. Na página principal do console web clique em `Windows EXE`.
3. Preencha o host e API (se diferente da sua configuração).
4. Clique em `Enviar`.
5. Escaneie o código QR no Android e renomeie o exe para o que foi gerado.

## Vocês oferecem hospedagem para RustDesk Server Pro?
Entre em contato com nossa equipe de [vendas](mailto://sales@rustdesk.com).

## Há algum lugar onde posso ver guias de configuração em vídeo?
Sim! Temos um [Canal do YouTube](https://youtube.com/@RustDesk).

## Por que meus logs / nomes de dispositivos estão vazios?
Certifique-se de que a API esteja configurada corretamente no dispositivo controlado, https://github.com/rustdesk/rustdesk-server-pro/issues/21#issuecomment-1637935750.

## Como posso desinstalar o RustDesk Server Pro?
Execute os seguintes comandos:
```sh
sudo systemctl stop rustdesk-hbbs.service
sudo systemctl disable rustdesk-hbbs.service
sudo systemctl stop rustdesk-hbbr.service
sudo systemctl disable rustdesk-hbbr.service
sudo systemctl daemon-reload
sudo rm /etc/systemd/system/rustdesk-hbbs.service
sudo rm etc/systemd/system/rustdesk-hbbr.service
sudo rm /usr/bin/hbbs
sudo rm /usr/bin/hbbr
sudo rm -rf /var/lib/rustdesk-server/
sudo rm -rf /var/log/rustdesk-server/
```

Se o script instalou o Nginx, remova usando:
```sh
sudo apt remove nginx
```

## Como posso remover dispositivos da lista de dispositivos no console web?
Desative e então excluir ficará disponível.

## Como posso atualizar RustDesk com PowerShell?
```ps
$ErrorActionPreference= 'silentlycontinue'
$rdver = ((Get-ItemProperty  "HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall\RustDesk\").Version)
if ($rdver -eq "1.2.6")
{
    Write-Output "RustDesk $rdver is the newest version."
    Exit
}
if (!(Test-Path C:\Temp))
{
    New-Item -ItemType Directory -Force -Path C:\Temp > null
}
cd C:\Temp
Invoke-WebRequest "https://github.com/rustdesk/rustdesk/releases/download/1.2.6/rustdesk-1.2.6-x86_64.exe" -Outfile "rustdesk.exe"
Start-Process .\rustdesk.exe --silent-install -wait
```

## Erro `Key mismatch`
Configure seu cliente com a [chave correta](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/relay/).

## Erro `Failed to connect to relay server`
Certifique-se de que `hbbr` esteja rodando. Mais informações sobre `hbbr`, você pode encontrar [aqui](https://rustdesk.com/docs/en/self-host/rustdesk-server-oss/install/).
Se o seu `hbbr` não roda na mesma máquina que o `hbbs`, ou você tem múltiplos servidores relay, ou você não o executa na porta padrão `21117`, você precisa informá-lo ao `hbbs` explicitamente. Por favor, verifique [aqui](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/relay/).

## Redefinir MFA para conta Admin
https://github.com/rustdesk/rustdesk/discussions/6576

## Configurar HTTPS para console web manualmente

### 1. Compre um nome de domínio e resolva-o para o endereço IP do seu servidor.
* Compre um nome de domínio de um registrador de domínios como GoDaddy, Namecheap ou Namesilo.
* Resolva o nome de domínio para o endereço IP do seu servidor com uma das seguintes opções:
    - Painel de controle do seu registrador de domínio (recomendado)
    - [Provedores de DNS](https://en.wikipedia.org/wiki/List_of_managed_DNS_providers)

Por exemplo, se você comprar um nome de domínio `example.com` da `Namesilo` e o endereço IP do seu servidor for `123.123.123.123`, você deseja usar o subdomínio `rustdesk.example.com` como seu endereço de console web HTTPS. Você precisa abrir o [link](https://www.namesilo.com/account_domains.php), clicar no botão com dica de ferramenta `Manage dns for the domain`, adicionar um registro `A` com o nome do host `rustdesk` e o endereço IP do seu servidor.
![](/docs/en/self-host/rustdesk-server-pro/faq/images/namesilo-dns-button.png)
![](/docs/en/self-host/rustdesk-server-pro/faq/images/namesilo-add-a-record.png)
![](/docs/en/self-host/rustdesk-server-pro/faq/images/namesilo-dns-table.png)
* Leva algum tempo para o DNS ter efeito, https://www.whatsmydns.net e verifique se o nome de domínio foi resolvido para o endereço IP do seu servidor. O passo 6 depende do resultado correto da resolução. Nos próximos passos, substitua `YOUR_DOMAIN` pelo seu subdomínio, por exemplo, `rustdesk.example.com`.

### 2. Instalar Nginx
* Debian/Ubuntu: `sudo apt-get install nginx`
* Fedora/CentOS: `sudo dnf install nginx` ou `sudo yum install nginx`
* Arch: `sudo pacman -S install nginx`
* openSUSE: `sudo zypper install nginx`
* Gentoo: `sudo emerge -av nginx`
* Alpine: `sudo apk add --no-cache nginx`

Execute `nginx -h` para verificar se foi instalado com sucesso.

### 3. Instalar Certbot
* Método 1: Se `snap` estiver instalado, execute `sudo snap install certbot --classic`.
* Método 2: Usando `python3-certbot-nginx` em vez disso, por exemplo, `sudo apt-get install python3-certbot-nginx` para Ubuntu.
* Método 3: Se os dois métodos acima falharam, tente instalar `certbot-nginx`, por exemplo, `sudo yum install certbot-nginx` para CentOS 7.

Execute `certbot -h` para verificar se foi instalado com sucesso.

### 4. Configurar Nginx
Existem duas maneiras:
* Se os diretórios `/etc/nginx/sites-available` e `/etc/nginx/sites-enabled` existirem, substitua `YOUR_DOMAIN` do seguinte comando pelo seu nome de domínio e execute-o.
```sh
cat > /etc/nginx/sites-available/rustdesk.conf << EOF
server {
    server_name YOUR_DOMAIN;
    location / {
        proxy_set_header        X-Real-IP       \$remote_addr;
        proxy_set_header        X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_pass http://127.0.0.1:21114/;
    }
}
EOF
```
Em seguida, execute `sudo ln -s /etc/nginx/sites-available/rustdesk.conf /etc/nginx/sites-enabled/rustdesk.conf`.

Execute `cat /etc/nginx/sites-available/rustdesk.conf` para garantir que seu conteúdo esteja correto.

* Se os diretórios `/etc/nginx/sites-available` e `/etc/nginx/sites-enabled` não existirem e o diretório `/etc/nginx/conf.d` existir, substitua `YOUR_DOMAIN` do seguinte comando pelo seu nome de domínio e execute-o.
```sh
cat > /etc/nginx/conf.d/rustdesk.conf << EOF
server {
    server_name YOUR_DOMAIN;
    location / {
        proxy_set_header        X-Real-IP       \$remote_addr;
        proxy_set_header        X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_pass http://127.0.0.1:21114/;
    }
}
EOF
```
Execute `cat /etc/nginx/conf.d/rustdesk.conf` para garantir que seu conteúdo esteja correto.

### 5. Habilitar regras de firewall para o domínio
Execute os seguintes comandos:

```sh
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw --force enable
sudo ufw --force reload
```

### 6. Gerar certificado SSL
Substitua `$YOUR_DOMAIN` pelo seu nome de domínio e execute
`sudo certbot --nginx --cert-name $YOUR_DOMAIN --key-type ecdsa --renew-by-default --no-eff-email --agree-tos --server https://acme-v02.api.letsencrypt.org/directory -d $YOUR_DOMAIN`.

Se solicitar `Enter email address (used for urgent renewal and security notices)`, insira seu endereço de e-mail.

Finalmente, o conteúdo de `rustdesk.conf` deve ser assim:
```
server {
    server_name YOUR_DOMAIN;
    location / {
        proxy_set_header        X-Real-IP       $remote_addr;
        proxy_set_header        X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_pass http://127.0.0.1:21114/;
    }

    listen 443 ssl; # managed by Certbot
    ssl_certificate /etc/letsencrypt/live/YOUR_DOMAIN/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/YOUR_DOMAIN/privkey.pem; # managed by Certbot
    include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot
}

server {
    if ($host = YOUR_DOMAIN) {
        return 301 https://$host$request_uri;
    } # managed by Certbot

    server_name YOUR_DOMAIN;
    listen 80;
    return 404; # managed by Certbot
}
```

Aqui estão alguns erros comuns:

* O console imprime `Successfully deployed certificate for YOUR_DOMAIN to /etc/nginx/.../default` em vez de `Successfully deployed certificate for YOUR_DOMAIN to /etc/nginx/.../rustdesk.conf`.

O motivo pode ser que o Certbot não encontra o arquivo `rustdesk.conf`, você pode tentar uma das seguintes soluções:
- Verifique o resultado do passo 5, execute `sudo service nginx restart`.
- Copie as configurações do servidor `server{...}` que contêm `YOUR_DOMAIN` para `rustdesk.conf` e altere `location{...}` para o conteúdo abaixo.

```sh
location / {
    proxy_set_header        X-Real-IP       $remote_addr;
    proxy_set_header        X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_pass http://127.0.0.1:21114/;
}
```

* `too many certificates (5) already issued for this exact set of domains in the last 168 hours`

Solução: Adicione outro nome de domínio ao DNS e altere `YOUR_DOMAIN` para ele, por exemplo, `rustdesk2.example.com`. Em seguida, repita os passos 1, 4, 6.

* `Error getting validation data`

Solução: pode ser causado por firewall, consulte https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/faq/#firewall

Aviso: Execute `sudo service nginx restart` se você alterar o `rustdesk.conf` manualmente.

### 7. Fazer login na página web
* Abra `https://YOUR_DOMAIN` no navegador, faça login usando o nome de usuário padrão "admin" e senha "test1234", depois altere a senha para a sua própria.

### 8. Adicionar suporte WebSocket Secure (WSS) para o servidor de ID e servidor de retransmissão para habilitar comunicação segura em todas as plataformas.

Adicione a seguinte configuração à primeira seção `server` do arquivo `/etc/nginx/.../rustdesk.conf`, depois reinicie o serviço `Nginx`.
O cliente web pode ser acessado via `https://YOUR_DOMAIN/web`. Clientes personalizados podem usar WebSocket definindo `allow-websocket=Y` nas opções avançadas. Se o cliente personalizado com WebSocket habilitado for usado, ele não utilizará TCP/UDP e só poderá se conectar através de um retransmissor (exceto para conexões diretas de IP). Se apenas este cliente habilitado para WebSocket for usado, o servidor pode fechar as portas 21114 a 21119 e manter apenas a porta 443 aberta.




```
    location /ws/id {
        proxy_pass http://127.0.0.1:21118;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "Upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_read_timeout 120s;
    }

    location /ws/relay {
        proxy_pass http://127.0.0.1:21119;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "Upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_read_timeout 120s;
    }
```

A configuração completa é

```
server {
    server_name YOUR_DOMAIN;
    location / {
        proxy_set_header        X-Real-IP       $remote_addr;
        proxy_set_header        X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_pass http://127.0.0.1:21114/;
    }

    location /ws/id {
        proxy_pass http://127.0.0.1:21118;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "Upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_read_timeout 120s;
    }

    location /ws/relay {
        proxy_pass http://127.0.0.1:21119;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "Upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_read_timeout 120s;
    }

    listen 443 ssl; # managed by Certbot
    ssl_certificate /etc/letsencrypt/live/YOUR_DOMAIN/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/YOUR_DOMAIN/privkey.pem; # managed by Certbot
    include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot
}

server {
    if ($host = YOUR_DOMAIN) {
        return 301 https://$host$request_uri;
    } # managed by Certbot

    server_name YOUR_DOMAIN;
    listen 80;
    return 404; # managed by Certbot
}
```

{{% notice note %}}
Se você já implantou anteriormente para clientes web e deseja usá-lo em todas as plataformas, você precisa adicionar `proxy_read_timeout`.
{{% /notice %}}

### 9. Contornar CORS se estiver usando o cliente web público RustDesk `https://rustdesk.com/web`

Você precisa adicionar o seguinte na seção `location /` do `/etc/nginx/.../rustdesk.conf` para contornar a limitação de CORS dos navegadores. Pule este passo se você estiver usando seu próprio cliente web.

```
        if ($http_origin ~* (https?://(www\.)?rustdesk\.com)) {
            add_header 'Access-Control-Allow-Origin' "$http_origin" always;
            add_header 'Access-Control-Allow-Methods' 'GET, POST, PUT, DELETE, PATCH, OPTIONS' always;
            add_header 'Access-Control-Allow-Headers' 'Origin, Content-Type, Accept, Authorization' always;
            add_header 'Access-Control-Allow-Credentials' 'true' always;
        }
        if ($request_method = 'OPTIONS') {
            add_header 'Access-Control-Allow-Origin' "$http_origin" always;
            add_header 'Access-Control-Allow-Methods' 'GET, POST, PUT, DELETE, PATCH, OPTIONS' always;
            add_header 'Access-Control-Allow-Headers' 'Origin, Content-Type, Accept, Authorization' always;
            add_header 'Access-Control-Allow-Credentials' 'true' always;
            add_header 'Content-Length' 0;
            add_header 'Content-Type' 'text/plain charset=UTF-8';
            return 204;
        }
```

## SELinux
Se `Waiting for RustDesk Relay service to become active...` aparecer durante a instalação, pode ser causado pelo SELinux:

```sh
sudo semanage fcontext -a -t NetworkManager_dispatcher_exec_t 'hbbs'
sudo semanage fcontext -a -t NetworkManager_dispatcher_exec_t 'hbbr'
sudo restorecon -v '/usr/bin/hbbs'
sudo restorecon -v '/usr/bin/hbbr'
```

## Firewall
### Firewall da nuvem
Se executando em AWS/Azure/Google/DigitalOcean, abra as portas UDP (21116) e TCP (21114-21119) no painel do provedor de nuvem.

- [AWS] https://docs.aws.amazon.com/network-firewall/latest/developerguide/getting-started.html
- [Azure] https://learn.microsoft.com/en-us/azure/virtual-network/network-security-groups-overview
- [Google] https://cloud.google.com/firewall/docs/firewalls
- [DigitalOcean] https://docs.digitalocean.com/products/networking/firewalls/

### Firewall do servidor local
RustDesk configura firewall com `ufw`. Pode não funcionar em algumas distros como CentOS 9, você pode tentar com `firewall-cmd`:
```sh
sudo firewall-cmd --permanent --add-port=21115/tcp
sudo firewall-cmd --permanent --add-port=21116/tcp
sudo firewall-cmd --permanent --add-port=21117/tcp
sudo firewall-cmd --permanent --add-port=21118/tcp
sudo firewall-cmd --permanent --add-port=21119/tcp
sudo firewall-cmd --permanent --add-port=21116/udp
sudo firewall-cmd --reload
```

Se usando IP:

```sh
sudo firewall-cmd --permanent --add-port=21114/tcp
```

Se usando DNS/Domínio:

```sh
sudo firewall-cmd --permanent --add-port=80/tcp
sudo firewall-cmd --permanent --add-port=443/tcp
```

Após o acima, execute `sudo firewall-cmd --reload` para recarregar o firewall.

## Após alterar a senha do admin no console web não consigo fazer login. Há uma maneira simples de redefinir a senha?
1. Certifique-se de ter `rustdesk-utils` instalado. Se não, pode obtê-lo [aqui](https://github.com/rustdesk/rustdesk-server-pro).
2. O comando é `rustdesk-utils set_password username password`. Se funcionar, dirá *Done*.

Você também precisa executar o comando da pasta onde o banco de dados está, ou seja, `/var/lib/rustdesk-server`.

Você também tem os seguintes outros comandos `genkeypair`, `validatekeypair [public key] [secret key]`, `doctor [rustdesk-server]`, `reset_email_verification` e `reset_2fa_verification` que podem ser usados com `rustdesk-utils`.

https://github.com/rustdesk/rustdesk-server-pro/discussions/183

## Adicionar certificado CA raiz no contêiner Docker (para falha TLS com SMTP, OIDC etc.)
https://github.com/rustdesk/rustdesk-server-pro/issues/99#issuecomment-2235014703
