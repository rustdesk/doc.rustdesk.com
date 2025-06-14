---
title: Auto-hospedagem
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

As `21115-21117` acima são as portas mínimas necessárias para o RustDesk funcionar, estas lidam com as portas de sinal e retransmissão bem como travessia NAT.

As portas TCP `21118` e `21119` são as portas WebSocket para o [Cliente Web RustDesk](https://rustdesk.com/web/), você precisa de um proxy reverso para fazê-lo suportar HTTPS, por favor consulte esta [configuração de exemplo do Nginx](/docs/en/self-host/rustdesk-server-pro/faq/#8-add-websocket-secure-wss-support-for-the-id-server-and-relay-server-to-enable-secure-communication-for-the-web-client).

Para usuários Pro sem um Proxy SSL você precisará abrir a porta TCP `21114` para a API funcionar, alternativamente usando um Proxy SSL abra a porta TCP `443`.

{{% children depth="4" showhidden="true" %}}