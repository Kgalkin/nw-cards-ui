
export const isFinalState = (state) => {
    return state === 'canceled' || state === 'completed' ||
        state === 'sent_to_customer';
}