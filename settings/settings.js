function openCity(evt, cityName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
  }
  
  document.getElementById("defaultOpen").click();

const Config = require('../tools/config.js');
const config = new Config({ configName: 'user-preferences' });
if(config.get('darkMode') == true) {
  document.getElementById("darkmode").checked = true;
}

function toggledark() {
  console.log(config.get('darkMode'));
  if(config.get('darkMode') == true) config.set('darkMode', false);
  else if(config.get('darkMode') == false) config.set('darkMode', true);
}