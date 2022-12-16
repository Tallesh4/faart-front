export const number_format = (number: number, decimals: number = 2, dec_point: string = ",", thousands_sep: string = "."): number => {
    var n: number = number, c = isNaN(decimals = Math.abs(decimals)) ? 2 : decimals;
    var d: string = dec_point == undefined ? "," : dec_point;
    var t: string = thousands_sep == undefined ? "." : thousands_sep, s = n < 0 ? "-" : "";
    n = Number(Math.abs(+n || 0).toFixed(c));

    var i: any = n + "";
    let j = 0;
    j = i.length > 3 ? j % 3 : 0;

    let format = s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "")
    return Number(format);
}
