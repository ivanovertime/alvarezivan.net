---
locale: "es"
title: "Arreglar los montajes de Google Drive en GNOME sobre NixOS 25.11"
description: "Cómo arreglé el error «Location is not mountable» habilitando el soporte de Google en GVFS y los servicios de GNOME relacionados en NixOS 25.11."
date: "2026-05-31"
image: "/blog/fixing-gnome-google-drive-mounts-on-nixos/featuredImage.png"
category: "article"
minRead: 4
author:
  name: "Iván Álvarez"
  username: "ivanovertime"
  to: "https://github.com/ivanovertime"
  avatar:
    src: "/avatar.jpg"
    alt: "Iván Álvarez"
tags:
  - "linux"
featured: false
---
Me topé con un problema en NixOS 25.11 que tardé un rato en entender: Google Drive aparecía en Archivos de GNOME después de iniciar sesión con Cuentas en línea de GNOME, pero al intentar abrirlo fallaba con:

> "Location is not mountable"

![Archivos de GNOME mostrando el diálogo de error «Unable to access — Location is not mountable»](/blog/fixing-gnome-google-drive-mounts-on-nixos/featuredImage.png)

Este artículo comparte el arreglo que me funcionó y que dejó los montajes de Drive funcionando de forma confiable en mi sistema.

## El problema

A primera vista, todo se veía correcto:

1. Cuentas en línea de GNOME estaba habilitado.
2. Podía iniciar sesión en Google.
3. Drive aparecía en la barra lateral.

Pero el montaje seguía fallando. La pieza que faltaba era que el build por defecto de GVFS en esta configuración no incluía el soporte del backend de Google.

## Qué cambié

Hice tres cambios puntuales.

### 1) Forzar un build de GVFS con soporte de Google

Sobrescribí el paquete GVFS para habilitar el soporte de Google de forma explícita:

```nix
services.gvfs.package = pkgs.gnome.gvfs.override {
  gnomeSupport = true;
  googleSupport = true;
};
```

Por qué: sin esto, GOA puede autenticar, pero GVFS no puede completar la ruta del backend de montaje de Drive.

### 2) Mantener activo el stack de cuenta y montaje de GNOME

Me aseguré de que estos servicios siguieran habilitados:

```nix
services.gnome.gnome-online-accounts.enable = true;
services.gvfs.enable = true;
services.gnome.gnome-keyring.enable = true;
services.accounts-daemon.enable = true;
programs.dconf.enable = true;
```

Por qué: todos forman parte de la cadena de identidad, credenciales e integración de escritorio de GNOME que usan los volúmenes en línea.

### 3) Permitir el paquete libsoup2 marcado como inseguro que exige esta ruta de backend

Agregué:

```nix
nixpkgs.config.permittedInsecurePackages = [
  "libsoup-2.74.3"
];
```

Por qué: en esta combinación de canal y versión, habilitar el backend de Google de GVFS arrastra libsoup2, que está marcado como inseguro. Esta excepción permite que el rebuild y la evaluación continúen.

Nota importante: esto es un parche de compatibilidad pragmático, no un ideal a largo plazo desde el punto de vista de la seguridad.

Por lo que nixpkgs documenta actualmente, no se trata de un solo CVE aislado. La línea `libsoup 2` llegó al final de su vida útil y está marcada con muchos CVE conocidos sin arreglar, así que Nix la expone como insegura por defecto.

Agradezco de verdad que exista esa advertencia. Es fácil sentirse bloqueado cuando un rebuild se detiene, pero esta política está haciendo un trabajo importante: recordarnos dónde un arreglo de compatibilidad se paga con higiene de seguridad a largo plazo.

## Aplicar y verificar

Después de actualizar tu configuración:

```bash
sudo nixos-rebuild switch
```

Luego:

1. Abre Cuentas en línea de GNOME y confirma que tu cuenta de Google está conectada.
2. Abre Archivos.
3. Selecciona Google Drive en la barra lateral.

Si todo está bien conectado, Drive debería montarse en vez de fallar con "Location is not mountable".

## Compensaciones y dirección futura

Este arreglo restaura el montaje nativo de Drive en GNOME, pero por ahora depende de una excepción de paquete (`libsoup-2.74.3`). Un camino más limpio a largo plazo es pasar a un stack de backend que evite dependencias inseguras, o usar un enfoque de montaje alternativo como rclone.

En otras palabras, esto me desbloqueó rápido y lo agradezco. A la vez, lo trato como temporal hasta que la ruta del backend de Drive pueda funcionar sin la línea de librerías antiguas en fin de vida.

## TL;DR

Si Google Drive aparece en Archivos de GNOME pero no se monta en NixOS 25.11, esta es la versión corta de lo que me ayudó:

1. Sobrescribir GVFS con `googleSupport = true`.
2. Mantener habilitados los servicios GOA, GVFS, keyring, accounts-daemon y dconf.
3. Permitir `libsoup-2.74.3` para que el build funcione con las restricciones del canal actual.

Agradezco a los mantenedores de Nix y al ecosistema de GNOME: incluso cuando este camino es incómodo, los valores por defecto nos empujan hacia decisiones más seguras.
