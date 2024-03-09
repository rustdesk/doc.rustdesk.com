---
title: Synology DSM 7.2
weight: 20
---
<!-- For translators: When translating elements like "buttons", don't just translate, please refer actual naming in their interface. -->
After DSM 7.2 update, Synology renamed their "Docker" package to "Container Manager". It brings a new GUI, and comes with "docker-compose" within its GUI, which make you create Docker more easily.

### Supported models and requirements

Container Manager brings ARM64 support for some low-end models, such as J series, for detail list of supported model, please check [Synology website](https://www.synology.com/en-us/dsm/packages/ContainerManager).
Most of time you won't need to install extra RAM for install Docker and RustDesk Server.

### 1. Install Container Manager (Docker)

Open "Package Center", search and install "Container Manager".

![](images/dsm7_install_container_manager_though_package_center.png)

### 2. Create folder

After you installed "Container Manager", it will create a Shared Folder called `docker`, let's put our server's data here.

Open your File Station, create a folder named `rustdesk-server`(or whatever you like). Then create a folder named `data` in it just like the picture.

![](images/dsm7_create_required_folders.png)

### 3. Create container

Open your Container Manager, go to Project and click Create.

Enter the project name `rustdesk-server` and change Source from "Upload docker-compose.yml" to "Create docker-compose.yml", and copy following contents to the box. After you copied, you should replace `rustdesk.example.com` (Which point to your `hbbr`) to the domain that will point to your NAS.

{{% notice note %}}
You could modify the line with `hbbs` to your NAS's LAN IP temporarily just like the picture. After you verify your server is working, you **should** change back.
{{% /notice %}}

![](images/dsm7_creating_project_init.png)

```yaml
version: '3'
services:
  hbbs:
    container_name: hbbs
    image: rustdesk/rustdesk-server:latest
    command: hbbs -r rustdesk.example.com:21117 -k _
    volumes:
      - ./data:/root
    network_mode: host
    depends_on:
      - hbbr
    restart: always

  hbbr:
    container_name: hbbr
    image: rustdesk/rustdesk-server:latest
    command: hbbr -k _
    volumes:
      - ./data:/root
    network_mode: host
    restart: always

# Because using docker host mode
# Just in case you forgot the ports:
# 21115 TCP For NAT type test
# 21116 TCP TCP hole punching
# 21116 UDP Heartbeat/ID server
# 21117 TCP Relay
```

Please skip `Web portal settings` then done.

### 4. Check it is working

Open your File Station, you should see `id_ed25519`, `id_ed25519.pub` on your `docker/rustdesk-server/data` folder. You could download it and open it though any text editor or use [Synology Text Editor](https://www.synology.com/en-us/dsm/packages/TextEditor). This is the public key that you need for your RustDesk client.

The public key will looks like this:

![](images/dsm7_viewing_public_key_though_syno_text_editor.png)

Check [here](/docs/en/self-host/rustdesk-server-oss/install/#step-3-set-hbbshbbr-address-on-client-side) to set up your client. Only `ID server` and `Key` is needed. `Relay server` isn't needed because we've set it in `hbbs`, hbbs will provide this information automatically.

### 5. Set your hbbs to point to your domain

If you have set your `hbbs` command to point to your LAN IP, and verified it is working, it is time to change to the domain, because it will not working if you using it outside your LAN.
<hr>

5.1. Go to Container Manager → Project → Click "rustdesk-server" → Action → Stop

5.2. After stopped, click "YAML Configurations", modify the line start with `command: hbbs` to your domain, then click "Save". Make sure you choose "Build and start the project (rebuild the image)".

![](images/dsm7_recreate_project_after_modified_args.png)

5.3. Your RustDesk Server should ready for connections from the Internet, next, you should setup port forwarding.

{{% notice note %}}
Having problem after you done this step? You should check [this article](/docs/en/self-host/nat-loopback-issues/).
{{% /notice %}}

### 6. Set port forwarding on your router

Go to your router's admin webpage, find anything related to `Port forwarding`, it should appear in `WAN` or `Firewall` settings.

If you still can't find the setting, Google search `{Router brand} + port forwarding` or `{Router model} + port forwarding`. If this device is from your ISP, ask them.

Open these required ports:
  * `21115` `TCP` For NAT type test
  * `21116` `TCP` TCP hole punching
  * `21116` `UDP` Heartbeat/ID server
  * `21117` `TCP` Relay
