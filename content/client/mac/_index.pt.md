---
title: Mac 
weight: 3
---

### Instalação

Abra o arquivo .dmg e arraste `RustDesk` para `Aplicativos` como abaixo.

![](/docs/en/client/mac/images/dmg.png)

Certifique-se de ter fechado todos os RustDesk em execução. Também verifique se fechou o serviço RustDesk mostrado na bandeja.

![](/docs/en/client/mac/images/tray.png)

### Permitir execução do RustDesk

| Desbloquear para alterar| Clique em `App Store e desenvolvedores identificados` |
| --- | --- |
| ![](/docs/en/client/mac/images/allow2.png) | ![](/docs/en/client/mac/images/allow.png) |

### Habilitar permissões

{{% notice note %}}
Devido a uma mudança na política de segurança do macOS, nossa API que captura entrada no lado local não funciona mais. Você precisa habilitar a permissão "Monitoramento de Entrada" no seu Mac local.
Por favor, siga este (em Inglês)
[https://github.com/rustdesk/rustdesk/issues/974#issuecomment-1185644923](https://github.com/rustdesk/rustdesk/issues/974#issuecomment-1185644923).

Na versão 1.2.4, você pode tentar o `Input source 2`, que pode ser visto clicando no ícone do teclado na barra de ferramentas.
{{% /notice %}}

Para capturar a tela, você precisa conceder ao RustDesk a permissão de **Acessibilidade** e **Gravação de tela**. O RustDesk irá guiá-lo para a janela de configurações.

| Janela RustDesk | Janela de Configuração |
| --- | --- |
| ![](/docs/en/client/mac/images/acc.png) | ![](/docs/en/client/mac/images/acc3.png?v2) |

Se você habilitou nas configurações, mas o RustDesk ainda alerta. Por favor, remova `RustDesk` das janelas de configurações pelo botão `-`, e clique no botão `+`, selecione `RustDesk` em `Aplicativos`.

{{% notice note %}}
[https://github.com/rustdesk/rustdesk/issues/3261](https://github.com/rustdesk/rustdesk/issues/3261) <br>
Tentativas alternativas (sem garantia de sucesso): <br>
`tccutil reset ScreenCapture com.carriez.RustDesk` <br>
`tccutil reset Accessibility com.carriez.RustDesk` <br>
Reinicialização do computador ainda pode ser necessária..
{{% /notice %}}

| `-` and `+` button | Select `RustDesk` |
| --- | --- |
| ![](/docs/en/client/mac/images/acc2.png) | ![](/docs/en/client/mac/images/add.png?v2) |

Copie as etapas acima para obter permissão de **Gravação de tela**.

![](/docs/en/client/mac/images/screen.png?v2)
