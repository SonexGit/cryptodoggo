var settings = {
    "url": "https://api.coincap.io/v2/assets",
    "method": "GET",
    "timeout": 0,
  };
  
  $.ajax(settings).done(function (response) {
    console.log(response);
  });