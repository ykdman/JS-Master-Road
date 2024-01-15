const sets = new Set(['Hi', 'From', 'Seoul']);
// set 데이터는 일반 배열과 사용하는 메써드가 다름
sets.add('me!'); // 요소 추가

if (sets.has('Hi')) {
  //요소 확인
  sets.delete('Hi'); //요소 삭제
}

for (const entry of sets.entries()) {
  console.log(entry[0]); // From, Seoul, me!
}
