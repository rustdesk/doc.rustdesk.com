---
title: Synology
weight: 22
description: "Self-host RustDesk Server OSS on Synology NAS. Choose the right guide for DSM 6 or DSM 7.2 Container Manager and deploy with Docker on supported Synology models."
keywords: ["rustdesk synology", "rustdesk nas", "rustdesk synology docker", "rustdesk dsm 7.2", "rustdesk synology container manager"]
---

Use these Synology guides to self-host RustDesk Server OSS on a NAS running either DSM 6 or DSM 7.2 Container Manager.

Synology has two types of Docker, "Docker" and "Container Manager". If you're using DSM 7.2 and later, please follow the guide for DSM 7.2, or follow the DSM 6 guide if you're on an older system.

## Which Synology guide should you choose?

| Platform version | Best guide |
| --- | --- |
| DSM 7.2 and later | [Synology DSM 7.2](/docs/en/self-host/rustdesk-server-oss/synology/dsm-7/) |
| Older Synology systems using the old Docker package | [Synology DSM 6](/docs/en/self-host/rustdesk-server-oss/synology/dsm-6/) |

## Synology deployment checklist

1. Confirm whether your NAS runs DSM 6 or DSM 7.2+.
2. Install the correct Docker or Container Manager package for that DSM version.
3. Follow the matching RustDesk deployment guide for that package.
4. Open the required RustDesk ports and verify persistent storage for container data.

If you are using Synology with Portainer, please refer to [this tutorial](https://mariushosting.com/how-to-install-rustdesk-on-your-synology-nas/).

{{% children depth="3" showhidden="true" %}}
