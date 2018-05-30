import {MockList} from 'graphql-tools';
import casual from 'casual-browserify/src/casual_browserify.js';

export function list() {
 return (_, vars) => {
   const req = vars.req;
   const total = req.offset + casual.integer(0, req.limit * 2);
   const left = total - req.offset;
   const current = left < req.limit ? left : req.limit;
   return {
     items: () => new MockList(current),
     total: total
   }
 }
}
