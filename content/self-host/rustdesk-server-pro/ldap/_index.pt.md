---
title: LDAP
weight: 17
---

## Configuração
Por favor vá para a página de configurações `LDAP` como mostrado abaixo.

![](/docs/en/self-host/rustdesk-server-pro/ldap/images/ldap.png)

- **Host LDAP:** Este é o nome do host ou endereço IP do servidor LDAP. Por exemplo, `ldap.example.com` ou `192.0.2.1`.

- **Porta LDAP:** Este é o número da porta na qual o servidor LDAP está escutando. A porta padrão para LDAP é `389`, e para LDAPS (LDAP sobre SSL) é `636`.

- **DN Base:** Este é o ponto de partida para a busca LDAP. Por exemplo, dc=example,dc=com.

- **Escopo:** Isso determina o escopo da busca no diretório LDAP. Pode ser one (As entradas imediatamente abaixo do DN base), ou sub (As entradas imediatamente abaixo do DN base).

- **DN de Ligação / Senha:** O nome de usuário e senha do administrador da sua conta de serviço. Esta conta é usada para ligar ao LDAP para autenticar outros usuários. Geralmente é um DN de usuário como `cn=admin,dc=example,dc=com`.

- **Filtro:** Este é o filtro de busca para a consulta LDAP. Por exemplo, `(objectClass=person)`, ou `(&(age=28)(!(name=Bob)))`.

- **Atributo de Nome de Usuário:** Este é o atributo que contém o nome de usuário. Por exemplo, `uid` ou `sAMAccountName`. Por padrão, usa `uid` e `cn`. Aqui está uma [discussão](https://github.com/rustdesk/rustdesk-server-pro/issues/140#issuecomment-1916804393) sobre isso.

- **StartTLS:** Isso determina se deve usar StartTLS para atualizar a conexão para uma segura.

- **NoTLSVerify:** Isso determina se deve pular a verificação do certificado TLS. É recomendado deixar isso como false (ou seja, realizar verificação de certificado) a menos que você tenha certeza do que está fazendo.

## Como funciona?
- Como funcionam os logins LDAP, por exemplo, preciso criar um novo usuário primeiro, o RustDesk cria um usuário no primeiro login, etc.?
  > RustDesk cria um usuário no primeiro login
- Como verifico se o LDAP está funcionando (idealmente um comando que posso dar ao RustDesk para retornar os usuários descobertos.)?
  > Quando você submete a configuração, ele se conectará ao seu servidor LDAP com binddn/senha que você forneceu e verificará se funciona.
- Como mudo usuários locais para usuários LDAP?
  > Ainda não
- Suporta grupos LDAP?
  > Ainda não