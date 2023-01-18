---
title: Hardcoding Custom Settings 
weight: 10
---

## Custom Server
{{% notice note %}}
To hardcode custom server settings into your executables you must [build](/docs/en/dev/build/) the client youself.
{{% /notice %}}
{{% notice note %}}
**If you set eaither of these values without setting the other your executable will not work!**
{{% /notice %}}

You can set the following enviroment variables on your os and rustdesk will use those variables when compiling your client rather than the default rustdesk.com servers. 

If you do not know how to set an enviroment variable on your system you should be able to find documentation for your os online that will explain this.

#### RENDEZVOUS_SERVER
This variable should be set to your server url.

This should be a string such as
```
rustdesk.my-domain.com
```

#### RS_PUB_KEY_VAL
This variable will be your public key, more information on the key is aviable [Here](/docs/en/self-host/install/#key)

This should be a string such as
```
OeVuKk5nlHiXp+APNn0Y3pC1Iwpwn44JGqrQCsWqmBw=
```
