const list = document.querySelector('ul');

list.addEventListener('click', function (event) {
  if (
    event.target.tagName.toUpperCase() === 'H2' ||
    event.target.tagName.toUpperCase() === 'LI' ||
    event.target.tagName.toUpperCase() === 'P'
  ) {
    event.target.closest('li').classList.toggle('highlight');
    event.target.closest('li').classList.toggle('checked');
  }
  console.log(this); // 무조건 ul 을 참조한다.
  console.log(event.target); // 사용자 이벤트 타겟을 참조.
});
