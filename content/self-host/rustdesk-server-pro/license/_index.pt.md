---
title: Licença
weight: 15
---

### Comprar licença

Por favor obtenha sua licença em [https://rustdesk.com/pricing.html](https://rustdesk.com/pricing.html), digite um endereço de email válido na página de checkout do Stripe. A licença (e a fatura em um email separado) será enviada para seu email uma vez que o pagamento seja concluído com sucesso.

![](/docs/en/self-host/rustdesk-server-pro/license/images/stripe.jpg)

### Definir licença

Você será obrigado a inserir a licença no console web (`http://<rustdesk-server-pro-ip>:21114`), ou alterar a licença mais tarde.

| Definir licença | Alterar licença |
| --- | --- |
| ![](/docs/en/self-host/rustdesk-server-pro/license/images/set.png) | ![](/docs/en/self-host/rustdesk-server-pro/license/images/change.png) |

### Renovar/atualizar licença

Renovar/atualizar licença pode ser encontrado através do [portal de licença self-service](https://rustdesk.com/self-host/account/) como descrito abaixo, faça login com o email que você usou para comprar a licença como a imagem acima.

| Página de licença com ações de renovação/atualização | Janela de atualização |
| --- | --- |
| ![](/docs/en/self-host/rustdesk-server-pro/license/images/renew.jpg?v2) | ![](/docs/en/self-host/rustdesk-server-pro/license/images/upgrade.png) |

Após fazer o pagamento, por favor atualize a licença [como abaixo](/docs/en/self-host/rustdesk-server-pro/license/#refresh-license) para ativá-la.

#### Atualizar licença
Após o pagamento, você precisa prosseguir para o console web para ativá-la manualmente como abaixo. Apenas clique em `Editar`, depois `OK`, não precisa editar nada, porque sua chave de licença permanece a mesma.

![](/docs/en/self-host/rustdesk-server-pro/license/images/updatelic.jpg)

### Faturas, Recuperação de Licença e Migração

A licença só pode ser usada em uma máquina (apenas para hbbs, hbbr não requer licença), se você quiser migrar para outra máquina, recuperar sua licença ou baixar faturas, por favor vá para [https://rustdesk.com/self-host/account/](https://rustdesk.com/self-host/account/). Faça login com o endereço de email usado para checkout do Stripe, desvincule a máquina antiga da qual você quer migrar como abaixo, quando você definir a licença no console web do novo servidor, ela atribuirá a licença e se registrará automaticamente no console.

![](/docs/en/self-host/rustdesk-server-pro/license/images/unbind.jpg)

### Proxy
Se seu servidor não puder acessar a internet para verificar a licença diretamente, você pode adicionar um proxy, ex. `proxy=http://username:password@example.com:8080 ./hbbs`.

Alternativamente, você pode adicionar `proxy=http://username:password@example.com:8080` ao arquivo `.env` no diretório de trabalho (onde residem os arquivos `id_ed25519` / `db.sqlite3`).

`http` pode ser substituído por `https` ou `socks5`. Se não houver `username` / `password` / `port`, pode ser `proxy=http://example.com`.