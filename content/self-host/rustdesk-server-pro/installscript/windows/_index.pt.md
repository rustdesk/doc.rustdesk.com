---
title: Instalação no Windows (deprecated)
weight: 5
---

{{% notice note %}}
A política de segurança do Windows é complicada, se este tutorial não funcionar para você, ou você encontrar conexão instável, migre para um servidor Linux.
{{% /notice %}}

{{% notice note %}}
A versão GUI, `RustDeskServer.setup.exe` não é mais mantida, não recomendada.
{{% /notice %}}

## Instalar

O Microsoft Visual C++ Redistributable é necessário para executar rustdesk no Windows. Você pode baixá-lo [aqui](https://learn.microsoft.com/en-us/cpp/windows/latest-supported-vc-redist)

1. Obtenha sua licença em [https://rustdesk.com/pricing.html](https://rustdesk.com/pricing.html), consulte a página de [licença](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/license/) para mais detalhes.
2. Baixe o instalador do Windows do [GitHub](https://github.com/rustdesk/rustdesk-server-pro/releases/latest).
3. Descompacte o instalador do Windows.
4. Execute o Instalador e siga os passos na tela. Ou instale manualmente com [PM2 ou NSSM](https://rustdesk.com/docs/en/self-host/rustdesk-server-oss/windows/).
5. Uma vez concluído, abra o RustDesk Server.
6. Siga as instruções que o guiam pela instalação.
7. Clique em `Services` e depois em `Start`.
8. Uma vez que a instalação esteja completa vá para `http://youripaddress:21114`.
9. Faça login com o nome de usuário `admin` e senha `test1234`.
10. Digite seu código de licença comprado no passo 1.

## Usar IIS como Proxy

Certifique-se de que `Dynamic Content Compression` esteja instalado (esta é uma Funcionalidade do IIS que pode ser instalada com Funções do Servidor).
1. Abra o IIS (Ou instale-o).
2. Crie um novo website para RustDesk com as vinculações (Idealmente 443) e certificado relevante. As configurações básicas devem apontar para uma pasta em branco. (Se você usar o site padrão, certifique-se de que não há outros arquivos na pasta).
3. No IIS, instale [Application Request Routing](https://www.iis.net/downloads/microsoft/application-request-routing) e [URL Rewrite](https://learn.microsoft.com/en-us/iis/extensions/url-rewrite-module/using-the-url-rewrite-module).

## Application Request Routing

1. Sob o Host do Servidor IIS abra Application Request Routing.
2. Vá para Server Proxy Settings.
3. Habilite proxy e todas as configurações aparecerão, você pode deixá-las como os padrões.
4. Salve as configurações e podemos ir para o próximo passo: URL Rewrite.

## URL Rewrite

1. Abra o site no IIS no painel esquerdo e clique duas vezes em URL Rewrite.
2. Clique em `Add rules`.
3. Configure uma nova regra de proxy reverso.
4. Configure o endereço local (o endereço 21114) \
Regra de Entrada – o endereço interno RustDesk 21114 \
Regras de Saída – `From` é o endereço interno RustDesk 21114 e `To` é o endereço externo. \
Nota: Nenhum http / https antes dos endereços – eles são tratados automaticamente. Além disso, certifique-se de que todos os endereços sejam acessíveis tanto interna quanto externamente.

## Compressão

1. Desabilite `Dynamic Content Compression`.

## Solução de problemas

Se você tiver um erro 500.52 adicione as variáveis mencionadas: [IIS acting as reverse proxy: Where the problems start](https://techcommunity.microsoft.com/t5/iis-support-blog/iis-acting-as-reverse-proxy-where-the-problems-start/ba-p/846259).

Você pode precisar alterar suas Configurações SSL para "Require SSL → Ignore".
