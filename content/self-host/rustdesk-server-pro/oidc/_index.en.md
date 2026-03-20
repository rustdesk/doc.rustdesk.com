---
title: OIDC
weight: 16
description: "Configure OpenID Connect in RustDesk Server Pro so users can sign in with identity providers such as Google, Okta, Azure, GitHub, GitLab, and others."
keywords: ["rustdesk oidc", "rustdesk openid connect", "rustdesk sso", "rustdesk azure login", "rustdesk okta login", "rustdesk github login"]
---

Use OpenID Connect in RustDesk Server Pro to let users sign in with an existing identity provider instead of separate local credentials.

- Use your existing `Google`, `Okta`, `Facebook`, `Azure`, `GitHub`, `GitLab`, etc. accounts to easily create and log in to your `RustDesk Pro` account.
- For the specification see [OpenID Connect Core 1.0 incorporating errata set 1](https://openid.net/specs/openid-connect-core-1_0.html).

## What is OIDC in RustDesk Server Pro?

OIDC lets RustDesk Server Pro delegate login to an external identity provider. Instead of managing separate RustDesk passwords, users authenticate with the provider you already use for identity, access control, and account lifecycle.

## When should you use OIDC instead of local accounts?

- You already use Azure, Okta, GitHub, GitLab, Google, or another OIDC-capable provider
- You want centralized password policies and single sign-on
- You want to disable or deprovision user access from one identity system
- You want RustDesk account creation and login tied to your existing organization identity

## OIDC setup checklist

1. Create an application in your identity provider.
2. Collect the client ID, client secret, issuer URL, and any provider-specific endpoints.
3. Add the provider settings to RustDesk Server Pro.
4. Test sign-in with a non-admin account before rolling it out broadly.

## Provider examples
{{% children depth="4" showhidden="true" %}}
