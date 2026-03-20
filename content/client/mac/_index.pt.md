---
title: Mac
weight: 3
description: "Documentação do RustDesk sobre Mac. Consulte guias de instalação, configuração, implantação e solução de problemas."
keywords: ["rustdesk mac", "rustdesk macos", "rustdesk mac install", "rustdesk screen recording permission", "rustdesk accessibility permission", "rustdesk mac remote control"]
---

## Do que o RustDesk precisa no macOS?

No macOS, instalar o app não basta. Para controlar corretamente outro Mac, normalmente você precisa mover o RustDesk para `Applications`, permitir sua execução e conceder as permissões `Accessibility`, `Screen Recording` e, em alguns casos, `Input Monitoring`.

## Respostas rápidas para macOS

- Instale o RustDesk do `.dmg` em `Applications`.
- Se o Gatekeeper bloquear o app, autorize-o nas configurações de segurança do macOS.
- Conceda `Accessibility` e `Screen Recording` para o controle remoto.
- Se teclado ou mouse continuarem sem funcionar, conceda também `Input Monitoring`.
- Se redefinir permissões não resolver, reinicie o Mac.

## Quais permissões do macOS são importantes?

| Permissão | Para que serve |
| --- | --- |
| Accessibility | Permite que o RustDesk controle teclado e mouse |
| Screen Recording | Permite que o RustDesk capture a tela local |
| Input Monitoring | Necessária em versões recentes do macOS quando a captura de entrada local continua falhando |

## Instalação

Abra o arquivo .dmg e arraste `RustDesk` para `Applications` como mostrado abaixo.

![](/docs/en/client/mac/images/dmg.png)

Certifique-se de ter fechado todos os RustDesk em execução. Também certifique-se de fechar o serviço RustDesk mostrado na bandeja do sistema.

![](/docs/en/client/mac/images/tray.png)

## Permitir execução do RustDesk

| Desbloquear para alterar | Clicar em `App Store and identified developers` |
| --- | --- |
| ![](/docs/en/client/mac/images/allow2.png) | ![](/docs/en/client/mac/images/allow.png) |

## Habilitar permissões

{{% notice note %}}
Devido à mudança na política de segurança do macOS, nossa API que captura entrada no lado local não funciona mais. Você deve habilitar a permissão "Input Monitoring" no lado local do Mac.
Por favor siga isto:
[https://github.com/rustdesk/rustdesk/issues/974#issuecomment-1185644923](https://github.com/rustdesk/rustdesk/issues/974#issuecomment-1185644923).

Na versão 1.2.4, você pode testar `Input source 2` que pode ser visto clicando no ícone do teclado na barra de ferramentas.
{{% /notice %}}

Para capturar a tela, você precisa conceder ao RustDesk permissão de **Accessibility** e **Screen Recording**. O RustDesk irá guiá-lo para a janela de configurações.

| Janela do RustDesk | Janela de Configurações |
| --- | --- |
| ![](/docs/en/client/mac/images/acc.png) | ![](/docs/en/client/mac/images/acc3.png?v2) |

Se você habilitou nas configurações, mas o RustDesk ainda avisa. Por favor remova `RustDesk` das janelas de configurações pelo botão `-`, e clique no botão `+`, selecione `RustDesk` em `Applications`.

{{% notice note %}}
[https://github.com/rustdesk/rustdesk/issues/3261](https://github.com/rustdesk/rustdesk/issues/3261) <br>
Outras tentativas inúteis: <br>
`tccutil reset ScreenCapture com.carriez.RustDesk` <br>
`tccutil reset Accessibility com.carriez.RustDesk` <br>
Reinicialização ainda é necessária.
{{% /notice %}}

| Botão `-` e `+` | Selecionar `RustDesk` |
| --- | --- |
| ![](/docs/en/client/mac/images/acc2.png) | ![](/docs/en/client/mac/images/add.png?v2) |

Por favor copie os passos acima para a permissão de **Screen Recording**.

![](/docs/en/client/mac/images/screen.png?v2)