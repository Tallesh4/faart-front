export const convertToCurrency = (value: any, config: { locale: string, currency: string }) => {
    return Number(value).toLocaleString(config.locale, { style: 'currency', currency: config.currency })
}