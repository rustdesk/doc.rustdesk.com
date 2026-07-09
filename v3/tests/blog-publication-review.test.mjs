import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import test from 'node:test';

const root = new URL('..', import.meta.url).pathname;
const postsDir = join(root, 'src/content/post/en');
const read = (path) => readFileSync(join(root, path), 'utf8');
const readPost = (name) => readFileSync(join(postsDir, name), 'utf8');

test('uses a verified organizational byline for the reviewed publication batch', () => {
  const affected = readdirSync(postsDir)
    .filter((name) => name.endsWith('.md') || name.endsWith('.mdx'))
    .filter((name) => readPost(name).includes('author: Hoabing Ziu, CTO'));

  assert.deepEqual(affected, []);
});

test('renders post FAQ data visibly and attributes RustDesk Team to the organization schema', () => {
  const route = read('src/pages/[...blog]/index.astro');
  const faqComponent = read('src/components/blog/BlogFaq.astro');
  const structuredData = read('src/components/common/StructuredData.astro');

  assert.match(route, /<BlogFaq items=\{post\.faq\} \/>/);
  assert.match(faqComponent, /<h2[^>]*>Frequently asked questions<\/h2>/);
  assert.match(faqComponent, /item\.question/);
  assert.match(faqComponent, /item\.answer/);
  assert.match(structuredData, /article\.author === 'RustDesk Team'/);
  assert.match(structuredData, /author: articleAuthorSchema/);
});

test('requires a protected path before entering initial web-console credentials', () => {
  const article = readPost('rustdesk-web-console-custom-client-generator-port-21114.md');

  assert.match(article, /do not enter credentials over plain HTTP on a public or untrusted network\./i);
  assert.match(article, /localhost, an SSH tunnel, or a trusted private network/);
});

test('limits no-inbound-port and iOS host claims in the RDP comparison', () => {
  const article = readPost('rustdesk-vs-rdp.md');

  assert.match(article, /endpoint clients initiate outbound connections/);
  assert.match(article, /self-hosted server still accepts inbound connections/);
  assert.match(article, /iOS acts as a controller only/);
  assert.doesNotMatch(article, /controlling and being controlled/);
  assert.doesNotMatch(article, /Host platforms\s*\|[^\n]*iOS/);
});

test('does not claim that self-hosted RustDesk exposes nothing inbound', () => {
  const affected = readdirSync(postsDir)
    .filter((name) => name.endsWith('.md') || name.endsWith('.mdx'))
    .filter((name) => /nothing inbound is exposed/i.test(readPost(name)));

  assert.deepEqual(affected, []);
});

test('uses protocol-specific RustDesk server port guidance', () => {
  const article = readPost('rustdesk-connected-waiting-for-image.md');

  assert.doesNotMatch(article, /TCP\/UDP 21115-21119/);
  assert.match(article, /TCP 21115-21117 and UDP 21116/);
  assert.match(article, /TCP 21118-21119 only if you use WebSocket clients/);
});

test('states the evidence and limits behind the large-fleet capacity example', () => {
  const article = readPost('rustdesk-scale-50000-200000-devices.md');

  assert.match(article, /more than two million online endpoints/);
  assert.match(article, /12-core CPU and 32 GB of RAM/);
  assert.match(article, /not two million simultaneous remote-control sessions/);
  assert.match(article, /production observation, not a reproducible Server Pro benchmark/);
  assert.doesNotMatch(article, /one million|million-plus/i);
});

test('lists first-party ScreenConnect sources promised by the comparison', () => {
  const article = readPost('rustdesk-vs-screenconnect.md');

  assert.match(article, /## Sources/);
  assert.match(article, /https:\/\/www\.screenconnect\.com\/pricing/);
  assert.match(
    article,
    /https:\/\/docs\.connectwise\.com\/ScreenConnect_Documentation\/Get_started\/Host_client\/Host_client_requirements/
  );
  assert.match(
    article,
    /https:\/\/www\.connectwise\.com\/company\/trust\/security-bulletins\/connectwise-screenconnect-23\.9\.8/
  );
});

test('opens only the RustDesk ports required by each deployed feature', () => {
  const article = readPost('why-self-host-remote-desktop-software.md');

  assert.doesNotMatch(article, /default ports are \*\*21114–21119\*\*/);
  assert.match(article, /TCP 21115-21117 and UDP 21116/);
  assert.match(article, /expose only TCP 443 publicly/);
  assert.match(article, /keep 21114 and 21118-21119 internal/);
});

test('limits the no-code scam advice to the typical social-engineering flow', () => {
  const article = readPost('avoid-remote-desktop-scams.md');

  assert.doesNotMatch(article, /they cannot simply connect/);
  assert.match(article, /typical social-engineering flow/);
  assert.match(
    article,
    /does not rule out existing unattended access, stolen credentials, malware, or exposed services/
  );
});

test('distinguishes Splashtop cloud plans from Splashtop On-Prem', () => {
  const article = readPost('rustdesk-vs-splashtop.md');

  assert.match(article, /managed SaaS plans and a \*\*separately licensed On-Prem\*\* product/);
  assert.match(article, /https:\/\/www\.splashtop\.com\/products\/on-prem/);
  assert.match(article, /customer-operated Splashtop (?:On-Prem )?Gateway/i);
  assert.doesNotMatch(article, /It remains a managed cloud service/);
  assert.doesNotMatch(article, /Splashtop is a cloud service/);
});

test('consolidates Splashtop comparisons without erasing the On-Prem product', () => {
  const removedSlug = 'teamviewer-vs-anydesk-vs-splashtop';
  const teamViewerComparison = readPost('teamviewer-vs-splashtop.md');
  const rustDeskComparison = readPost('rustdesk-vs-splashtop.md');
  const mspComparison = readPost('teamviewer-vs-anydesk-for-msps.md');
  const netlify = read('netlify.toml');
  const vercel = read('vercel.json');

  assert.equal(existsSync(join(postsDir, `${removedSlug}.md`)), false);
  assert.equal(existsSync(join(root, `src/assets/images/blog/${removedSlug}-og.png`)), false);
  assert.doesNotMatch(mspComparison, new RegExp(`/blog/${removedSlug}`));
  assert.match(
    netlify,
    new RegExp(`from = "/blog/${removedSlug}"[\\s\\S]*?to = "/blog/teamviewer-vs-splashtop"[\\s\\S]*?status = 301`)
  );
  assert.match(
    vercel,
    new RegExp(
      `"source": "/blog/${removedSlug}"[\\s\\S]*?"destination": "/blog/teamviewer-vs-splashtop"[\\s\\S]*?"permanent": true`
    )
  );

  for (const article of [teamViewerComparison, rustDeskComparison]) {
    assert.match(article, /separately licensed On-Prem/i);
    assert.match(article, /Splashtop (?:On-Prem )?Gateway/i);
    assert.doesNotMatch(article, /Splashtop[^\n]*cloud only/i);
    assert.doesNotMatch(article, /(?:almost|hardly|nearly) (?:no one|nobody)|few customers use/i);
  }
});

test('positions the Splashtop alternative page as an evidence-bounded IT switching guide', () => {
  const article = readPost('rustdesk-vs-splashtop.md');

  assert.match(article, /title: 'Self-Hosted Splashtop Alternative: What IT Teams Should Evaluate Before Switching'/);
  assert.match(article, /excerpt: 'A self-hosted Splashtop alternative evaluation guide/);
  assert.match(article, /## Why IT teams evaluate alternatives to Splashtop/);
  assert.match(article, /do not establish how common/i);
  assert.match(article, /integration-specific/i);
  assert.match(article, /remote audio/i);
  assert.match(article, /monitor mapping/i);
  assert.match(article, /parallel pilot/i);
  assert.match(article, /rollback/i);
  assert.doesNotMatch(article, /72 (?:signals|customers|emails)|3\/72/);
  assert.doesNotMatch(article, /Kent Tec|Kimray|KinderCare|Liberty Tax|WaliaTech/);
  assert.doesNotMatch(article, /£50|£200|\$8K|\$8000/);
});

test('describes the exploited ScreenConnect vulnerability without calling it a ConnectWise hack', () => {
  const article = readPost('best-screenconnect-alternative-msps.md');

  assert.doesNotMatch(article, /ConnectWise hack|remote-access vendor gets breached/i);
  assert.match(article, /exploitation of CVE-2024-1709 in affected ScreenConnect servers/);
});

test('does not impose a personal-use-only license on Chrome Remote Desktop', () => {
  const article = readPost('best-free-remote-desktop-software.md');

  assert.doesNotMatch(
    article,
    /Chrome Remote Desktop is free but licensed for personal use|terms center on personal use/
  );
  assert.match(article, /Google documents enterprise administration policies/);
  assert.match(article, /https:\/\/support\.google\.com\/chrome\/a\/answer\/2799701/);
});

test('separates Chrome Remote Desktop signaling from direct and relayed session traffic', () => {
  const article = readPost('chrome-remote-desktop-alternative.md');

  assert.doesNotMatch(article, /every session runs through Google/i);
  assert.match(article, /initially negotiated through Google services/);
  assert.match(article, /Direct, STUN, or TURN\/relay/);
  assert.match(article, /https:\/\/support\.google\.com\/chrome\/a\/answer\/16364503/);
});

test('does not lean on a competitor blog for the Chrome Remote Desktop limitations section', () => {
  const article = readPost('chrome-remote-desktop-alternative.md');

  assert.doesNotMatch(article, /helpwire\.app\/blog\/chrome-remote-desktop/i);
  assert.match(article, /https:\/\/support\.google\.com\/chrome\/answer\/1649523/);
  assert.match(article, /https:\/\/support\.google\.com\/chrome\/a\/answer\/16364503/);
});

test('does not present RustDesk iOS as an unattended host in the Chrome Remote Desktop comparison', () => {
  const article = readPost('chrome-remote-desktop-alternative.md');

  assert.doesNotMatch(
    article,
    /Real file transfer and permanent-password unattended access come standard, across Windows, macOS, Linux, Android, and iOS\./
  );
  assert.match(article, /the iOS app is controller-only/);
});

test('does not explain AnyDesk commercial-use detection through mandatory cloud relay', () => {
  const article = readPost('anydesk-commercial-use-detected.md');

  assert.doesNotMatch(article, /every session runs through _their_ cloud/);
  assert.match(article, /AnyDesk supports direct client-to-client connections/);
  assert.match(article, /https:\/\/support\.anydesk\.com\/docs\/settings/);
});

test('labels the public-server capacity number as a non-audited point-in-time internal observation', () => {
  const article = readPost('rustdesk-scale-50000-200000-devices.md');

  assert.match(article, /point-in-time internal production observation/);
  assert.match(article, /not independently audited/);
  assert.match(article, /no public monitoring dashboard/);
  assert.doesNotMatch(article, /has operated stably/);
});

test('sources AnyDesk plan limits from the current official pricing page', () => {
  const article = readPost('rustdesk-vs-anydesk.md');

  assert.match(article, /https:\/\/anydesk\.com\/en\/pricing/);
  assert.match(article, /checked July 7, 2026/);
  assert.doesNotMatch(article, /third-party pricing trackers|Independent trackers/);
});

test('splits RustDesk iOS controller support from host features in the free-software roundup', () => {
  const article = readPost('best-free-remote-desktop-software.md');

  assert.doesNotMatch(
    article,
    /cross-platform \(Windows, macOS, Linux, Android, iOS\), with file transfer and unattended access/i
  );
  assert.match(article, /Windows, macOS, Linux, and Android hosts; iOS is a controller app/);
});

test('sources and bounds TeamViewer and Splashtop security claims', () => {
  const article = readPost('teamviewer-vs-splashtop.md');

  assert.match(article, /https:\/\/www\.splashtop\.com\/security/);
  assert.match(article, /https:\/\/www\.splashtop\.com\/press\/splashtop-achieves-iso-iec-27001-2022-certification/);
  assert.match(article, /https:\/\/www\.teamviewer\.com\/en\/resources\/trust-center/);
  assert.match(article, /tv-2024-1005/);
  assert.doesNotMatch(article, /no publicly disclosed breach/);
});

test('removes the unsupported claim that AnyDesk detection became stricter in 2025', () => {
  const article = readPost('anydesk-commercial-use-detected.md');

  assert.doesNotMatch(article, /got stricter in 2025|became stricter in 2025/i);
});

test('uses AnyDesk official pricing instead of unnamed trackers in the MSP FAQ', () => {
  const article = readPost('teamviewer-vs-anydesk-for-msps.md');

  assert.doesNotMatch(article, /Multiple trackers|multiple trackers reporting/i);
  assert.match(article, /https:\/\/anydesk\.com\/en\/pricing/);
  assert.match(article, /official pricing page, checked July 7, 2026/);
});

test('explains why RustDesk is unavailable on Google Play and gives current Android sources', () => {
  const article = readPost('rustdesk-remote-control-android-ios.md');

  assert.doesNotMatch(article, /install (?:the app )?from Google Play/i);
  assert.doesNotMatch(article, /Android client is on Google Play/i);
  assert.match(article, /not currently distributed through Google Play/i);
  assert.match(article, /\/blog\/rustdesk-and-remote-access-scams/);
  assert.match(article, /github\.com\/rustdesk\/rustdesk\/releases/);
  assert.match(article, /f-droid\.org\/packages\/com\.carriez\.flutter_hbb/);
});

test('documents RustDesk anti-scam actions and controlled-device defenses', () => {
  const article = readPost('rustdesk-and-remote-access-scams.md');

  assert.match(article, /x\.com\/rustdesk\/status\/1698372220379349421/);
  assert.match(article, /github\.com\/rustdesk\/rustdesk\/discussions\/5660/);
  assert.match(article, /Login-required-for-public-server/);
  assert.match(article, /strong, unique permanent password/i);
  assert.match(article, /controlled device[^\n]*2FA|2FA[^\n]*controlled device/i);
  assert.match(article, /IP allowlist/i);
  assert.match(article, /\/32/);
  assert.match(article, /\/24/);
  assert.match(article, /\/128/);
  assert.match(article, /\/64/);
  assert.doesNotMatch(article, /Server Pro (?:account|web-console) 2FA/i);
});

test('uses Server Pro Access Control rather than address-book visibility for authorization', () => {
  const article = readPost('rustdesk-per-user-access-control-device-groups-shared-address-book.md');

  assert.match(article, /https:\/\/rustdesk\.com\/docs\/en\/self-host\/rustdesk-server-pro\/permissions\//);
  assert.match(article, /address book[^\n]*(?:visibility|convenience)[^\n]*not[^\n]*authorization/i);
  assert.match(article, /user assignments, device groups, and cross-group access settings/i);
  assert.match(article, /permissions are cumulative/i);
  assert.match(article, /known device ID/i);
  assert.doesNotMatch(article, /working approach today[^\n]*shared address book/i);
  assert.doesNotMatch(article, /per-user access control today[^\n]*shared address book/i);
});

test('points license-management posts at the self-service portal with a support fallback', () => {
  const portalPosts = [
    'rustdesk-not-connecting-troubleshooting.md',
    'upgrade-rustdesk-license-mid-subscription.md',
    'rustdesk-custom-quote-minimum-users-invoice-fees.md',
    'rustdesk-pro-license-cost-how-to-pay.md',
  ];
  for (const name of portalPosts) {
    const article = readPost(name);
    assert.match(article, /rustdesk\.com\/self-host\/account/, `${name} should link the self-service license portal`);
    assert.match(article, /support@rustdesk\.com/, `${name} should give the support@ fallback for a forgotten checkout email`);
  }
});

test('states the air-gapped license-validation grace window', () => {
  const article = readPost('rustdesk-server-pro-offline-air-gapped.md');

  assert.match(article, /seven days/i);
  assert.match(article, /grace/i);
});

test('adds the missing competitor migration drivers to the comparison posts', () => {
  const screenconnect = readPost('rustdesk-vs-screenconnect.md');
  assert.match(screenconnect, /code-signing/i);
  assert.match(screenconnect, /July 7, 2025/);

  const teamviewer = readPost('rustdesk-vs-teamviewer.md');
  assert.match(teamviewer, /perpetual license/i);
  assert.match(teamviewer, /subscription-only/i);

  const logmein = readPost('rustdesk-vs-logmein.md');
  assert.match(logmein, /LDAP\/Active Directory/);
  assert.match(logmein, /single sign-on via OIDC/i);
});

test('answers the enterprise mass-deployment and REST API questions', () => {
  const article = readPost('rustdesk-for-enterprise.md');

  assert.match(article, /MSI/);
  assert.match(article, /GPO|Intune/);
  assert.match(article, /REST API/);
});

test('frames RustDesk compliance around the self-hosted model, not a certification deficit', () => {
  const article = readPost('remote-desktop-data-sovereignty-gdpr.md');

  assert.match(article, /ISO 27001, SOC 2, or HIPAA/);
  assert.match(article, /ISO 27001 or HIPAA scope/);
  assert.match(article, /sales@rustdesk\.com/);
  assert.doesNotMatch(article, /does not market formal/i);
});

test('every head-to-head comparison post ships FAQ structured data', () => {
  const comparisons = [
    'rustdesk-vs-teamviewer.md',
    'rustdesk-vs-anydesk.md',
    'rustdesk-vs-screenconnect.md',
    'rustdesk-vs-splashtop.md',
    'rustdesk-vs-logmein.md',
    'rustdesk-vs-rdp.md',
    'rustdesk-vs-vnc.md',
  ];
  for (const name of comparisons) {
    assert.match(readPost(name), /^faq:/m, `${name} should define an faq: block`);
  }
});

test('shows concrete self-hosted GDPR controls, not just obligations', () => {
  const article = readPost('remote-desktop-data-sovereignty-gdpr.md');

  assert.match(article, /built-in log rotation/i);
  assert.match(article, /collected by your relay, not RustDesk/i);
  assert.match(article, /Control Role/);
});

test('explains custom-client build server, retention window, and config non-retention', () => {
  const article = readPost('rustdesk-web-console-custom-client-generator-port-21114.md');

  assert.match(article, /compiled on RustDesk's build server/i);
  assert.match(article, /cross-compile and sign all of those/i);
  assert.match(article, /automatically deleted from the build server/i);
  assert.match(article, /deleted automatically once the build finishes/i);
});
