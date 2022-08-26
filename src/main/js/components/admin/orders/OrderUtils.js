
export const isFinalState = (state) => {
    return state === 'canceled' || state === 'completed';
}