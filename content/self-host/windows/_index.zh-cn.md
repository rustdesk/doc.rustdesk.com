---
title: WINDOWS & PM2 OR NSSM
weight: 20
---

## 选择哪个？
现在您有两种选择，可以使用 PM2（更简单）或 NSSM（更难）来启动 RustDesk 服务器
使用 NSSM 有一些好处：
- 向后兼容旧版 Windows（Windows Server 2008R2/Windows 7 及更早版本，但未经测试）。
- 适用于 Windows 服务器
- 无需登录即可启动自动启动（创建启动项的用户无需登录即可启动）。
- 将两个二进制文件作为服务运行。
- 独立（不依赖 Node.js）

PM2 的好处包括：
- 如果您在与主要工作计算机相同的计算机上运行服务器，这是个好主意
- 您定期登录创建 rustdesk 启动项的用户
- 更加用户友好

## 使用 NSSM 安装

### 安装 NSSM
请[下载](https://nssm.cc/release/nssm-2.24.zip)并解压NSSM选择合适的
体系结构到您的 Windows 系统（如果 x86 使用 win32 文件夹的内容，如果 x64 使用
win64 文件夹的内容）。 将 NSSM 的二进制文件移至
`Program Files\NSSM`（NSSM 一旦作为服务启动，就无法从其所在的目录中移动。
因此最好将其存放在安装驱动器（通常是 C 驱动器）的 Program files）目录中。
还建议将路径（例如`C:\Program Files\NSSM`）添加到路径变量中。

### 检查 NSSM 是否安装正确
如果您已正确完成所有操作，则文件夹`C:\Program Files\NSSM`（在本例中我使用 C:
驱动器，但您可以使用安装 Windows 的任何驱动器或您想要的任何路径）
仅包含文件`nssm.exe`。

在本例中我们将使用`C:\Program Files\NSSM`

打开命令提示符并运行`nssm`，如果您看到帮助页面，则您已准备好进入下一步

### 运行 hbbr 和 hbbs
下载Windows版本的[服务器程序](https://github.com/rustdesk/rustdesk-server/releases)。
将程序解压缩到`C:\Program Files\RustDesk Server`（或您想要的任何地方，只需确保它
安装服务后不会改变）。 现在回到命令提示符

在此示例中，我们将使用`C:\Program Files\RustDesk Server`

```cmd
nssm 安装`RustDesk hbbs 服务``C:\Program Files\RustDesk Server\hbbs.exe`-r 0.0.0.0 -k _
nssm 安装`RustDesk hbbr 服务``C:\Program Files\RustDesk Server\hbbr.exe`-k _
```

**笔记：**
- 您可以将 `RustDesk hbbs service` 更改为您想要将 hbbs 服务命名的任何内容
- 您可以将`RustDesk hbbr 服务`更改为您想要将 hbbr 服务命名为任何名称
- 您可以将 `C:\Program Files\RustDesk Server\hbbs.exe` 更改为放置 RustDesk 二进制文件的位置
- 您可以将 `C:\Program Files\RustDesk Server\hbbr.exe` 更改为放置 RustDesk 二进制文件的位置
- 你不需要`-k _`选项，它是可选的，它只是为了更好的安全性

**命令模板：**

如果您只想复制、粘贴和编辑，则使用命令模板。

```cmd
nssm install <所需的 hbbs 服务名称> <RustDesk hbbs 二进制路径> <RustDesk hbbs 参数>
nssm install <所需的 hbbr 服务名称> <RustDesk hbbr 二进制路径> <RustDesk hbbr 参数>
```

**启动服务**

成功安装服务后，需要启动它们。
```cmd
nssm start <所需的 hbbs 服务名称>
nssm start <所需的 hbbr 服务名称>
```

**完毕！**

（以上方法已在Windows Server Core 2022 Standard上测试）。

## 或者

## 使用 PM2 安装

### 安装NodeJs
请点击[下载](https://nodejs.org/dist/v16.14.2/node-v16.14.2-x86.msi)安装，可能会有点慢，如果卡顿太久，尝试关掉重新安装。
NodeJs是pm2的运行时环境，所以要先安装NodeJs。

### 安装pm2
在cmd.exe中分别输入下面三行，每一行都要按回车键，一行一行运行。
```
npm install -g pm2
npm install pm2-windows-startup -g
pm2-startup install
```

### 运行hbbr和hbbs
下载Windows版本[服务器程序](https://github.com/rustdesk/rustdesk-server/releases)，假设你解压缩到了C盘下。分别运行下面四行命令。
```
cd c:\rustdesk-server-windows-x64
pm2 start hbbs.exe -- -r hbbr运行所在主机的地址
pm2 start hbbr.exe 
pm2 save
```

### 查看log
```
pm2 log hbbr
pm2 log hbbs
```
