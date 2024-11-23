---
title: All with GitHub Actions
weight: 35
---

{{% notice note %}}
Este processo de construção usa o GitHub Actions. Você precisará de uma conta no GitHub. Além disso, a construção pode ser lenta, mas não requer nenhum ambiente de desenvolvimento específico.
{{% /notice %}}

### Criando um Fork

Acesse [https://github.com/rustdesk/rustdesk/fork](https://github.com/rustdesk/rustdesk/fork) e clique em "Criar Fork".

### Definindo Variáveis de Ambiente (Opcional)

{{% notice note %}}
Você só precisa fazer isso se quiser alterar o servidor padrão e a chave pública.

A URL do servidor e a chave que você está usando ficam ocultas de outros usuários no GitHub, no entanto, eles podem baixar o cliente e se conectar ao seu servidor. Se você precisar de um repositório totalmente privado, pode importar o repositório RustDesk Client usando https://github.com/new/import. <br>
**Se você usar um repositório privado, terá uma quantidade limitada de builds que poderá criar por mês. Se precisar de mais, será necessário ter uma conta paga do GitHub.**
{{% /notice %}}

No fork que você acabou de criar, vá para "Settings → Secrets and variables → Actions".

Clique em "New repository secret". No campo "Nome", digite RENDEZVOUS_SERVER e no campo "secret", digite o nome/endereço IP do seu servidor.

Clique em "Add secret".

Clique em "New repository secret". No campo "Nome", digite RS_PUB_KEY e no campo "secret", digite a chave pública do seu servidor.

Clique em "Add secret".

### Habilitando Workflows

No fork que você acabou de criar, vá para "Configurações → Ações → Geral".

À direita, selecione "Permitir todas as ações e workflows reutilizáveis".

Depois que os workflows forem habilitados, você pode ir para "Ações".

À esquerda, selecione "Flutter Nightly Build". Em seguida, à direita, clique em "Habilitar workflow".

Por fim, você pode clicar em "Executar workflow" para construir os Clientes RustDesk para todas as plataformas suportadas.

### Habilitando Permissões de Upload para Workflows

No fork que você acabou de criar, vá para "Configurações → Ações → Geral".

Role a página para baixo e, em Permissões de Workflow, habilite "Permissões de leitura e gravação".

### Baixando seus Pacotes Construídos

Depois que o workflow terminar de ser executado, você poderá baixar os pacotes que ele construiu.

Vá para a página principal do seu fork e, à direita, clique em "Releases". Os pacotes que você acabou de construir aparecerão em "Nightly" (Noturno).
