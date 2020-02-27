export function getCartData() {
    return JSON.parse(localStorage.getItem('cart'));
}

export function setCartData(o, callback) {
    localStorage.setItem('cart', JSON.stringify(o));
    callback();
}