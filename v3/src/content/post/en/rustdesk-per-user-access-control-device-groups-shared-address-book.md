---
publishDate: 2026-06-26T15:16:00Z
lang: en
translationKey: rustdesk-per-user-access-control-device-groups-shared-address-book
draft: false
title: 'RustDesk Per-User Access Control: Restrict Device Access'
excerpt: 'Use Server Pro Access Control, user assignments, device groups, and cross-group rules to limit which RustDesk users can connect to which devices.'
image: ~/assets/images/blog/rustdesk-per-user-access-control-device-groups-shared-address-book-og.png
category: Deployment
tags:
  - RustDesk
  - deployment
  - MSP
author: RustDesk Team
faq:
  - question: 'How do I restrict a RustDesk user to only certain devices?'
    answer: 'Use RustDesk Server Pro Access Control. Assign the device directly to the user, or place it in a device group and grant that user or user group access to the group. Review cross-group rules because access permissions are cumulative: any applicable allow rule can broaden the result.'
  - question: 'How do I set up a shared address book and share it with specific users?'
    answer: 'A shared address book gives selected users a curated list of devices for visibility and convenience; it is not connection authorization. A user who knows another device ID and its credentials may still attempt a connection, so enforce eligibility with Server Pro Access Control.'
  - question: 'What are device groups and how do I use them to scope access?'
    answer: 'A device can be assigned to one device group, and Access Control can grant users or user groups permission to connect to that group. Device-group permissions combine with user-group permissions, so audit both paths and test with real restricted accounts.'
  - question: 'How do I give a contractor temporary access and revoke it later?'
    answer: 'Create a dedicated contractor account, assign only the required device or device group, remove broad cross-group access, and test both an allowed device and a known device ID outside the scope. Disable the contractor account when the engagement ends.'

metadata:
  description: 'Configure RustDesk Server Pro Access Control with user assignments, device groups, and cross-group rules to restrict device access.'
  keywords: 'RustDesk per-user access control, RustDesk restrict device access, RustDesk device groups, RustDesk Access Control, RustDesk contractor access, limit user access RustDesk'
---

To restrict which users can connect to which devices, use [RustDesk Server Pro Access Control](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/permissions/). It decides connection eligibility through **user assignments, device groups, and cross-group access settings**. A shared address book can simplify what a user sees, but it is not the authorization boundary.

## The short answer

For a contractor who should reach one machine:

1. Create a dedicated Server Pro user for the contractor.
2. Assign the required device directly to that user, or put it in a dedicated device group and grant the user access to that group.
3. Review user-group and device-group cross-access rules. Access permissions are cumulative, so an allow rule on either path can grant access.
4. Optionally share a narrow address book for convenience, but do not rely on it to block other device IDs.
5. Test the contractor account against both the allowed device and a known device ID outside the permitted scope.
6. Disable the contractor account when the engagement ends.

The target device's password, 2FA, or click-to-confirm prompt remains a separate authentication layer. Access Control answers whether the logged-in user is eligible to reach the device in the first place.

## Access Control and address books solve different problems

**Access Control is authorization.** It determines which users or groups may establish connections to which devices. According to the current RustDesk documentation, a device may be assigned to one user, one device group, or both. Access may also come from user-group and cross-group settings.

**A shared address book controls visibility and convenience, not authorization.** It gives selected users a curated list, aliases, and saved entries. Hiding a machine from that list does not prove the user cannot connect. If the user knows another RustDesk device ID and has valid credentials or receives approval, the address book alone is not the control that should reject the attempt.

**Endpoint authentication is another layer.** A device password, controlled-device 2FA, or manual confirmation proves possession or obtains local consent. It does not replace the server-side decision about which logged-in users are eligible to attempt the connection.

RustDesk also has [Control Roles](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/control-role/) for what an operator may do after connecting, such as file transfer or terminal access. Control Roles do not decide whether the connection is allowed.

## How Access Control grants permission

Server Pro provides two practical assignment patterns:

- **Direct user assignment:** assign a device to the one user who should reach it. This is straightforward for a contractor and one machine.
- **Device-group assignment:** place devices with the same access policy in a device group, then grant selected users or user groups access to that group. This is easier to maintain for teams and larger fleets.

The important rule is that permissions are cumulative. Device-group permissions and user-group permissions can both allow access. Do not assume that a narrow direct assignment overrides a broader group rule. Review `Access with other groups`, including the `Can access to` and `Can be accessed from` directions, and review permissions granted directly on every relevant device group.

RustDesk documents that device groups require RustDesk client 1.3.8 or later and RustDesk Server Pro 1.5.0 or later. Confirm current plan and version requirements before designing a production policy.

## Contractor example: allow one device and deny the rest

Use a dedicated contractor account rather than sharing an employee identity. Assign the one required device directly to that user. If you prefer group-based administration, create a narrowly scoped device group, add the device, and grant the contractor account or its user group access only to that device group.

Next, inspect every cumulative permission path. Remove broad user-group cross-access and any device-group rule that would let the contractor reach another group. A narrow address book may still be useful, but treat it as presentation only.

Test the policy with the actual contractor account before issuing it. Confirm that the assigned device connects. Then manually enter a known device ID outside the scope and confirm that Access Control rejects it; absence from the address book is not a sufficient test. Keep the test results with the access request or change record.

When the work ends, disable the contractor user in the console. RustDesk documents that disabled users and disabled devices cannot be accessed. Remove stale group rules as well so they cannot affect a future account assigned to the same group.

## Who asks this

This comes up most from IT admins, [MSPs](/blog/rustdesk-for-msps), and businesses that need to give a contractor, vendor, or auditor access to one machine without authorizing access to the rest of the environment.

## Related questions

- [How does RustDesk Server Pro Access Control work?](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/permissions/)
- [What are device groups and cross-group access rules?](/blog/enhanced-acl-in-rustdesk-server-pro-1-5-0)
- [How do I create and later disable a temporary user account for external access?](/blog/rustdesk-for-enterprise)
- [How does RustDesk handle per-device passwords and controlled-device 2FA?](/blog/rustdesk-unattended-access-setup)
- [Does per-user access control require RustDesk Server Pro or a self-hosted server?](/blog/rustdesk-for-enterprise)

Need to give an outside contractor access to one machine? Configure Access Control with a dedicated account, test both the allow and deny paths, and disable the account when the work is done.
