---
title: Logs de auditoria
weight: 19
description: "Use os logs de auditoria no console web do RustDesk Server Pro para revisar eventos de conexão, transferência de arquivos, operações do console e alarmes."
keywords: ["rustdesk audit logs", "rustdesk server pro logs", "rustdesk connection logs", "rustdesk file transfer logs", "rustdesk alarm logs", "rustdesk console audit"]
---

Os logs de auditoria no console web do RustDesk Server Pro ajudam administradores a revisar atividades de acesso remoto, transferências de arquivos, mudanças administrativas e alarmes de segurança.

Abra o console web e vá para **Logs** no menu da esquerda. A seção Logs inclui:

- **Conexão**
- **Arquivo**
- **Console**
- **Alarme**

## Logs de conexões

Vá para **Logs > Conexão** para revisar sessões remotas e tipos de conexão relacionados.

Os logs de conexões mostram:

- **Tipo**: Desktop remoto, Transferência de arquivos, Redirecionamento de porta, Visualizar câmera, Terminal ou Não conectado. **Não conectado** significa que a autenticação não teve sucesso.
- **Dispositivo controlado**: O ID e nome do dispositivo de destino.
- **Lado controlador**: O usuário controlador quando o lado controlador está conectado, além do dispositivo controlador, nome do dispositivo e endereço IP.
- **Hora de início**, **Hora de término** e **Duração**.
- **Autenticação**: Método de autenticação primário, opcionalmente seguido por informações de 2FA.
- **Observação**.

![Página de logs de conexões](/docs/en/self-host/rustdesk-server-pro/audit-logs/images/connection-log-page.png)

Os valores de autenticação primária compatíveis incluem:

- Confirmação por clique
- Senha de uso único
- Senha permanente
- Alternar lados

Os valores de 2FA compatíveis incluem:

- Código 2FA
- Dispositivo confiável

### Observações de conexão

O lado controlador pode adicionar uma observação a uma conexão de duas formas:

- Durante uma sessão remota, use a ação **Observação** no menu remoto para adicionar ou atualizar a observação da conexão.

![Caixa de observação de conexão](/docs/en/self-host/rustdesk-server-pro/audit-logs/images/note-box.png)

- Ao final de uma sessão remota, ative **Configurações > Geral > Outros > Pedir observação ao final da conexão** no lado controlador se quiser que o RustDesk peça uma observação quando a sessão terminar.

![Caixa de observação ao fechar conexão](/docs/en/self-host/rustdesk-server-pro/audit-logs/images/close-conn-note-box.png)

A observação é mostrada na coluna **Observação** em **Logs > Conexão**. Usuários que podem visualizar o log de conexão também podem usar o botão de edição na coluna **Observação** para atualizar a observação pelo console web.

### Desconectar uma conexão em execução

Se uma conexão ainda estiver em execução e sua conta tiver permissão para editar esse item de auditoria, a coluna **Ação** mostra **Desconectar**. Clique e confirme a operação para encerrar a conexão em execução.

![Confirmação de desconexão](/docs/en/self-host/rustdesk-server-pro/audit-logs/images/disconnect-confirm.png)

Depois que a conexão é desconectada pelo console web, o lado controlador vê uma mensagem informando que a conexão foi desconectada pelo console web.

![Mensagem desconectado pelo console](/docs/en/self-host/rustdesk-server-pro/audit-logs/images/disconnected-by-console.png)

## Logs de transferência de arquivos

Vá para **Logs > Arquivo** para revisar atividades de transferência de arquivos.

![Página de logs de transferência de arquivos](/docs/en/self-host/rustdesk-server-pro/audit-logs/images/file-transfer-logs.png)

Os logs de transferência de arquivos incluem operações de arquivo de sessões dedicadas de **Transferência de arquivos** e copiar/colar arquivos durante sessões de **Desktop remoto**.

Os logs de transferência de arquivos mostram:

- **Dispositivo controlado**.
- **Lado controlador**: O dispositivo controlador e o usuário controlador quando disponível.
- **Tempo**.
- **Direção**:
  - Dispositivo controlado -> Lado controlador
  - Lado controlador -> Dispositivo controlado
- **Arquivo**: O caminho no dispositivo controlado.
- **Detalhes**: Tamanho de arquivo para um único arquivo, ou contagem de arquivos para transferências com vários arquivos.

Para transferências com vários arquivos, clique na contagem de arquivos na coluna **Detalhes** para abrir o painel de detalhes. Quando a transferência contém mais arquivos do que o painel lista, o painel mostra os 10 maiores arquivos por tamanho.

![Detalhes de transferência de arquivos](/docs/en/self-host/rustdesk-server-pro/audit-logs/images/file-transfer-details.png)

## Logs de alarme

Vá para **Logs > Alarme** para revisar eventos relacionados à segurança.

![Página de logs de alarme](/docs/en/self-host/rustdesk-server-pro/audit-logs/images/alarm-logs.png)

Os logs de alarme mostram:

- **Tipo**.
- **De**: Para alarmes de conta de login, este é o dispositivo de login. Para alarmes de conexão remota, este é o lado controlador.
- **Destino**: Para alarmes de conta de login, esta é a conta de login. Para alarmes de conexão remota, este é o dispositivo controlado.
- **Hora do evento**.

Tipos de alarme de conexão remota incluem:

- Tentativa de acesso fora da lista branca de IP
- Mais de 30 tentativas de acesso consecutivas
- Múltiplas tentativas de acesso em um minuto
- Muitas tentativas de acesso consecutivas de um único prefixo IPv6
- Múltiplas falhas de login no Terminal (Executar como administrador) (nome de usuário/senha incorretos)
- Múltiplas tentativas simultâneas de login no Terminal (Executar como administrador)
- Violação do escopo da sessão

Tipos de alarme de conta de login incluem:

- Mais de 30 tentativas de login consecutivas
- Múltiplas tentativas de login em um minuto
- Múltiplas tentativas de login em uma hora

## Logs de operações do console

Vá para **Logs > Console** para revisar ações realizadas no console web.

![Página de logs de operações do console](/docs/en/self-host/rustdesk-server-pro/audit-logs/images/console-logs.png)

Os logs do console mostram:

- **Tipo**.
- **Usuário**: O usuário do console web que realizou a operação.
- **Operação**: A ação específica.
- **Tempo**.
- **Detalhes**: Campos extras registrados para a operação.

Os tipos incluem:

- Gerenciamento de grupos
- Gerenciamento de usuários
- Gerenciamento de dispositivos
- Gerenciamento de catálogos de endereços
- Gerenciamento de funções de admin
- Gerenciamento de funções de controle

As operações rastreadas incluem login de usuário, mudanças em usuários e dispositivos, desconectar um dispositivo, mudanças em catálogo de endereços, mudanças de 2FA, redefinição de senha, mudanças em funções de admin/controle e assim por diante.

## Visibilidade e retenção de logs

A visibilidade dos logs depende de o usuário ser administrador, de o usuário ter uma [função de admin](/docs/pt/self-host/rustdesk-server-pro/admin-role/) com permissões de logs de auditoria e da configuração em **Configurações > Outros**.

| Tipo de usuário ou configuração | Visibilidade de logs |
| --- | --- |
| Administrador | Pode visualizar todos os logs de auditoria. |
| Função de admin com **Global > Audit Logs-View** | Pode visualizar todos os logs de auditoria, mesmo quando **Somente administrador pode acessar logs** está habilitado. |
| Função de admin com **Individual > Audit Logs-View** | Pode visualizar logs de auditoria pessoais, mesmo quando **Somente administrador pode acessar logs** está habilitado. Isso concede o mesmo escopo de logs pessoais de um usuário comum não administrador, mas não é bloqueado por essa configuração. |
| Usuário não administrador sem permissões de logs de auditoria | Pode visualizar logs de auditoria pessoais apenas quando **Somente administrador pode acessar logs** está desabilitado. |
| **Configurações > Outros > Somente administrador pode acessar logs** habilitado | Usuários não administradores sem permissões de logs de auditoria não podem acessar logs de auditoria. |

Logs pessoais incluem registros de conexão e transferência de arquivos em que um dispositivo atualmente atribuído ao usuário é o dispositivo controlado ou controlador, e registros em que o usuário é o controlador. Para logs de alarme, logs pessoais incluem registros de dispositivos atribuídos ao usuário ou da conta de login do usuário. Para logs de operações do console, logs pessoais incluem registros em que o usuário é o operador.

Use **Configurações > Outros > Retenção de logs (dias)** para controlar por quanto tempo os logs de auditoria são mantidos. Digite `0` para manter todos os logs indefinidamente. Digite um número maior que `0` para excluir automaticamente logs mais antigos que o número especificado de dias. A limpeza é executada uma vez por hora.

## Exportar logs de auditoria

Cada página de logs tem **Exportar como CSV** na barra de ferramentas. O arquivo exportado segue os filtros atuais da página e usa os mesmos valores de tempo mostrados no console web. Cada exportação inclui até 1000 registros, mas você pode usar o filtro **Hora de início** para exportar todos os logs em lotes.

Você também pode usar um [token de API](/docs/pt/self-host/rustdesk-server-pro/console/#auditorias-auditspy) com `audits.py` para consultar logs de auditoria.
