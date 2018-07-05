/* 这里是测试的js文件 */
// 这里的消息不会被提取出来
const arr = [
  1,
  3,
  5,
  7,
  9,
  '中国味'
]
console.log('好好好！！！') // 你将看不到我，"呵呵呵"
alert('美滋滋的！！！————')

/**
 * 欢迎大家加入我们的大家庭，你也看不到我的
 *
 * @param {*} [params=[]]
 */
function HelloWord(params = []) {
  console.log('欢迎来到中国的大家庭：', ...params)
}