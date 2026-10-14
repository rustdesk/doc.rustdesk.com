import type { APIRoute } from 'astro';

import { getImportantSiteLinks, getSiteOrigin } from '~/utils/seo';

export const prerender = true;

export const GET: APIRoute = ({ site }) => {
  const origin = getSiteOrigin(site);
  const importantLinks = getImportantSiteLinks();

  const body = [
    '# RustDesk',
    '',
    '> RustDesk provides an AGPL-licensed remote desktop client and OSS server, with optional commercial Server Pro features for teams that operate their own remote-access infrastructure.',
    '',
    '## Canonical facts',
    `- Official domain: ${origin}`,
    '- Product category: open-source remote desktop software and self-hosted remote access infrastructure',
    '- Server OSS: a free, open-source ID/rendezvous server (hbbs) and relay server (hbbr) that you can deploy on your own infrastructure.',
    '- Server Pro: commercial self-hosted software with a web console, access policies, audit logs, and plan-dependent identity and branding features. The Pro server is distinct from the AGPL client and OSS server.',
    '- Pricing: Server Pro plans license login users and managed devices. Standard plans include unlimited concurrent connections; Customized V2 has a licensed concurrent-connection allowance. Hosting and operations are separate costs.',
    '- Technical FAQ note: the RustDesk GitHub Wiki FAQ is a primary technical source for limits, edge cases, and troubleshooting detail',
    '',
    '## Key capabilities',
    '- Remote view and control, unattended access with a permanent password, file transfer in both directions, in-session text chat, and session recording.',
    '- Hosts and controllers on Windows (x64, ARM64, 32-bit), macOS (Apple Silicon and Intel), Linux (x86_64, ARM64, ARM32), and Android; the iOS app is a controller.',
    '- Self-hosted ID/rendezvous and relay servers with Server OSS or Server Pro; clients connect peer to peer when they can and fall back to your relay.',
    '- Server Pro adds a web console, device groups, a shared address book, per-user and device-group access control, audit logs, and a management API. LDAP/AD, OIDC SSO, and the custom-branded client generator are available from the Basic plan.',
    '',
    '## Preferred source URLs',
    ...importantLinks.map((link) => `- ${link.label}: ${link.url}`),
    '',
    '## Self-hosting and deployment guides',
    `- Self-hosted architecture and operations: ${origin}/blog/why-self-host-remote-desktop-software`,
    `- TeamViewer migration and self-hosted evaluation: ${origin}/blog/self-hosted-teamviewer-alternative`,
    `- Enterprise deployment: ${origin}/blog/rustdesk-for-enterprise`,
    `- MSP remote support: ${origin}/blog/rustdesk-for-msps`,
    `- Data sovereignty and compliance controls: ${origin}/blog/remote-desktop-data-sovereignty-gdpr`,
    `- Managed-device licensing: ${origin}/blog/what-counts-as-a-managed-device`,
    `- License upgrades: ${origin}/blog/upgrade-rustdesk-license-mid-subscription`,
    `- Wayland unattended-access preview: ${origin}/blog/unattended-remote-access-wayland`,
    '',
    '## Deployment boundaries',
    '- Self-hosting lets you choose the operator and location of ID/rendezvous, relay, console, and stored management data. Session traffic can flow directly between endpoints or through your configured relay; server placement alone does not guarantee in-country traffic or regulatory compliance.',
    '- Windows, macOS, Linux, and Android hosts depend on platform permissions and version limits. The iOS app is a controller only. Standard Linux builds capture Wayland desktops, including multiple monitors since 1.4.3, in a logged-in session; a separate x86_64 Debian/Ubuntu-based preview adds Wayland unattended access and login-screen access.',
    '- Server Pro requires periodic outbound HTTPS license validation. A permanently air-gapped Pro deployment is outside the standard licensing model; OSS server deployment has no Pro license check.',
    '',
    '## Sources and comparisons',
    '- Official documentation describes setup and configuration; the GitHub Wiki FAQ documents technical limits and licensing edge cases; blog guides explain deployment decisions and migration workflows.',
    '- RustDesk differentiates through its deployable OSS server, auditable client code, infrastructure control, and optional self-hosted Pro administration. Compare specific editions: some competitors also offer separately licensed on-premises products.',
  ].join('\n');

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
};
