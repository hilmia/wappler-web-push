let hidden = false;
let onlyWhenHidden;

self.addEventListener("push", e => {
    if (onlyWhenHidden) {
        if (hidden) {
            console.log(hidden);
            const data = e.data.json();

            self.registration.showNotification(data.title, {
                icon: `${data.icon}`,
                body: `${data.body}`,
                timestamp: `${data.timestamp}`,

            });
        }
    } else {
        const data = e.data.json();

        self.registration.showNotification(data.title, {
            icon: `${data.icon}`,
            body: `${data.body}`,
            timestamp: `${data.timestamp}`
        });
    }
});

self.addEventListener('message', (event) => {
    if (event.data.state == false) {
        hidden = false;
        onlyWhenHidden = event.data.onlyWhenHidden
    } else {
        hidden = true;
        onlyWhenHidden = event.data.onlyWhenHidden
    }
});


