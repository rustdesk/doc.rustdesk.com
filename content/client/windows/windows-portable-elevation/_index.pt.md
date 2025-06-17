---
title: Elevação Windows Portátil
weight: 49
---

Programas portáteis do Windows não têm privilégios de administrador, o que pode levar aos seguintes problemas:

- A tela não pode ser transmitida quando a janela UAC (Controle de Conta de Usuário) aparece.
- Quando uma janela elevada, como o Gerenciador de Tarefas, aparece, o mouse fica sem resposta.

Ao elevar privilégios, o RustDesk pode criar um processo com privilégios de administrador durante a inicialização ou uma sessão, permitindo que execute capturas de tela e operações do mouse, evitando assim os problemas acima.

## Elevar na inicialização

Dessa forma, usuários remotos não precisam solicitar elevação ao conectar. Existem dois métodos:

* Método 1: Altere o nome do programa portátil para incluir `-qs-` (versões 1.2.0, 1.2.1, 1.2.2, 1.2.3 terminam com `qs.exe`). Clique com o botão esquerdo do mouse para executar, clique em `Aceitar` na janela UAC.

* Método 2: Clique com o botão direito e execute como administrador.

## Elevar no lado controlado

O lado controlado pode clicar diretamente em `Aceitar e Elevar` ao conectar, ou clicar em `Elevar` quando já conectado.

| Conectando | Conectado |
| :---: | :---: |
| ![](/docs/en/client/windows/windows-portable-elevation/images/cm_unauth.jpg) | ![](/docs/en/client/windows/windows-portable-elevation/images/cm_auth.jpg) |

## Solicitar elevação no lado de controle

Após selecionar `Solicitar Elevação` no menu de ação, a seguinte caixa de diálogo aparecerá. Se você escolher `Pedir ao usuário remoto para autenticação`, você não precisará inserir um nome de usuário e senha, mas o usuário no computador remoto deve ter privilégios de administrador. Se você selecionar `Transmitir o nome de usuário e senha do administrador`, o usuário no computador remoto só precisa aceitar na janela UAC. Após enviar a solicitação, aguarde que o usuário do outro lado aceite a janela UAC. Após a confirmação, uma mensagem de sucesso aparecerá. Note que **ambos os métodos requerem que alguém no lado controlado aceite a janela UAC**. Portanto, se não houver ninguém disponível do outro lado, a elevação não deve ser solicitada no lado de controle.

| Menu | Diálogo |
| :---: | :---: |
| ![](/docs/en/client/windows/windows-portable-elevation/images/menu.png) | ![](/docs/en/client/windows/windows-portable-elevation/images/dialog.png) |
| **Aguardar** | **Sucesso** |
| ![](/docs/en/client/windows/windows-portable-elevation/images/wait.png) | ![](/docs/en/client/windows/windows-portable-elevation/images/success.png) |

## Como Escolher

| Cenário | Método |
| :---: | :---: |
| Nenhuma elevação necessária | Instalar o programa |
| Nenhum usuário disponível no lado controlado | Renomear<br/>*ou*<br/> Executar como administrador |
| Usuário disponível no lado controlado<br/>*e*<br/> Elevação imediata ao conectar<br/>*e*<br/> Conexão por aceitar-clique | Clicar em `Aceitar e Elevar` ao receber a conexão no lado controlado |
| Usuário disponível no lado controlado<br/>*e*<br/> Elevação conforme necessário | Clicar em `Elevar` na janela de gerenciamento de conexão no lado controlado<br/>*ou*<br/> Solicitar elevação no lado de controle |