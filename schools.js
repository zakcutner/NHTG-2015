var jf = require('jsonfile');

var current = 0;
var number = 0;
var result = 0;
var response = [];

jf.readFile('schools.json', function(err, schools) {
    schools.forEach(function(school) {
        if(current == 0) {
            current = school[0];
        }
        else if(current != school[0]) {
            var final = (Math.round((result / number) * 10) / 10).toFixed(1)
            response.push([current, final]);
            current = school[0];
        }

        number++;
        result += school[1];
    });

    jf.writeFile('schools-new.json', response, function(err) {
        console.log(err)
    })
});
