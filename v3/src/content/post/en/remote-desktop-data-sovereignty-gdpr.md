---
publishDate: 2026-07-04T17:05:00Z
updateDate: 2026-10-14T00:00:00Z
lang: en
translationKey: remote-desktop-data-sovereignty-gdpr
draft: false
title: 'Remote Desktop Data Sovereignty & GDPR: Self-Hosting'
excerpt: 'How self-hosting gives regulated teams control over rendezvous, relay, and device data — and which GDPR and compliance questions remain.'
image: ~/assets/images/blog/remote-desktop-data-sovereignty-gdpr-og.webp
category: Security
tags:
  - RustDesk
  - security
  - GDPR
  - self-hosting
author: RustDesk Team
faq:
  - question: 'Is RustDesk ISO 27001, SOC 2, or HIPAA compliant?'
    answer: 'Self-hosted RustDesk is assessed inside your own compliance program: the ID/rendezvous, relay and console run on infrastructure you operate, so they fall under your ISO 27001 scope, SOC 2 controls or HIPAA safeguards like the rest of your environment. Self-hosting is a deployment control, not a certification. Ask sales@rustdesk.com about available vendor reports, a BAA, DPA or procurement evidence for your scenario.'
  - question: 'Does self-hosting RustDesk help with GDPR compliance?'
    answer: 'Yes — it gives you the control GDPR is usually about: you choose where the ID/rendezvous, relay, console, and device data live and can keep them in-region on infrastructure you operate. That is a strong foundation rather than an automatic guarantee, since GDPR is a program — lawful basis, controller/processor roles, retention, access control, endpoint locations, and incident response are still yours to define, with the controller remaining responsible.'
  - question: 'Where does RustDesk session data actually go?'
    answer: 'RustDesk first tries a direct peer-to-peer connection; if that fails, traffic uses your configured relay. Self-hosting removes a vendor-operated rendezvous and relay from the path, but a session between endpoints in different countries still crosses those networks — server placement alone does not confine all traffic to one jurisdiction.'
  - question: 'Can I keep remote desktop data inside the EU with RustDesk?'
    answer: 'Yes. You can place the ID/rendezvous, relay, console, and stored device data in an EU data center. To constrain session traffic too, both endpoints must be within the boundary and policy must force traffic through your approved relay; document endpoint locations and routing alongside server placement.'
  - question: 'What RustDesk features help meet GDPR?'
    answer: 'RustDesk Server Pro provides audit logs with configurable retention (Settings > Other > Log Retention (Days); 0 keeps logs indefinitely), Access Control and Control Role for least privilege, LDAP/OIDC SSO, per-connection consent, privacy mode on Windows and macOS, and user and device deletion through the console or API for erasure requests. Self-hosting lets you choose where all of it runs.'
metadata:
  description: 'Remote desktop data sovereignty & GDPR: what self-hosting controls, how direct and relayed sessions differ, and why compliance needs more than server location.'
  keywords: 'remote desktop data sovereignty, GDPR remote access, remote desktop data residency, self-hosted remote access compliance'
---

If your organization is bound by GDPR, healthcare privacy rules, or a public-sector "our data stays on our infrastructure" mandate, one question decides which remote desktop tool you can even shortlist: **where does the session data actually go?**

In a vendor-hosted service, the vendor generally operates coordination and stores management/account data. Session media may travel directly between endpoints or use a relay. A data-flow review must distinguish those paths; “brokered by the cloud” does not mean every screen packet crosses it.

This guide is about **remote desktop data sovereignty**: what it means, why it matters for regulated and EU buyers, and which parts of a remote-access deployment self-hosting lets you control. We'll use RustDesk as the worked example.

## What "data sovereignty" means for remote access

Data sovereignty is the principle that data is subject to the laws of the country where it's physically stored and processed. For remote support, the sensitive data isn't just files you transfer — it's the session itself: what's on the screen, the list of devices you manage, the connection metadata, and often the routing of the pixels in real time.

The core questions are: **which systems store metadata, which systems relay traffic, and where are both endpoints?** Self-hosting can remove a vendor-operated rendezvous or relay service from the path, but it cannot guarantee that a session between endpoints in different countries remains in one jurisdiction.

## The core difference: vendor cloud vs. your infrastructure

This is where architecture, not marketing, decides the outcome.

**RustDesk Server Pro is self-hosted.** The ID/rendezvous server, relay server, web console, and managed-device data run on infrastructure you choose. RustDesk first attempts a direct peer-to-peer connection through hole punching; if that fails, session traffic uses your configured relay. This gives you control over the rendezvous/relay layer and stored device data, but the endpoints and their network routes still determine where direct traffic travels.

|                                | Vendor-cloud tools     | Self-hosted RustDesk                                                                    |
| ------------------------------ | ---------------------- | --------------------------------------------------------------------------------------- |
| Where sessions are coordinated | Vendor's cloud         | Your ID/rendezvous server                                                               |
| Where session traffic flows    | Vendor-defined routing | Direct between endpoints when possible; otherwise through your relay                    |
| Who controls data residency    | The vendor             | You choose server-side location and relay policy; endpoints still matter                |
| Auditability of the client     | Usually closed source  | [Open source (AGPL)](https://github.com/rustdesk/rustdesk) — read and build it yourself |
| Who runs the server            | Vendor                 | Your team                                                                               |

Teams evaluating self-hosting often cite this control first: choosing the location and operator of the rendezvous, relay and management systems.

## Benefit 1: You control the server-side data location

Place the ID, relay, and management services in a German data center and you can document exactly where those services and their stored data reside. Keep both endpoints inside the required boundary and force traffic through that approved relay, and you can constrain the session route as well.

## Benefit 2: Open source means you can verify the client

RustDesk's **client and RustDesk Server OSS (the free community server) are [AGPL-licensed](https://github.com/rustdesk/rustdesk)**; **Server Pro is commercial, proprietary self-hosted server software**. Your security team can read the client code, audit what it does on an endpoint and build it yourself. That matters more than usual for remote access: the software is trusted to control a machine entirely, and regulated buyers increasingly want to verify what a client does rather than take a vendor's word for it.

## Benefit 3: A different server-licensing model

RustDesk standard plans are licensed **per login-user plus per managed-device** and include unlimited concurrent connections; only [Customized V2](https://rustdesk.com/pricing#custom2) licenses a set number of concurrent connections. You can [upgrade a license](/blog/upgrade-rustdesk-license-mid-subscription) at any time as requirements change.

The model scales with your estate: the [large-fleet planning guide](/blog/rustdesk-scale-50000-200000-devices) covers deployments up to 200,000 devices. Server Pro adds per-user and device-group [Access Control](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/permissions/), plus LDAP/OIDC SSO and custom client generation from the Basic plan.

## How RustDesk fits ISO 27001, SOC 2, or HIPAA requirements

Enterprise procurement and healthcare teams almost always ask how a remote-access tool maps to ISO 27001, SOC 2, or HIPAA. With a cloud product, you depend on the vendor's certification of its own infrastructure and its shared-responsibility terms. Self-hosted RustDesk works the other way: the ID/rendezvous, relay and console run on infrastructure your program already covers, so you assess them under your own ISO 27001 scope, SOC 2 controls or HIPAA safeguards, and your security team can inspect the client source as part of that assessment. Self-hosting is a deployment control, not a certification; the assessment is what brings it into scope.

A few practical notes:

- Self-hosting lets you choose the location and operator of rendezvous, relay, console and stored management data. Document endpoint routing, backups and administrator access alongside those locations.
- If your procurement specifically requires a vendor-side SOC 2 report, a signed Business Associate Agreement (BAA), a DPA, or completed security questionnaires, ask the RustDesk team at [sales@rustdesk.com](mailto:sales@rustdesk.com) what is currently available for your scenario.
- Because the client is open source, "how do we know what it does?" is answered by inspection; vendor assurance reports answer a different procurement question.

In short, self-hosting folds remote access into the compliance program you already run, which is often a stronger position for a regulated team than relying on a vendor's certification of infrastructure you cannot inspect.

## Controls that support a self-hosted GDPR program

Self-hosting is the foundation, and on top of it RustDesk provides concrete controls self-hosted teams rely on in a GDPR program:

- **Server data stays where you place it, with a short list of outbound workflows.** Self-hosted ID/rendezvous, relay and Pro management services process their deployment data where you run them. The outbound workflows to document are Pro license validation (HTTPS to rustdesk.com about once a day), the custom client build service, client updates, SMTP if you configure an external mail server, and any external identity provider you connect. See the [Server Pro offline and air-gapped guide](/blog/rustdesk-server-pro-offline-air-gapped).
- **Configurable audit retention.** [Server Pro audit logs](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/audit-logs/#log-visibility-and-retention) cover connections, file transfer, alarms and console operations. In **Settings → Other → Log Retention (Days)**, `0` retains all logs indefinitely; a positive value deletes older logs, with cleanup once per hour. Define retention for exports and backups separately.
- **Granular, scoped access.** [Access Control](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/permissions/) decides who can reach which devices through per-user assignments, device groups and cross-group rules (user-group and device-group permissions are cumulative). The shared address book only organizes entries; it is not an access boundary. [Control Role](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/control-role/) limits what a technician may do in-session — keyboard/mouse, clipboard, file transfer, audio, camera, terminal, printing, recording, and more. Together with SSO/LDAP and controlled-device 2FA, they enforce least privilege and purpose limitation.
- **Privacy mode and per-connection consent.** The controlled side can require approval for each incoming connection, and privacy mode (supported on Windows and macOS) blacks out the local display during a session, limiting incidental exposure of personal data on screen.
- **Deletion on your terms.** Because the data lives on your server, you can disable or remove users, delete devices and records — including via the REST API — and service erasure and retention requests directly.
- **In-region, self-operated infrastructure.** The ID/rendezvous, relay, console, and stored data run where you place them, on hardware you control.
- **Custom-client builds are transient.** Generating a branded client is the one step that uses RustDesk's build service, and it is deliberately short-lived: the build configuration you submit is deleted once the build completes, and the generated installer is auto-removed after about a day, so you download it and keep it in your own approved repository.

These are levers a GDPR program can actually pull: you still document and operate them, but you are not waiting on a vendor to act on a data-subject request.

## Sovereignty you can point to

Hosting the rendezvous, relay, console, and stored data yourself gives a compliance program something concrete: infrastructure you place, operate, and audit. It is a foundation rather than a finish line, but it is the part everything else rests on.

## GDPR and sovereignty deployment checklist

Self-hosting gives you choices; the deployment has to turn those choices into controls:

- Document where the ID server, relay, console, backups, logs, and administrators are located.
- Map direct peer-to-peer routes separately from relayed routes. A server in Germany does not keep a direct session between Germany and another country inside Germany.
- Decide when relay must be forced because routing through a controlled location matters more than peer-to-peer performance.
- Record the purpose, retention period, and access policy for device, account, audit, and connection metadata.
- Apply least-privilege device groups, MFA/SSO where available, and a joiner-mover-leaver process for technicians.
- Put the web console behind HTTPS, restrict administrative network access, and test backup restoration.
- Complete the appropriate legal assessment — such as records of processing, processor review, transfer assessment, and DPIA — based on your use case.

RustDesk can support a sovereignty architecture, but the controller remains responsible for the architecture and its legal basis.

## Evaluate it inside your own perimeter

You can evaluate on your own terms. Self-host Server OSS today, or email [sales@rustdesk.com](mailto:sales@rustdesk.com) for current evaluation terms for the Pro features. Check current plans and exact features at [rustdesk.com/pricing](https://rustdesk.com/pricing). Prefer to watch first? There's a full video walkthrough on the [RustDesk YouTube channel](https://www.youtube.com/@rustdesk).
