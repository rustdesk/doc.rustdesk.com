---
title: 编译
weight: 1
description: "RustDesk 的编译文档，提供安装、配置、部署和故障排查指南。"
keywords: ["build rustdesk", "rustdesk source build", "rustdesk packaging", "rustdesk contributor build guide"]
---

关于打包桌面版本， 请查看 [build.py](https://github.com/rustdesk/rustdesk/blob/master/build.py) 。

## 构建部分包含什么？

构建部分涵盖 Linux、Windows 和 macOS 的桌面贡献者环境。请根据平台选择对应指南，完成依赖安装、`vcpkg` 配置、Rust 工具链准备以及最终构建或打包。

## 应该选择哪个构建指南？

| 平台 | 指南 |
| --- | --- |
| Linux | [Linux](/docs/zh-cn/dev/build/linux/) |
| Windows | [Windows](/docs/zh-cn/dev/build/windows/) |
| macOS | [macOS](/docs/zh-cn/dev/build/osx/) |
| Windows 故障排查 | [Windows FAQ](/docs/zh-cn/dev/build/faq/) |

{{% children depth="3" showhidden="true" %}}
