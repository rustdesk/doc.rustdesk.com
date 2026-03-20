---
title: Compilar
weight: 1
description: "Documentación de RustDesk sobre Compilar. Consulta guías de instalación, configuración, despliegue y solución de problemas."
keywords: ["build rustdesk", "rustdesk source build", "rustdesk packaging", "rustdesk contributor build guide"]
---

Verificar [build.py](https://github.com/rustdesk/rustdesk/blob/master/build.py) para compilar versión de escritorio.

## ¿Que cubre la seccion de compilacion?

La seccion de compilacion cubre el entorno de build de escritorio para Linux, Windows y macOS. Elige la guia de tu plataforma para preparar dependencias, `vcpkg`, el toolchain de Rust y los pasos finales de compilacion o empaquetado.

## ¿Que guia de compilacion deberias elegir?

| Plataforma | Guia |
| --- | --- |
| Linux | [Linux](/docs/es/dev/build/linux/) |
| Windows | [Windows](/docs/es/dev/build/windows/) |
| macOS | [macOS](/docs/es/dev/build/osx/) |
| Solucion de problemas en Windows | [FAQ de Windows](/docs/es/dev/build/faq/) |

{{% children depth="3" showhidden="true" %}}
