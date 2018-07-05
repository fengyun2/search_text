/*
 * @Author: baby
 * @Date:   2018-07-05 15:12:41
 * @Last Modified by:   baby
 * @Last Modified time: 2018-07-05 18:24:56
 */
// find . -type f -name "*.md" | xargs rm  删除超找出来的文件
const fs = require('fs')
const path = require('path')
const readline = require('readline')
const os = require('os')
const glob = require('glob')

const chineseReg = /(([\u4e00-\u9fa5\u201c\u201d、（），？。！，；：【】——]+)|(\"[^\x00-\xff、（），？。！，；：【】——]+\")|([\u4e00-\u9fa5\u201c\u201d、（），？。！，；：【】——]+[-][\u4e00-\u9fa5\u201c\u201d、（），？。！，；：【】——]+)|(粤B2-20160259  粤ICP备15089180号-1|粤公网安备 44030502000869号|COPYRIGHT©2014-2018 深圳友德医科技有限公司)|(\\\[^\x00-\xff、（），？。！，；：【】]+))/g;
const ignoreReg = /((|[^"':\s])\/\/.*$)|((|[^"':\s])\/\*(.|\s)*?\*\/)|(<!--.*-->)/g;
// const ignoreReg = /((<!--[^\x00-\xff\\w\\W\r\\na-zA-Z0-9]*?-->) |
// ((^|[^"':\s])\/\/.*$)|((^|[^"':\s])\/\*(.|\s)*?\*\/))/gmi; const chineseReg =
// /([\u4e00-\u9fa5\u201c\u201d、（），？。！，；：【】]+)/g; const engReg =
// /\"([\u4e00-\u9fa5\u201c\u201d、（），？。！，；：【】]+)\"/g; const chineseReg =
// /[^\x00-\xff]+/g; const chineseReg = /[\u4e00-\u9fa5]+/g;
const ignoreFiles = [
  'jquery',
  'jQuery',
  'swiper',
  'echarts',
  'My97DatePicker',
  'layer',
  'laydate',
  'flowplayer',
  'anychat',
  'zxx.drag'
];
function filterFileByExt(extname = '') {
  glob(`${__dirname}/test/**/*.${extname}`, function (err, files) {
    if (Array.isArray(files) && files.length) {
      files.forEach((file) => {
        if (!file) {
          return false;
        }
        let isExitIgnoreFiles = false;
        ignoreFiles.forEach(ignoreFile => {
          if (file.includes(ignoreFile)) {
            isExitIgnoreFiles = true;
          }
        })
        if (isExitIgnoreFiles) {
          return false;
        }
        const basename = path
          .basename(file)
          .replace(`${path.extname(file)}`, '')
        if (!basename) {
          return false;
        }

        const fWriteName = path.dirname(file) + '/' + basename + '.md';
        fs.writeFile(fWriteName, '', (err) => {
          console.error(err)
        })
        // console.log(fWriteName)
        const fRead = fs.createReadStream(file);
        const fWrite = fs.createWriteStream(fWriteName);
        const lineReader = readline.createInterface({
          input: fRead, // 建立 txt 文件的读取流
          output: fWrite,
          // terminal: true
        })
        let index = 1;
        lineReader.on('line', function (line) { // 按行对读取流内容进行操作
          /*                if(line) {
                  line = line.replace(/"([^"]*)"/g, '“${1}”')
                }*/
          if (line.match(ignoreReg)) {
            return false;
          }
          const matchText = line.match(chineseReg);
          if (matchText) {
            // console.log(path.basename(file), matchText.join('             '));
            fWrite.write('line' + index + ': ' + matchText.join('             ') + os.EOL);
          }
          index++;
        })
        lineReader.on('close', () => {})
      })
    }
  });

}

var extnameArr = ['html', 'js']
extnameArr.forEach(extname => {
  filterFileByExt(extname)
})
