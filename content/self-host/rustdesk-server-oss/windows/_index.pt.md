---
title: Windows & PM2 ou NSSM
weight: 20
---

{{% notice note %}}
A política de segurança do Windows pode ser complicada. Se este tutorial não funcionar para você ou você encontrar uma conexão instável, considere migrar para um servidor Linux.
{{% /notice %}}

{{% notice note %}}
A versão GUI, RustDeskServer.setup.exe, não é mais mantida e não é recomendada.
{{% /notice %}}

### Escolhendo o método de instalação
Você tem duas opções para iniciar o servidor RustDesk: PM2 (mais fácil) ou NSSM (um pouco mais difícil).

O NSSM oferece alguns benefícios:
- Compatibilidade com versões anteriores do Windows (Windows Server 2008 R2/Windows 7 e anteriores, embora não testado).
- Ideal para Windows Server.
- Inicia automaticamente na inicialização sem login (o usuário que criou a entrada de inicialização não precisa fazer login para que ela seja iniciada).
- Executa os dois binários como serviços independentes
- Sem dependência do Node.js.

Já o PM2 oferece:
- Ideal se você executa o servidor no mesmo computador que seu computador principal de trabalho.
- Requer login regular do usuário que criou a entrada de inicialização do RustDesk.
- Mais fácil de usar.

### Instalando usando NSSM

#### Baixando e instalando o NSSM
Faça o [download](https://github.com/dkxce/NSSM/releases/download/v2.25/NSSM_v2.25.zip) do NSSM e extraia o arquivo. Selecione a arquitetura apropriada para o seu sistema Windows (se x86 use o conteúdo da pasta win32, se x64 use o conteúdo da pasta win64).
A melhor prática é mover o binário do NSSM para o diretório `Program Files\NSSM` (o NSSM, uma vez iniciado como serviço, não pode ser movido do diretório em que foi colocado portanto, é melhor guardá-lo em `Program Files`).
Também é recomendável adicionar o caminho (C:\Program Files\NSSM) à variável de ambiente Path.

#### Verificando a instalação do NSSM
Se tudo foi feito corretamente, a pasta C:\Program Files\NSSM (neste exemplo, usamos a unidade C:, mas você pode usar qualquer unidade em que instalou o Windows ou o caminho desejado) deverá conter apenas o arquivo `nssm.exe`.

Abra o prompt de comando e execute `nssm`. Se você vir uma página de ajuda, está pronto para seguir para a próxima etapa.

#### Executando hbbr e hbbs
Baixe a versão Windows do Servidor RustDesk. Descompacte o programa para C:\Program Files\RustDesk Server (ou qualquer outro local desejado, apenas certifique-se de que não seja alterado após a instalação do serviço). Agora volte para o prompt de comando.

Usaremos `C:\Program Files\RustDesk Server` neste exemplo.

```cmd
nssm install "RustDesk hbbs service" "C:\Program Files\RustDesk Server\hbbs.exe"
nssm install "RustDesk hbbr service" "C:\Program Files\RustDesk Server\hbbr.exe"
```
**Observação:**
- Você pode alterar `RustDesk hbbs service` para o nome desejado para o serviço hbbs.
- Você pode alterar `RustDesk hbbr service` para o nome desejado para o serviço hbbr.
- Você pode alterar `C:\Program Files\RustDesk Server\hbbs.exe` para onde quer que tenha colocado os binários do RustDesk.
- Você pode alterar `C:\Program Files\RustDesk Server\hbbr.exe` para onde quer que tenha colocado os binários do RustDesk.

**Modelos de comandos:**

Modelos de comandos caso você queira apenas copiar, colar e editar.

```cmd
nssm install <Nome do serviço hbbs desejado> <Caminho binário do RustDesk hbbs> <Argumentos do RustDesk hbbs>
nssm install <Nome do serviço hbbr desejado> <Caminho binário do RustDesk hbbr> <Argumentos do RustDesk hbbr>
```

**Iniciando os serviços**

Após a instalação bem-sucedida dos serviços, eles precisam ser iniciados.

```cmd
nssm start <Desired hbbs servicename>
nssm start <Desired hbbr servicename>
```

**Pronto!** (O método acima foi testado no Windows Server Core 2022 Standard).

### ou

### Instalando usando PM2

#### Instalando o Node.js

Por favor, faça o [download](https://nodejs.org/dist/v16.14.2/node-v16.14.2-x86.msi) e instale o Node.js.
O Node.js é o ambiente de execução do PM2, então você precisa instalá-lo primeiro.

#### Instalando o PM2

Digite o seguinte no `cmd.exe`, pressione a tecla <kbd>Enter</kbd> para cada linha e execute-as linha por linha.
```cmd
npm install -g pm2
npm install pm2-windows-startup -g
pm2-startup install
```

#### Executando hbbr e hbbs

Baixe a versão Windows do [Servidor RustDesk](https://github.com/rustdesk/rustdesk-server/releases). Descompacte o programa na unidade `C:` e execute os quatro comandos a seguir:

```cmd
cd C:\rustdesk-server-windows-x64
pm2 start hbbs.exe
pm2 start hbbr.exe
pm2 save
```

#### Visualizando o log

```cmd
pm2 log hbbr
pm2 log hbbs
```

### Tutoriais alternativos
https://pedja.supurovic.net/setting-up-self-hosted-rustdesk-server-on-windows/?lang=lat
