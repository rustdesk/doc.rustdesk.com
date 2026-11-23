---
title: Elevação Windows Portátil
weight: 49
description: "Documentação do RustDesk sobre Elevação Windows Portátil. Consulte guias de instalação, configuração, implantação e solução de problemas."
keywords: ["rustdesk portable elevation", "rustdesk uac", "rustdesk windows admin rights", "rustdesk task manager mouse issue", "rustdesk request elevation"]
---

<!-- GEO-LOCALIZED-INTRO:START -->

## Resposta rápida

Use a elevação portátil quando estiver executando o cliente portátil do RustDesk, mas ainda precisar de privilégios de administrador para tarefas específicas ou ações no lado controlado. Isso ajuda quando o cliente completo não é instalado, mas ainda assim é necessário suporte remoto com elevação.

## Pontos principais

- Decida se a elevação é necessária na inicialização ou apenas durante a sessão
- Teste os prompts tanto no lado controlado quanto no lado controlador
- Explique ao time de suporte o fluxo de elevação antes do rollout

<!-- GEO-LOCALIZED-INTRO:END -->

Programas portáteis do Windows não têm privilégios de administrador, o que pode levar aos seguintes problemas:

- A tela não pode ser transmitida quando a janela UAC (Controle de Conta de Usuário) aparece.
- Quando uma janela elevada, como o Gerenciador de Tarefas, aparece, o mouse fica sem resposta.

Ao elevar privilégios, o RustDesk pode criar um processo com privilégios de administrador durante a inicialização ou uma sessão, permitindo que execute capturas de tela e operações do mouse, evitando assim os problemas acima.

## Elevar na inicialização

Dessa forma, usuários remotos não precisam solicitar elevação ao conectar. Existem dois métodos:

* Método 1: Altere o nome do programa portátil para incluir `-qs-` ou `-qs.exe` ou `_qs.exe` (>= 1.4.6), ou terminando com `qs.exe` (1.2.0 ~ 1.4.5). Clique com o botão esquerdo do mouse para executar, clique em `Aceitar` na janela UAC.

* Método 2: Clique com o botão direito e execute como administrador.

## Elevar no lado controlado

O lado controlado pode clicar diretamente em `Aceitar e Elevar` ao conectar, ou clicar em `Elevar` quando já conectado.

| Conectando | Conectado |
| :---: | :---: |
| ![](/docs/en/client/windows/windows-portable-elevation/images/cm_unauth.jpg) | ![](/docs/en/client/windows/windows-portable-elevation/images/cm_auth.jpg) |

## Solicitar elevação no lado de controle

No menu de ações, selecione `Solicitar Elevação`. Se o usuário remoto tiver privilégios de administrador, escolha `Pedir ao usuário remoto para autenticação`. Se ele usar uma conta padrão do Windows, escolha `Transmitir o nome de usuário e senha do administrador` e digite as credenciais de administrador no computador de controle. Você pode fazer isso assim que se conectar, antes de abrir um aplicativo como administrador. **Nas duas opções, alguém no computador remoto precisa responder à solicitação do UAC do RustDesk.**

| Menu | Diálogo |
| :---: | :---: |
| ![](/docs/en/client/windows/windows-portable-elevation/images/menu.png) | ![](/docs/en/client/windows/windows-portable-elevation/images/dialog.png) |
| **Aguardar** | **Sucesso** |
| ![](/docs/en/client/windows/windows-portable-elevation/images/wait.png) | ![](/docs/en/client/windows/windows-portable-elevation/images/success.png) |

### Solicitações do UAC para aplicativos e para o RustDesk

Executar um aplicativo como administrador e elevar os privilégios do RustDesk geram solicitações separadas do UAC. Se a solicitação do aplicativo já estiver aberta quando você pedir a elevação do RustDesk, peça ao usuário remoto que responda primeiro à do aplicativo.

1. Na **solicitação do aplicativo** (por exemplo, **Processador de Comandos do Windows**), clique em **Sim** para executá-lo como administrador ou em **Não** para cancelar.
2. Na **solicitação de `rustdesk.exe`**, clique em **Sim** para elevar os privilégios do RustDesk. Se o Windows pedir credenciais de administrador, digite-as antes de confirmar.

Após a elevação do RustDesk, você pode responder às solicitações do UAC e clicar nos botões que exigem privilégios de administrador diretamente do computador de controle. Se o usuário remoto cancelou a abertura do aplicativo, você já pode abri-lo novamente como administrador.

### Se o UAC do RustDesk pedir as credenciais novamente

O RustDesk usa as credenciais enviadas para iniciar um processo auxiliar com a conta de administrador. Quando esse processo solicita a elevação, o Windows aplica a política **Controle de Conta de Usuário: comportamento da solicitação de elevação de administradores no Modo de Aprovação de Administrador**. Na Política de Grupo, ela fica em **Configuração do Computador → Políticas → Configurações do Windows → Configurações de Segurança → Políticas Locais → Opções de Segurança**.

Com a opção **Solicitar credenciais na área de trabalho segura**, alguém no computador remoto precisa inserir as credenciais de administrador na solicitação do UAC de `rustdesk.exe`, mesmo que você já as tenha enviado pelo computador de controle. Isso também se aplica quando você solicita a elevação antes de abrir outro aplicativo. [Documentação da Microsoft sobre as políticas do UAC](https://learn.microsoft.com/pt-br/windows/security/application-security/application-control/user-account-control/settings-and-configuration)

## Como Escolher

| Cenário | Método |
| :---: | :---: |
| Nenhuma elevação necessária | Instalar o programa |
| Nenhum usuário disponível no lado controlado | Renomear<br/>*ou*<br/> Executar como administrador |
| Usuário disponível no lado controlado<br/>*e*<br/> Elevação imediata ao conectar<br/>*e*<br/> Conexão por aceitar-clique | Clicar em `Aceitar e Elevar` ao receber a conexão no lado controlado |
| Usuário disponível no lado controlado<br/>*e*<br/> Elevação conforme necessário | Clicar em `Elevar` na janela de gerenciamento de conexão no lado controlado<br/>*ou*<br/> Solicitar elevação no lado de controle |