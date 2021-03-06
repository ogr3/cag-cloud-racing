/* */ 
"format cjs";
import tryCatch from '../util/tryCatch';
import { errorObject } from '../util/errorObject';
import OuterSubscriber from '../OuterSubscriber';
import subscribeToResult from '../util/subscribeToResult';
export class ExpandOperator {
    constructor(project, concurrent = Number.POSITIVE_INFINITY) {
        this.project = project;
        this.concurrent = concurrent;
    }
    call(subscriber) {
        return new ExpandSubscriber(subscriber, this.project, this.concurrent);
    }
}
export class ExpandSubscriber extends OuterSubscriber {
    constructor(destination, project, concurrent = Number.POSITIVE_INFINITY) {
        super(destination);
        this.project = project;
        this.concurrent = concurrent;
        this.index = 0;
        this.active = 0;
        this.hasCompleted = false;
        if (concurrent < Number.POSITIVE_INFINITY) {
            this.buffer = [];
        }
    }
    _next(value) {
        const index = this.index++;
        this.destination.next(value);
        if (this.active < this.concurrent) {
            let result = tryCatch(this.project)(value, index);
            if (result === errorObject) {
                this.destination.error(result.e);
            }
            else {
                if (result._isScalar) {
                    this._next(result.value);
                }
                else {
                    this.active++;
                    this.add(subscribeToResult(this, result, value, index));
                }
            }
        }
        else {
            this.buffer.push(value);
        }
    }
    _complete() {
        this.hasCompleted = true;
        if (this.hasCompleted && this.active === 0) {
            this.destination.complete();
        }
    }
    notifyComplete(innerSub) {
        const buffer = this.buffer;
        this.remove(innerSub);
        this.active--;
        if (buffer && buffer.length > 0) {
            this._next(buffer.shift());
        }
        if (this.hasCompleted && this.active === 0) {
            this.destination.complete();
        }
    }
    notifyNext(outerValue, innerValue, outerIndex, innerIndex) {
        this._next(innerValue);
    }
}
//# sourceMappingURL=expand-support.js.map