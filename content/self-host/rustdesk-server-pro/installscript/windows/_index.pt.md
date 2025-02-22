---
title: Instalação no Windows
weight: 5
---

{{% notice note %}}
A política de segurança do Windows pode ser complexa. Se este tutorial não funcionar para você ou se você encontrar uma conexão instável, considere migrar para um servidor Linux.
{{% /notice %}}

{{% notice note %}}
A versão GUI, `RustDeskServer.setup.exe`, não está mais sendo mantida e não é recomendada.
{{% /notice %}}

### Instalação

1. Obtenha sua licença acessando [https://rustdesk.com/pricing.html](https://rustdesk.com/pricing.html) verifique a pagina da [licença](https://rustdesk.com/docs/pt/self-host/rustdesk-server-pro/license/) para obeter mais detalhes.
2. Baixe o instalador do Windows a partir do [GitHub](https://github.com/rustdesk/rustdesk-server-pro/releases/latest).
3. Descompacte o arquivo baixado.
4. Execute o instalador e siga as instruções na tela. Você também pode instalar manualmente usando [PM2 ou NSSM](https://rustdesk.com/docs/pt/self-host/rustdesk-server-oss/windows/).
5. Após concluir a instalação, abra o RustDesk Server.
6. Siga as instruções para concluir a configuração.
7. Clique em `Serviços` e depois em `Iniciar`.
8. Assim que a instalação estiver concluída, acesse `http://seu_endereço_ip:21114`.
9. Use o nome de usuário `admin` e a senha `test1234` para fazer login.
10. Digite o código de licença adquirido na etapa 1.

### Usar o IIS como proxy

Observação: Certifique-se de ter o `Dynamic Content Compression` instalado (recurso do IIS que pode ser instalado com as Funções do Servidor).
1. Abra o IIS (ou instale-o, caso necessário).
2. Crie um novo site para o RustDesk com as vinculações (idealmente 443) e o certificado SSL relevante. As configurações básicas devem apontar para uma pasta vazia (se usar o site padrão, certifique-se de que não haja outros arquivos na pasta).
3. No IIS, instale o [Application Request Routing](https://www.iis.net/downloads/microsoft/application-request-routing) (em Inglês) e o [Reescrita de URL](https://learn.microsoft.com/pt-br/iis/extensions/url-rewrite-module/using-the-url-rewrite-module).

### Roteamento de Solicitações de Aplicativo

1. No host do servidor IIS, abra o Roteamento de Solicitações de Aplicativo.
2. Acesse Configurações de Proxy do Servidor.
3. Habilite o proxy e todas as configurações serão exibidas (você pode deixá-las como padrão).
4. Salve as configurações e prossiga para a etapa de Reescrita de URL.

### Reescrita de URL

1. No painel esquerdo do IIS, abra o site e de dois cliques em "Reescrita de URL".
2. Clique em `Adicionar Regras`.
3. Configure uma nova regra de proxy reverso.
4. Defina o endereço local (endereço 21114). \
Regra de entrada - Endereço interno 21114 do RustDesk. \
Regras de saída - `De` é o endereço interno 21114 do RustDesk e `Para` é o endereço externo. \
Observação: Não é necessário incluir http/https antes dos endereços (eles são tratados automaticamente). Além disso, certifique-se de que todos os endereços sejam acessíveis interna e externamente.

### Compressão

Desative o `Dynamic Content Compression`.

### Solução de Problemas

Se você encontrar o erro 500.52, adicione as variáveis mencionadas: [IIS acting as reverse proxy: Where the problems start](https://techcommunity.microsoft.com/t5/iis-support-blog/iis-acting-as-reverse-proxy-where-the-problems-start/ba-p/846259) (em inglês).

Você pode precisar alterar suas Configurações de SSL para "Require SSL → Ignore".
