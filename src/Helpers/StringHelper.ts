export const IsNullOrEmpty = (str: string | null): boolean => {
    return str === null || str!.length === 0;
};

export class StringHelper {
    static format(format: string, ...args: any[]): string {
        return format.replace(/{(\d+)}/g, (match, index) => {
            return typeof args[index] !== 'undefined' ? args[index] : match;
        });
    }
}