export class Keyable<T> {
    constructor(
        public readonly key: string,
        public readonly val: T
    ) {

    }
}

export function mapToKeyable<T>(){
    return changes => changes.map(c => new Keyable<T>(c.payload.key, c.payload.val()));
}
