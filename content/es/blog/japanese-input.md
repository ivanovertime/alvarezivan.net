---
locale: "es"
title: "Entrada de japonés en KDE de openSUSE Tumbleweed"
description: "Estos son los pasos para instalar el método de entrada fcitx5 y fcitx5-mozc para japonés en openSUSE Tumbleweed."
date: "2024-01-15"
minRead: 5
image: "/blog/japanese-input/featuredImage.jpg"
author:
  name: "Iván Álvarez"
  username: "ivanovertime"
  to: "https://github.com/ivanovertime"
  avatar:
      src: "/avatar.jpg"
      alt: "Iván Álvarez"
tags:
   - "linux"
---
## Situación

El año pasado, después de un apagón bastante malo, decidí probar los snapshots nativos de Btrfs en openSUSE Tumbleweed y cambiar Ubuntu 22.10 en mi laptop personal. Un cambio siempre trae aprendizaje, pero la mayoría de las respuestas en los foros apuntaban a GNOME.

Estos son los pasos para instalar el método de entrada **fcitx5** y **fcitx5-mozc** para japonés en **openSUSE Tumbleweed**:

## Solución

Abre la terminal e introduce el siguiente comando para instalar **fcitx5** y **fcitx5-mozc**[^1]:

   ```shell
   sudo zypper install fcitx5-mozc
   ```

Luego, si no estás usando un entorno de escritorio [^2] puede que necesites configurar el método de entrada. Para eso, crea o abre `~/.profile` y agrega las siguientes líneas:

   ```bash
   export GTK_IM_MODULE=fcitx
   export QT_IM_MODULE=fcitx
   export XMODIFIERS=@im=fcitx
   ```

Guarda el archivo y reinicia el sistema.

Una vez reiniciado, abre la **herramienta de configuración de fcitx5** ejecutando:

   ```bash
   fcitx5-configtool
   ```

En la herramienta de configuración, haz clic en la pestaña **Input Method** y selecciona el botón **+** para agregar un método de entrada nuevo.

Elige **Mozc** de la lista de métodos de entrada y haz clic en el botón **Add**.

Ya puedes cambiar al método de entrada **Mozc** presionando las teclas **Ctrl + Space**.

Avísame si tienes alguna pregunta.

## Referencias

Foto de <a href="https://unsplash.com/@frederickjmedina?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Frederick Medina</a> en <a href="https://unsplash.com/photos/person-holding-brown-bread-with-yellow-sliced-fruit-6SWHWcLyD-8?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>

[^1]: Japanese input in plasma 5.8 kde <https://forums.opensuse.org/t/japanese-input-in-plasma-5-8-kde/125211>
[^2]: Localization/Japanese - ArchWiki. <https://wiki.archlinux.org/title/Localization/Japanese>.
