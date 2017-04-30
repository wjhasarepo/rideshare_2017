var googleMapsClient = require('@google/maps').createClient({
   key: 'AIzaSyBpZitbXaqqqM18mOkgxJKi-jXHze0mj1k'
});

googleMapsClient.directions({
    origin: '7100 Terminal Dr, Oklahoma City, OK',
    destination: '660 Parrington Oval, Norman, OK'
}, function(err, res) {
    var t1 = 0, t2 = 0;
    if (!err) {
	console.log(res.json.routes[0].legs);
        t1 = res.json.routes[0].legs[0].duration.value;
	googleMapsClient.directions({
   	    origin: '7100 Terminal Dr, Oklahoma City, OK',
    	    destination: '660 Parrington Oval, Norman, OK',
            waypoints: '4415 Highline Blvd, Oklahoma City, OK'
        }, function(err, res) {
            if (!err) {
                console.log(res.json.routes[0].legs);
		for (var i = 0; i < res.json.routes[0].legs.length; i++)
		    t2 += res.json.routes[0].legs[i].duration.value;
	    }
	    console.log(t2 - t1);
        });
    }
});
