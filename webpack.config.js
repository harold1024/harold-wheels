const HtmlWebpackPlugin = require('html-webpack-plugin') // 自动生成 html
const OpenBrowserPlugin = require('open-browser-webpack-plugin') // 自动打开浏览器
// const CleanWebpackPlugin = require('clean-webpack-plugin') //自动删除旧文件dist包
const path = require('path')
module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.min.js',
        libraryTarget: 'umd',
        library: {
            root: 'harold',
            amd: 'harold',
            commonjs: 'harold'
        }
    },
    module: {
        rules: [
            {
                test: /\.css$/,  // 用正则去匹配要用该 loader 转换的 CSS 文件
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(sass|scss)$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
        ]
    },
    devServer: {
        contentBase: './dist',
    },
    plugins: [
        new HtmlWebpackPlugin({
            // 打包输出HTML
            title: 'New HTML',  //打包后生成 html 的 title
            minify: {
                // 压缩 HTML 文件
                removeComments: true, // 移除 HTML 中的注释
                collapseWhitespace: true, // 删除空白符与换行符
                minifyCSS: true // 压缩内联 css
            },
            filename: 'index.html', // 生成后的文件名
            template: 'index.ejs' // 根据此模版生成 HTML 文件
        }),
        // 默认情况下，此插件将删除 webpack output.path目录中的所有文件。
        // new CleanWebpackPlugin(),
        new OpenBrowserPlugin({ url: 'http://localhost:8099' })
    ],
    //编译前文件调试
    devtool: "source-map"
}