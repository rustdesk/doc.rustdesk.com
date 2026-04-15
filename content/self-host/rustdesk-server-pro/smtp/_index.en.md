---
title: SMTP
weight: 16
description: "Configure SMTP in RustDesk Server Pro to send invitations, login verification emails, and connection alarms from your self-hosted server."
keywords: ["rustdesk smtp", "rustdesk email notifications", "rustdesk login verification email", "rustdesk invitation email", "rustdesk server pro smtp"]
---

Use this guide to configure outbound email for RustDesk Server Pro with SMTP.

SMTP setup enables your server to send email notifications, such as user invitations, login verifications, and connection alarms.

## What is SMTP used for in RustDesk Server Pro?

SMTP is used for outgoing email from your RustDesk Server Pro deployment. In practice, that usually means invitation emails, login verification codes, and connection alarm notifications.

## SMTP setup checklist

1. Choose an SMTP server that allows outbound mail from your hosting environment.
2. Collect the host, port, username, password, and sender address.
3. Add those settings in the RustDesk Server Pro web console.
4. Run a test from the console before enabling email-based flows for users.

## If email is not working, what should you check first?

- Whether your VPS provider blocks ports such as `25`, `465`, or `587`
- Whether your mail provider requires an app password or relay-specific credentials
- Whether the `From` address is allowed by your mail provider
- Whether TLS and the selected SMTP port match your mail provider requirements

For Microsoft 365 OAuth2 setup, see [Microsoft 365](Microsoft 365/).

[Video Tutorial](https://youtu.be/0LyQY1JS4Uc)
