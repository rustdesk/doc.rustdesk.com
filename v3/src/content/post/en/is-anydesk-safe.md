---
publishDate: 2026-06-30T17:26:00Z
updateDate: 2026-10-14T00:00:00Z
lang: en
translationKey: is-anydesk-safe
draft: false
title: 'Is AnyDesk Safe? Encryption, the 2024 Security Incident & Scams'
excerpt: 'Is AnyDesk safe? A fair look at its encryption, the 2024 production-systems security incident, and why scammers abuse it — plus how open source compares.'
image: ~/assets/images/blog/is-anydesk-safe-og.webp
category: Security
tags:
  - AnyDesk
  - security
author: RustDesk Team
faq:
  - question: 'Is AnyDesk safe to use?'
    answer: "Yes, for legitimate use. AnyDesk is a mature commercial tool that documents TLS 1.2 with 256-bit AES transport encryption, two-factor authentication for unattended access and access-control lists. The main risks are its February 2, 2024 production-systems breach, coordination through AnyDesk's own cloud by default (On-Premises is offered on Ultimate), and scammers who talk victims into installing it."
  - question: 'Was AnyDesk hacked?'
    answer: 'Yes. AnyDesk disclosed compromised production systems on February 2, 2024. Its official statement described certificate replacement, system remediation and precautionary my.anydesk.com password resets, and said it had no evidence that end-user devices were affected. Security researchers at Akamai separately discussed reported source-code and code-signing exposure.'
  - question: 'Why do scammers use AnyDesk?'
    answer: 'Because AnyDesk is free, installs in seconds and needs no account on the controlled side, tech-support scammers phone or email victims and talk them into installing it and granting control. This is a usage risk, not an AnyDesk vulnerability: the same trick works with any remote-desktop tool, including RustDesk. AnyDesk publishes abuse-prevention guidance.'
  - question: "Is AnyDesk's encryption secure?"
    answer: "AnyDesk's security documentation describes TLS 1.2 with AEAD, an RSA-2048 asymmetric key exchange, and 256-bit AES transport encryption, plus perfect forward secrecy. Those are industry-standard protections. The caveat is that you are trusting a closed-source client and, by default, AnyDesk's cloud to broker the connection, so you rely on the vendor's operational security rather than being able to audit the code yourself."
metadata:
  description: 'Is AnyDesk safe? Sourced review of its TLS/AES encryption, the 2024 production-systems security incident, scam abuse, and closed-source trade-offs.'
  keywords: 'is AnyDesk safe, AnyDesk security, AnyDesk breach 2024, AnyDesk scam, AnyDesk encryption, is AnyDesk safe to use, AnyDesk hacked'
---

The quick answer: AnyDesk is safe for legitimate use. It is a mature commercial remote-desktop product with standard-grade encryption, not malware. The risks worth understanding are that it is closed source and coordinated through AnyDesk's cloud by default, that it disclosed a production-systems breach in February 2024, and that scammers abuse it heavily. Here is the sourced picture.

## The short answer

Yes, for deliberate, legitimate use. AnyDesk documents TLS 1.2 with 256-bit AES transport encryption, two-factor authentication for unattended access and access-control lists. Three things shape how you should use it: the [February 2, 2024 production-systems breach](https://anydesk.com/en/public-statement-2-2-2024), coordination through AnyDesk's own cloud by default (an On-Premises appliance is offered on Ultimate), and tech-support scammers who talk victims into installing it. None of them makes it unsafe to _install_; all of them shape how you _use_ it.

## How AnyDesk secures your sessions

Per [AnyDesk's own security documentation](https://anydesk.com/en/security), sessions are protected with TLS 1.2 using AEAD, an RSA-2048 asymmetric key exchange to verify endpoints and guard against man-in-the-middle attacks, and 256-bit AES transport encryption, with perfect forward secrecy from an ephemeral key exchange. On the account side, AnyDesk supports two-factor authentication (TOTP) for unattended access, an access-control list / allowlist to restrict who may connect, and salted password hashing. (Some AnyDesk materials reference newer TLS versions; the security page linked above is the current reference.)

Those are solid, industry-standard protections — comparable in kind to what every serious competitor uses. On the transport layer, there is nothing alarming here. The interesting questions are about _trust model_ and _human behavior_, not cipher suites.

## The 2024 AnyDesk security incident: what actually happened

On **February 2, 2024**, [AnyDesk disclosed compromised production systems](https://anydesk.com/en/public-statement-2-2-2024). The statement described incident response with CrowdStrike, certificate revocation/replacement, system remediation and precautionary web-portal password resets. [Akamai's analysis](https://www.akamai.com/blog/security-research/anydesk-breach-what-to-know-mitigations-and-recommendations) discusses reported source-code and code-signing exposure separately from the vendor's public disclosure.

[AnyDesk said it had **no evidence that end-user devices were affected**](https://anydesk.com/en/public-statement-2-2-2024), and that it did not store credentials that could be used to connect to them.

The takeaway isn't that AnyDesk is uniquely insecure. It is about **vendor-concentration risk**: when a third party operates the infrastructure that coordinates your sessions and holds your account data, a compromise there is one you did not choose and could not prevent.

## Social-engineering scams are a separate risk

For most individuals, the largest AnyDesk-related danger is social engineering, not a CVE. The [FBI warns that tech-support scammers direct victims to install remote-access software](https://www.fbi.gov/contact-us/field-offices/boston/news/press-releases/fbi-warns-public-to-beware-of-tech-support-scammers-targeting-financial-accounts-using-remote-desktop-software), then misuse the granted access, and AnyDesk publishes [abuse-prevention guidance](https://anydesk.com/en/abuse-prevention) for exactly this reason. The risk is who is authorized to connect, not the strength of session encryption.

Why AnyDesk specifically? It's free to download, installs in seconds, and — critically — the person being _controlled_ doesn't need to create an account. That low friction is a feature for legitimate support and a gift for fraudsters, who phone or email a target, invent an urgent "problem," and walk them through granting full remote control.

This is the fairness point that gets lost in scary headlines: **this is a usage risk, not an AnyDesk vulnerability.** The exact same trick works with TeamViewer, Chrome Remote Desktop, or RustDesk. No amount of AES protects you if you willingly hand the keys to a stranger on the phone. If you want the defensive playbook, we wrote it up separately in [how to avoid remote-desktop scams](/blog/avoid-remote-desktop-scams), and the same reasoning applies to [whether Chrome Remote Desktop is safe](/blog/is-chrome-remote-desktop-safe).

## Closed source and cloud-brokered: the trust question

Here's where AnyDesk's model and RustDesk's part ways — not on whether the encryption is good, but on _what you have to take on faith._

AnyDesk is proprietary. You cannot read the client's source, build it yourself, or independently verify what it does; you trust AnyDesk that the binary behaves as advertised. And by default your sessions are brokered through AnyDesk's cloud, so the availability and security of that infrastructure are the vendor's to manage — as 2024 illustrated. AnyDesk Ultimate offers an on-premises appliance, which narrows this gap for those who buy in.

RustDesk starts from the opposite side of both those bets. RustDesk's client and RustDesk Server OSS (the free community server) are [open source under the AGPL](https://github.com/rustdesk/rustdesk); Server Pro is commercial, proprietary self-hosted server software. The client is auditable and buildable, so you're not taking a proprietary binary on faith. And because you can [self-host](/blog/why-self-host-remote-desktop-software) the ID/rendezvous and relay, the infrastructure that brokers your sessions is yours rather than a third party's — the vendor-concentration exposure that 2024 made concrete. That also supports a [data-sovereignty design](/blog/remote-desktop-data-sovereignty-gdpr).

To be equally fair, this shifts the trust rather than removing it. Because the code is open, RustDesk's own defects are public too, so track the [latest releases](https://github.com/rustdesk/rustdesk/releases) and vulnerability records. And auditable, self-hosted infrastructure is a starting point, not a guarantee: sessions still route directly between endpoints, and the server is yours to patch.

## So, is AnyDesk safe?

For deliberate, legitimate use: yes. AnyDesk is a mature product with standard-grade encryption and sensible account controls. Keep it updated, protect unattended access with two-factor authentication, restrict incoming connections with its access-control list, and verify every support request.

The qualifiers are about trust, not ciphers. Its default closed-source, cloud-coordinated model means relying on AnyDesk's operational security, which took a real hit in 2024; Ultimate On-Premises narrows that gap. If the trade-off sits wrong with you, [a self-hosted TeamViewer and AnyDesk alternative](/blog/self-hosted-teamviewer-alternative) changes the assurance basis: auditable code and coordination you control, at the cost of running a server yourself.

Whatever tool you choose, the rule that prevents the most damage is the cheapest one: never install remote-access software because someone who contacted _you_ asked you to.
