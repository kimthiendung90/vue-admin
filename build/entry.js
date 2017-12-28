const glob = require('glob')
const path = require('path')
const config = require('../config')

function entry(filePath, dirPath, isBuild) {
    let files = glob.sync(filePath);
    let entries = {},
        templates = {},
        entry, dirname, basename, pathname, extname, outFileName;

    for (let i = 0; i < files.length; i++) {
        entry = files[i];

        dirname = path.dirname(entry);
        extname = path.extname(entry);
        basename = path.basename(entry, extname);
        pathname = path.normalize(path.join(dirname, basename));
        dirPath = path.normalize(dirPath);

        outFileName = path.normalize(dirname)
        if (pathname.startsWith(dirPath)) {
            pathname = pathname.substring(dirPath.length)
        }

        if (outFileName.startsWith(dirPath)) {
            outFileName = outFileName.substring(dirPath.length)
        } else {
            outFileName = pathname;
        }
        // path window和liunx斜线相反 ...
        pathname = pathname.replace(/\\/g, '/');
        outFileName = outFileName.replace(/\\/g, '/');

        //
        dirPath = dirPath.replace(/\\/g, '/');

        entries[outFileName] = entry;
        templates[pathname] = {
            chunks: [
                'common-vue',
                'element-ui',
                'common-components',
                'common-lib',
                outFileName,
            ],
            filename: process.env.NODE_ENV === 'testing'
                    ? dirPath + pathname + '.html'
                    : outFileName + '.html',
            template: dirPath + pathname + '.html',
            inject: true,
            chunksSortMode: 'dependency',
            hash: false,
        }

        if (isBuild) {
            /*
             * 压缩这块，调用了html-minify，会导致压缩时候的很多html语法检查问题，
             * 如在html标签属性上使用{{...}}表达式，很多情况下并不需要在此配置压缩项，
             * 另外，UglifyJsPlugin会在压缩代码的时候连同html一起压缩。
             * 为避免压缩html，需要在html-loader上配置'html?-minimize'，见loaders中html-loader的配置。
             */

            templates[pathname]['minify'] = { //压缩HTML文件
                removeComments: true, //移除HTML中的注释
                collapseWhitespace: true, //删除空白符与换行符
                removeAttributeQuotes: true,

                // more options:
                // https://github.com/kangax/html-minifier#options-quick-reference
                // Teach html-minifier about Angular 2 syntax
                // customAttrSurround: [ [/#/, /(?:)/], [/\*!/, /(?:)/], [/\[?\(?/, /(?:)/] ,[/\@[^=]*/, /\s?/,/\{\{(#|\^)[^}]+\}\}/,/\{\{\/[^}]+\}\}/,/\{\% if[^}]+\%\}/,/\{\%[^}]+endif \%\}/]],
                // customAttrAssign: [ /\)?\]?=/ ],
            }

            //  手动配置 chunks
            templates[pathname].chunks = [].concat(['manifest','vendor']).concat(templates[pathname].chunks)
        }
    }

    return {
        entries: Object.assign(entries, {
            'common-vue': [
                'vue',
                'vue-router',
                'vuex',
                // 'vue-lazyload',
                path.resolve(__dirname, '../src/store/index.js'),    // store
                path.resolve(__dirname, '../src/common/filters.js'), // Vue过滤器
            ],
            'element-ui': [
                'element-ui',
                'element-ui/lib/theme-chalk/index.css',
                'axios', // 依赖 element-ui 的 loading 组件，直接打包在一个 chunk
                'mAxios' // 返回一个带自定义 拦截器的实例
            ],
            'common-components': [
                path.resolve(__dirname, '../src/components/index.js'),
                'nprogress',
                'nprogress/nprogress.css'
            ],
            'common-lib': [
                'cookie',  // cookie
                // 'layer',
                // path.resolve(__dirname, '../src/lib/animate.css'),
                'utils',    // 基础方法
                path.resolve(__dirname, '../src/sass/common.scss')
            ]
        }),
        templates,
        commonsChunks: ['common-vue', 'element-ui', 'common-components', 'common-lib']
    }
}

// 相对于 根目录
const filePath = './src/pages/**/*.js'
const dirPath = './src/pages/'

module.exports = function (isBuild) {
    return entry(filePath, dirPath, isBuild)
}
