---
publishDate: 2026-06-26T19:43:00Z
lang: en
translationKey: rustdesk-active-directory-ldap-sso
draft: false
title: 'RustDesk LDAP, Active Directory & SSO Support'
excerpt: "RustDesk Server Pro supports LDAP, Active Directory, and OIDC SSO from the Basic plan up. Here's how identity keying works and the one setup gotcha to avoid."
image: ~/assets/images/blog/rustdesk-active-directory-ldap-sso-og.png
category: Deployment
tags:
  - RustDesk
  - deployment
  - enterprise
author: RustDesk Team
faq:
  - question: 'Does RustDesk Server Pro support LDAP and Active Directory login?'
    answer: 'Yes. RustDesk Server Pro supports LDAP / Active Directory authentication starting from the Basic plan (the entry-level Individual tier does not include it). Users sign in with their existing directory credentials, and the username acts as the stable unique identifier, so it is best not to change it once accounts are provisioned. Always check rustdesk.com/pricing for the current plan matrix.'
  - question: 'Does RustDesk support single sign-on (SSO) in addition to LDAP?'
    answer: 'OIDC-based single sign-on is available from the Basic plan and up, alongside LDAP / Active Directory. For SAML specifically, or for the current list of supported identity providers, check the RustDesk docs, since supported protocols change between releases.'
  - question: "What happens to a user's access if I move them to another AD organizational unit?"
    answer: 'Access is unaffected. RustDesk keys identity on the username, not the full Distinguished Name (DN), so moving a user between OUs changes their DN but not their RustDesk identity. Renaming the username, however, breaks the mapping, so treat usernames as immutable once provisioned.'
  - question: 'Is LDAPS with an internal certificate authority supported?'
    answer: 'LDAPS with a custom PKI certificate was not yet supported as of this writing. If your policy requires LDAP over TLS validated against your own internal CA, confirm current status with the RustDesk team and raise the request so your use case is counted.'

metadata:
  description: 'RustDesk Server Pro supports LDAP, Active Directory, and OIDC SSO from the Basic plan up. How identity keying works and the setup gotcha to avoid.'
  keywords: 'RustDesk LDAP Active Directory, RustDesk SSO, RustDesk OIDC, RustDesk LDAP setup'
---

Yes. RustDesk Server Pro supports LDAP and Active Directory-style authentication starting from the Basic plan (the entry-level Individual tier does not include it). Users log in with their existing directory credentials, so you do not maintain a second set of accounts.

## The short answer

LDAP / Active Directory (AD) authentication is available starting from RustDesk's **Basic plan** — it is not included in the entry-level Individual tier. OIDC-based single sign-on (SSO) is available from the same Basic plan and up. Which plan you choose depends on your number of users and devices, whether you need a custom client (also available from the Basic plan and up), and whether you want a self-hosted web client. The one thing to know before you start: the **username is the unique identifier**, so keep it stable once accounts exist. LDAPS with a custom PKI certificate was not implemented as of this writing — confirm current status with the team. Always check [rustdesk.com/pricing](https://rustdesk.com/pricing) for the current plan matrix, since tiers and feature gating change over time.

## In detail

LDAP is gated to the Basic plan and above rather than included in every paid tier — the entry-level Individual plan is aimed at solo users and doesn't include directory authentication. If LDAP/AD login is a requirement, budget for at least the Basic tier, then size up from there based on your user and device counts, whether you need a [custom-branded client](/blog/rustdesk-web-console-custom-client-generator-port-21114), or a self-hosted web client. [rustdesk.com/pricing](https://rustdesk.com/pricing)

The most important operational detail is how RustDesk keys user identity. It uses the **username as the unique identifier**, not the full Distinguished Name (DN). That distinction matters in real AD environments where objects get reorganized. If you move a user between Organizational Units (OUs), their DN changes, but as long as the username stays the same their RustDesk identity remains stable and their access is unaffected. Conversely, renaming a username can create a mismatch. The practical rule: reorganize your directory freely, but treat usernames as immutable once provisioned.

One current limitation to plan around: **LDAPS with a custom PKI certificate is not yet supported**. If your security policy requires LDAP over TLS validated against your own internal certificate authority, that is not a documented configuration today — the console offers StartTLS and a skip-verification option (NoTLSVerify), but no field to trust your own private CA. It is worth raising with the team so your use case is counted. [rustdesk.com](https://rustdesk.com)

For setup, you point Server Pro's LDAP configuration at your directory server (bind account, base DN, user search filter) through the admin console. Because the exact fields and console layout evolve between releases, follow the current [RustDesk LDAP documentation](https://rustdesk.com/docs) rather than relying on a static screenshot.

## Who asks this

Directory admins — in-house or at an [MSP](/blog/rustdesk-for-msps) — wiring RustDesk into an existing Active Directory or OIDC identity source raise this while planning SSO, usually because policy forbids a second set of credentials. If users move to another Active Directory OU and their DN changes, preserve the username used as RustDesk's unique identifier and validate synchronization in a test environment.

## Related questions

- [Does RustDesk support SSO or SAML in addition to LDAP / Active Directory?](https://rustdesk.com/docs)
- [Which RustDesk plan do I need for a custom-branded client?](/blog/rustdesk-web-console-custom-client-generator-port-21114)
- [How does per-user versus per-device licensing work in Server Pro?](/blog/rustdesk-pro-license-cost-how-to-pay)
- [Can I self-host the RustDesk web client, and which plan includes it?](/blog/rustdesk-web-client-v2-preview)
- [Is LDAPS (LDAP over TLS) supported with an internal certificate authority?](https://rustdesk.com/docs)

Evaluating RustDesk for your directory-backed environment? Check the current plan and LDAP details at rustdesk.com, and reach out to the team if you need LDAPS with a custom PKI certificate so they can weigh your requirement.
