---
title: Auto-hospedagem
description: "Aprenda como auto-hospedar seu próprio servidor RustDesk. Guia completo cobrindo instalação, configuração e implantação da infraestrutura do servidor RustDesk para acesso seguro à área de trabalho remota."
keywords: ["rustdesk auto-hospedagem", "servidor rustdesk", "servidor desktop remoto", "guia auto-hospedagem", "instalação rustdesk", "hbbs hbbr", "servidor rustdesk pro"]
weight: 5
pre: "<b>2. </b>"
---

Se você está usando RustDesk, você deve ter seu próprio servidor RustDesk. Estes documentos irão ajudá-lo em sua jornada com o RustDesk.

O suporte está disponível através do nosso [Discord](https://discord.com/invite/nDceKgxnkV) para OSS e por [email](mailto:support@rustdesk.com) para Pro.

## Como funciona o servidor auto-hospedado?

Tecnicamente há dois executáveis (servidores):

- `hbbs` - Servidor de ID RustDesk (encontro / sinalização), escuta em TCP (`21114` - para http apenas no Pro, `21115`, `21116`, `21118` para web socket) e UDP (`21116`)
- `hbbr` - Servidor de retransmissão RustDesk, escuta em TCP (`21117`, `21119` para web socket)

Quando você instala via script de instalação / docker compose / deb, ambos os serviços serão instalados.

Aqui estão as [ilustrações](https://github.com/rustdesk/rustdesk/wiki/How-does-RustDesk-work%3F) de como o cliente RustDesk se comunica com `hbbr` / `hbbs`.

Enquanto o RustDesk estiver rodando em uma máquina, a máquina constantemente faz ping do servidor de ID (`hbbs`) para tornar conhecido seu endereço IP e porta atuais.

Quando você inicia uma conexão do computador A para o computador B, o computador A contata o servidor de ID e solicita para se comunicar com o computador B.

O servidor de ID então tenta conectar A e B diretamente um ao outro usando hole punching.

Se o hole punching falhar, A se comunicará com B através do servidor de retransmissão (`hbbr`).

Na maioria dos casos, o hole punching é bem-sucedido, e o servidor de retransmissão nunca é usado.

Aqui está uma discussão sobre [Você deve auto-hospedar um servidor rustdesk?](https://www.reddit.com/r/rustdesk/comments/1cr8kfv/should_you_selfhost_a_rustdesk_server/)

## Portas Necessárias

As portas necessárias para auto-hospedagem do servidor RustDesk dependem amplamente do seu ambiente e do que você quer fazer com o RustDesk. Os exemplos mostrados ao longo da documentação geralmente terão todas as portas sugeridas para serem abertas.

Portas Principais: \
TCP `21114-21119` \
UDP `21116`

- TCP `21114`: Usada para o servidor API HTTP no RustDesk Server Pro.
- TCP `21115`: Usada para o teste de tipo NAT.
- UDP `21116`: Usada para registro de dispositivos.
- TCP `21116`: Usada para registro de dispositivos e NAT hole punching.
- TCP `21117`: Usada para comunicação de retransmissão.
- TCP `21118`: Usada para comunicação WebSocket.
- TCP `21119`: Usada para comunicação WebSocket.

As portas `21115`-`21117` são as portas mínimas necessárias para o RustDesk funcionar. Elas lidam com sinalização, retransmissão e travessia NAT.

Para configuração WSS, as portas TCP `21118` e TCP `21119` geralmente não precisam ser expostas externamente porque são acessadas internamente pelo proxy reverso, como o Nginx. Se você não usa WebSocket, essas portas não precisam ser expostas. Consulte esta [configuração de exemplo do Nginx](/docs/en/self-host/rustdesk-server-pro/faq/#8-add-websocket-secure-wss-support-for-the-id-server-and-relay-server-to-enable-secure-communication-for-all-platforms).

Para usuários Pro sem um proxy SSL, você precisa abrir a porta TCP `21114` para que a API funcione. Se HTTPS (`443`) estiver configurado para o servidor, TCP `21114` não precisa ser exposto à Internet.

O RustDesk também oferece suporte a um modo de implantação em que apenas TCP `443` é exposto e todas as outras portas ficam fechadas. Com essa configuração, a comunicação só pode funcionar por retransmissão WSS, e conexões diretas ponto a ponto não ficam disponíveis.

{{% children depth="4" showhidden="true" %}}
