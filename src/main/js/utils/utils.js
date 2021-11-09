export const HOST_AND_PORT = 'http://localhost:8080';
export const getSmallImageLink = id => `${HOST_AND_PORT}/static/img/${id}/${id}_cover.jpg`;

export function isEmptyObj(o){
    for (var key in o){
        if (o.hasOwnProperty(key))
            return false;
    }
    return true;
}