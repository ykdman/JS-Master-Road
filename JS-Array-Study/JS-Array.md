# TIL 2024-01-14

## 🤿 [학습 키워드]

- \-JS

## ⭐ [학습 카테고리]

#### \* [Array.from()](#arrayfrom)

#### \* [push, unshift / pop, shift](#push-unshift--pop-shift)

#### \* [splice()](#splice)

#### \* [slice()](#slice)

#### \* [concat()](#concat)

#### \* [indexOf(), lastIndexOf()](#indexof-lastindexof)

#### \* [find(), findIndex()](#find-findindex)

#### \* [includes()](#includes)

#### \* [Array.forEach()](#arrayforeach)

#### \* [Array.map()](#arraymap)

#### \* [Array.sort()](#arraysort)

#### \* [Array.revere()](#arrayrevere)

#### \* [Array.filter()](#arrayfilter)

#### \* [Array.reduce()](#arrayreduce)

#### \* [split()](#split)

#### \* [join()](#join)

#### \* [전개 연산자를 이용한 배열 복사](#전개연산자를-이용한-배열-복사)

#### \* [map 함수로 객체배열 깊은 복사하는 방법](#map-함수로-객체배열-깊은-복사-하는-방법)

## 📕 [참고]

- \* [MDN : Array.prototype.forEach()](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)
- \* [MDN : Array.prototype.sort()](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)
- \- [MDN : Array.prototype.reduce()](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce)

---

### \* Array.from()

- \- 새로운 배열 객체를 생성 및 할당할수 있는 명령어

### \* push, unshift / pop, shift

- push() : 배열의 끝에 요소 추가
- unshift() : 배열의 처음에 요소추가 (모든 요소를 오른쪽으로 이동시키는 개념)
- pop() : 배열의 끝 요소를 삭제
- shift() : 배열의 첫 번째 요소 삭제 (모든 요소를 왼쪽으로 이동시키는 개념)

### \* splice()

- splice(startIndex, removeRange)
- splice(startIndex, removeRange, ...inputItems)

### \* slice()

- 배열을 복사하고 싶을 때 (깊은 복사) : Array.slice() 만 하면 메모리주소를 참조하는 것이 아닌 값만 복사된값을 얻을 수 있다.

- 배열의 범위를 지정하고 싶을 때 : Array.slice(startIndex, endIndex) start<= range < end

### \* concat()

- 새 배열을 얻는다 (새로운 메모리 생성)
- 다량의 배열을 새롭게 연결할 수 있다

### \* indexOf(), lastIndexOf()

- indexOf(findValue, fromIndex)

  - 주어진 배열에서 **'왼쪽'** 부터 findValue를 찾고 처음으로 찾게된 값의 index를 반환
  - fromIndex입력 시에는, 해당 Index부터 검색을 수행

- lastIndexOf(findValue, fromIndex)

  - 주어진 배열에서 **'오른쪽'** 부터 findValue를 찾고 처음으로 찾게된 값의 index를 반환
  - fromIndex입력 시에는, 해당 Index 부터 검색을 수행

### \* find(), findIndex()

- find() 는 복사를 생성하지 않는다. (기존 메모리를 같이 참조, 원본에 영향을 준다)
- find(callBackFn(element, index, array))

  - eleemnt : 현재 실행되고 있는 요소
  - index : 현재 실행되고 있는 index
  - array : find 가 호출된 배열 객체

- find는 callbackFn 에 일치하는 첫번째 요소를 반환 하며 해당 반환 값은 참조일 경우 얕은복사로 반환 되므로 원본 데이터에 영향을 주게된다.

- findIndex(callback(element, index, array))

  - findIndex 와 find 는 사용법이 같으나 findIndex는 callback 을 만족하는 요소의 index를 반환한다

### \* includes()

- 배열에 요소가 포함되어있느지 확인 가능
- Boolean 을 반환

### \* Array.forEach()

> Array 인스턴스의 forEach() 메서드는 각 배열 요소에 대해 제공된 함수(callback)를 한 번씩 실행합니다.

- forEach(callback(element, index, array), thisArg)

  - element : 현재 수행중인 요소
  - index : 현재 수행중인 요소의 index
  - array : forEach를 호출한 배열
  - thisArg : this 값으로 사용할 값

### \* Array.map()

> map() 메서드는 배열 내의 모든 요소 각각에 대하여 주어진 함수(callback)를 호출한 결과를 모아 **새로운 배열**을 반환합니다.

- 새로운 배열을 반환
- 기존배열에 map() 호출하여 변환 된 새 배열을 다른 변수에 할당하여 아예 새로운 배열을 만들어 낸다

- map(callback(element, index, array), thisArg)

### \* Array.sort()

> sort() 메서드는 배열의 요소를 적절한 위치에 정렬한 후 그 배열을 반환합니다. 정렬은 stable sort가 아닐 수 있습니다. 기본 정렬 순서는 문자열의 유니코드 코드 포인트를 따릅니다.

- sort([comparefunction])
- compareFunction 없이 일반적으로 호출할 경우, 요소를 문자열로 변환하고 유니 코드 코드 포인트 순서로 문자열을 비교하여 정렬된다. (정렬 순서를 보장하지 않음)

> compareFunction(a, b)이 0보다 작은 경우 a를 b보다 낮은 색인으로 정렬합니다. 즉, a가 먼저옵니다.

> compareFunction(a, b)이 0을 반환하면 a와 b를 서로에 대해 변경하지 않고 모든 다른 요소에 대해 정렬합니다. 참고 : ECMAscript 표준은 이러한 동작을 보장하지 않으므로 모든 브라우저(예 : Mozilla 버전은 적어도 2003 년 이후 버전 임)가 이를 존중하지는 않습니다.

> compareFunction(a, b)이 0보다 큰 경우, b를 a보다 낮은 인덱스로 소트합니다.

> compareFunction(a, b)은 요소 a와 b의 특정 쌍이 두 개의 인수로 주어질 때 항상 동일한 값을 반환해야합니다. 일치하지 않는 결과가 반환되면 정렬 순서는 정의되지 않습니다.

### \* Array.reverse()

- 호출한 배열을 반전 시킨다

### \* Array.filter()

- 새로운 배열을 반환
- filter(callback(element, index, array))
- callback 의 return이 참인 값들만 반환하여 새로운 배열을 만든다.

### \* Array.reduce()

> reduce() 메서드는 배열의 각 요소에 대해 주어진 리듀서 (reducer) 함수를 실행하고, 하나의 결과값을 반환합니다.

- reduce(callback(prevValue, currentValue, currentIndex, Array), InitialValue)

  - prevValue : 이전 값
  - currentValue : 현재 수행 값
  - currentIndex : 현재 수행 index
  - Array : reduce를 호출한 array
  - InitialValue : 초깃값 (첫 수행에서 prevValue 가 된다.)

- 사용 예시

  ```js
  const num = [1, 2, 3];
  const sum = num.reduce((prevValue, currentValue, curIndex, num)=> {
    return prevValue currentValue;
  }, 0);
  // 0 부터 시작하여 num 배열의 모든 요소를 더한다.
  // 더이상 반복할수 없을 때, 최종 return 값을 반환한다.

  // 축약
  const sum = num.reduce((prev, current) => prev + current, 0);
  ```

### \* map 과 reduce 메소드 체인

```js
const num = [{ price: 10.99 }, { price: 5.99 }, { price: 29.99 }];
const sum = num
  .map((obj) => obj.price)
  .reduce((prevVal, curVal) => prevVal + curVal, 0);

// map으로 반환된 새 배열을 reduce 체이닝을 통해 하나의 값으로 만든다.
```

### \* split()

- 구분자 인수를 기준으로 대상을 분해 할수 있다.

### \* join()

- 연결자를 추가하여 array.join('/')의 형식으로 배열 내부의 요소들을 연결자로 나누어 한 String으로 만든다.

### \* 전개연산자를 이용한 배열 복사

> 객체 배열을 전개연산자를 통해 새로운 변수에 할당 할 경우
> 새로운 변수는 기존 배열변수 내부 객체 요소들의 주소를 그대로 참조하므로
> (배열 자체에 대한 주소를 참조하지는 않지만)
> 추후 원본 배열내의 객체의 값을 변경하면 새로운 변수의 내부 객체의 값도 변경 된다.

```js
const persons = [
  { name: 'peter', age: 12 },
  { name: 'anderson', age: 25 },
];

// 복사
const newPesrons = [...persons];

// 기존 배열의 내부 요소 값 변경
persons[0].age = 25;

console.log(persons[0].age); // 25
console.log(newPesrons[0].age); // 25

//* 내부 객체 의 값들은 값만 복사한것이 아닌 해당 객체에 대한 메모리주소를 그대로 참조하여 복사하였기 때문에, 원본 배열의 내부 객체 값 변경에 영향을 받는다.*/
```

### \* map 함수로 객체배열 깊은 복사 하는 방법

```js
const persons = [
  { name: 'peter1', age: 24 },
  { name: 'peter2', age: 12 },
];

const newPersons = persons.map((person) => {
  return { name: person.name, age: person.age };
});

persons[0].age = 13;

console.log(persons[0].age); // 13
console.log(newPersons[0].age); // 24
```

> map으로 지정된 객체 배열의 모든 요소를 분해하여 새로운 객체배열을 만들면, 해당 값들은 기존 메모리를 참조하는 것이 아닌, 새로운 메모리주소를 할당하여, 완전히 다른 객체배열을 생성할 수 있다.
