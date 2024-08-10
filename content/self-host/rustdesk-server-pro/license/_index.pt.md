---
title: licença
weight: 15
---

### Aquisição de licença

Por favor, obtenha sua licença em [https://rustdesk.com/pricing.html](https://rustdesk.com/pricing.html). Informe um endereço de e-mail válido na página de pagamento do Stripe. A licença (e a fatura em um e-mail separado) será enviada para o seu e-mail assim que o pagamento for concluído com sucesso.

![](/docs/en/self-host/rustdesk-server-pro/license/images/stripe.jpg)

### Definir licença

Você será solicitado a inserir a licença no console web (`http://<ip-do-servidor-rustdesk-pro>:21114`) ou alterar a licença posteriormente.

| Definir licença | Alterar licença |
| --- | --- |
| ![](/docs/en/self-host/rustdesk-server-pro/license/images/set.png) | ![](/docs/en/self-host/rustdesk-server-pro/license/images/change.png) |

### Renovar/Atualizar licença

A renovação/atualização da licença pode ser encontrada no [portal de autoatendimento de licenças](https://rustdesk.com/self-host/account/), conforme descrito abaixo.

| Página de licença com ações de renovação/atualização | Janela de atualização |
| --- | --- |
| ![](/docs/en/self-host/rustdesk-server-pro/license/images/renew.jpg) | ![](/docs/en/self-host/rustdesk-server-pro/license/images/upgrade.png) |

Após o pagamento, você precisa acessar o console web para ativá-la manualmente como mostrado abaixo. Basta clicar em `Editar` e depois em `OK`, não é necessário editar nada, pois sua chave de licença permanece a mesma.

![](/docs/en/self-host/rustdesk-server-pro/license/images/updatelic.jpg)

### Faturas, Recuperação de Licença e Migração

A licença só pode ser usada em uma máquina (apenas para hbbs, hbbr não requer licença). Se você deseja migrá-la para outra máquina, recuperar sua licença ou baixar faturas, acesse o portal [https://rustdesk.com/self-host/account/](https://rustdesk.com/self-host/account/). Faça login com o endereço de e-mail usado no checkout do Stripe, desvincule a máquina antiga da qual deseja migrar conforme as instruções abaixo. Ao definir a licença no console web do novo servidor, ela será atribuída e registrada automaticamente no console.

![](/docs/en/self-host/rustdesk-server-pro/license/images/unbind.jpg)

### Proxy

Se o seu servidor não consegue acessar a internet para verificar a licença diretamente, você pode adicionar um proxy. Por exemplo: `proxy=http://username:password@example.com:8080 ./hbbs`.

Como alternativa, você pode adicionar `proxy=http://usuario:senha@exemplo.com:8080` ao arquivo `.env` no diretório de trabalho (onde os arquivos `id_ed25519` / `db.sqlite3` estão localizados).

`http` pode ser substituído por `https` ou `socks5`.
Se não houver `usuario` / `senha` / `porta`, pode ser usado `proxy=http://exemplo.com`.
