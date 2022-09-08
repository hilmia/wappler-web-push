self.addEventListener("push", e => {
    const data = e.data.json();

    self.registration.showNotification(data.title, {
        icon: `${data.icon}`,
        body: `${data.body}`,
        timestamp: `${data.timestamp}`
    });
});
