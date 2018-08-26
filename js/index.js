var regionnames = ["Chatham Islands",
  "West Coast",
  "Marlborough",
  "Gisborne",
  "Nelson",
  "Tasman",
  "Southland",
  "Taranaki",
  "Hawkes Bay",
  "Northland",
  "Otago",
  "Manawatu-Wanganui",
  "Bay of Plenty",
  "Waikato",
  "Wellington",
  "Canterbury",
  "Auckland"
];

var ratios = [];


$(function() { 
  onload();
  setTimeout(function(){
    setmapcolors(); 
  }, 1000);
  
})

function loadpage(region) {
  var num_humans, num_sheep;
  fetch("/humans/" + region).then((data) => data.json()).then((data) => { 
    num_humans = data;
    document.getElementById('num_humans').innerHTML = format_num(data); 
  }).then(() => {
    fetch("/sheep/" + region).then((data) => data.json()).then((data) => { 
      num_sheep = data;
      document.getElementById('num_sheep').innerHTML = format_num(data); 
    }).then(() => {
      var ratio = num_sheep / num_humans;
      ratios[region] = ratio.toFixed(1);
      document.getElementById('ratio').innerHTML = ratio.toFixed(1); 
      document.getElementById('region').innerHTML = region;
      document.getElementById('sheep').innerHTML = "";

      var tempratio = ratio;
      while(tempratio >= 1) {
        var temp, item, a;
        temp = document.getElementsByTagName("template")[0];
        item = temp.content.querySelector("div");
        a = document.importNode(item, true);
        a.style.width = '100px';
        document.getElementById('sheep').appendChild(a);
        tempratio--;
      }
      var temp, item, a;
      temp = document.getElementsByTagName("template")[0];
      item = temp.content.querySelector("div");
      a = document.importNode(item, true);
      a.style.width = (100 * tempratio.toFixed(1)).toString() + 'px';
      document.getElementById('sheep').appendChild(a);
    });
  });
}

function onload() {
  for(var i = 0; i < regionnames.length; i++) {
    loadpage(regionnames[i]);
  }
  loadpage("New Zealand");
}


function setmapcolors() {
  var maps = document.getElementsByTagName('path');

  for(var i = 0; i < maps.length; i++) {
    var region = maps[i].dataset.title;

    if(ratios[region] < 2) {
      maps[i].classList.add('ratio-1');
    }

    if(ratios[region] <= 5 && ratios[region] >= 2) {
      maps[i].classList.add('ratio-2');
    }

    if(ratios[region] <= 11 && ratios[region] > 5) {
      maps[i].classList.add('ratio-3');
    }

    if(ratios[region] <= 23 && ratios[region] > 11) {
      maps[i].classList.add('ratio-4');
    }

    if(ratios[region] <= 42 && ratios[region] > 23) {
      maps[i].classList.add('ratio-5');
    }

    if(ratios[region] > 42) {
      maps[i].classList.add('ratio-6');
    }
  }
}


const format_num = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

