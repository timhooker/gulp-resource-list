app.getData = function(url, callback) {
  var XHR = new XMLHttpRequest();
  var urlEncodedDataPairs = [];
  var urlEncodedData = "";
  var name;
  var self = this;

  // We define what will happen in case of error
  XHR.addEventListener('error', function (event) {
    console.log(event);
    console.log('Oops! Something goes wrong.');
  });

  // We setup our request
  XHR.open('GET', url);

  XHR.onreadystatechange = function() {
    if (XHR.readyState === 4) {
      callback(XHR.response);
    }
  };

  // We add the required HTTP header to handle a form data POST request
  XHR.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

  // And finally, We send our data.
  XHR.send(urlEncodedData);
};
