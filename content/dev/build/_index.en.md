---
title: Build
weight: 1
description: "Build and package RustDesk from source. Start here for contributor-oriented build guidance across supported desktop platforms."
keywords: ["build rustdesk", "rustdesk source build", "rustdesk packaging", "rustdesk contributor build guide"]
---

Use these build guides when you want to compile or package RustDesk from source for desktop platforms. Check out [build.py](https://github.com/rustdesk/rustdesk/blob/master/build.py) for packaging the desktop version.

## What does the build section cover?

The build section covers the desktop contributor setup for Linux, Windows, and macOS. Use the platform-specific guide for dependency installation, `vcpkg` setup, Rust toolchain preparation, and final build or packaging commands.

## Which build guide should you choose?

| Platform | Guide |
| --- | --- |
| Linux | [Linux](/docs/en/dev/build/linux/) |
| Windows | [Windows](/docs/en/dev/build/windows/) |
| macOS | [macOS](/docs/en/dev/build/osx/) |
| Windows troubleshooting | [FAQ for Windows](/docs/en/dev/build/faq/) |

{{% children depth="3" showhidden="true" %}}
