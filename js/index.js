/*
 * We are using jQuery functions as they are pretty easy to use.
 * You can do all of this stuff using vanilla javascript though
 */

// $(...) will run the function you give it when the page is loaded & ready

var num_humans, num_sheep;

loadpage("Auckland");

function updateTextInput(val) {
  document.getElementById('textInput').value=val; 
}

function loadpage(region) {
  fetch("/humans/" + region).then((data) => data.json()).then((data) => { 
    num_humans = data;
    document.getElementById('num_humans').innerHTML = format_num(data); 
  }).then(() => {
    fetch("/sheep/" + region).then((data) => data.json()).then((data) => { 
      num_sheep = data;
      document.getElementById('num_sheep').innerHTML = format_num(data); 
    }).then(() => {
      var ratio = num_sheep / num_humans;
      document.getElementById('ratio').innerHTML = ratio.toFixed(1); 
      document.getElementById('region').innerHTML = region;

      while(ratio >= 1) {
        var temp, item, a;
        temp = document.getElementsByTagName("template")[0];
        item = temp.content.querySelector("div");
        a = document.importNode(item, true);
        a.style.width = '100px';
        document.getElementById('sheep').appendChild(a);
        ratio--;
      }
      var temp, item, a;
      temp = document.getElementsByTagName("template")[0];
      item = temp.content.querySelector("div");
      a = document.importNode(item, true);
      a.style.width = (100 * ratio.toFixed(1)).toString() + 'px';
      document.getElementById('sheep').appendChild(a);
    });
  });
}



const format_num = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

$(function() {

  var imageCountPeople = 1;
  var imageCountSheep = 6;
  //varimage = 
  
  var paragraph = document.getElementById('images');
  for (var i = 0; i < 6; i++) {
      paragraph.innerHTML += "<img src='person.svg'>";
  }
  // console.log will log a message or object to the browser developer console
  
  
  document.getElementById('injected').innerHTML = "I INJECTED THIS";
  
  console.log("page loaded...");
});


