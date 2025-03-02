---
title: Docker 
weight: 30
---

## 使用 Docker 编译

首先克隆存储库并构建 docker 容器：

```sh
git clone --recurse-submodules https://github.com/rustdesk/rustdesk
cd rustdesk
docker build -t "rustdesk-builder" .
```

针对国内网络访问问题，可以做以下几点优化：

1. Dockerfile 中修改系统的源到国内镜像

   ```
   在Dockerfile的RUN apt update之前插入两行：

   RUN sed -i "s/deb.debian.org/mirrors.163.com/g" /etc/apt/sources.list
   RUN sed -i "s/security.debian.org/mirrors.163.com/g" /etc/apt/sources.list
   ```

2. 修改容器系统中的 cargo 源，在`RUN ./rustup.sh -y`后插入下面代码：

   ```
   RUN echo '[source.crates-io]' > ~/.cargo/config \
    && echo 'registry = "https://github.com/rust-lang/crates.io-index"'  >> ~/.cargo/config \
    && echo '# 替换成你偏好的镜像源'  >> ~/.cargo/config \
    && echo "replace-with = 'sjtu'"  >> ~/.cargo/config \
    && echo '# 上海交通大学'   >> ~/.cargo/config \
    && echo '[source.sjtu]'   >> ~/.cargo/config \
    && echo 'registry = "https://mirrors.sjtug.sjtu.edu.cn/git/crates.io-index"'  >> ~/.cargo/config \
    && echo '' >> ~/.cargo/config
   ```

3. Dockerfile 中加入代理的 env

   ```
   在User root后插入两行

   ENV http_proxy=http://host:port
   ENV https_proxy=http://host:port
   ```

4. docker build 命令后面加上 proxy 参数

   ```
   docker build -t "rustdesk-builder" . --build-arg http_proxy=http://host:port --build-arg https_proxy=http://host:port
   ```

然后，每次需要构建应用程序时，运行以下命令：

```sh
docker run --rm -it -v $PWD:/home/user/rustdesk -v rustdesk-git-cache:/home/user/.cargo/git -v rustdesk-registry-cache:/home/user/.cargo/registry -e PUID="$(id -u)" -e PGID="$(id -g)" rustdesk-builder
```

运行若遇到无权限问题，出现以下提示：

```
usermod: user user is currently used by process 1
groupmod: Permission denied.
groupmod: cannot lock /etc/group; try again later.
```

可以尝试把`-e PUID="$(id -u)" -e PGID="$(id -g)"`参数去掉。（出现这一问题的原因是容器中的 entrypoint 脚本中判定 uid 和 gid 与给定的环境变量不一致时会修改 user 的 uid 和 gid 重新运行，但是重新运行时取不到环境变量中的 uid 和 gid 了，会再次进入 uid 与 gid 与给定值不一致的逻辑分支）

请注意，第一次构建可能需要比较长的时间，因为需要缓存依赖项（国内网络经常出现拉取失败，可多尝试几次），后续构建会更快。此外，如果您需要为构建命令指定不同的参数，
您可以在命令末尾的 `<OPTIONAL-ARGS>` 位置执行此操作。例如，如果你想构建一个优化的发布版本，你可以在命令后跟 `--release`。
将在 target 下产生可执行程序，请通过以下方式运行调试版本：

```sh
target/debug/rustdesk
```

或者运行发布版本:

```sh
target/release/rustdesk
```

请确保您从 RustDesk 存储库的根目录运行这些命令，否则应用程序可能无法找到所需的资源。另请注意，此方法当前不支持其他`Cargo`子命令，
例如 `install` 或 `run`，因为运行在容器里，而不是宿主机上。