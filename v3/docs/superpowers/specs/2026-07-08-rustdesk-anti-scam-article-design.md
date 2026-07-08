# RustDesk Anti-Scam Article Design

## Objective

Publish an evidence-led English article explaining how RustDesk responds to remote-access scams, while correcting the existing mobile guide's inaccurate Google Play availability statements.

The article targets general search and AI-answer readers asking whether RustDesk is a scam, why it is unavailable on Google Play, and why the public server requires login. It should demonstrate responsibility through verifiable actions, costs, and limitations rather than promotional claims.

## Deliverables

1. Add a new English blog post titled `RustDesk and Remote Access Scams: What We Are Doing`.
2. Add a matching blog OG image following the existing asset conventions.
3. Correct all three Google Play availability claims in `rustdesk-remote-control-android-ios.md`.
4. Link the corrected mobile guide to the new anti-scam article so readers can understand why Google Play is not an installation option.
5. Add publication-review coverage for the corrected Google Play facts and the new article's critical source links.

## Editorial Position

The opening must acknowledge that legitimate remote-access software, including RustDesk, can be abused through social engineering. It must not claim that RustDesk can eliminate scams or that self-hosting prevents abuse.

The central argument is that a software provider's responsibility is visible in the friction it accepts to reduce abuse. Each major action should therefore include:

- the abuse pattern it addresses;
- the concrete action RustDesk took;
- the inconvenience or distribution cost imposed on legitimate users;
- the limitation of that action.

This structure lets readers infer responsibility from evidence instead of asking them to accept a self-description.

## Article Structure

1. Direct answer: RustDesk is legitimate software, but scammers can misuse it just as they misuse other remote-access tools.
2. Public warnings: the scam warning on RustDesk's website, GitHub surfaces, and the controlled-device mobile flow.
3. Google Play withdrawal: explain that RustDesk unpublished the Android app to reduce scam-driven installs, cite the official X post, and give current official installation options.
4. Public-server login: explain the login requirement introduced in response to ongoing scam and botnet abuse, including the disruption reported by legitimate users.
5. Community feedback: use GitHub Discussions and Reddit to show both demand for safeguards and the practical cost of added friction. Community posts provide reaction and context, not proof of RustDesk's technical claims.
6. Limits: warnings, store withdrawal, and login requirements reduce opportunities for abuse but cannot stop deception, malicious self-hosting, or users granting access to strangers.
7. User guidance: verify downloads, distrust unsolicited support, do not share connection credentials, set a strong unique controlled-device password, enable connection 2FA, add an IP allowlist where appropriate, and use the existing vendor-neutral scam guide for recovery steps.
8. FAQ: answer `Is RustDesk a scam?`, `Why is RustDesk not on Google Play?`, `Why does the RustDesk public server require login?`, and `Can self-hosting prevent remote-access scams?`.

## Required Sources

Use first-party sources for RustDesk actions:

- Official X post about temporarily unpublishing RustDesk from Google Play: <https://x.com/rustdesk/status/1698372220379349421>
- GitHub Discussion #5660, which preserves the X link and text: <https://github.com/rustdesk/rustdesk/discussions/5660>
- RustDesk FAQ confirming removal from Google Play because of scamming: <https://github.com/rustdesk/rustdesk/wiki/FAQ#apple--google-store>
- Public-server login explanation: <https://github.com/rustdesk/rustdesk/wiki/Login-required-for-public-server>
- RustDesk support warning: <https://rustdesk.com/support>
- RustDesk client commit introducing 2FA for unattended access: <https://github.com/rustdesk/rustdesk/commit/44e6b7dbb0125dc0c288c19a16a944b5d605852b>
- Current RustDesk client 2FA implementation: <https://github.com/rustdesk/rustdesk/blob/master/src/auth_2fa.rs>
- RustDesk client configuration reference for the `whitelist` setting: <https://rustdesk.com/docs/en/self-host/client-configuration/advanced-settings/#whitelist>
- Current RustDesk controlled-side IP allowlist enforcement: <https://github.com/rustdesk/rustdesk/blob/master/src/server/connection.rs>
- Existing vendor-neutral prevention guide: `/blog/avoid-remote-desktop-scams`

Verify the release-page and mobile controlled-device warnings against current first-party pages or source code before describing their exact wording. Do not present search snippets or third-party paraphrases as primary evidence.

## Mobile Guide Correction

Replace the Google Play claims in the FAQ, introductory availability paragraph, and installation section. State that:

- RustDesk is not currently distributed through Google Play;
- RustDesk voluntarily unpublished it in response to scam abuse;
- Android users should use the official GitHub release or F-Droid;
- readers can follow the new anti-scam article for the decision and supporting sources.

Do not imply that sideloading is risk-free. Direct readers to official RustDesk-controlled or established distribution pages and retain the current Apple App Store statement for iOS.

## Controlled-Device 2FA Guidance

The article must recommend the RustDesk client's connection 2FA without confusing it with RustDesk Server Pro account 2FA:

- Configure 2FA in the security settings of the device that will be controlled, then scan its QR code with a TOTP authenticator and confirm setup with the generated six-digit code.
- After the normal connection credential is accepted, a controller must also supply the current TOTP code before the controlled device authorizes the session.
- The optional trusted-device setting can skip later 2FA challenges. Users who enable it should review and remove devices they no longer trust; users seeking the strictest behavior should leave bypass disabled.
- This protects unattended access when a password is exposed or guessed. It cannot protect someone who deliberately approves a connection or gives both the password and current TOTP code to a scammer.
- Do not discuss Server Pro web-console login 2FA in this article.

## Controlled-Device Password Guidance

The article must establish a strong connection password as the first layer of unattended-access protection:

- Use a long, unique permanent password on the controlled device for unattended access; do not reuse an operating-system, email, or other service password.
- Keep attended support separate: use the temporary one-time password or explicit click approval when practical instead of exposing the permanent credential.
- Never send a permanent password through an untrusted chat, email, or unsolicited support call. Change it immediately if it may have been disclosed.
- A strong password reduces guessing, credential-stuffing, and reuse risk. It cannot protect a user who gives the credential to a scammer, so combine it with controlled-device 2FA and, where operationally suitable, an IP allowlist.

## Controlled-Device IP Allowlist Guidance

The article must also recommend the client feature labeled `IP Whitelisting` in the RustDesk interface, while referring to it as an IP allowlist in explanatory prose:

- On desktop, configure it under `Settings → Security → Security → Use IP Whitelisting`; on a mobile controlled device, use `Settings → Share screen → Use IP Whitelisting`.
- Add only the controller IPv4/IPv6 addresses or CIDR ranges that should be permitted, using examples such as `203.0.113.10` for one address and `203.0.113.0/24` for a network. The controlled device rejects incoming connections from addresses outside the list before password and 2FA authorization.
- Include a short CIDR usage block: the prefix is the number of fixed network bits, so a larger prefix permits a smaller range; `/32` permits one IPv4 address, `/24` permits the 256 addresses in that IPv4 subnet, `/128` permits one IPv6 address, and `/64` permits an IPv6 subnet. Use documentation-only example ranges and label them as examples rather than values to copy unchanged.
- Explain that multiple addresses and ranges may be separated by commas, semicolons, spaces, or new lines. Recommend the smallest practical range and warn against broad entries.
- Tell readers to identify the controller network address that the controlled device will see, account for dynamic addresses and roaming networks, and test a new allowlist from another session before closing the current working session to avoid accidental lockout.
- Treat it as a strong option for organizations with fixed egress addresses or known network ranges, not a universal default. Dynamic residential addresses, roaming controllers, and incorrect CIDR entries can lock out legitimate support staff.
- Use the IP allowlist together with a strong connection password and controlled-device 2FA. It narrows where a connection may originate; it does not replace authentication and cannot stop a scammer operating from an allowed network.

## Verification

- Search English blog content for remaining claims that RustDesk is currently on Google Play.
- Run the publication-review tests and relevant blog tests.
- Run formatting checks on the changed Markdown and test files.
- Confirm every external link used in key claims resolves to the intended source.
- Check the rendered article structure if the local build can run within the repository's existing resource constraints.
