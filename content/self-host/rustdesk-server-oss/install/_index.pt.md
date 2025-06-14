---
title: Instalação
weight: 1
---

## Tutoriais em vídeo
Há muitos tutoriais em vídeo no YouTube, https://github.com/rustdesk/rustdesk/wiki/FAQ#video-tutorials.

## Requisitos do Servidor
Os requisitos de hardware são muito baixos; a configuração mínima de um servidor na nuvem básico é suficiente, e os requisitos de CPU e memória são mínimos. Você também pode usar um Raspberry Pi ou algo similar. Em relação ao tamanho da rede, se a conexão direta TCP hole punching falhar, o tráfego de retransmissão será consumido. O tráfego de uma conexão de retransmissão está entre 30 K/s e 3 M/s (tela 1920x1080) dependendo das configurações de resolução e atualização da tela. Se for apenas para demanda de trabalho de escritório, o tráfego fica em torno de 100 K/s.

## Firewall
Se você tem UFW instalado, use os seguintes comandos para configurar o firewall:
```
ufw allow 21114:21119/tcp
ufw allow 21116/udp
sudo ufw enable
```

## Instalar
### Método 1: Docker (Recomendado)

```
bash <(wget -qO- https://get.docker.com)
wget rustdesk.com/oss.yml -O compose.yml
sudo docker compose up -d
```

Para mais detalhes, verifique [Docker](/docs/en/self-host/rustdesk-server-oss/docker/).

### Método 2: Instale seu próprio servidor como serviço systemd usando um script de instalação simples de executar
O script está hospedado no [Techahold](https://github.com/techahold/rustdeskinstall) e é suportado no nosso [Discord](https://discord.com/invite/nDceKgxnkV).

Atualmente, o script baixará e configurará os Servidores de Retransmissão e Sinal (hbbr e hbbs), gerará configurações e os hospedará em uma página web protegida por senha para implantação simples em clientes.

Execute os seguintes comandos:
```
wget https://raw.githubusercontent.com/techahold/rustdeskinstall/master/install.sh
chmod +x install.sh
./install.sh
```

Há também um script de atualização no repositório do [Techahold](https://github.com/techahold/rustdeskinstall).

A partir daí, anote o IP/DNS e a Chave mostrados no final da instalação e insira-os nas configurações do seu cliente Configurações > Rede > servidor ID/Retransmissão nos campos `servidor ID` e `Chave`, respectivamente, deixando os outros campos em branco (veja a nota abaixo).

### Método 3: Instale seu próprio servidor como serviço systemd usando arquivo deb para distribuições debian

Por favor [Baixe](https://github.com/rustdesk/rustdesk-server/releases/latest) os arquivos deb você mesmo e instale com `apt-get -f install <filename>.deb` ou `dpkg -i <filename>.deb`.

## Configurar cliente
Por favor verifique [isto](/docs/en/self-host/client-configuration/#2-manual-config).