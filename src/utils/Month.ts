export const Month = (value: any) =>{
    switch (value) {
        case 1:
            value = 'JANEIRO';
            break;
        case 2:
            value = 'FEVEREIRO';
            break;
        case 3:
            value = 'MARÇO';
            break;
        case 4:
            value = 'ABRIL';
            break;
        case 5:
            value = 'MAIO';
            break;
        case 6:
            value = 'JUNHO';
            break;
        case 7:
            value = 'JULHO';
            break;
        case 8:
            value = 'AGOSTO';
            break;
        case 9:
            value = 'SETEMBRO';
            break;
        case 10:
            value = 'OUTUBRO';
            break;
        case 11:
            value = 'NOVEMBRO';
            break;
        case 12:
            value = 'DEZEMBRO';
            break;
        default:
            value = 'ESSE MÊS';
    }

    return value
}