

export function isEmptyObj(o){
    for (var key in o){
        if (o.hasOwnProperty(key))
            return false;
    }
    return true;
}

export const isNumber = (val) => Number(val) || Number(val) === 0