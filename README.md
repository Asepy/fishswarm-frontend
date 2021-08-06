<h1 align="center">Bienvenido a AsepyApp 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-0.2.0-blue.svg?cacheSeconds=2592000" />
</p>

> Aplicación de registro y consulta de socios

### 👩‍ [Sitio de Registro de Socios](http://fischwarm-frontend.s3-website-sa-east-1.amazonaws.com)

### 📈 [Aplicación Backoffice](http://fischwarm-frontend.s3-website-sa-east-1.amazonaws.com/app)

URLs desarrollo

- [Registro](http://fischwarm-frontend-dev.s3-website-sa-east-1.amazonaws.com)
- [Backoffice](http://fischwarm-frontend-dev.s3-website-sa-east-1.amazonaws.com/app)

## Configuración de entorno

Luego de clonar se debe crear el archivo:

```
touch .env.local
```

Con el contenido

```
NEXT_PUBLIC_API_BASE=<URL DEL BACKEND API>
NEXT_PUBLIC_API_KEY=<KEY DEL API>
NEXT_PUBLIC_SITE_URL=<URL DE ESTE SITIO> # para SEO
```

## Instalación

```sh
npm install
```

## Uso en desarrollo

```sh
npm run dev
```

## Correr tests

```sh
npm run test
```

## Autor

👤 **Asepy**

- Github: [@Asepy](https://github.com/Asepy)
