export const isValidEmail = (email: string): boolean =>
    // eslint-disable-next-line no-useless-escape
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
    );

export const roles: { [key: string]: string } = {
    "0": "Fan",
    "1": "Manager",
    "2": "Site Administrator",
};

export const genders: { [key: string]: string } = {
    "0": "Female",
    "1": "Male",
};
