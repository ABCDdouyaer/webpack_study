require('./index.scss');
require('@babel/polyfill');
import math from './decorator.js';
// import $ from 'jquery';
// import $ from 'expose-loader?$!jquery';

$('h5.jq-p').html('loader分为pre前置loader，post后置loader以及expose-loader内联loader，内联loader可以将接口暴露到window上').css({
  'background': 'red'
})
console.log(window.$);

console.log(math.add(2, 4));


let string = (str)=>{ return str }
window.onload = function(){
  document.getElementById('app').innerHTML = string('hello webpack!！');
}


class Person{
  name = '要用class需要安装@babel/plugin-proposal-class-properties这个插件'
  getName(){
    console.log(this.name)
  }
}

let person1 = new Person();
person1.getName();

import pic from './images/1.jpg';

let img = new Image();
img.src = pic;
$('.img2').append(img);








function* getNumber(){
  yield '1.@babel/plugin-transform-runtime可以将公共方法提取';
  yield '2.@babel/runtime必须要的';
  yield 3;
  return 4
}
let result = getNumber();
console.log(result.next());
console.log(result.next());
console.log(result.next());
console.log(result.next());


console.log('wangwei'.includes('属于接口必须用polyfill垫片'));

$.ajax({
  url:'/api/user',
  type: 'GET',
  dataType: 'json',
  success:function(res){
      console.log(res)
  },
  error:function(err){
    console.log(err)
  }

})