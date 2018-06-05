(function () {
    'use strict';

    //函数声明，作用域提升到所有变量前
    // function Animal() {
    //
    // }

    var Animal = function(name, age){
        this.name = name;
        this.age = age;
    }

    Animal.prototype.say = function () {
        console.log(this.name + ' ' + this.age);
    }
    var cat = new Animal('小猫', 3);
    cat.say()

    //寄生组合继承
    // call()  apply()
    //调用一个对象的方法，用另一个对象替换

    Animal.prototype.say.call(cat);
    var param = {
        name: '小猫2',
        age: 4
    };
    
})