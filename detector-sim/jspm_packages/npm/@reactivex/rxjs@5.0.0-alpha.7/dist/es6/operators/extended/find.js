/* */ 
"format cjs";
import { FindValueOperator } from './find-support';
export default function find(predicate, thisArg) {
    return this.lift(new FindValueOperator(predicate, this, false, thisArg));
}
//# sourceMappingURL=find.js.map