class Depend {
  constructor() {
    this.reactiveFns = []
  }

  addDepend (reactiveFn) {
    this.reactiveFns.push(reactiveFn)
  }

  notify () {
    this.reactiveFns.forEach(fn => {
      fn()
    })
  }
}

// 封装一个响应式的函数
const depend = new Depend()
function watchFn (fn) {
  depend.addDepend(fn)
}

// 封装一个获取depend的函数
const targetMap = new WeakMap()
function getDepend (target, key) {
  // 根据target对象获取map的过程
  let map = targetMap.get(target)
  if (!map) {
    map = new Map()
    targetMap.set(target, map)
  }

  // 根据key获取depend对象
  let depend = map.get(key)
  if (!depend) {
    depend = new Depend()
    map.set(key, depend)
  }
  return depend
}

// 对象的响应式
const obj = {
  // 每个属性对应一个depend对象
  name: "why",
  age: 18,
}

// 监听对象的属性变化：Proxy(Vue3)/Object.defineProperty(Vue2)
const objProxy = new Proxy(obj, {
  get: function (target, key, recevier) {
    return Reflect.get(target, key, recevier)
  },
  set: function (target, key, newValue, receiver) {
    // 自动监听对象变化
    Reflect.set(target, key, newValue, receiver)
    // depend.notify()
    const depend = getDepend(target, key)
    console.log(depend.reactiveFns)
    depend.notify()
  }
})

watchFn(function () {
  const newName = objProxy.name
  console.log("你好啊，李银河")
  console.log("Hello World")
  console.log(objProxy.name)
})

watchFn(function () {
  console.log(objProxy.name, "demo function ------")
})



watchFn(function () {
  console.log(objProxy.age, "age 发生变化时需要执行的函数1")
})

watchFn(function () {
  console.log(objProxy.age, "age 发生变化时需要执行的函数2")
})

objProxy.name = "kobe"
objProxy.name = "james"
objProxy.name = "hurry"

objProxy.age = 100


// const info = {
//   name: "hzq",
//   address: "上海"
// }

// watchFn(function () {
//   console.log(info.address, "监听address变化++++++1")
// })

// watchFn(function () {
//   console.log(info.address, "监听address变化++++++2")
// })

// // obj对象
// // name: depend
// // age: depend
// const objMap = new Map()
// objMap.set("name", "nameDepend")
// objMap.set("age", "ageDepend")

// // info对象
// // name: depend
// // address: depend
// const infoMap = new Map()
// infoMap.set("address", "addressDepend")

// const targetMap = new WeakMap()
// targetMap.set(obj, objMap)
// targetMap.set(info, infoMap)

// // obj.name发生变化
// const depend = targetMap.get(obj).get("name")
// depend.notify()