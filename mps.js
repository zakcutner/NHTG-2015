var bot = require('nodemw');

var reg = new RegExp("/^\|\\[/");

var client = new bot({
    server: 'en.wikipedia.org',
    path: '/w',
});

var valid = function(constituency) {
    var lines = constituency.split(/\n/);
    for(i in lines) {
        if(lines[i].indexOf('|[[') > -1) {
            return true;
        }
    }
    return false;
}

client.getArticle('List of MPs elected in the United Kingdom general election, 1945', function(err, result) {
    if(err) throw err;
    else {
        var data = result.split(/\|}/)[2];
        var constituencies = data.split(/\|-/);
        constituencies.splice(0, 7);

        constituencies.forEach(function(constituency) {
            if(valid(constituency)) {
                var elements = constituency.split(/\n/);
                console.log(constituency);
                var name = elements[1].split('|')[2].split(']]')[0];
                var party = elements[3];
                if(name && party) console.log(name + ': ' + party);
            }
        });
    }
});
