// 封装继承函数1(新版本)
// function inheritPrototype (SubType, SuperType) {
//   SubType.prototype = Object.create(SuperType.prototype)
//   Object.defineProperty(SubType.prototype, "constructor", {
//     enumerable: false,
//     configurable: true,
//     writable: true,
//     value: SubType
//   })
// }

// 封装继承函数2(旧版本)
function createObject (o) {
  function Fn () { }
  Fn.prototype = o
  return new Fn()
}

function inheritPrototype (SubType, SuperType) {
  SubType.prototype = createObject(SuperType.prototype)
  Object.defineProperty(SubType.prototype, "constructor", {
    enumerable: false,
    configurable: true,
    writable: true,
    value: SubType
  })
}



function Person (name, age, friends) {
  this.name = name
  this.age = age
  this.friends = friends
}

Person.prototype.running = function () {
  console.log("running~")
}

Person.prototype.eating = function () {
  console.log("eating~")
}


function Student (name, age, friends, sno, score) {
  Person.call(this, name, age, friends)
  this.sno = sno
  this.score = score
}

inheritPrototype(Student, Person)

Student.prototype.studying = function () {
  console.log("studying~")
}

var stu = new Student("why", 18, ["kobe"], 111, 100)
console.log(stu)
stu.studying()
stu.running()
stu.eating()

console.log(stu.constructor.name)