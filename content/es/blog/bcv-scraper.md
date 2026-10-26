---
locale: "es"
title: "Usar la tasa de cambio oficial en el e-commerce venezolano"
description: "Venezuela tiene retos particulares para el e-commerce. Las leyes locales y la normativa fiscal exigen facturar en bolívares mientras los precios se cotizan en USD. Un scraper simple en Python y FastAPI ayuda a los desarrolladores a obtener la tasa del Banco Central de Venezuela: aquí cuándo tiene sentido y cómo construirlo."
date: "2024-01-19"
category: "side-project"
minRead: 7
image: "/blog/bcv-scraper/featuredImage.jpg"
author:
  name: "Iván Álvarez"
  username: "ivanovertime"
  to: "https://github.com/ivanovertime"
  avatar:
    src: "/avatar.jpg"
    alt: "Iván Álvarez"
tags:
  - "venezuela"
  - "integrations"
  - "e-commerce"
type: "side-project"
stack: ["Python", "FastAPI", "Web Scraping", "REST API"]
repoUrl: "https://github.com/ivanovertime/bcv_scraper"
team_size: 1
role: "Ingeniero"
year: 2024
outcome_headline: "Publiqué un scraper open source que elimina la carga manual diaria de la tasa de cambio para equipos de e-commerce venezolanos"
featured: false
---
## Situación

## TL;DR

Las plataformas de e-commerce venezolanas están obligadas por ley a facturar en bolívares, mientras la mayor parte del catálogo se cotiza en USD. Cargar la tasa de cambio a mano todos los días es propenso a errores y no escala. Este artículo recorre el enfoque de scraping, un microservicio simple en FastAPI que se puede desplegar en cualquier parte, y cuándo lo usarías de verdad frente a una API de tasas de terceros.

## Contexto

Se espera que el sector de e-commerce venezolano crezca gracias al aumento de la penetración de internet, un marco legal en evolución y bancos que ahora ofrecen transacciones más seguras [^1]. Después de la pandemia, el negocio explotó; la ley exige facturar en la moneda nacional (Bs.), pero la mayoría de los productos y transacciones se anuncian en USD. Veamos dos ejemplos:

**Librería La Alegría** es una librería y papelería que ofrece más de 15.000 productos relacionados con artículos de oficina, útiles escolares, materiales de arte, libros técnicos y escolares, y más. La tienda también ofrece a la ciudad un centro cultural con talleres para niños y eventos [^2].

Su stack tecnológico es una instancia de Odoo. No hay aplicación móvil y la facturación ocurre directamente en la tienda. Una [búsqueda rápida](https://apps.odoo.com/apps/modules/browse?search=BCV) indica que hay tres extensiones y una de ellas es gratuita, pero puede que no sea open source: no encontré un repositorio.

**Tu Zona Market** es un marketplace en línea que conecta a vendedores locales con clientes. La plataforma ofrece una variedad de productos, incluyendo víveres, electrónica y electrodomésticos, y brinda una experiencia de compra fluida en dos estados [^3].

Al parecer usan Angular con lo que parece un backend en Express, aunque no puedo asegurarlo. Para mantenerse en regla necesitan algunas cosas:

1. Un web scraper: un programa que extrae datos de un sitio web analizando su código HTML.
2. APIs RESTful con poco código y alto rendimiento.
3. Almacenamiento en base de datos para datos históricos (para devoluciones, reembolsos y similares).

Si usas un servicio como [Exchange Rate API](https://www.exchangerate-api.com/) puedes obtener la tasa diaria, pero podrías toparte rápido con el límite de peticiones.

## Solución

## Decisión: ¿servicio de API o tarea programada?

Aquí tienes dos caminos:

| Opción | Compensación | Elegí |
|---|---|---|
| API de tasas de terceros (por ejemplo, exchangerate-api.com) | Pagas por petición o por mes; hay límite en el plan gratuito; añade una dependencia | |
| Construir tu propio scraper + microservicio | Corre en tu infraestructura; maneja picos sin costo; control total del feed de la tasa | <DecisionCheck /> |

Para las plataformas venezolanas, gana el scraper: el Banco Central publica a diario, la normativa exige la tasa oficial y te evitas los límites de terceros. Despliégalo en la infraestructura que ya tienes.

## Implementación
### Si tienes hardware
Crear un web scraper y usarlo con [crawlab](https://www.crawlab.cn/en) como almacenamiento en MongoDB es una gran solución.

### Si no lo tienes
Un scraper simple hecho en Python con FastAPI puede ser útil para un desarrollador de software que quiera acceder y analizar los datos financieros del sitio oficial del Banco Central de Venezuela.

Usando un web scraper hecho en Python con FastAPI, puedes:

- Automatizar el proceso de obtener las últimas tasas de cambio del sitio del Banco Central de Venezuela.
- Convertir los datos extraídos a formato JSON, que se puede almacenar, transmitir y procesar por distintas aplicaciones y herramientas.
- Crear una API propia que exponga los datos extraídos como endpoints, accesibles por otros desarrolladores o usuarios que necesiten esos datos para sus propios fines.
- Aplicar técnicas de análisis de datos, visualización o machine learning a los datos extraídos, usando el amplio conjunto de librerías y paquetes disponibles en Python.

Publiqué una implementación inicial en este [repositorio](https://github.com/ivanovertime/bcv_scraper).

Avísame si tienes alguna pregunta.

# Referencias
## Resultado

El scraper del BCV está publicado como repositorio inicial open source. Elimina una tarea manual recurrente (el copiar y pegar la tasa de cambio a diario) y se convierte en una pieza base para cualquier plataforma venezolana de e-commerce o SaaS que necesite cumplir con la tasa. Los desarrolladores pueden hacer fork, adaptarlo a sus necesidades y desplegarlo en la infraestructura que ya tienen.

## Referencias
Foto de [Frederick Medina](https://unsplash.com/@frederickjmedina?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash) en [Unsplash](https://unsplash.com/photos/person-holding-two-brown-doughnuts-LxyT2CgQSj8?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash)


[^1]: E-commerce in Venezuela. <https://www.lloydsbanktrade.com/en/market-potential/venezuela/ecommerce>.
[^2]: Librería La Alegría. <https://www.librerialaalegria.com.ve/>.
[^3]: Tu Zona Market. <https://tuzonamarket.com/>.
