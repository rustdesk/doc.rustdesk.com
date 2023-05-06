---
title: Docker 
weight: 30
---

## 使用 Docker 編譯

首先克隆存儲庫並構建 docker 容器：

```sh
git clone https://github.com/rustdesk/rustdesk
cd rustdesk
docker build -t "rustdesk-builder" .
```

然後，每次需要構建應用程序時，運行以下命令：

```sh
docker run --rm -it -v $PWD:/home/user/rustdesk -v rustdesk-git-cache:/home/user/.cargo/git -v rustdesk-registry-cache:/home/user/.cargo/registry -e PUID="$(id -u)" -e PGID="$(id -g)" rustdesk-builder
```

運行若遇到無權限問題，出現以下提示：

```
usermod: user user is currently used by process 1
groupmod: Permission denied.
groupmod: cannot lock /etc/group; try again later.
```

可以嘗試把`-e PUID="$(id -u)" -e PGID="$(id -g)"`參數去掉。 （出現這一問題的原因是容器中的 entrypoint 腳本中判定 uid 和 gid 與給定的環境變量不一致時會修改 user 的 uid 和 gid 重新運行，但是重新運行時取不到環境變量中的 uid 和 gid 了，會再次進入 uid 與 gid 與給定值不一致的邏輯分支）

請注意，第一次構建可能需要比較長的時間，因為需要緩存依賴項（國內網絡經常出現拉取失敗，可多嘗試幾次），後續構建會更快。此外，如果您需要為構建命令指定不同的參數，
您可以在命令末尾的 `<OPTIONAL-ARGS>` 位置執行此操作。例如，如果你想構建一個優化的發布版本，你可以在命令後跟 `--release`。
將在 target 下產生可執行程序，請通過以下方式運行調試版本：

```sh
target/debug/rustdesk
```

或者運行發布版本:

```sh
target/release/rustdesk
```

請確保您從 RustDesk 存儲庫的根目錄運行這些命令，否則應用程序可能無法找到所需的資源。另請注意，此方法當前不支持其他`Cargo`子命令，
例如 `install` 或 `run`，因為運行在容器裡，而不是宿主機上。