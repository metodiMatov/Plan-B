function getOptions() {
    return new Promise(function (resolve,reject) {
        xhr = new XMLHttpRequest();
   
        xhr.addEventListener('load',function (event) {
            if (xhr.status >= 200 && xhr.status <= 299) {
                var response = xhr.responseText;
                var destinationsData = JSON.parse(response);
                
                resolve(destinationsData.destinations);
            }else{
                reject({ status: xhr.statusText, error: xhr.status});
            }
        });
        xhr.open('GET', 'http://localhost/git/plan-B/destination.json', true);
        xhr.send(null);

   });
}