<p align="center">
  <a href="https://contentcreators.vercel.app" target="_blank">
    <img src="https://contentcreators.vercel.app/img/banner.png" width="100%" alt="Banner" />
  </a>
</p>

# content.[creators] ⭐️

Es una plataforma web que reune a los mejores creadores de contenido en español.

## Ejecutando localmente

1. Clona el repositorio.
2. Instala las dependencias con `npm install`.
3. Ejecuta el proyecto con `npm run dev`.
4. En tu navegador, ingresa [localhost:3000](http://localhost:3000) en la barra de direcciones para ver la web.

## Deseo contribuir

Puedes contribuir agregando nuevas features, solucionando algún bug, mejorando algo en el código y agregando más creadores de contenido.
Si deseas hacer lo último, por el momento la única forma de agregarlos es haciéndolo directamente en el código. Una vez tengas definido que creadores de contenido agregarás, puedes seguir esta guía:

1. Crea un [fork de este repositorio](https://github.com/xavimondev/content-creators/fork).
2. Dirígete a [creators.ts](https://github.com/xavimondev/content-creators/blob/main/data/creators.ts) y agrega los datos solicitados siguiendo el tipado correspondiente.
3. Crea un commit y haz un push:
```bash
// Agregando tus cambios al stage y haciendo un commit
git commit -am "Nuevos creadores de contenido."
git push origin main
```
4. Finalmente, creas una pull request(PR) con tus cambios.