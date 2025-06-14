---
title: FAQ
weight: 600
---

## Como posso instalar com o script de instalação simples?
1. Obtenha sua licença em [https://rustdesk.com/pricing.html](https://rustdesk.com/pricing.html), consulte a página de [licença](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/license/) para mais detalhes.
2. Inicie um VPS, bare metal ou VM Linux.
3. Se você quiser usar DNS e SSL, crie um nome DNS como `rustdesk.yourdomain.com`.
4. [Esta página](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/installscript/#install).
5. Copie e cole o comando em seu terminal Linux.
6. Siga as instruções que o guiam pela instalação.
7. Após a instalação ser concluída, vá para `https://rustdesk.yourdomain.com` ou `http://youripaddress:21114`.
8. Faça login com o nome de usuário `admin` e senha `test1234`.
9. Digite seu código de licença comprado na etapa 1.

## Como posso converter do RustDesk Server Open Source para o RustDesk Server Pro?
1. Obtenha sua licença em [https://rustdesk.com/pricing.html](https://rustdesk.com/pricing.html), consulte a página de [licença](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/license/) para mais detalhes.
2. Abra a porta TCP 21114.
3. Faça login no seu RustDesk Server.
4. Se você ainda não usa DNS e quer usar SSL, crie um nome DNS como `rustdesk.yourdomain.com`.
5. [Esta página](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/installscript/#convert-from-open-source).
6. Copie e cole o comando em seu terminal Linux.
7. Siga as instruções que o guiam pela instalação.
8. Após a instalação ser concluída, vá para `https://rustdesk.yourdomain.com` ou `http://youripaddress:21114`.
9. Faça login com o nome de usuário `admin` e senha `test1234`.
10. Digite seu código de licença comprado na etapa 1.

## Há uma nova versão do RustDesk Server Pro, como posso atualizar?
É melhor fazer backup dos arquivos de dados (arquivos sqlite3, etc.) primeiro, https://github.com/rustdesk/rustdesk-server-pro/discussions/184#discussioncomment-8013375.
- ### Se você instalou com script (`install.sh`)
Execute [update.sh](/docs/en/self-host/rustdesk-server-pro/installscript/script/#upgrade).
- ### Docker Compose
```
sudo docker compose down
sudo docker compose pull 
sudo docker compose up -d
```
- ### Docker
```
sudo docker ps
sudo docker stop <CONTAINER ID>
sudo docker rm <CONTAINER ID>
sudo docker rmi <IMAGE ID>
sudo docker run ..... # igual a como você instalou antes
```

## Instalei com o script, como posso iniciar e parar serviços?
Os serviços usam systemd então podem ser iniciados e parados usando `sudo systemctl stop|start|restart rustdesk-hbbs|rustdesk-hbbr` ex. `sudo systemctl restart rustdesk-hbbs`.

## Instalei com o script, como posso ver os logs do Linux?
Os logs são armazenados em `/var/log/rustdesk-server`, você pode vê-los usando `tail /var/log/rustdesk-server/hbbs.log` ou `tail /var/log/rustdesk-server/hbbs.error`.

## Instalei com o script, como posso verificar o status dos serviços RustDesk?
Para verificar o status `sudo systemctl status rustdesk-hbbs|rustdesk-hbbr` ex. `sudo systemctl status rustdesk-hbbs`.

## Como posso alterar a senha do admin?
1. Vá para `https://rustdesk.yourdomain.com` ou `http://youripaddress:21114`.
2. Faça login com o nome de usuário `admin` e senha `test1234`.
3. Clique em `admin` no canto superior direito.
4. Clique em `Configurações`.
5. Digite sua nova senha nas caixas fornecidas.

## Como posso mover minha licença para um novo servidor?
Veja [aqui](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/license/#invoices-and-migration).

## E-mails não estão funcionando do meu VPS
Muitos provedores de VPS bloqueiam as portas 465 e 25.

Uma maneira simples de verificar é usando telnet. Para testar no terminal Linux digite `telnet your.mailserver.com 25`. No Windows use PowerShell com `Test-NetConnection -ComputerName your.mailserver.com -Port 25`.

## Posso implantar RustDesk usando PowerShell ou similar?
Claro, você pode encontrar scripts para auxiliar na implantação [aqui](https://rustdesk.com/docs/en/self-host/client-deployment/).

## Como posso relatar um bug?
Relate via [GitHub](https://github.com/rustdesk/rustdesk-server-pro/issues).

## Por que se estou auto-hospedando isso não é gratuito e código aberto?
1. RustDesk se tornou um trabalho em tempo integral para várias pessoas, elas têm vidas, esposas, empregos e filhos que exigem atenção e custam dinheiro!
2. Queremos estar aqui e continuar fazendo grandes progressos nos próximos anos.
3. A versão código aberto continuará sendo código aberto e encorajamos outros a fazer desenvolvimentos em linha com a licença AGPL.

## Não consigo me conectar a dispositivos em grupos diferentes, por quê?
Isso é facilmente resolvido, você precisa permitir acesso entre grupos.
1. Adicione novos grupos.
2. Clique em `Editar`.
3. Selecione os grupos relevantes aos quais você quer acesso.

## Como posso obter configurações automaticamente?
As configurações são geradas automaticamente.
1. Baixe os clientes mais recentes do [GitHub](https://github.com/rustdesk/rustdesk/releases/latest).
2. Na página principal do console web clique em `Windows EXE`.
3. Preencha o host e API (se diferente da sua configuração).
4. Clique em `Enviar`.
5. Escaneie o código QR no Android e renomeie o exe para o que foi gerado.

## Vocês oferecem hospedagem para RustDesk Server Pro?
Entre em contato com nossa equipe de [vendas](mailto://sales@rustdesk.com).

## Há algum lugar onde posso ver guias de configuração em vídeo?
Sim! Temos um [Canal do YouTube](https://youtube.com/@RustDesk).

## Por que meus logs / nomes de dispositivos estão vazios?
Certifique-se de que a API esteja configurada corretamente no dispositivo controlado, https://github.com/rustdesk/rustdesk-server-pro/issues/21#issuecomment-1637935750.

## Como posso desinstalar o RustDesk Server Pro?
Execute os seguintes comandos:
```sh
sudo systemctl stop rustdesk-hbbs.service
sudo systemctl disable rustdesk-hbbs.service
sudo systemctl stop rustdesk-hbbr.service
sudo systemctl disable rustdesk-hbbr.service
sudo systemctl daemon-reload
sudo rm /etc/systemd/system/rustdesk-hbbs.service
sudo rm etc/systemd/system/rustdesk-hbbr.service
sudo rm /usr/bin/hbbs
sudo rm /usr/bin/hbbr
sudo rm -rf /var/lib/rustdesk-server/
sudo rm -rf /var/log/rustdesk-server/
```

## Como posso remover dispositivos da lista de dispositivos no console web?
Desative e então excluir ficará disponível.

## Como posso atualizar RustDesk com PowerShell?
```ps
$ErrorActionPreference= 'silentlycontinue'
$rdver = ((Get-ItemProperty  "HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall\RustDesk\").Version)
if ($rdver -eq "1.2.6")
{
    Write-Output "RustDesk $rdver is the newest version."
    Exit
}
if (!(Test-Path C:\Temp))
{
    New-Item -ItemType Directory -Force -Path C:\Temp > null
}
cd C:\Temp
Invoke-WebRequest "https://github.com/rustdesk/rustdesk/releases/download/1.2.6/rustdesk-1.2.6-x86_64.exe" -Outfile "rustdesk.exe"
Start-Process .\rustdesk.exe --silent-install -wait
```

## Erro `Key mismatch`
Configure seu cliente com a [chave correta](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/relay/).

## Erro `Failed to connect to relay server`
Certifique-se de que `hbbr` esteja rodando. Mais informações sobre `hbbr`, você pode encontrar [aqui](https://rustdesk.com/docs/en/self-host/rustdesk-server-oss/install/).

## Redefinir MFA para conta Admin
https://github.com/rustdesk/rustdesk/discussions/6576

## Configurar HTTPS para console web manualmente
Consulte a documentação completa para instruções detalhadas sobre configuração de domínio, Nginx, Certbot e certificados SSL.

## SELinux
Se `Waiting for RustDesk Relay service to become active...` aparecer durante a instalação, pode ser causado pelo SELinux:

```sh
sudo semanage fcontext -a -t NetworkManager_dispatcher_exec_t 'hbbs'
sudo semanage fcontext -a -t NetworkManager_dispatcher_exec_t 'hbbr'
sudo restorecon -v '/usr/bin/hbbs'
sudo restorecon -v '/usr/bin/hbbr'
```

## Firewall
### Firewall da nuvem
Se executando em AWS/Azure/Google/DigitalOcean, abra as portas UDP (21116) e TCP (21114-21119) no painel do provedor de nuvem.

### Firewall do servidor local
```sh
sudo firewall-cmd --permanent --add-port=21115/tcp
sudo firewall-cmd --permanent --add-port=21116/tcp
sudo firewall-cmd --permanent --add-port=21117/tcp
sudo firewall-cmd --permanent --add-port=21118/tcp
sudo firewall-cmd --permanent --add-port=21119/tcp
sudo firewall-cmd --permanent --add-port=21116/udp
sudo firewall-cmd --reload
```

## Após alterar a senha do admin no console web não consigo fazer login. Há uma maneira simples de redefinir a senha?
1. Certifique-se de ter `rustdesk-utils` instalado. Se não, pode obtê-lo [aqui](https://github.com/rustdesk/rustdesk-server-pro).
2. O comando é `rustdesk-utils set_password username password`. Se funcionar, dirá *Done*.

## Adicionar certificado CA raiz no contêiner Docker (para falha TLS com SMTP, OIDC etc.)
https://github.com/rustdesk/rustdesk-server-pro/issues/99#issuecomment-2235014703
