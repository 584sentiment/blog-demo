export function getSafeRandom(): number {
    return crypto.getRandomValues(new Uint8Array(1))[0] / 256;
}

/**
 * 返回一个处于最大值和最小值之间的随机数
 * @param min 最小值
 * @param max 最大值
 */
export function getRandom(min = 0, max = 1): number {
    return getSafeRandom() * (max - min) + min;
}


function getRandomRGB(alpha?: boolean):string {
    const r = getRandom(0, 255).toFixed(2);
    const g = getRandom(0, 255).toFixed(2);
    const b = getRandom(0, 255).toFixed(2);
    if (alpha) {
        const a = getSafeRandom().toFixed(2);
        return `rgba(${r}, ${g}, ${b}, ${a})`;
    }
    return `rgb(${r}, ${g}, ${b})`;
}

function getRandomHEX(alpha?: boolean):string {
    const r = Math.floor(getRandom(0, 255)).toString(16);
    const g = Math.floor(getRandom(0, 255)).toString(16);
    const b = Math.floor(getRandom(0, 255)).toString(16);
    if (alpha) {
        const a = Math.floor(getRandom(0, 255)).toString(16);
        return `#${r}${g}${b}${a}`;
    }
    return `#${r}${g}${b}`;
}

function getRandomHSL(alpha?: boolean): string {
    const deg = getRandom(0, 360);
    const s = getRandom(0, 100);
    const l = getRandom(0, 100);
    if (alpha) {
        const a = getSafeRandom().toFixed(1);
        return `hsl(${deg}deg ${s}% ${l}% ${a})`;
    }
    return `hsl(${deg}deg ${s}% ${l}%)`;
}
const RandomColorGenerator = {
    rgb:getRandomRGB,
    hex:getRandomHEX,
    hsl:getRandomHSL,
}
/**
 * 返回对应格式的随机颜色字符串
 * @param fmt 颜色格式
 */
type EFmt = 'rgb' | 'hex' | 'hsl';
export function getRandomColor(fmt: EFmt, alpha?: boolean) {
    return RandomColorGenerator[fmt](alpha);
}
