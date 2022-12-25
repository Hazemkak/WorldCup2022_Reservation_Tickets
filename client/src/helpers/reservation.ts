export const isValidCardNumber = (number: string): boolean =>
    /^([0-9]{4}[\s-]?){4}$/.test(number);

export const isValidCardExpirationDate = (date: string): boolean =>
    /^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/.test(date);

export const isValidCardCvv = (cvv: string): boolean =>
    /^[0-9]{3,4}$/.test(cvv);
