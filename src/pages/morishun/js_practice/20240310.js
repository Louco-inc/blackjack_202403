// 問１ ○
const c = {...a, ...b}
console.log(c)

// 問２　×
// 模範解答
const arry = ['aa','bb','cc','dd','ee','ff','gg'];
const newArry = arry.slice(3,-1);

// 問３ ×
['a','b'].map((item) => console.log(item))
// 模範解答
['a','b'].forEach((item) => console.log(item))


// 問４ ○
['a', 'b'].forEach((elem,index) => console.log(elem + index))

// 問５ ×
const numbers = [1,2]
console.log(typeof numbers === Array)
// 模範解答
Array.isArray(numbers)

// 問６ ×
// １→実行されない、２→実行される
// 模範解答
//1は実行される
//2は実行されない(ReferenceError)

//typeofは変数が存在しない場合エラーは投げない。

// 問７ ×
// １→実行されない、２→実行される
// 模範解答
//1は宣言はされているが値が割り当てられていない場合です。
//実行される

//2は宣言されていない場合です。
//実行されない

//void 0 は確実にundefinedを返すことが保証されています

// 問８ ×
const obj = {
  key: 'aa',
  key2: 'bb'
}
for(item in obj){
  console.log(item[key], item[vale])
}
// 模範解答
for (key in obj){
if(obj.hasOwnProperty(key)){
  console.log(key, obj[key])
  }
}

// 問９ ○
['a', 'b', 'c'].reduce((str, item) => str += item, "")
// 別解
const array = ['a', 'b', 'c'];
array.join("");

// 問１０ ×
// y
// 模範解答
// x
// deleteは暗黙に定義された場合は変数は削除できるが、
//var(let) や function文中の変数はnon-configurableであり削除できない

//globaleオブジェクト
x = 43;
delete x 
//true //暗黙に定義されたglobale変数なので

//var宣言
delete y
//false //削除できない

