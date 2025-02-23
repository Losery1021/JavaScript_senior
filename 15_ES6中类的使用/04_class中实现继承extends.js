class Person {
  constructor(name, age) {
    this.name = name
    this.age = age
  }

  running () {
    console.log(this.name + "running~")
  }

  eating () {
    console.log(this.name + "eating~")
  }

  personMethod () {
    console.log("处理逻辑1")
    console.log("处理逻辑2")
    console.log("处理逻辑3")
  }

  static staticMethod () {
    console.log('staticMethod')
  }
}

// Student称之为子类(派生类)
class Student extends Person {
  // JS引擎在解析子类的时候就有要求，如果我们有实现继承
  // 那么子类的构造方法中，在使用this或者返回默认对象之前，必须先通过super()调用父类的构造方法
  constructor(name, age, sno) {
    super(name, age)
    this.sno = sno
  }

  studying () {
    console.log(this.name + 'studying~')
  }

  // 子类对父类方法的重写
  running () {
    console.log("student" + this.name + "running~")
  }

  // 重写personMethod方法
  personMethod () {
    // 复用父类中的处理逻辑
    super.personMethod()

    console.log("处理逻辑4")
    console.log("处理逻辑5")
    console.log("处理逻辑6")
  }

  // 重写静态方法
  static staticMethod () {
    super.staticMethod()
    console.log('studentStaticMethod')
  }
}

var stu = new Student("why", 18, 111)
console.log(stu)

// console.log(Object.getOwnPropertyDescriptors(stu.__proto__))
// console.log(Object.getOwnPropertyDescriptors(stu.__proto__.__proto__))

stu.running()
stu.eating()

stu.personMethod()

Student.staticMethod()