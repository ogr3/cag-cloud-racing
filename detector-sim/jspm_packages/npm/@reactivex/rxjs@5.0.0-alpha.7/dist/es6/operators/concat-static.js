/* */ 
"format cjs";
import Observable from '../Observable';
import immediate from '../schedulers/immediate';
/**
 * Joins multiple observables together by subscribing to them one at a time and merging their results
 * into the returned observable. Will wait for each observable to complete before moving on to the next.
 * @params {...Observable} the observables to concatenate
 * @params {Scheduler} [scheduler] an optional scheduler to schedule each observable subscription on.
 * @returns {Observable} All values of each passed observable merged into a single observable, in order, in serial fashion.
 */
export default function concat(...observables) {
    let scheduler = immediate;
    let args = observables;
    if (typeof (args[observables.length - 1]).schedule === 'function') {
        scheduler = args.pop();
        args.push(1, scheduler);
    }
    return Observable.fromArray(observables).mergeAll(1);
}
//# sourceMappingURL=concat-static.js.map