# Сборка Webpack 4

## Перед стартом проекта необходимо

* Убедиться, что установленны node.js и npm. Для этого достаточно написать в терминале: 
``` js
node -v
```

* Если вы видите весрсию, например v.10.10.0 тогда все ОК !

``` js
npm -v
```

Подключение библиотек при небходимости(прописывать во входной скрипт)
-
* подключение jQuery
``` js 
import $ from 'jquery'
```

* подключение Vue
``` js 
import Vue from 'vue'
```

Если нужны дополнительные html страницы
-
* создаем html старницу в папке src и прописываем следующие строки в entry файла webpack.config.js
``` js
etryname: [                                 | entryname - имя entrypoint(например about, с таким именем скомпилятся скрипты и css)  
        './src/js/filename.js',             | filename - имя входного js для данного entrypoint
        './src/styles/filename.scss'        | filename - имя входного css для данного entrypoint (название скомпиленного файла будет filename.min.css)
      ]
```
* Далее прописываем следующие строки в plugins файла webpack.config.js
``` js
new HtmlWebpackPlugin({
        template: './src/filename.html',    | filename - имя исходного файла
        filename: 'filename.html',          | filename - имя компилируемого файала
        chunks: [
                  'entrypointname'          | entrypointname - название энтрипоинта
                ]
      })
```  
Скомпиленые скрипты для этой страницы подключать вручную 

Основыные команды для работы
-

 * Сборка проекта с babel
 ``` js
 npm run build
 ```
 * Сборка проекта без babel
 ``` js
 npm run light
 ```
 * Запуск режима разработки
 ``` js
 npm run dev
 ```
   * Удаление папки build принудительно
  ``` js
  npm run clean
  ```
 
 Исходники
 -
  
```
src                            Исходная папка
  components/                  Папка компонентов vue
    app.vue                    Копонент vue
  fonts/                       Папка шрифтов
  images/                      Папка картинок
  js/                          Папка для скриптов
    main.js                    Точка входа
  styles/                      Папка для стилей
    global/                    Папка
      _mixins                  Папка с mixins
        _centered.scss         Файл
        _font_face.scss        Файл
      _fonts.scss              Файл
      _media.scss              Файл
      _vars.scss               Файл
    sections/                  Папка
      main.scss                Файл
    style.scss                 Главный файл стилей(может быть sass)
  index.html                   Index
.babel.rc                      Настройки для babel
.editorconfig                  Настройки форматирования проекта(кодировка, отступы и т.д.)
.gitignore                     Файл для git
package.json                   Файл зависимостей
README.md                      Файл с описанием проекта
postcss.config.js              Настройки для postcss
webpack.config.js              Настройки сборщика
```  

Зависимости проекта
-
```
"devDependencies": {
        "babel-core": "^6.26.3",
        "babel-loader": "^7.1.5",
        "babel-preset-env": "^1.7.0",
        "babel-preset-stage-0": "^6.24.1",
        "bootstrap": "^4.3.1",
        "clean-webpack-plugin": "^2.0.1",
        "copy-webpack-plugin": "^5.0.2",
        "css-loader": "^2.1.1",
        "cssnano": "^4.1.10",
        "file-loader": "^3.0.1",
        "html-cli": "^1.0.0",
        "html-webpack-plugin": "^3.2.0",
        "jquery": "^3.3.1",
        "mini-css-extract-plugin": "^0.5.0",
        "node-sass": "^4.11.0",
        "path": "^0.12.7",
        "postcss-cssnext": "^3.1.0",
        "postcss-loader": "^3.0.0",
        "progress-bar-webpack-plugin": "^1.12.1",
        "rimraf": "^2.6.3",
        "sass-loader": "^7.1.0",
        "style-loader": "^0.23.1",
        "stylus": "^0.54.5",
        "stylus-loader": "^3.0.2",
        "url-loader": "^1.1.2",
        "vue": "^2.6.10",
        "vue-loader": "^15.7.0",
        "vue-resource": "^1.5.1",
        "vue-router": "^3.0.2",
        "vue-template-compiler": "^2.6.10",
        "webpack": "^4.29.6",
        "webpack-cli": "^3.3.0",
        "webpack-dev-server": "^3.2.1"
    }
```

<h2 align="center">Пользуйтесь на здоровье</h2>
