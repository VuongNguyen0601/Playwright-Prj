export class NumberConverter {
    static changeToNumber(str: string) {
        const numberOnly = str.replace(/[^0-9.]/g, '');
        return parseFloat(numberOnly)
    }
}