export function debounce(func, delay = 200) {
    let timer: ReturnType<typeof setTimeout>;

    return function (...args) {
        clearTimeout(timer);
        timer = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
}
