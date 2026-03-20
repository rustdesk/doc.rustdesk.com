---
title: Windows
weight: 4
description: "Documentación de RustDesk sobre Windows. Consulta guías de instalación, configuración, despliegue y solución de problemas."
keywords: ["rustdesk windows", "rustdesk windows install", "rustdesk msi", "rustdesk silent install", "rustdesk portable elevation", "rustdesk windows deployment"]
---

## ¿Que guia de Windows deberias elegir?

| Necesidad | Mejor guia |
| --- | --- |
| Instalacion estandar del cliente de Windows | [Windows](/docs/es/client/windows/) |
| Despliegue gestionado, instalacion silenciosa o empaquetado | [MSI](/docs/es/client/windows/msi/) |
| Modo portable con soporte de elevacion | [Windows Portable Elevation](/docs/es/client/windows/windows-portable-elevation/) |

## Respuestas rapidas para Windows

- Para la mayoria de los usuarios finales basta con el instalador estandar.
- Para despliegues empresariales o instalaciones por script, usa la guia MSI.
- Si necesitas solicitar privilegios de administrador en modo portable, usa portable elevation.
- Si estas autoalojando, combina esto con [Client Deployment](/docs/es/self-host/client-deployment/) para los ajustes distribuidos desde el servidor.

{{% children depth="3" showhidden="true" %}}
