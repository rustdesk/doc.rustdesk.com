---
title: Problemas de NAT Loopback
weight: 500
pre: "<b>2.5. </b>"
---

{{% notice note %}}
Esta explicação envolve conhecimentos complexos de redes, precisamos da sua assistência para melhorar sua legibilidade.
{{% /notice %}}


Para mais detalhes sobre NAT Loopback, verifique a página da [Wikipedia](https://en.m.wikipedia.org/wiki/Network_address_translation#NAT_hairpinning).

Quando você está implantando o servidor RustDesk em sua rede doméstica ou qualquer outro ambiente de rede que esteja atrás de um firewall NAT, o servidor RustDesk e seus clientes **DEVEM** ou:
A: Usar o endereço IP local para acessar uns aos outros OU:
B: Ter um firewall que suporte e tenha habilitado o NAT Loopback.

Você pode notar que não consegue se conectar ao seu servidor através do seu **IP Público** ou **Domínio** (que em teoria aponta para seu IP público).

## Problema
Neste exemplo seguiremos o que acontece quando dispositivos LAN tentam se conectar a `rustdesk.example.com`. Assuma que o IP público do seu roteador será `172.16.16.1`, o IP LAN do seu servidor é `192.168.11.20` e o domínio que você deseja é `rustdesk.example.com`, e você tem um cliente usando '192.168.11.2'.

Quando você configura um servidor atrás do NAT do roteador, pode adicionar um encaminhamento de porta no roteador para alterar qualquer mensagem de entrada para o IP PÚBLICO 172.16.16.1 para ir ao servidor em 192.168.11.20

Quando um dispositivo LAN quer acessar a internet, digamos um servidor web em 8.8.8.8, ele envia a solicitação como vindo de 192.168.11.2, e a envia para o roteador. O roteador interceptará essa solicitação e reescreverá essa solicitação para 8.8.8.8 como vindo de 172.16.16.1. Quando 8.8.8.8 responde para 172.16.16.1, o roteador verificará uma conexão anterior e reencaminhará essa resposta de volta para 192.168.11.2.

Se o usuário em 8.8.8.8 enviar uma mensagem para nossa rede usando 172.16.16.1, a regra de encaminhamento de porta reescreverá o destino de 172.16.16.1 para o servidor em 192.168.11.20 deixando a origem da solicitação como 8.8.8.8 para que o servidor possa responder (mais ou menos) diretamente para 8.8.8.8.

Se o usuário em 8.8.8.8 decidir tentar hackear nossa rede e afirmar estar enviando suas mensagens de 192.168.11.2, o roteador sabe que o tráfego vindo de 192.168.11.2 só é válido dos dispositivos LAN e tipicamente bloqueará esse tráfego.

O problema ocorre quando você tenta fazer um loop de volta na LAN. Se o dispositivo LAN tentar se conectar a `rustdesk.example.com`, que será `172.16.16.1`. Neste ponto o roteador tem muitas escolhas a fazer. Ele acabou de enviar uma mensagem de sua porta LAN para sua porta WAN vindo DE 192.168.11.2 indo para 172.16.16.1. Uma vez que atinge a porta WAN, esta mensagem é indistinguível por si só do exemplo acima onde alguém na internet estava tentando hackear nossa rede.

O recurso NAT Loopback efetivamente mudará a parte de origem "De 192.168.11.2" do endereço mais cedo no processo para que saiba que tem que usar a tabela NAT para passar mensagens de ida e volta entre o servidor e o cliente.

Se há um problema com conexões apenas enquanto você está dentro da LAN, mas funciona bem de fora do local, este pode ser o problema que você está tendo.


## Soluções
Há três maneiras de resolver este problema.

### 1. Configurar NAT Loopback no seu roteador
Você poderia configurar NAT Loopback no seu roteador se souber como, mas configurar isso requer conhecimento de redes. Alguns roteadores não têm a capacidade de ajustar esta configuração, então esta não é a melhor opção para todos.

{{% notice note %}}
Um artigo da [MikroTik](https://help.mikrotik.com/docs/display/ROS/NAT#NAT-HairpinNAT) explica isso muito bem. Você poderia começar a aprender a partir daqui.
{{% /notice %}}

### 2. Implantar um servidor DNS na sua LAN
Primeiro, escolha qual você prefere, [AdGuard Home](https://github.com/AdguardTeam/AdGuardHome/wiki/Docker) ou [Pi-hole](https://github.com/pi-hole/docker-pi-hole). Você poderia implantá-lo via docker, ou poderia implantá-lo no mesmo servidor que seu Servidor RustDesk. O exemplo abaixo mostrará alguns passos para este exemplo.

Ambos são bloqueadores de anúncios baseados em DNS, mas você poderia desabilitar esta funcionalidade se não quiser bloquear anúncios.

Primeiro, aponte seu `domínio` para o IP LAN do seu servidor RustDesk (por exemplo `192.168.11.20`). Depois vá para a configuração `DHCP` do seu roteador (Cuidado: NÃO WAN) e defina seu `Primeiro` IP DNS para o servidor onde você implantou AdGuard Home ou Pi-hole. O DNS `Secundário` poderia ser o DNS do seu ISP ou outro DNS público, ex. `1.1.1.1` para Cloudflare ou `8.8.8.8` para Google, e está pronto!

Aqui está um exemplo:
#### AdGuard Home
Bloquear anúncios pode causar problemas, se você não quer descobrir a solução e quer desabilitar esta funcionalidade, clique no botão "Desabilitar proteção".

![](/docs/en/self-host/nat-loopback-issues/images/adguard_home_disable_protection.png)
<br>

Vá para a configuração "Reescritas DNS".

![](/docs/en/self-host/nat-loopback-issues/images/adguard_home_click_dns_rewrites.png)
<br>

Clique em "Adicionar reescrita DNS", depois digite seu `domínio` e o `IP LAN` do servidor no campo.

![](/docs/en/self-host/nat-loopback-issues/images/adguard_home_dns_rewrite_dialog.png)

Aqui está como fica o resultado final.

![](/docs/en/self-host/nat-loopback-issues/images/adguard_home_dns_rewrite_final_result.png)

***Não esqueça de atribuir seu AdGuard Home ao DHCP LAN do seu roteador!***
<hr>

#### Pi-hole
Bloquear anúncios pode causar problemas, se você não quer descobrir a solução e quer desabilitar esta funcionalidade, clique no botão "Indefinidamente" dentro do submenu "Desabilitar Bloqueio".

![](/docs/en/self-host/nat-loopback-issues/images/pi_hole_disable_blocking.png)

Vá para "DNS Local → Registros DNS".
Digite seu `domínio` e `IP` na caixa, depois clique em "Adicionar".

Para verificar os resultados finais, verifique as linhas amarelas nesta imagem.

![](/docs/en/self-host/nat-loopback-issues/images/pi_hole_local_dns_dns_records.png)

***Não esqueça de atribuir seu Pi-hole ao DHCP LAN do seu roteador!***

### 3. Adicionar regras ao seu arquivo hosts
Este método só é recomendado se você tem um pequeno número de dispositivos. Se você tem muitos dispositivos, o método DNS é preferido. Caso contrário você teria que fazer isso manualmente em cada dispositivo que precisa de acesso ao servidor.

{{% notice warning %}}
Se este método for usado em um dispositivo portátil como um laptop, ele não conseguirá se conectar ao servidor quando estiver fora da sua LAN.
{{% /notice %}}

Caminho para diferentes OS:

#### Windows
```text
C:\Windows\system32\drivers\etc\hosts
```
Você pode editar com privilégios elevados ou pode copiar este arquivo para a `Área de Trabalho` e editá-lo. Depois de editá-lo, copie de volta para o caminho original.

#### macOS
```text
/etc/hosts
```
Você poderia usar `vim`, ele vem pré-instalado.
```sh
sudo vim /etc/hosts
```

#### Linux
```text
/etc/hosts
```
Você poderia usar `vim` ou `nano`.
```sh
sudo vim /etc/hosts
```

<hr>

O formato é o mesmo nos três sistemas operacionais. `IP` primeiro seguido do `domínio`. Uma entrada por linha.

Por exemplo:
```text
192.168.11.20   rustdesk.example.com
```