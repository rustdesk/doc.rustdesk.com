---
title: Windows Portable Elevation
weight: 49
description: "Elevate the RustDesk portable app on Windows so remote sessions can handle UAC prompts, Task Manager, and other administrator-level windows. Compare startup elevation, controlled-end elevation, and requested elevation."
keywords: ["rustdesk portable elevation", "rustdesk uac", "rustdesk windows admin rights", "rustdesk task manager mouse issue", "rustdesk request elevation"]
---

Use portable elevation on Windows when the RustDesk portable client needs administrator privileges to handle UAC prompts, elevated apps, and full input control.

Windows portable programs do not have administrator privileges, which can lead to the following issues:

- The screen cannot be transmitted when the UAC (User Account Control) window pops up.
- When an elevated window, such as the Task Manager, pops up, the mouse becomes unresponsive.

By elevating privileges, RustDesk can create a process with administrator privileges during startup or a session, enabling it to perform screenshotting and mouse operations, thereby avoiding the above problems.

## When do you need portable elevation?

You need portable elevation when the RustDesk portable client must interact with administrator-level UI on Windows. The most common signs are blocked UAC prompts, missing screen transmission during elevation dialogs, or no mouse control over elevated windows such as Task Manager.

## Portable elevation quick answers

- Elevation is only needed when the portable build must interact with admin-level Windows UI
- Startup elevation is best when no one is available on the controlled side
- Controlled-end elevation is best when the user can click `Accept and Elevate`
- Control-end requested elevation still requires someone on the controlled side to accept the UAC prompt
- Installing the full program is still the better option when you do not specifically need the portable workflow

## Elevate at startup

This way, remote users don't need to request elevation when connecting. There are two methods:

* Method 1: Change the name of the portable program to include `-qs-` or `-qs.exe` or `_qs.exe` (>= 1.4.6), or end with `qs.exe` (1.2.0 ~ 1.4.5). Click the left mouse button to run, click `Accept` in the UAC window.

* Method 2: Right-click and run as administrator.

## Elevate at the controlled end

The controlled end can directly click `Accept and Elevate` when connecting, or click `Elevate` when already connected.

| Connecting | Connected |
| :---: | :---: |
| ![](/docs/en/client/windows/windows-portable-elevation/images/cm_unauth.jpg) | ![](/docs/en/client/windows/windows-portable-elevation/images/cm_auth.jpg) |

## Request elevation at the control end

Select `Request Elevation` from the action menu. Choose `Ask the remote user for authentication` if the remote user has administrator privileges. If the remote user has a standard Windows account, choose `Transmit the username and password of administrator` and enter the administrator credentials on the controlling computer. You can do this as soon as you connect, before opening an app as administrator. **Both options require someone at the remote computer to respond to the RustDesk UAC prompt.**

| Menu | Dialog |
| :---: | :---: |
| ![](/docs/en/client/windows/windows-portable-elevation/images/menu.png) | ![](/docs/en/client/windows/windows-portable-elevation/images/dialog.png) |
| **Wait** | **Success** |
| ![](/docs/en/client/windows/windows-portable-elevation/images/wait.png) | ![](/docs/en/client/windows/windows-portable-elevation/images/success.png) |

### UAC prompts for apps and RustDesk

Running an app as administrator and elevating RustDesk each trigger a separate UAC prompt. If the app's prompt is already open when you request RustDesk elevation, ask the remote user to handle it first.

1. In the **app's prompt** (for example, **Windows Command Processor**), click **Yes** to run the app as administrator or **No** to cancel.
2. In the **`rustdesk.exe` prompt**, click **Yes** to elevate RustDesk. Enter administrator credentials first if Windows asks.

Once RustDesk is elevated, you can respond to UAC prompts and click buttons that require administrator privileges from the controlling computer. If the remote user canceled the app's launch, you can now reopen it as administrator.

### If the RustDesk UAC prompt asks for credentials again

RustDesk uses the credentials you send to start a helper process under the administrator account. When that process requests elevation, Windows applies the policy **User Account Control: Behavior of the elevation prompt for administrators in Admin Approval Mode**. In Group Policy, you can find it under **Computer Configuration → Policies → Windows Settings → Security Settings → Local Policies → Security Options**.

With **Prompt for credentials on the secure desktop**, someone at the remote computer must enter administrator credentials in the UAC prompt for `rustdesk.exe`, even if you already sent them from the controlling computer. This also applies when you request elevation before opening any other app. [Microsoft's UAC policy reference](https://learn.microsoft.com/en-us/windows/security/application-security/application-control/user-account-control/settings-and-configuration)

## How to Choose

| Scenario | Method |
| :---: | :---: |
| No elevation required | Install the program |
| No user available at the controlled end | Rename<br/>*or*<br/> Run with administrator |
| User available at the controlled end<br/>*and*<br/> Immediate elevation when connected<br/>*and*<br/> Accept-via-click connection | Click `Accept and Elevate` when receiving the connection at the controlled end |
| User available at the controlled end<br/>*and*<br/> Elevation as needed | Click `Elevate` on the connection management window at the controlled end<br/>*or*<br/> Request elevation at the control end |
