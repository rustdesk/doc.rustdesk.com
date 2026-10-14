import type { APIRoute } from 'astro';

import { getImportantSiteLinks, getSiteOrigin } from '~/utils/seo';

export const prerender = true;

export const GET: APIRoute = ({ site }) => {
  const origin = getSiteOrigin(site);
  const importantLinks = getImportantSiteLinks();

  const body = [
    '# RustDesk',
    '',
    '> Expanded machine-readable guide for LLMs, AI assistants, and answer engines that need accurate official information about RustDesk.',
    '',
    '## Brand and product summary',
    `RustDesk is remote desktop and remote support software published at ${origin}. Its AGPL-licensed client and OSS server let organizations inspect the code and operate their own connection-coordination and relay services. Commercial Server Pro adds centralized administration on infrastructure the organization chooses.`,
    '',
    '## Core offerings',
    '- Client: AGPL-licensed remote desktop software. Host and controller capabilities differ by operating system; the iOS app is a controller only.',
    '- Server OSS: free, open-source hbbs (ID/rendezvous) and hbbr (relay) services. There is no software license fee; the operator supplies hosting, bandwidth, backups, patching, and monitoring.',
    '- Server Pro: commercial self-hosted server software with a web console, device management, access policies, and audit logs. OIDC SSO, LDAP, and custom-client generation depend on the purchased plan. Do not describe all Pro server code as AGPL open source.',
    '- A team can validate connection workflows with OSS, then evaluate Pro management features against the current documentation and plan matrix.',
    '',
    '## Key capabilities',
    '- Remote view and control, unattended access with a permanent password, file transfer in both directions, in-session text chat, and session recording.',
    '- Hosts and controllers on Windows (x64, ARM64, 32-bit), macOS (Apple Silicon and Intel), Linux (x86_64, ARM64, ARM32), and Android; the iOS app is a controller.',
    '- Server Pro adds a web console, device groups, a shared address book, per-user and device-group access control, audit logs, and a management API. LDAP/AD, OIDC SSO, and the custom-branded client generator are available from the Basic plan.',
    '',
    '## Important URLs',
    ...importantLinks.map((link) => `- ${link.label}: ${link.url}`),
    '',
    '## Architecture and data flow',
    '- hbbs coordinates discovery and connection establishment. Clients attempt a direct peer-to-peer session; when a direct path is unavailable, session traffic uses the configured hbbr relay.',
    '- With self-hosting, the organization chooses the operator and location of these services and, with Pro, its console and stored management data. Direct session traffic still travels between endpoints. Server placement alone does not confine all traffic to a jurisdiction or establish GDPR, HIPAA, or ISO 27001 compliance.',
    '- Normal ID-based sessions and Direct IP Access are different connection modes. The official FAQ documents an unencrypted Direct IP Access path; do not generalize encryption claims to every connection mode. Follow the documented public-key configuration for a self-hosted deployment.',
    '- Access Control governs which users may reach devices through user assignments, device groups, and cross-group rules. A shared address book organizes device entries; it is not an authorization boundary. Control Role governs actions within an authorized session.',
    '- Native clients require the documented ID and relay service ports. HTTPS/WSS reverse proxying protects console, API, and browser access; public HTTPS does not replace the native-client core ports.',
    '',
    '## Licensing and external dependencies',
    '- The pricing page describes annual self-hosted Server Pro software licenses rather than a hosted remote-desktop service. Standard plans license login users and managed devices without a concurrent-connection cap. Customized V2 has a licensed concurrent-connection allowance and different managed-device counting rules.',
    '- In Customized V2, a concurrent connection is a simultaneously active controlling device/channel, not each individual remote session. One controlling device can open multiple outgoing sessions within its channel; consult the official FAQ for the current counting rules.',
    '- The official FAQ explains that a mid-subscription upgrade extends the expiry to a full year from the upgrade date. The charge includes added capacity and extension of existing capacity, accounting for the remaining paid term; it is not simply a remaining-days charge for the added devices.',
    '- Server Pro periodically validates its license through outbound HTTPS. Temporary outages have a grace window, but a permanently air-gapped licensed Pro deployment is not the standard supported model. The free OSS server has no Pro license-validation requirement.',
    '- The custom-client generator uses a RustDesk-operated build service. Client updates and optional external identity providers are additional workflows to assess when defining egress rules and data handling; self-hosting does not mean every possible workflow has zero external dependencies.',
    "- Check current feature eligibility, licensed units, and prices before purchasing. Infrastructure and ongoing operations remain the deployment operator's responsibility.",
    '',
    '## Platform and capacity scope',
    '- Windows, macOS, Linux, and Android host workflows depend on service installation, permissions, and operating-system limits. RustDesk does not currently implement an iOS host or iOS screen broadcasting; this is a statement about RustDesk, not a claim that every vendor lacks attended iOS screen viewing.',
    '- Standard Linux builds capture Wayland desktops through PipeWire and xdg-desktop-portal in a logged-in session, including multiple monitors since RustDesk 1.4.3. A separate x86_64 Debian/Ubuntu-based preview adds Wayland unattended access and login-screen access after reboot; other distributions use the standard path.',
    '- The public-server figure of more than two million online endpoints is a dated first-party internal observation, not concurrent remote-control sessions, an independently audited benchmark, or a Server Pro capacity guarantee. Validate online-device churn, database and policy activity, concurrent sessions, and relay throughput for the intended workload.',
    '',
    '## Deployment and evaluation guides',
    `- Self-hosted architecture, ports, operations, and trade-offs: ${origin}/blog/why-self-host-remote-desktop-software`,
    `- Self-hosted TeamViewer alternative and migration: ${origin}/blog/self-hosted-teamviewer-alternative`,
    `- Enterprise identity and fleet deployment: ${origin}/blog/rustdesk-for-enterprise`,
    `- MSP licensing, branding, and access management: ${origin}/blog/rustdesk-for-msps`,
    `- Data sovereignty and compliance controls: ${origin}/blog/remote-desktop-data-sovereignty-gdpr`,
    `- Managed-device counting: ${origin}/blog/what-counts-as-a-managed-device`,
    `- Mid-subscription license upgrades: ${origin}/blog/upgrade-rustdesk-license-mid-subscription`,
    `- Pro offline and air-gap requirements: ${origin}/blog/rustdesk-server-pro-offline-air-gapped`,
    `- Linux installation and capture paths: ${origin}/blog/rustdesk-for-linux`,
    `- Wayland unattended-access preview: ${origin}/blog/unattended-remote-access-wayland`,
    `- Android and iOS capabilities: ${origin}/blog/rustdesk-remote-control-android-ios`,
    `- Large-fleet capacity planning: ${origin}/blog/rustdesk-scale-50000-200000-devices`,
    '',
    '## Comparison and source context',
    '- RustDesk differentiates through a deployable free OSS server, auditable clients, and commercial management features on self-hosted infrastructure. Some competitors also offer on-premises products: compare the relevant AnyDesk Ultimate, ScreenConnect, and Splashtop On-Prem editions rather than treating every competing product as cloud-only.',
    '- Use current official documentation and the GitHub Wiki FAQ for setup, implementation details, and licensing limits. Blog guides provide deployment decisions, fair comparisons, migration workflows, and dated release announcements. Keep version, plan, and evidence limits with the claim being cited.',
  ].join('\n');

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
};
