export function hashFromString(str, precision=144) { // 144 for num lock
    let result = 0;

    for (let i = 0; i < str.length; ++i) {
        const charCode = str.charCodeAt(i);
        result += charCode * (i + 1);
    }

    return result % precision;
}