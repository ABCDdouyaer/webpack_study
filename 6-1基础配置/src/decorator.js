class Math {
  @log
  add(a, b) {
    return a + b;
  }
}

function log(target, name, descriptor) {
  var oldValue = descriptor.value;

  descriptor.value = function() {
    console.log(`装饰器修饰类的属性和方法，target为类的原型Math.prototype,name为修饰的属性名，descriptor为该属性的描述对象`);
    console.log('@babel/plugin-proposal-decorators用来解析装饰器的插件')
    return oldValue.apply(this, arguments);
  };

  return descriptor;
}



export default new Math();

