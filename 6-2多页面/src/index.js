console.log('index');
console.log('测试');

//http-proxy配置代理
let xml = new XMLHttpRequest();
xml.open('GET', '/api/user', true);
xml.onload = function(){
  console.log(xml.response)
}
xml.send();