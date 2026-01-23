---
title: "Using the official exchange rate in Venezuela's e-commerce"
description: "Venezuela has unique challenges for e-commerce. Local laws and tax regulations require invoices in bolívares while prices are quoted in USD. A simple Python and FastAPI scraper helps developers fetch the Banco Central de Venezuela exchange rate—here's when it makes sense and how to build it."
date: "2024-01-19"
minRead: 7
image: "/blog/bcv-scraper/featuredImage.jpg"
author:
  name: "Iván Álvarez"
  username: "ivanovertime"
  to: "https://github.com/ivanovertime"
  avatar:
    src: "/avatar.jpg"
    alt: "Iván Álvarez"
---
## Situation

Venezuela's e-commerce sector is expected to grow thanks to increasing internet penetration, an evolving legal framework, and banks that now provide more secure transactions [^1]. After the pandemic, business boomed; the law requires invoices in the national currency (Bs.), but most products and transactions are advertised in USD. Let's look at two examples:

**Librería La Alegría** is a bookstore and stationery store that offers over 15,000 products related to office supplies, school items, art supplies, technical and school books, games, and more. The store also provides a cultural center for the city with workshops for children and events [^2].

Its tech stack is an Odoo instance. There's no mobile app and billing happens directly in-store. A [quick search](https://apps.odoo.com/apps/modules/browse?search=BCV) indicates there are three extensions and one of them is free, but it might not be open source—I couldn't find a repo.

**Tu Zona Market** is an online marketplace that connects local vendors with customers. The platform offers a range of products, including groceries, electronics, and home appliances, and provides a seamless shopping experience in two states [^3].

They appear to use Angular with what looks like an Express backend, although I can't be certain. To stay compliant they need a few things:

1. A web scraper: a program that extracts data from a website by parsing its HTML code.
2. RESTful APIs with minimal code and high performance.
3. Database storage for historical data (for returns, refunds, and the like).

If you use a service like [Exchange Rate API](https://www.exchangerate-api.com/) you can get the daily exchange rate, but you could get rate-limited quickly.

## Solution
### If you have hardware
Creating a web scraper and using it with [crawlab](https://www.crawlab.cn/en) as storage in MongoDB is a great solution.

### If you don't
A simple web scraper built in Python with FastAPI can be useful for a software developer who wants to access and analyze the financial data from the official website of Banco Central de Venezuela.

By using a web scraper built in Python with FastAPI, you can:

- Automate the process of fetching the latest exchange rates from the Banco Central de Venezuela website.
- Convert the scraped data into JSON format, which can be stored, transmitted, and processed by various applications and tools.
- Create a custom API that exposes the scraped data as endpoints, which can be accessed by other developers or users who need the data for their own purposes.
- Apply data analysis, visualization, or machine learning techniques to the scraped data, using the rich set of libraries and packages available in Python.

I published a starter implementation in this [repo](https://github.com/ivanovertime/bcv_scraper).

Let me know if you have any questions.

# References
Photo by [Frederick Medina](https://unsplash.com/@frederickjmedina?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash) on [Unsplash](https://unsplash.com/photos/person-holding-two-brown-doughnuts-LxyT2CgQSj8?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash)


[^1]: E-commerce in Venezuela. <https://www.lloydsbanktrade.com/en/market-potential/venezuela/ecommerce>.
[^2]: Librería La Alegría. <https://www.librerialaalegria.com.ve/>.
[^3]: Tu Zona Market. <https://tuzonamarket.com/>.
