const resolve = require("@rollup/plugin-node-resolve");
const commonjs = require("@rollup/plugin-commonjs");
const babel = require("@rollup/plugin-babel");
const terser = require("@rollup/plugin-terser");

let banner = `/*
* 
* common-utils-core v1.0.0
* 
* Copyright 2023, Caize Chen.
* All rights reserved.
*       
*/`;


let input = "src/index.js";

module.exports = [
    {
        input,
        plugins: [
            resolve(), //解决外部包依赖问题
            commonjs(),//解决cjs语法问题,比如使用import报错
            babel(),
            terser(),
        ],
        output: {
            file: 'dist/common-utils-core.min.js',
            format: "umd",//浏览器环境和node环境
            name: "common-utils-core",
            banner,
        }
    },
    {
        input,
        plugins: [
            resolve(),
            commonjs(),
            babel(),
        ],
        output: {
            file: 'lib/index.js',
            format: "cjs",//node环境
            banner,
        }
    },
    {
        input,
        plugins: [
            resolve(),
            commonjs(),
            babel(),
        ],
        output: {
            file: "es/index.js",
            format: "esm",//es6 module
            banner,
        }
    },
]