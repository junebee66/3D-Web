let changeBtn = document.getElementById('changeBtn');
let iframe1 = document.getElementById("iframe1");
let element = iframe1.contentWindow.document.getElementsByTagName("H1")[0]

changeBtn.onclick = function(){

  element.style.display = "none";

}

