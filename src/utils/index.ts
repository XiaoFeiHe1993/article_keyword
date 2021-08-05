/**
 * 过滤特殊字符
 * */
export const dealWords = (value: any): any => {
  const result:Array<string> = []
  if (value && value.length > 0) {
    for (let i = 0; i < value.length; i++) {
      if (['。', '，', ',', '.', '：', ':', '（', '(', '）', ')', '、', '“', '”', '—'].indexOf(value[i]) === -1 && value[i].length > 1) {
        result.push(value[i])
      }
    }
  }
  return result
}

/**
 * 统计数组中字符串数量
 * */
export const countWords = (value: any): any => {
  let result:any = []
  const obj:any = {}
  for (let i = 0; i < value.length; i++) {
    if (obj[value[i]]) {
      obj[value[i]] += 1
    } else {
      obj[value[i]] = 1
    }
  }
  result = Object.keys(obj).map(item => {
    return {
      name: item,
      value: obj[item]
    }
  })
  result = result.sort((a: any, b: any) => {
    return b.value - a.value
  })
  return result
}

/**
 * 统计字符串中子字符串的数量
 * */
export const countStrNumber = (str: string, sub: string): number => {
  const s = str.replaceAll(sub, '')
  return (str.length - s.length) / sub.length
}
