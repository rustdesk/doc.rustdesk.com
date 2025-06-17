---
title: Configuração do Cliente
weight: 300
pre: "<b>2.3. </b>"
---

## Visão geral

Existem várias maneiras de configurar os clientes RustDesk para usar seu próprio servidor auto-hospedado, cobriremos algumas abaixo.

## 1. Gerador de cliente personalizado (somente Pro, plano básico ou plano personalizado)

Você pode ter seu próprio nome, logotipo, ícone, configuração, assinatura e mais.

Atualmente, Windows X64, Mac Arm64 / X64, [Linux](https://twitter.com/rustdesk/status/1788905463678951787), Android Arm 64 são suportados.

[Vídeo](https://twitter.com/rustdesk/status/1769171628426944539)

![](/docs/en/self-host/client-configuration/images/custom-client-qs.png)
![](/docs/en/self-host/client-configuration/images/web_console_custom_client_config.jpeg)

## 2. Configuração manual

Na página inicial do cliente RustDesk, clique no botão de menu [ &#8942; ] ao lado do seu ID e depois clique em Rede, agora você pode desbloquear as configurações usando privilégios elevados e definir seu `ID`, `Relay`, `API` e `Chave`. É importante notar que esta `Chave` é a chave pública usada para criptografia de conexão, distinta da chave de licença fornecida com sua compra da versão Pro.

![](/docs/en/self-host/client-configuration//docs/en/self-host/client-configuration/images/network-config.png)

Digite o host ou endereço IP `hbbs` na caixa de entrada **Servidor ID** (lado local + lado remoto). Os outros dois endereços podem ser deixados em branco, RustDesk deduzirá automaticamente (se não especialmente configurado), e o Servidor Relay refere-se ao `hbbr` (porta 21117).

por exemplo

```nolang
hbbs.example.com
```

ou

```nolang
hbbs.example.com:21116
```

### Definir `Chave`

Para estabelecer uma conexão criptografada com seu servidor auto-hospedado, você precisa inserir sua chave pública. A chave geralmente é gerada na primeira execução do `hbbs` e pode ser encontrada no arquivo `id_ed25519.pub` em seu diretório de trabalho / pasta de dados.

Como usuário `Pro`, você também poderá recuperar a `Chave` do [console web](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/console/).

![](/docs/en/self-host/rustdesk-server-pro/console//docs/en/self-host/client-configuration/images/console-home.png?v2)

### Definir `Servidor API`

Isso é apenas para usuários `Pro`. Quando você pode fazer login no console web, mas falha ao fazer login no cliente RustDesk, provavelmente você não definiu o `Servidor API` corretamente.

Se seu Servidor API não roda na porta padrão `21114` (você pode não adicionar esta porta ao firewall se vier da versão open source), especifique explicitamente o `Servidor API`.
por exemplo, se seu Servidor API roda na porta HTTPS padrão, especifique o `Servidor API` com `https://hbbs.example.com`.

Se você ainda não consegue confirmar o valor do `Servidor API`, vá para a página de boas-vindas do console web, o `Servidor API` é mostrado na imagem acima (A caixa de entrada com o rótulo `API:`).

## 3. Configuração usando Importar ou Exportar

1. Use os passos [acima](https://rustdesk.com/docs/en/self-host/client-configuration/#manual-config) para configurar o Cliente RustDesk em um dispositivo.
2. Usando a máquina acima, vá para Configurações depois Rede e desbloqueie.
3. Clique em `Exportar Configuração do Servidor`.
4. Cole a string copiada no Bloco de notas ou similar.
5. Vá para o novo cliente, copie o acima para a área de transferência.
6. Vá para Configurações depois Rede no Cliente RustDesk, desbloqueie e clique em `Importar Configuração do Servidor`.
7. Ele colará automaticamente as configurações.
8. Clique em `Aplicar`.

## 4. Configuração automática

A maneira mais fácil de configurar automaticamente é usar os scripts de implantação encontrados [aqui](https://rustdesk.com/docs/en/self-host/client-deployment/).

## 5. Importar configuração do `Pro` via área de transferência

![](/docs/en/self-host/rustdesk-server-pro/console//docs/en/self-host/client-configuration/images/console-home.png?v2)

https://github.com/rustdesk/rustdesk-server-pro/discussions/372#discussioncomment-10473298

## 6. Usar linha de comando `--config`
`rustdesk.exe --config <string-config>`

Você pode obter a string de configuração do console web (você pode vê-la na imagem acima) ou do cliente RustDesk "Configurações → Rede" ([aqui](https://github.com/rustdesk/rustdesk/discussions/7118) há uma discussão sobre isso).