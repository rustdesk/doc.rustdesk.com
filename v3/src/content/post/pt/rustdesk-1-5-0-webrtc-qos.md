---
publishDate: 2026-10-14T00:00:00Z
lang: pt
translationKey: rustdesk-1-5-0-webrtc-qos
title: 'RustDesk 1.5.0: conexões diretas via WebRTC e melhorias de QoS'
excerpt: 'O RustDesk 1.5.0 traz conexões via WebRTC, acesso direto pelo cliente Web e atualiza o QoS para atraso, congestionamento e metas de FPS.'
image: ~/assets/images/blog/web-client.jpg
category: Lançamento
slug: rustdesk-1-5-0-webrtc-qos-pt
tags:
  - WebRTC
  - QoS
  - cliente Web
  - lançamento
---

Recentemente, compartilhamos uma experiência prática: após a atualização para a versão 1.5.0, acessar um Mac em casa a partir de outro continente pareceu mais fluido do que antes. A [publicação original](https://x.com/rustdesk/status/2110243829978898520) descreve essa experiência. A seguir, estão as mudanças específicas de conexão e de adaptação da transmissão da tela na versão 1.5.0.

A [PR #15684](https://github.com/rustdesk/rustdesk/pull/15684) introduziu o suporte ao WebRTC Data Channel, colocando as tentativas de conexão ICE em paralelo com o hole punching por TCP e UDP e os caminhos diretos por IPv6 já existentes. Quando um relay está pronto, mas uma tentativa de conexão direta ainda está em andamento, o RustDesk mantém uma breve janela de preferência pela conexão direta. Ele pode usar o relay quando essa janela termina ou quando as tentativas diretas falham. Isso oferece novas oportunidades de conexão direta para algumas conexões que antes exigiam um relay.

**O cliente Web agora também pode se conectar diretamente.** Antes, as sessões do RustDesk no navegador precisavam passar por um servidor de relay. Quando as condições de rede permitem e o ICE seleciona um caminho direto, os dados da sessão agora podem trafegar diretamente entre o navegador e o dispositivo remoto, potencialmente evitando a latência e os limites de largura de banda do relay. Uma conexão WebRTC encaminhada por TURN continua sendo retransmitida por um relay. A integração transporta o protocolo do RustDesk pelo Data Channel; o RustDesk continua responsável pela codificação e decodificação de vídeo.

As mudanças de QoS vêm da [PR #16082](https://github.com/rustdesk/rustdesk/pull/16082). Ela trata das quedas bruscas na taxa de quadros causadas pela política anterior após uma única resposta lenta ou uma breve interrupção, seguidas de uma recuperação lenta. As mudanças na versão 1.5.0 incluem:

- **Melhor referência de atraso.** Usa a referência de baixo atraso de cada conexão desde a primeira resposta, adaptando-se gradualmente a mudanças estáveis nessa referência para reduzir avaliações incorretas em links de alta latência.
- **Confirmação das oscilações comuns de atraso.** As reduções normais na taxa de quadros exigem três respostas consecutivas que indiquem condições ruins. Um atraso excedente muito alto e timeouts das sondagens ainda podem provocar reduções mais rápidas.
- **Taxa de bits primeiro quando as condições permitem.** Durante o ajuste normal ao congestionamento, reduz primeiro a taxa de bits quando a taxa de bits adaptativa está ativada e ainda pode diminuir, em vez de depender apenas de menos quadros com um codificador que mantém sua taxa de bits alvo.
- **Inicialização e recuperação mais rápidas da meta de taxa de quadros.** Duas respostas consecutivas com baixo atraso excedente em um link sem congestionamento podem acelerar o aumento da meta durante a inicialização. Após um congestionamento, duas respostas boas podem restaurar a meta anterior de taxa de quadros. O controlador desfaz a restauração se o congestionamento voltar rapidamente.

Essas políticas usam um feedback de atraso que compartilha o caminho da transmissão da tela. Esse feedback inclui o acúmulo de dados no transporte, o tempo de ida e volta na rede e o agendamento das respostas do cliente. Ele sinaliza mudanças de carga, sem medir isoladamente o atraso de filas. [Implementação do QoS na versão 1.5.0](https://github.com/rustdesk/rustdesk/blob/1.5.0/src/server/video_qos.rs).

Para a mudança que acelera a inicialização, o autor da PR comparou a mudança com seu commit pai em um teste em um link local no escritório: o tempo de inicialização para atingir a **meta de 60 FPS** caiu de **7,99 segundos para 2,98 segundos**. Essa medição representa o efeito da mudança no aumento gradual da meta de taxa de quadros durante a inicialização naquele teste. [Relatório do teste](https://github.com/rustdesk/rustdesk/pull/16082#issuecomment-5597385117).

Atualize para o [RustDesk 1.5.0](https://github.com/rustdesk/rustdesk/releases/tag/1.5.0) ou experimente o novo caminho de conexão no [cliente Web](https://rustdesk.com/web). O WebRTC exige suporte dos dois pares e do servidor. Ele vem desativado por padrão para servidores auto-hospedados; habilite explicitamente `enable-webrtc=Y`. Para o Server Pro, a documentação informa suporte a partir da versão 1.8.7. Veja o [guia de configurações](https://rustdesk.com/docs/pt/self-host/client-configuration/advanced-settings/#enable-webrtc) para configurar.
