---
title: Auto-hospedagem
weight: 5
pre: "<b>2. </b>"
---

Se você estiver usando o RustDesk, deverá ter seu próprio servidor RustDesk. Esta documentação ajudará em sua jornada com o RustDesk.

O suporte está disponível através do nosso [Discord](https://discord.com/invite/nDceKgxnkV) para OSS e por [e-mail](support@rustdesk.com) para Pro.

### Configuração básica

[Configure manualmente sua própria instância do servidor.](https://rustdesk.com/docs/pt/self-host/rustdesk-server-oss/install/#configurar-sua-própria-instância-de-servidor-manualmente)

### Portas necessárias

As portas necessárias para a auto-hospedagem do servidor RustDesk dependem muito do seu ambiente e do que você deseja fazer com o RustDesk. Os exemplos mostrados ao longo da documentação geralmente terão todas as portas sugeridas para serem abertas.

Portas principais: \
TCP `21114-21119` \
UDP `21116` 

As portas acima mencionadas `21115-21117` são os requisitos mínimos para o RustDesk funcionar. Elas lidam com os sinais, portas de retransmissão e travessia de NAT.

Além disso, as portas TCP `21118` e `21119` podem ser abertas se você quiser usar o [RustDesk Web Client.](https://rustdesk.com/docs/pt/dev/build/web/)

Para usuários Pro sem um proxy SSL, você precisará abrir a porta TCP `21114` para que a API funcione. Alternativamente, usando um proxy SSL, abra a porta TCP `443`.

### Testar portas abertas
Para verificar se as portas estão abertas e funcionando, você pode usar o comando `test-netconnection domain.com -p 21115` no PowerShell ou o site [CanYouSeeMe.org](https://canyouseeme.org/).

{{% children depth="3" showhidden="true" %}}
