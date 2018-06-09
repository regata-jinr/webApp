function Show(id) {
  document.getElementById(id).className = 'show';
}

function Hide(id) {
  document.getElementById(id).className = 'hide';
}

function setFont(arr, fs) {
  if (arr[0]==null) return;
  [].forEach.call(arr, function(el) {
    el.style.fontSize = fs + 'px';
  });
}

function FontByScreen(width) {
  var headNav = document.querySelectorAll('ul.TopNavBar li a');
  var fs = width / 80;
  setFont(headNav, fs);
  var subNav = document.querySelectorAll('ul li ul li a');
  fs = width / 100;
  setFont(subNav, fs);
  var header = [];
  header[0] = document.getElementById("logoText");
  fs = width / 40;
  setFont(header, fs);
}
go();
window.addEventListener('resize', go);

function go() {
FontByScreen(document.documentElement.clientWidth);
}
