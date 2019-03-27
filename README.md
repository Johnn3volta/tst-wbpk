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
src                     Исходная папка
  components/           Папка компонентов vue
    app.vue             Копонент vue
  fonts/                Папка шрифтов
  images/               Папка картинок
  js/                   Папка для скриптов
    main.js             Точка входа
  styles/               Папка для стилей
    style.scss          Главный файл стилей(может быть sass)
  index.html            Index
.babel.rc               Настройки для babel
.editorconfig           Настройки форматирования проекта(кодировка, отступы и т.д.)
postcss.config.js       Настройки для postcss
webpack.config.js       Настройки сборщика
```  


<h2 align="center">Пользуйтесь на здоровье</h2>
