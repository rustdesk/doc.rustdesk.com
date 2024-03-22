---
title: LDAP 
weight: 17
---

Please go to `LDAP` settings page as below.

![](/docs/en/self-host/rustdesk-server-pro/ldap/images/ldap.png)

- LDAP Host: This is the hostname or IP address of the LDAP server. For example, ldap.example.com or 192.0.2.1.

- LDAP Port: This is the port number on which the LDAP server is listening. The default port for LDAP is 389, and for LDAPS (LDAP over SSL) it's 636.

- Base DN (Distinguished Name): This is the starting point for the LDAP search. For example, dc=example,dc=com.

- Scope: This determines the scope of the search in the LDAP directory. It can be one (The entries immediately below the base DN), or sub (The entries immediately below the base DN).

- Bind DN / Password: The admin user name and password of your service account. This account is used to bind to LDAP to authenticate other users. It's often a user DN like cn=admin,dc=example,dc=com.

- Filter: This is the search filter for the LDAP query. For example, `(objectClass=person)`, or `(&(age=28)(!(name=Bob)))`.

- Username Attribute: This is the attribute which contains the username. For example, `uid` or `sAMAccountName`. By default, it uses `uid` and `cn`. Here is a discussion about this, [https://github.com/rustdesk/rustdesk-server-pro/issues/140#issuecomment-1916804393](https://github.com/rustdesk/rustdesk-server-pro/issues/140#issuecomment-1916804393).

- StartTLS: This is a boolean value (true or false) that determines whether to use StartTLS to upgrade the connection to a secure one.

- NoTLSVerify: This is a boolean value (true or false) that determines whether to skip TLS certificate verification. It's recommended to leave this as false (i.e., perform certificate verification) unless you're sure about what you're doing.

