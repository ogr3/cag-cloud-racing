/* */ 
"format cjs";
import Subscriber from '../Subscriber';
import Subject from '../Subject';
export default function windowCount(windowSize, startWindowEvery = 0) {
    return this.lift(new WindowCountOperator(windowSize, startWindowEvery));
}
class WindowCountOperator {
    constructor(windowSize, startWindowEvery) {
        this.windowSize = windowSize;
        this.startWindowEvery = startWindowEvery;
    }
    call(subscriber) {
        return new WindowCountSubscriber(subscriber, this.windowSize, this.startWindowEvery);
    }
}
class WindowCountSubscriber extends Subscriber {
    constructor(destination, windowSize, startWindowEvery) {
        super(destination);
        this.windowSize = windowSize;
        this.startWindowEvery = startWindowEvery;
        this.windows = [new Subject()];
        this.count = 0;
        destination.next(this.windows[0]);
    }
    _next(value) {
        const startWindowEvery = (this.startWindowEvery > 0) ? this.startWindowEvery : this.windowSize;
        const windowSize = this.windowSize;
        const windows = this.windows;
        const len = windows.length;
        for (let i = 0; i < len; i++) {
            windows[i].next(value);
        }
        const c = this.count - windowSize + 1;
        if (c >= 0 && c % startWindowEvery === 0) {
            windows.shift().complete();
        }
        if (++this.count % startWindowEvery === 0) {
            let window = new Subject();
            windows.push(window);
            this.destination.next(window);
        }
    }
    _error(err) {
        const windows = this.windows;
        while (windows.length > 0) {
            windows.shift().error(err);
        }
        this.destination.error(err);
    }
    _complete() {
        const windows = this.windows;
        while (windows.length > 0) {
            windows.shift().complete();
        }
        this.destination.complete();
    }
}
//# sourceMappingURL=windowCount.js.map