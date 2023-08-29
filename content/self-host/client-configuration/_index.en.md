---
title: Self-host
weight: 200
pre: "<b>2. </b>"
chapter: true
---

### Overview

There are a number of ways to configure RustDesk clients to use your own self-hosted server, we will cover some below.

### Manual Config

In the main RustDesk Client home click on the 3 dots next to your ID then click on Network, you can now unlock the settings using elevated privileges and set your ID, Relay, API and Keys.

![image](/docs/en/self-host/client-configuration/images/network-config.png)

### Automatic Config

The easiest way to setup automatically is using deployment scripts found [here](/docs/en/client/client-deployment/)

You can fix the Password is required and use a reverse base64 string in the format `{"host":"HOSTADDRESS","key":"HOSTKEY","api":"http://HOSTADDRESS:21114"` to automatically configure the clients, this is available automatically with RustDesk Server Pro via the console.


### URL

To ease integration with other systems you can call RustDesk using a URL, it should be in the following format

`rustdesk://connection/new/agentid?password=agentpassword`



