import Observable from '../Observable';
export default function first<T, R>(predicate?: (value: T, index: number, source: Observable<T>) => boolean, resultSelector?: (value: T, index: number) => R, defaultValue?: any): Observable<R>;
