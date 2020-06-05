const https = require('https');

function printMessage(username, badgeCount, points) {
    const message = `${username} has ${badgeCount} total badge(s) and ${points} in JavaScript.`;
    console.log(message);
}

function getProfile(username) {
    try{
        //Connect to the API URL (https://teamtreehouse.com/williamnoble.json)
        const request = https.get(`https://teamtreehouse.com/${username}.json`, response => {
            let body = "";
            //Read the data
            response.on('data', data => {
                body += data.toString();
            });

            response.on('end', () => {
                const profile =JSON.parse(body);
                printMessage(username, profile.badges.length, profile.points.JavaScript);
            });
            //Parse the data
            //Print the data
        });
        request.on('error', error => console.error(`Problem(s) with request: ${error.message}`));
    }catch(error) {
        console.error(error.message);
    }
};

const users = ["williamnoble", "chalkers", "alenaholligan"];

users.forEach(getProfile);