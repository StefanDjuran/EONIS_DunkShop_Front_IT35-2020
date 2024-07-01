export interface LoginData {
    username: string;
    passwordHash: string;
}

export interface NewUser {
    imeK: string;
    prezimeK: string;
    adresaK: string;
    gradK: string;
    brojtelefonaK: string;
    statusK: "Admin" | "User";
    username: string;
    passwordK: string;
}