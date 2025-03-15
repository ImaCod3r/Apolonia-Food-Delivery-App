export function isValidEmail(email:string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(!emailRegex.test(email)) {
        return false;
    }

    return true;
}