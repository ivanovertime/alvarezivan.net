---
locale: "es"
title: "El becario está descargando películas otra vez"
description: "¿Qué pasa cuando le das a gente con conocimientos técnicos ocho horas de internet al día? Bienvenido al problema de El becario está descargando películas."
date: "2024-05-16"
minRead: 4
image: "/blog/intern-movie-torrent/featuredImage.jpg"
author:
  name: "Iván Álvarez"
  username: "ivanovertime"
  to: "https://github.com/ivanovertime"
  avatar:
    src: "/avatar.jpg"
    alt: "Iván Álvarez"
tags:
  - "venezuela"
---
![Gráfico circular de tipos de torrents](/blog/intern-movie-torrent/venezuela_torrent.png)
# Situación
Venezuela tiene un problema de ancho de banda, y mucha gente va a estirar cualquier conexión que tenga a mano, sobre todo el internet del trabajo.

¿Qué pasa cuando dejas que gente con conocimientos técnicos se quede en línea ocho horas al día? Yo lo llamo el problema de **El becario está descargando películas**.

# Solución 
I Know What You Download es una herramienta de monitoreo que te permite revisar si alguien está descargando torrents. Así se usa:
1. Visita [iknowwhatyoudownload.com](https://iknowwhatyoudownload.com/en/peer/).
2. En la página principal verás tu dirección IP externa actual.
3. Para revisar toda la organización, mira la página de resultados y comprueba si se están descargando torrents desde esa IP (puedes probar otras direcciones si tienes dudas).
![Página principal de la herramienta](/blog/intern-movie-torrent/venezuela_torrent2.png)

## Para rastrear a otras personas
Puedes [crear un enlace](https://iknowwhatyoudownload.com/en/link/) y enviarlo; el rastreador registra la actividad en cuanto alguien hace clic.

## Para rastrear pares
Si tienes el archivo `.torrent` puedes extraer los pares y las semillas desde tu cliente de torrents (por ejemplo, qBittorrent).
1. Copia el par o host seleccionado (o todo, si tienes tiempo).
2. Convierte la dirección del host con una herramienta de búsqueda de IP como [ip-tracker.org](https://www.ip-tracker.org/) o [whois.domaintools.com](https://whois.domaintools.com/) si no aparece listada.
3. Usa [iphub.info](https://iphub.info/) para determinar si la IP es un proxy o una dirección residencial.


Ten en cuenta que las VPN y los proxies pueden dar resultados ruidosos, como se explica en las [preguntas frecuentes](https://iknowwhatyoudownload.com/en/contacts/). Aun así, es raro ver VPN premium para torrents dentro de organizaciones en Venezuela, porque los cortafuegos perimetrales como Fortinet suelen bloquear ese tráfico.


# Referencias
Foto de <a href="https://unsplash.com/@jsshotz?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Jorge Salvador</a> en <a href="https://unsplash.com/photos/black-and-white-satellite-dish-wjMMVxy8C0g?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>

[Torrent Freak](https://torrentfreak.com/i-know-what-you-download-overwhelmed-by-bogus-dmca-notices-221023/)
