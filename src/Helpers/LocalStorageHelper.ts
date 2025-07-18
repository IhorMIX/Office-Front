import { IsNullOrEmpty } from "./StringHelper";

export const getValue = (key: string): string => {
    const value = localStorage.getItem(key);

    return IsNullOrEmpty(value) ? '' : value!;
};
export const setValue = (key: string, value: string, isThrowIfEmpty: Boolean = false): void => {

    if (IsNullOrEmpty(value) && isThrowIfEmpty) {
        throw new Error("value must not be empty");
    }

    if (IsNullOrEmpty(key) && isThrowIfEmpty) {
        throw new Error("key must not be empty");
    }

    localStorage.setItem(key, value)
};
export const removItem = (key : string): void => localStorage.removeItem(key);