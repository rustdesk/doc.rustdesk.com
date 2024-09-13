---
title: Instalação
weight: 10
---

Instalação do RustDesk
Este documento explica como instalar o RustDesk em seu próprio servidor.

### Tutoriais em Vídeo
Existem vários tutoriais em vídeo no [YouTube](https://github.com/rustdesk/rustdesk/wiki/FAQ#video-tutorials.) (em inglês).

### Instalar seu próprio servidor como serviço systemd usando um script de instalação simples
O script está hospedado no [Techahold](https://github.com/techahold/rustdeskinstall) e tem suporte no nosso [Discord](https://discord.com/invite/nDceKgxnkV).

Atualmente, o script fará o download e configurará os servidores Relay e Signal (hbbr e hbbs), gerará configurações e as hospedará em uma página da web protegida por senha para implantação simples nos clientes.

#### Requisitos
Você precisa ter o Linux instalado. O script foi testado e funciona com CentOS Linux 7/8, Ubuntu 18/20 e Debian. Um servidor com 1 CPU, 1 GB de RAM e 10 GB de disco é suficiente para executar o RustDesk.

#### Como instalar o servidor
Configure seu firewall no servidor antes de executar o script.

Certifique-se de ter acesso via SSH ou outro método antes de configurar o firewall. Os comandos de exemplo para UFW (sistemas baseados em Debian) são:
```
ufw allow proto tcp from YOURIP to any port 22
```

Se você tiver o UFW instalado, use os seguintes comandos para configurar o firewall (porta 8000 somente necessária se você quiser usar os arquivos de instalação gerados automaticamente):
```
ufw allow 21114:21119/tcp
ufw allow 8000/tcp
ufw allow 21116/udp
sudo ufw enable
```

Execute os seguintes comandos:
```
wget https://raw.githubusercontent.com/techahold/rustdeskinstall/master/install.sh
chmod +x install.sh
./install.sh
```
Também há um script de atualização no repositório do [Techahold's](https://github.com/techahold/rustdeskinstall) (em inglês).

### Instalar seu próprio servidor como serviço systemd usando arquivo deb para distribuições Debian

Faça o [Download](https://github.com/rustdesk/rustdesk-server/releases/latest) dos arquivos deb e instale-os com `apt-get -f install <nome_do_arquivo>.deb` ou `dpkg -i <nome_do_arquivo>.deb`.

### Configurar sua própria instância de servidor manualmente

#### PASSO 1: Baixe os programas do servidor
Faça o [Download](https://github.com/rustdesk/rustdesk-server/releases/latest).

Versões fornecidas para plataformas:

- Linux
- Windows

O tutorial abaixo é baseado na compilação do Linux.

Existem dois executáveis e uma pasta:

- `hbbs`: Servidor de ID/Encontro do RustDesk
- `hbbr`: Servidor Relay do RustDesk

Eles são compilados no CentOS Linux 7, testados no CentOS Linux 7/8 e Ubuntu 18/20.

##### Requisitos do Servidor

Os requisitos de hardware são muito baixos; a configuração mínima de um servidor básico em nuvem é suficiente, e os requisitos de CPU e memória são mínimos. Você também pode usar um Raspberry Pi ou algo semelhante. Em relação ao tamanho da rede, se a conexão direta por perfuração de túnel TCP falhar, o tráfego do relay será consumido. O tráfego de uma conexão relay fica entre 30 K/s e 3 M/s (tela de 1920x1080), dependendo das configurações de resolução e atualização da tela. Se for apenas para demanda de trabalho de escritório, o tráfego fica em torno de 100 K/s.

#### PASSO 2: Execute hbbs e hbbr no seu servidor
Sugerimos usar o [PM2](https://pm2.keymetrics.io/) (em inglês) para gerenciar seu serviço.

##### Opção 1
Executar hbbs/hbbr sem PM2.

```sh
./hbbs 
./hbbr
```

##### Opção 2
Executar hbbs/hbbr com PM2.

```sh
pm2 start hbbs 
pm2 start hbbr
```

<a name="demo"></a>
{{% notice note %}}
O PM2 requer Node.js v16+. Se você não conseguir executar o PM2 (por exemplo, não consegue ver `hbbs/hbbr` em `pm2 list`), faça o [download](https://nodejs.org/pt) e instale a versão LTS do Node.js. Para configurar a execução automática do `hbbs/hbbr` após a reinicialização, use os comandos `pm2 save` e `pm2 startup`. Saiba mais sobre o [PM2](https://pm2.keymetrics.io/docs/usage/quick-start/) (em inglês). Outra ferramenta útil para seus logs é o [pm2-logrotate](https://github.com/keymetrics/pm2-logrotate) (em inglês).

{{% /notice %}}

#### Portas

Por padrão, o `hbbs` escuta nas portas **21114** (TCP, para console web, disponível somente na versão Pro), **21115** (TCP), **21116** (TCP/UDP) e **21118** (TCP). O `hbbr` escuta nas portas **21117** (TCP) e **21119** (TCP). Certifique-se de abrir essas portas no firewall. **Observe que a porta 21116 deve estar habilitada para TCP e UDP.** A porta **21115** é usada para o teste de tipo NAT, a porta **21116/UDP** é usada para o serviço de registro de ID e pulsação, a porta **21116/TCP** é usada para o serviço de conexão e perfuração de tunel TCP, a porta **21117** é usada para os serviços Relay e as portas **21118** e **21119** são usadas para suportar clientes web. *Se você não precisa de suporte a cliente web (portas **21118** e **21119**), as portas correspondentes podem ser desabilitadas.*

- TCP (**21114, 21115, 21116, 21117, 21118, 21119**)
- UDP (**21116**)
Execute o comando com a opção `-h` para ver a ajuda caso queira escolher sua própria porta.

#### PASSO 3: [Set hbbs/hbbr address on client-side](/docs/pt/self-host/client-configuration/)

### Chave

A chave é obrigatória, mas você não precisa defini-la manualmente. Quando o `hbbs` é executado pela primeira vez, ele gera automaticamente um par de chaves criptografadas, privada e pública (localizadas respectivamente nos arquivos `id_ed25519` e `id_ed25519.pub` no diretório de execução). O principal objetivo dessas chaves é a criptografia da comunicação.

Se você não preencheu o campo "Key:" (o conteúdo do arquivo de chave pública `id_ed25519.pub`) na etapa anterior, isso não afeta a conexão, mas a conexão não poderá ser criptografada.

```sh
cat ./id_ed25519.pub
```

Se você quiser alterar a chave, remova os arquivos `id_ed25519` e `id_ed25519.pub` e reinicie o `hbbs/hbbr`. O `hbbs` gerará um novo par de chaves.

{{% notice note %}}
Se você estiver usando o docker-compose e as chaves não existirem, a inicialização dos contêineres criará chaves diferentes nas pastas hbbs e hbbr.

Você pode criar chaves manualmente no hbbs e copiá-las para o hbbr antes de iniciar os contêineres.

Ou você pode parar o contêiner hbbr, copiar as chaves do hbbs para a pasta hbbr e reiniciar o contêiner.
{{% /notice %}}
