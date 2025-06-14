---
title: Instalación
weight: 2
---

## Método 1: Docker (Recomendado)

```
bash <(wget -qO- https://get.docker.com)
wget rustdesk.com/pro.yml -O compose.yml
sudo docker compose up -d
```

Para más detalles, consulte [Docker](/docs/en/self-host/rustdesk-server-pro/installscript/docker/).

## Método 2: install.sh

Si eres competente en Linux, utiliza el script a continuación. De lo contrario, puedes encontrar problemas significativos si falla, y podría ser difícil determinar por qué no funciona.

`bash <(wget -qO- https://raw.githubusercontent.com/rustdesk/rustdesk-server-pro/main/install.sh)`

Para más detalles, consulte [install.sh](/docs/en/self-host/rustdesk-server-pro/installscript/script/).

## Convertir desde código abierto

### Docker
Si instalas la versión de código abierto usando Docker, no hay una forma directa de convertirla. En su lugar, necesitarás ejecutar un nuevo contenedor con la imagen Pro. Antes de hacer esto, respalda tu clave privada (el archivo `id_ed25519`, no `id_ed25519.pub`). Una vez que el nuevo contenedor esté configurado, copia el archivo de clave privada `id_ed25519` anterior al directorio de trabajo del nuevo contenedor, luego reinicia el contenedor.

### install.sh
Si instalas la versión de código abierto usando install.sh, sigue [esto](/docs/en/self-host/rustdesk-server-pro/installscript/script/#convert-from-open-source).