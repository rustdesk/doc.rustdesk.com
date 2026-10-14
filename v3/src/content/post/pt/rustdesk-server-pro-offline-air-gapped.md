---
updateDate: 2026-10-14T00:00:00Z
publishDate: 2026-06-28T16:50:00Z
lang: 'pt'
translationKey: rustdesk-server-pro-offline-air-gapped
draft: false
title: 'O RustDesk Server Pro Pode Funcionar Offline ou em Rede Isolada (Air-Gapped)?'
excerpt: 'Não — o RustDesk Server Pro auto-hospedado precisa de acesso de saída contínuo a rustdesk.com para validar a licença, então uma implantação totalmente isolada (air-gapped) não é suportada.'
image: ~/assets/images/blog/rustdesk-server-pro-offline-air-gapped-og.webp
category: 'Implantação'
tags: ['RustDesk', 'Implantação', 'Auto-hospedagem']
author: RustDesk Team
slug: 'o-rustdesk-server-pro-pode-funcionar-offline-ou-em-rede-isolada-air'
faq:
  - question: 'O RustDesk Server Pro pode funcionar offline ou em rede isolada (air-gapped)?'
    answer: 'Não. O RustDesk Server Pro verifica a licença com rustdesk.com por HTTPS de saída (porta 443) cerca de uma vez por dia e, se uma verificação falhar, continua tentando por cerca de 7 dias; por isso, uma implantação Pro permanentemente isolada fica fora do modelo de licenciamento padrão. O uso de proxy é suportado. O RustDesk Server OSS, o servidor comunitário gratuito, não tem verificação de licença.'
  - question: 'O RustDesk Server Pro precisa de uma conexão permanente com a internet?'
    answer: 'Ele precisa de acesso de saída contínuo a rustdesk.com para validar a licença, mas não de uma conexão literalmente ininterrupta. O servidor faz a verificação pela porta 443 cerca de uma vez por dia e, se ela falhar, continua tentando até ter sucesso ou até que se passem aproximadamente sete dias — então uma interrupção breve é tolerada, mas um servidor isolado de rustdesk.com por mais tempo que essa janela de tolerância deixa de validar a licença. As sessões remotas em si são intermediadas pelos seus próprios servidores de relay e de ID (rendezvous) auto-hospedados.'
  - question: 'De que acesso de saída uma implantação isolada do RustDesk Server Pro precisa?'
    answer: 'Permita HTTPS de saída do servidor para rustdesk.com para a validação da licença, além do serviço de build do cliente personalizado, se você gerar clientes com a sua marca. O uso de proxy é suportado, então o restante da rede pode continuar bloqueado. Outros fluxos de saída a planejar são as atualizações de clientes e qualquer provedor de identidade externo que você conectar.'
  - question: 'Existe uma opção de licenciamento do RustDesk totalmente isolada (air-gapped)?'
    answer: 'Não. A licença padrão do RustDesk Server Pro exige verificação online periódica. O RustDesk Server OSS, o servidor comunitário gratuito, não tem verificação de licença: seus serviços de ID/rendezvous e relay funcionam dentro de uma rede isolada, sem o console web nem os recursos de gerenciamento do Pro. Se você tem um requisito rígido de isolamento total com o Pro, descreva o seu cenário para sales@rustdesk.com.'
metadata:
  description: 'O RustDesk Server Pro auto-hospedado funciona em rede isolada (air-gapped)? Não — a licença Pro exige acesso de saída contínuo a rustdesk.com.'
  keywords: 'rustdesk server pro offline, rustdesk air-gapped, requisito de internet do rustdesk self-hosted, verificação de licença do rustdesk server pro, implantação offline do rustdesk, o rustdesk precisa de internet'
---

Não — uma implantação auto-hospedada do RustDesk Server Pro não foi projetada para funcionar totalmente offline ou em rede isolada (air-gapped). A licença Pro precisa alcançar rustdesk.com por uma conexão de saída para continuar válida — tanto na ativação quanto de forma contínua enquanto o servidor está em execução —, então uma rede totalmente isolada fica fora do modelo suportado.

## A resposta curta

O [FAQ oficial sobre a verificação de licença](https://github.com/rustdesk/rustdesk/wiki/FAQ#how-often-does-pro-check-license) descreve uma verificação periódica: o servidor entra em contato com rustdesk.com pela porta 443 aproximadamente uma vez por dia e, se uma verificação falhar, continua tentando até ter sucesso ou até que se passem cerca de sete dias — depois disso, a licença deixa de validar. Essa janela de tolerância integrada significa que uma queda breve da internet não derruba a sua implantação de imediato, mas um servidor permanentemente offline, sim. Seus serviços de ID e de relay continuam auto-hospedados; as sessões diretas trafegam entre os endpoints e as sessões retransmitidas usam o seu relay. O uso de proxy é suportado, então você pode liberar o caminho HTTPS de saída necessário e bloquear o restante da rede.

## Em detalhes

Essa exigência vale para o **Server Pro**. O **RustDesk Server OSS (o servidor comunitário gratuito)** não tem verificação de licença. O cliente RustDesk e o Server OSS são licenciados sob a AGPL; o Server Pro é um software de servidor comercial e proprietário, também auto-hospedado. Em uma rede isolada, os clientes e os serviços locais de ID/relay continuam precisando de rotas funcionando, chaves corretas e permissões de cada plataforma. As sessões diretas negociadas por ID trafegam entre os endpoints; as sessões retransmitidas usam o seu servidor. As sessões baseadas em ID são criptografadas de ponta a ponta quando os clientes têm a chave pública do seu servidor, enquanto o [Direct IP Access não é criptografado](https://github.com/rustdesk/rustdesk/wiki/FAQ) e, portanto, não substitui uma conexão por ID configurada corretamente.

Há mais um fluxo de trabalho a considerar: a **criação de um cliente personalizado**. Se você gerar um cliente com a sua marca ou pré-configurado a partir do Server Pro, esse build roda no serviço de build do RustDesk e, portanto, também exige acesso de saída. A configuração enviada é excluída assim que o build termina e o instalador é removido automaticamente após cerca de um dia, então faça o download e guarde-o no seu próprio repositório.

Para uma rede estritamente isolada, esse é o detalhe decisivo: um servidor que _nunca_ consegue alcançar rustdesk.com fica fora do modelo padrão; portanto, se você tem requisitos rígidos de isolamento, confirme o seu cenário exato com o RustDesk antes de se comprometer. Para a configuração muito mais comum de rede "quase isolada, com saída restrita", reserve um caminho HTTPS de saída até rustdesk.com — direto ou por proxy — e defina os domínios, as portas e o fluxo de aprovação exatos antes de escrever a política de firewall. Consulte a [documentação do RustDesk](https://rustdesk.com/docs/pt/) e observe que essa mesma exigência de licença é o motivo pelo qual [não é possível executar o Server Pro sem nenhum acesso à internet, mesmo instalando sem Docker](https://rustdesk.com/docs/pt/self-host/rustdesk-server-pro/installscript/).

## Inventarie todas as dependências de saída

Equipes de segurança e [MSPs](/pt/blog/rustdesk-para-msps-uma-ferramenta-unica-autogerenciada-e-personalizavel) que atendem ambientes restritos costumam fazer essa pergunta antes de instalar o RustDesk. A lista de saída do Server Pro é curta: validação da licença em rustdesk.com por HTTPS, o serviço de build do cliente personalizado (se você gerar clientes com a sua marca), atualizações de clientes, SMTP (se o seu servidor de e-mail estiver fora da rede) e qualquer provedor de identidade externo que você conectar. O servidor de ID/rendezvous, o relay e o console rodam dentro da sua rede, então uma regra de firewall precisa substitui a abertura excessiva da rede.

## Perguntas relacionadas

- Domínios e portas de saída: consulte a [documentação do RustDesk](https://rustdesk.com/docs/pt/).
- [Posso instalar o RustDesk Server Pro sem Docker em uma VM comum?](https://rustdesk.com/docs/pt/self-host/rustdesk-server-pro/installscript/)
- Como gerar um cliente com a sua marca: consulte a [documentação do RustDesk](https://rustdesk.com/docs/pt/).

Está planejando uma implantação restrita ou quase isolada? Libere o caminho da licença e os fluxos de saída que você realmente usa, mantenha todo o resto interno e escreva para [sales@rustdesk.com](mailto:sales@rustdesk.com) se o seu requisito for um isolamento permanente.
