// Add your public and private key here

const vapidPublicKey =
    "<Paste Public Key Here>";
const vapidPrivateKey = "<Paste Private Key Here>";

//

const webpush = require("web-push");

exports.web_push = function (options) {
    return webpush.generateVAPIDKeys();
};

exports.web_push_send = function (options) {
    webpush.setVapidDetails(
        "mailto:email@email.com",
        vapidPublicKey,
        vapidPrivateKey
    );
    const subscription = this.parse(options.subscription);

    // Create payload
    const payload = JSON.stringify({
        title: this.parse(options.title),
        icon: this.parse(options.icon),
        body: this.parse(options.body),
        timestamp: Date.now,
    });

    // Pass object into sendNotification
    webpush
        .sendNotification(subscription, payload)
        .catch((err) => console.error(err));
};
