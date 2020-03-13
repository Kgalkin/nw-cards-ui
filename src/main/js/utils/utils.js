export const getSmallImageLink = id => `./static/img/small/${id}.png`;

export function isEmptyObj(o){
    for (var key in o){
        if (o.hasOwnProperty(key))
            return false;
    }
    return true;
}