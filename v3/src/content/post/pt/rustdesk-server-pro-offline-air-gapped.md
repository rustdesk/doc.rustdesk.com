---
publishDate: 2026-06-28T16:50:00Z
lang: 'pt'
translationKey: rustdesk-server-pro-offline-air-gapped
draft: false
title: 'O RustDesk Server Pro Pode Funcionar Offline ou em Rede Isolada (Air-Gapped)?'
excerpt: 'Não — o RustDesk Server Pro auto-hospedado precisa de acesso de saída contínuo a rustdesk.com para validar sua licença, portanto uma implantação totalmente isolada (air-gapped) não é suportada.'
image: ~/assets/images/blog/rustdesk-server-pro-offline-air-gapped-og.png
category: 'Implantação'
tags: ['RustDesk', 'Implantação', 'Auto-hospedagem']
author: RustDesk Team
slug: 'o-rustdesk-server-pro-pode-funcionar-offline-ou-em-rede-isolada-air'
faq:
  - question: 'O RustDesk Server Pro pode funcionar offline ou em rede isolada (air-gapped)?'
    answer: 'Não. O Server Pro licenciado precisa manter uma conexão de saída com rustdesk.com para validar sua licença enquanto está em execução, portanto uma implantação totalmente isolada (air-gapped), que nunca se comunica com o exterior, não é suportada. Ainda assim, você pode restringir bastante o tráfego de saída e roteá-lo por um proxy.'
  - question: 'O RustDesk Server Pro precisa de uma conexão permanente com a internet?'
    answer: 'Ele precisa de acesso de saída contínuo a rustdesk.com para validar a licença, mas não de uma conexão literalmente ininterrupta. O servidor faz uma verificação pela porta 443 cerca de uma vez por dia e, se a verificação falhar, continua tentando até ter sucesso ou até que se passem aproximadamente sete dias — portanto, uma interrupção breve é tolerada, mas um servidor isolado de rustdesk.com por mais tempo do que essa janela de tolerância deixa de validar a licença. As próprias sessões remotas são intermediadas pelos seus servidores de relay e de ID (rendezvous) auto-hospedados.'
  - question: 'De que acesso de saída uma implantação isolada do RustDesk Server Pro precisa?'
    answer: 'Permita o tráfego HTTPS de saída do servidor para rustdesk.com para a validação da licença (e para o provisionamento de cliente personalizado, caso você o utilize). Há suporte para uso de proxy, para que o restante da rede possa permanecer bloqueado. Confirme os domínios e portas exatos na documentação do RustDesk.'
  - question: 'Existe uma opção de licenciamento do RustDesk totalmente air-gapped (isolada)?'
    answer: 'O produto licenciado padrão não foi projetado para um isolamento total que nunca se comunica com o exterior. Se você tiver requisitos rígidos de isolamento (air gap), confirme seu cenário exato com a RustDesk antes de se comprometer.'
metadata:
  description: 'O RustDesk Server Pro auto-hospedado pode funcionar em rede isolada (air-gapped)? Não — a licença Pro precisa de acesso de saída contínuo a rustdesk.com, portanto um isolamento total não é suportado.'
  keywords: 'rustdesk server pro offline, rustdesk air-gapped, requisito de internet do rustdesk self-hosted, verificação de licença do rustdesk server pro, implantação offline do rustdesk, o rustdesk precisa de internet'
---

Não — uma implantação auto-hospedada do RustDesk Server Pro não foi projetada para funcionar totalmente offline ou em rede isolada (air-gapped). A licença Pro precisa alcançar rustdesk.com por meio de uma conexão de saída para permanecer válida — tanto no momento da ativação quanto de forma contínua enquanto o servidor está em execução — portanto, uma rede verdadeiramente isolada, que nunca se comunica com o exterior, está fora do modelo suportado.

## A resposta curta

Na prática, a verificação é periódica, não constante: o servidor entra em contato com rustdesk.com pela porta 443 aproximadamente uma vez por dia e, se uma verificação falhar, continua tentando até que tenha sucesso ou até que se passem cerca de sete dias — depois disso, a licença deixa de validar. Essa janela de tolerância integrada significa que uma interrupção breve na internet não vai derrubar sua implantação imediatamente, mas um servidor permanentemente offline vai. Seus serviços de ID e de relay continuam auto-hospedados; as sessões diretas fluem entre os endpoints e as sessões retransmitidas usam o seu relay. Você pode manter a rede rigorosamente restrita: há suporte para uso de proxy, de modo que, na prática, basta liberar o caminho HTTPS de saída necessário e bloquear o restante.

## Em detalhes

O servidor RustDesk de código aberto, que você pode auto-hospedar sem licença, é outra questão; a exigência discutida aqui se aplica especificamente ao conjunto de recursos do **Server Pro licenciado**. Se a sua objeção é, fundamentalmente, manter os dados das sessões na sua própria infraestrutura, a auto-hospedagem já alcança esse objetivo — a exigência de conexão de saída diz respeito ao licenciamento, não à intermediação de cada sessão.

Há um segundo fluxo de trabalho a considerar: a **criação de um cliente personalizado**. Se você gerar um cliente com marca própria ou pré-configurado a partir do Server Pro, essa etapa de provisionamento também exige acesso de saída. Confirme o comportamento atual para a sua versão e o seu plano.

Para uma rede estritamente isolada (air-gapped), esse é o detalhe decisivo. Um servidor verdadeiramente isolado que _nunca_ consegue alcançar rustdesk.com está fora do modelo padrão; portanto, se você tiver requisitos rígidos de isolamento, confirme seu cenário exato com a RustDesk antes de se comprometer. Para a configuração muito mais comum de "majoritariamente isolada, com saída restrita", a conclusão prática é reservar um caminho HTTPS de saída até rustdesk.com — diretamente ou por meio de um proxy — e definir os domínios, portas e fluxo de aprovação exatos antes de escrever a política de firewall. Consulte a [documentação do RustDesk](https://rustdesk.com/docs) e observe que a mesma exigência de licença é o motivo pelo qual [não é possível executar o Server Pro sem nenhum acesso à internet mesmo ao instalar sem o Docker](https://rustdesk.com/docs/pt/self-host/rustdesk-server-pro/installscript/).

## Quem faz essa pergunta

Operadores de redes isoladas ou regulamentadas fazem essa pergunta antes mesmo de instalar o RustDesk — tanto equipes de segurança quanto [MSPs](/pt/blog/rustdesk-para-msps-uma-ferramenta-unica-autogerenciada-e-personalizavel) que atendem ambientes altamente restritos. Suas redes podem estar atrás de firewalls rígidos de saída, ou eles simplesmente querem minimizar dependências externas. Saber que a licença precisa de um caminho de saída contínuo — e apenas isso — permite que eles escrevam uma regra de firewall precisa, em vez de abrir demais a rede ou presumir erroneamente que o produto vai funcionar em um vácuo total.

## Perguntas relacionadas

- Domínios e portas de saída: consulte a [documentação do RustDesk](https://rustdesk.com/docs).
- [Posso instalar o RustDesk Server Pro sem o Docker em uma VM simples?](https://rustdesk.com/docs/pt/self-host/rustdesk-server-pro/installscript/)
- Gerar um cliente personalizado com marca própria: consulte a [documentação do RustDesk](https://rustdesk.com/docs).

Está planejando uma implantação altamente restrita ou quase isolada (near-air-gapped)? Confirme os detalhes atuais de conectividade e licenciamento em rustdesk.com antes de finalizar sua política de firewall.
