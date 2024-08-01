---
title: LDAP
weight: 17
---

## Configuração
Acesse a página de configurações `LDAP` conforme abaixo:

![](/docs/en/self-host/rustdesk-server-pro/ldap/images/ldap.png)

- **Servidor LDAP:**  É o nome do host ou endereço IP do servidor LDAP. Por exemplo, `ldap.exemplo.com` ou `192.0.2.1`.

- **Porta LDAP:**  É a porta em que o servidor LDAP está escutando. A porta padrão para LDAP é `389` e para LDAPS (LDAP sobre SSL) é `636`.

- **Base DN:**  É o ponto de partida para a pesquisa LDAP. Por exemplo, dc=exemplo,dc=com.

- **Escopo:**  Determina o escopo da pesquisa no diretório LDAP. Pode ser one (as entradas imediatamente abaixo do DN base) ou sub (as entradas imediatamente abaixo do DN base e todas as sub-entradas).

- **DN de ligação / Senha:**  O nome de usuário e a senha da conta de serviço do administrador. Esta conta é usada para se conectar ao LDAP para autenticar outros usuários. Geralmente é um DN de usuário como `cn=admin,dc=exemplo,dc=com`.

- **Filtro:**  Este é o filtro de pesquisa para a consulta LDAP. Por exemplo, `(objectClass=person)`, ou `(&(age=28)(!(name=Bob)))`.

- **Atributo de Nome de Usuário:**  É o atributo que contém o nome de usuário. Por exemplo, `uid` ou `sAMAccountName`. Por padrão, ele usa `uid` e `cn`. Aqui está uma [discussão](https://github.com/rustdesk/rustdesk-server-pro/issues/140#issuecomment-1916804393) (Em Inglês)sobre isso.

- **StartTLS:** Determina se deve usar StartTLS para atualizar a conexão para uma segura.

- **NoTLSVerify:** Determina se deve ignorar a verificação do certificado TLS. É recomendável deixar isso como falso (ou seja, realizar a verificação do certificado) a menos que você tenha certeza do que está fazendo.

## Como funciona?
- Como funcionam os logins LDAP, por exemplo, preciso criar um novo usuário primeiro, o RustDesk cria um usuário no primeiro login, etc?
> O RustDesk cria um usuário no primeiro login.
- Como verifico se o LDAP está funcionando (idealmente um comando que posso dar ao RustDesk para retornar os usuários descobertos)?
> Quando você enviar a configuração, ele se conectará ao seu servidor LDAP com o binddn/senha que você forneceu e verificará se funciona.
- Como mudo usuários locais para usuários LDAP?
> Ainda não é possível.
- Ele suporta grupos LDAP?
> Ainda não.
