/** async helper function to delay @fn by timeout*/
export const wait = (timeout: number, fn: any) => {
    return new Promise((resolve => {
        setTimeout(() => {
            resolve(fn());
        }, timeout)
    }));
}