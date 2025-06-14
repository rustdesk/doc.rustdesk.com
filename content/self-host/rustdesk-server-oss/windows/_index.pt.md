---
title: Windows & PM2 ou NSSM
weight: 20
---

{{% notice note %}}
A política de segurança do Windows é complicada, se este tutorial não funcionar para você, ou se encontrar conexão instável, migre para um servidor Linux.
{{% /notice %}}

{{% notice note %}}
A versão GUI, `RustDeskServer.setup.exe` não é mais mantida, não recomendada.
{{% /notice %}}

## Uma encruzilhada
Agora você tem duas escolhas, pode usar PM2 (mais fácil) ou NSSM (um pouco mais difícil) para iniciar o servidor RustDesk
Há alguns benefícios em usar NSSM:
- Compatibilidade com versões mais antigas do Windows (Windows Server 2008 R2/Windows 7 e anteriores, embora não testado).
- Ideal para Windows Server
- Início automático na inicialização sem login (O usuário que criou a entrada de inicialização não precisa fazer login para que inicie).
- Executar ambos os binários como Serviços.
- Independente (sem dependência do Node.js)

Enquanto os benefícios do PM2 incluem:
- Boa ideia se você executar o servidor no mesmo computador que seu principal computador de trabalho
- Você faz login regularmente no usuário que criou a entrada de inicialização do RustDesk
- Mais amigável ao usuário

## Instalando usando NSSM

### Instalando NSSM
Por favor [baixe](https://github.com/dkxce/NSSM/releases/download/v2.25/NSSM_v2.25.zip) e extraia o NSSM, selecione a arquitetura apropriada para seu sistema Windows (se x86 use o conteúdo da pasta win32, se x64 use o conteúdo da pasta win64). É também uma boa prática mover o binário do NSSM para o diretório `Program Files\NSSM` (O NSSM uma vez iniciado como serviço, não pode ser movido do diretório onde foi colocado. assim é melhor guardá-lo em `Program Files`) do seu drive de instalação (Normalmente o drive C:).
É também aconselhável adicionar o caminho (como `C:\Program Files\NSSM`) à variável de caminho.

### Verificando se o NSSM está instalado corretamente
Se você fez tudo corretamente, a pasta `C:\Program Files\NSSM` (neste exemplo uso o drive C: mas você pode usar qualquer drive onde instalou o Windows ou qualquer caminho que desejar) deve conter apenas o arquivo `nssm.exe`.

Usaremos `C:\Program Files\NSSM` neste exemplo.

Abra o Prompt de Comando e execute `nssm` se ver uma página de ajuda você está pronto para ir para o próximo passo.

### Executar hbbr e hbbs
Baixe a versão Windows do [RustDesk Server](https://github.com/rustdesk/rustdesk-server/releases).
Descompacte o programa para `C:\Program Files\RustDesk Server` (ou onde desejar, apenas certifique-se de que não mude após o serviço ser instalado). Agora volte para o Prompt de Comando.

Usaremos `C:\Program Files\RustDesk Server` neste exemplo.
```cmd
nssm install "RustDesk hbbs service" "C:\Program Files\RustDesk Server\hbbs.exe"
nssm install "RustDesk hbbr service" "C:\Program Files\RustDesk Server\hbbr.exe"
```
**Nota:**
- Você pode mudar `RustDesk hbbs service` para qualquer nome que desejar para o serviço hbbs
- Você pode mudar `RustDesk hbbr service` para qualquer nome que desejar para o serviço hbbr
- Você pode mudar `C:\Program Files\RustDesk Server\hbbs.exe` para onde quer que tenha colocado os binários do RustDesk
- Você pode mudar `C:\Program Files\RustDesk Server\hbbr.exe` para onde quer que tenha colocado os binários do RustDesk

**Modelos de comando:**

O modelo de comando caso você queira apenas copiar e colar e editar.

```cmd
nssm install <Nome do serviço hbbs desejado> <Caminho do binário hbbs do RustDesk> <Argumentos do hbbs do RustDesk>
nssm install <Nome do serviço hbbr desejado> <Caminho do binário hbbr do RustDesk> <Argumentos do hbbr do RustDesk>
```

**Iniciar serviços**

Após a instalação bem-sucedida dos serviços, eles precisam ser iniciados.
```cmd
nssm start <Nome do serviço hbbs desejado>
nssm start <Nome do serviço hbbr desejado>
```

**Pronto!**

(O método acima foi testado no Windows Server Core 2022 Standard).

## ou

## Instalando usando PM2

### Instalar Node.js

Por favor [baixe](https://nodejs.org/dist/v16.14.2/node-v16.14.2-x86.msi) e instale o Node.js.
Node.js é o ambiente de execução do PM2, então você precisa instalar o Node.js primeiro.

### Instalar PM2

Digite os comandos abaixo em `cmd.exe`, pressione a tecla <kbd>Enter</kbd> para cada linha, e execute-os linha por linha.

```cmd
npm install -g pm2
npm install pm2-windows-startup -g
pm2-startup install
```

### Executar hbbr e hbbs

Baixe a versão Windows do [RustDesk Server](https://github.com/rustdesk/rustdesk-server/releases). Descompacte o programa para o drive C:. Execute os seguintes quatro comandos:

```cmd
cd C:\rustdesk-server-windows-x64
pm2 start hbbs.exe
pm2 start hbbr.exe
pm2 save
```

### Ver o log

```cmd
pm2 log hbbr
pm2 log hbbs
```

## Tutoriais alternativos
https://pedja.supurovic.net/setting-up-self-hosted-rustdesk-server-on-windows/?lang=lat