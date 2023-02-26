
// 配合timeEnd()成對出現。 打印出代碼執行的時間
console.time('共耗費了')

// 導入模組
var fs = require('fs')
var path = require('path')
// 可改寫檔名及編碼
var x = 'ok2.xml'
var ru = 'utf8'
var wu = 'utf8'
// 完成後的副檔名
var afterName = '.txt'

// 用絕對路徑讀入檔案，使用node的readFileSync同步函數
var a = fs.readFileSync(x, ru)
// 導入陣列
var b = a.replace(/<pb[^>]+>[\r|\n]/g, '').replace(/sarticle>/g, 'qroup>').replace(/article>/g, 'sarticle>').split('\n')

// 進行你要的操作
// 預設變量，才能累加頁碼
var f0 = 1
var f1 = 1
for (var i = 0; i < b.length; i++) {
    // 加上批次頁碼
    // 預設變量，才能累加頁碼
    var s0 = 0
    // var s1 = 0
    var s2 = 1
    for (var i = 0; i < b.length; i++) {
        // 100字切行
        b[i] = b[i].replace(/(.{100})/g, '$1\n')
            // 接合標記內的斷行
            .replace(/(<[^>]*)[\n|\r]([^>]*>)/g, '$1$2\n')
            
        // 加上頁碼
        if (/<qroup/.test(b[i]) || i == 1 || s2 > 1023) {
            s2 = 1
            // s1++
            b[i] = '<pb n="' + s2 + '"/>\n' + b[i]
            s0 = i + 30
        }
        if (i == s0) {
            s2++
            b[i] = '<pb n="' + s2 + '"/>\n' + b[i]
            s0 = i + 30
        }
    }
}

// 用絕對路徑寫入檔案
fs.writeFileSync(x + afterName, b.join('\n'), wu)
// 完成時返回通知
console.log('only is OK: ' + x + afterName)

// 'test'名字要和time()中的名字保持一致
console.timeEnd('共耗費了')