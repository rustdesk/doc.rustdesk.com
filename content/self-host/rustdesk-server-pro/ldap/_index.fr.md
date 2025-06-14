---
title: LDAP
weight: 17
---

## Configuration
Veuillez aller à la page de paramètres `LDAP` comme ci-dessous.

![](/docs/en/self-host/rustdesk-server-pro/ldap/images/ldap.png)

- **Hôte LDAP :** C'est le nom d'hôte ou l'adresse IP du serveur LDAP. Par exemple, `ldap.example.com` ou `192.0.2.1`.

- **Port LDAP :** C'est le numéro de port sur lequel le serveur LDAP écoute. Le port par défaut pour LDAP est `389`, et pour LDAPS (LDAP sur SSL) c'est `636`.

- **DN de base :** C'est le point de départ pour la recherche LDAP. Par exemple, dc=example,dc=com.

- **Portée :** Cela détermine la portée de la recherche dans le répertoire LDAP. Cela peut être one (Les entrées immédiatement en dessous du DN de base), ou sub (Les entrées immédiatement en dessous du DN de base).

- **DN de liaison / Mot de passe :** Le nom d'utilisateur et le mot de passe administrateur de votre compte de service. Ce compte est utilisé pour se lier à LDAP pour authentifier d'autres utilisateurs. C'est souvent un DN d'utilisateur comme `cn=admin,dc=example,dc=com`.

- **Filtre :** C'est le filtre de recherche pour la requête LDAP. Par exemple, `(objectClass=person)`, ou `(&(age=28)(!(name=Bob)))`.

- **Attribut nom d'utilisateur :** C'est l'attribut qui contient le nom d'utilisateur. Par exemple, `uid` ou `sAMAccountName`. Par défaut, il utilise `uid` et `cn`. Voici une [discussion](https://github.com/rustdesk/rustdesk-server-pro/issues/140#issuecomment-1916804393) à ce sujet.

- **StartTLS :** Cela détermine s'il faut utiliser StartTLS pour mettre à niveau la connexion vers une connexion sécurisée.

- **NoTLSVerify :** Cela détermine s'il faut ignorer la vérification du certificat TLS. Il est recommandé de laisser ceci comme false (c'est-à-dire, effectuer la vérification du certificat) sauf si vous êtes sûr de ce que vous faites.

## Comment ça marche ?
- Comment fonctionnent les connexions LDAP, par exemple, dois-je créer un nouvel utilisateur d'abord, RustDesk crée-t-il un utilisateur lors de la première connexion, etc. ?
  > RustDesk crée un utilisateur lors de la première connexion
- Comment puis-je vérifier que LDAP fonctionne (idéalement une commande que je peux donner à RustDesk pour retourner les utilisateurs découverts.) ?
  > Lorsque vous soumettez la configuration, il se connectera à votre serveur LDAP avec le binddn/mot de passe que vous avez donné et vérifiera s'il fonctionne.
- Comment puis-je changer les utilisateurs locaux en utilisateurs LDAP ?
  > Pas encore
- Est-ce qu'il supporte les groupes LDAP ?
  > Pas encore