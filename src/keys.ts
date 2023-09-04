import range from 'lodash.range';
import { jumpedLabels } from './extension';

export function getAllKeys(customKeys: ReadonlyArray<string>) {
    let lowerCharacters: Array<string> = [];
    let upperCharacters: Array<string> = [];

    if (!customKeys.length) {
        lowerCharacters = range(
            'a'.charCodeAt(0),
            'z'.charCodeAt(0) + 1 /* for inclusive*/
        ).map((c) => String.fromCharCode(c));
        upperCharacters = range(
            'A'.charCodeAt(0),
            'Z'.charCodeAt(0) + 1 /* for inclusive*/
        ).map((c) => String.fromCharCode(c));
    } else {
        for (let key of customKeys) {
            lowerCharacters.push(key.toLowerCase());
            upperCharacters.push(key.toUpperCase());
        }
    }

    return {
        lowerCharacters: <ReadonlyArray<string>>lowerCharacters,
        upperCharacters: <ReadonlyArray<string>>upperCharacters,
    };
}

function* _getKeySet(customKeys: ReadonlyArray<string>) {
    const { lowerCharacters, upperCharacters } = getAllKeys(customKeys);

    for (let c1 of lowerCharacters) {
        for (let c2 of lowerCharacters) {
            yield c1 + c2;
        }
    }
    for (let c1 of upperCharacters) {
        for (let c2 of lowerCharacters) {
            yield c1 + c2;
        }
    }
    for (let c1 of lowerCharacters) {
        for (let c2 of upperCharacters) {
            yield c1 + c2;
        }
    }
}

export function* getKeySet(customKeys: ReadonlyArray<string>) {
    const usedKeys = new Set(jumpedLabels.map((label) => label.keyLabel));

    for (const key of _getKeySet(customKeys)) {
        if (!usedKeys.has(key)) {
            yield key;
        }
    }
}
