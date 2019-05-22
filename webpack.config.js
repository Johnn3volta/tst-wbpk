const path                 = require('path'),
      ProgressBarPlugin    = require('progress-bar-webpack-plugin'),
      CopyWebpackPlugin    = require('copy-webpack-plugin'),
      HtmlWebpackPlugin    = require('html-webpack-plugin'),
      CleanWebpackPlugin   = require('clean-webpack-plugin'),
      VueLoaderPlugin      = require('vue-loader/lib/plugin'),
      MiniCssExtractPlugin = require('mini-css-extract-plugin');


module.exports = (env) => {
    /* присваиваем зависимость dev в зависимости от запущенной клманды. Проставляется в package.json scripts --env  */
    let devMode = env === 'dev' ? env : false;

    let conf = {
        // Точки входа
        entry: {
            // Имя точки входа
            main: [
                // файл js для данной точки входа
                './src/js/main.js',
                // файл scss для данной точки входа
                './src/styles/style.scss'
            ],
        },
        // Точка выхода для js
        output: {
            // Имя выходного js файла. [name] - подставляется имя тчоки входа
            filename: 'js/[name].js',
            // Путь куда компилируются файлы
            path: path.resolve(__dirname, 'build')
        },
        // Отвечает за sourceMaps
        devtool: devMode ? 'source-map' : false,
        // Настройки devServer
        devServer: {
            // При запуске открывает сразу в браузере
            open: true,
            // Показывает ошибки в окне браузера
            overlay: true
        },
        module: {
            // правила обработки файлов
            rules: [
                // отвечает за файлы vue
                {
                    test: /\.vue$/,
                    loader: 'vue-loader',
                    options: {
                        loaders: {
                            js: 'babel-loader'
                        }
                    }
                },
                /* Обработчике Pug */
                {
                    test:/\.pug$/,
                    use:["pug-loader"]
                },
                /* отвечает за файлы css,scss
                *  лоадеры подключаются с конца
                *  sass-loader    - обработка scss
                *  postcss-loader - делает обработку css в соответсвии с параметрами задаными в файле postcss.config.js
                *  sass-loader    - компилирует css
                *
                *  (?sourceMap делает подключает sourceMap в соответсвии со значением с devtool) */
                {
                    test: /\.(sc|c)ss$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        'css-loader?sourceMap',
                        'postcss-loader?sourceMap',
                        'sass-loader?sourceMap'
                    ],
                },
                // отвечает за файлы styl
                {
                    test: /\.styl$/,
                    loader: [
                        devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
                        'css-loader',
                        'postcss-loader',
                        'stylus-loader'],
                },
                // отвечает за файлы изображений.
                {
                    test: /\.(jpe?g|png|gif|svg)$/,
                    use: {
                        // подгружает файлы картинок которые прописаны в стилях
                        loader: 'url-loader',
                        options: {
                            // если размер файла меньше указаного лимита картинка из стилей подключается в base64
                            limit: 8000,
                            // меняет слешы на линуксовские
                            name(url) {
                                const destination = path.relative(path.resolve(__dirname, 'src'), url);

                                return destination.replace(/[\\\/]+/g, '/');
                            },
                            publicPath: '..'

                        }
                    }
                },
                // отвечает за файлы шрифтов
                {
                    test: /\.(woff|woff2|eot|ttf|otf)$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                // меняет слешы на линуксовские
                                name(url) {
                                    const destination = path.relative(path.resolve(__dirname, 'src'), url);

                                    return destination.replace(/[\\\/]+/g, '/');
                                },
                                publicPath: '..'
                            }
                        }
                    ]
                }
            ]
        },
        resolve: {
            alias: {
                vue: 'vue/dist/vue.common.js',
            },
            extensions: ['.vue', '.js', '.json']
        },

        plugins: [
            // Показывет в консоли прогресс компиляции
            new ProgressBarPlugin(),
            // Компиляция css
            new MiniCssExtractPlugin(
                {
                    filename: 'css/[name].min.css'
                }
            ),
            // Копирование файлов
            new CopyWebpackPlugin([
                {
                    from: './src/images',
                    to: 'images'
                },
            ]),
            new VueLoaderPlugin(),
            // Компиляция html
            new HtmlWebpackPlugin({
                // исходный файл
                template: './src/index.pug',
                // Название компилируемого файла
                filename: 'index.html',
                // Название точки входа для подтягивания css и js. С свйойством inject: false скрипты и стили подключаем вручну в исходном файле
                chunks: [
                    'main'
                ],
            }),
        ],
    };
    // Очистка папки buid перед компиляцией
    if (!devMode) {
        conf.plugins.push(new CleanWebpackPlugin())
    }
    // Компиляция с babel или без, в зависимости от дерективы --env
    if (env === 'babel') {
        conf.module.rules.push(
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            }
        )
    }
    return conf;
};





