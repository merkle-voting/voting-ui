import { getAddress } from '@ethersproject/address';
import { JsonRpcProvider, JsonRpcSigner } from '@ethersproject/providers';

/**
 * Returns true if the passed value is "plain" object, i.e. an object whose
 * prototype is the root `Object.prototype`. This includes objects created
 * using object literals, but not for instance for class instances.
 *
 * @param {any} value The value to inspect.
 * @returns {boolean} True if the argument appears to be a plain object.
 *
 * @public
 */
export default function isPlainObject(value: unknown): value is object {
    if (typeof value !== 'object' || value === null) return false;

    const proto = Object.getPrototypeOf(value);
    if (proto === null) return true;

    let baseProto = proto;
    while (Object.getPrototypeOf(baseProto) !== null) {
        baseProto = Object.getPrototypeOf(baseProto);
    }

    return proto === baseProto;
}

/**
 * Returns true if the passed value is "plain", i.e. a value that is either
 * directly JSON-serializable (boolean, number, string, array, plain object)
 * or `undefined`.
 *
 * @param val The value to check.
 *
 * @public
 */
export function isPlain(val: any) {
    const type = typeof val;
    return (
        type === 'undefined' ||
        val === null ||
        type === 'string' ||
        type === 'boolean' ||
        type === 'number' ||
        Array.isArray(val) ||
        isPlainObject(val)
    );
}

// returns the checksummed address if the address is valid, otherwise returns false
export function isAddress(value: any): string | false {
    try {
        // Alphabetical letters must be made lowercase for getAddress to work.
        // See documentation here: https://docs.ethers.io/v5/api/utils/address/
        return getAddress(value.toLowerCase());
    } catch {
        return false;
    }
}

// shorten the checksummed version of the input address to have 0x + 4 characters at start and end
export function shortenAddress(address: string, chars = 4): string {
    const parsed = isAddress(address);
    if (!parsed) {
        throw Error(`Invalid 'address' parameter '${address}'.`);
    }
    return `${parsed.substring(0, chars + 2)}...${parsed.substring(42 - chars)}`;
}

// account is not optional
export function getSigner(provider: JsonRpcProvider, account: string): JsonRpcSigner {
    return provider.getSigner(account).connectUnchecked();
}

// account is optional
export function getProviderOrSigner(provider: JsonRpcProvider, account?: string): JsonRpcProvider | JsonRpcSigner {
    return account ? getSigner(provider, account) : provider;
}
