var tessel = require('tessel');
var accel = require('accel-mma84').use(tessel.port['A']);
var axios = require('axios');

// Initialize the accelerometer.
accel.on('ready', function () {
    var num = 0;
// Stream accelerometer data
    accel.on('data', function (xyz) {
        // console.log('x:', xyz[0].toFixed(2),
        //     'y:', xyz[1].toFixed(2),
        //     'z:', xyz[2].toFixed(2));
        accel.getAcceleration( function(err, xyz){
            console.log('x:', xyz[0].toFixed(2),
                'y:', xyz[1].toFixed(2),
                'z:', xyz[2].toFixed(2));

            if(xyz[2].toFixed(2) > 1.5 || xyz[2].toFixed(2) < -1.5) {
                num++;
                if(num >= 5){
                    console.log("IM SHAKINGGGGGG!!!!!!");
                    accel.removeAllListeners('data');
                    axios.post('https://hooks.slack.com/services/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', {
                        "text":"Hello Fullstack Fellows: I have a programming problem that I need help with. Please come to the place specified in the picture",
                    })
                        .then(function (response) {
                            console.log(response);
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                }

            }
        })

    });

});

accel.on('error', function(err){
    console.log('Error:', err);
});
