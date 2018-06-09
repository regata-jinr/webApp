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

function createNaaTabContent() {
  Array.from(document.getElementsByClassName("activeManButton")).forEach(function(item) {
   item.className = "manButtons";
});
  document.getElementById('naaButton').className = "activeManButton";

  var wind = document.getElementsByClassName("demoWindow")[0];
  wind.innerHTML = '';

  var par = document.createElement("p");
  par.setAttribute("id", 'graphLegend');
  var text = document.createTextNode("Нейтронный активационный анализ (НАА) − ядерно-физический метод определения состава вещества, основанный на активации атомных ядер с помощью нейтронов и исследовании радиоактивного излучения, возникающего вследствие возбуждения атомных ядер.");
  par.appendChild(text);
  wind.appendChild(par);
  var imported = document.createElement("script");
  imported.src = "js/spectre.js";
  wind.appendChild(imported);
}

function createProcTabContent() {
  Array.from(document.getElementsByClassName("activeManButton")).forEach(function(item) {
   item.className = "manButtons";
});
  document.getElementById('procButton').className = "activeManButton";
  var wind = document.getElementsByClassName("demoWindow")[0];
  wind.innerHTML = '';
  var par = document.createElement("p");
  par.setAttribute("id", 'graphLegend');
  var text = document.createTextNode("Сектор НААиПИ оснащен современным оборудованием, позволяющим проводить подготовку образцов");
  par.appendChild(text);
  wind.appendChild(par);
  var imported = document.createElement("IMG");
  imported.id = "procImg";
  imported.src="imgs/samples.jpeg";
    wind.appendChild(imported);

}

function createCommTabContent() {
  Array.from(document.getElementsByClassName("activeManButton")).forEach(function(item) {
   item.className = "manButtons";
});
  document.getElementById('commButton').className = "activeManButton";
}
