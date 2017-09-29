function getOptions(name) {
    return new Promise(function (resolve,reject) {
        xhr = new XMLHttpRequest();
        xhr.open('GET', '../../destination.json', true);
        xhr.send(null);

        xhr.addEventListener('load',function (event) {
            if (xhr.status >= 200 && xhr.status <= 299) {
                var response = xhr.responseText;
                var destinationsData = JSON.parse(response);
                var result = {
                    name: destinationsData
                };
            }
        });
   });
}