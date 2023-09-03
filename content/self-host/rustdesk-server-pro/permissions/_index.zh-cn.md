---
title: 权限控制
weight: 16
---

## 设备访问权限

有两种方法将设备与用户关联：
- 通过控制台设备页面
- 客户端登录用户账号

以下两种情况会导致设备无法被访问：
- 在控制台设备页面中使设备`禁用`
- 在控制台用户页面中使用户`禁用`

关联的设备只能被同一用户或用户组的设备或者正确的跨组设置的设备访问。

## 跨组设置

请进入Web控制台的群组页面，点击`编辑`来编辑跨群组设置，如下所示。

您对`Access with other groups`的修改会立即生效，无需单击`确定`按钮。

`Can access to`和`Can be accessed from`提供几乎相同的功能，我们提供这两个选项是为了您的方便。 然而，这可能会引起一些混乱。

{{% notice note %}}
主控端所在的用户和组是由登录的用户决定，而不是从 Web 控制台分配的用户决定。 我们这样设计是因为某些主控端没有设备ID，例如iOS客户端和Web客户端。

{{% /notice %}}

![](/docs/en/self-host/rustdesk-server-pro/permissions/images/crossgrp.png)
