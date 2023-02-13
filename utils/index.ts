import { getAddress } from '@ethersproject/address';
import { BigNumber } from '@ethersproject/bignumber';
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

export function addHours(date: Date, hours: number) {
    date.setTime(date.getTime() + hours * 60 * 60 * 1000);

    return date;
}

export function convertBigNumbers(data: any): any {
    if (data instanceof BigNumber) {
        return data.toNumber();
    } else if (Array.isArray(data)) {
        return data.map(convertBigNumbers);
    } else if (typeof data === 'object') {
        const result: { [key: string]: any } = {};
        for (const key in data) {
            result[key] = convertBigNumbers(data[key]);
        }
        return result;
    }
    return data;
}

// This is to remove unnecessary properties from the output type. Use it eg. `ExtractPropsFromArray<Inventory.ItemStructOutput>`
export type ExtractPropsFromArray<T> = Omit<T, keyof Array<unknown> | `${number}`>;

// convertToStruct takes an array type eg. Inventory.ItemStructOutput and converts it to an object type.
export const convertStructOutputToObject = <A extends Array<unknown>>(arr: A): ExtractPropsFromArray<A> => {
    const keys = Object.keys(arr).filter((key) => isNaN(Number(key)));
    const result = {};
    // @ts-ignore
    arr.forEach((item, index) => (result[keys[index]] = item));
    return result as A;
};

export function getcurrentTimestampInSeconds() {
    return Math.floor(Date.now() / 1000);
}

export function getDuration(durationInSeconds: number) {
    const hours = Math.floor(durationInSeconds / 3600);
    const minutes = Math.floor((durationInSeconds % 3600) / 60);
    const seconds = Math.floor(durationInSeconds % 60);

    return {
        hours,
        minutes,
        seconds,
    };
}

/**
 * Returns the gas value plus a margin for unexpected or variable gas costs
 * @param value the gas value to pad
 */
export function calculateGasMargin(value: BigNumber): BigNumber {
    return value.mul(120).div(100);
}
