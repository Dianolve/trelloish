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

function toggledark() {
  const Config = require('../tools/config.js');
  const config = new Config({
    configName: 'user-preferences',
    defaults: {
      }
  });
  console.log(config.get("darkMode"));
  if(config.get("darkMode") === 'true' || config.get("darkMode")) {
  }
  else {
    console.log('setdarkk');
    config.set('windowBounds', true);
  }
}