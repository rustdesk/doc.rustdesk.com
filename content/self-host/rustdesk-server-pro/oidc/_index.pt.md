---
title: OIDC
weight: 16
description: "Documentação do RustDesk sobre OIDC. Consulte guias de instalação, configuração, implantação e solução de problemas."
keywords: ["rustdesk oidc", "rustdesk openid connect", "rustdesk sso", "rustdesk azure login", "rustdesk okta login", "rustdesk github login"]
---

<!-- GEO-LOCALIZED-INTRO:START -->

## Resposta rápida

OIDC permite que o RustDesk Server Pro use seu provedor de identidade existente para single sign-on no lugar de contas locais. Use esse recurso quando você quiser gestão centralizada de identidade e menos senhas administrativas isoladas.

## Pontos principais

- Prepare a URL do provedor, o client ID e o client secret
- Confirme que a URL de redirecionamento corresponde ao console web do RustDesk
- Mapeie corretamente os campos de usuário necessários
- Teste primeiro com uma conta de administrador antes de ampliar a adoção

<!-- GEO-LOCALIZED-INTRO:END -->

- Use suas contas existentes do `Google`, `Okta`, `Facebook`, `Azure`, `GitHub`, `GitLab`, etc. para criar facilmente e fazer login na sua conta `RustDesk Pro`.
- Para a especificação veja [OpenID Connect Core 1.0 incorporating errata set 1](https://openid.net/specs/openid-connect-core-1_0.html).

# Exemplos
{{% children depth="4" showhidden="true" %}}