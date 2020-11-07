// account
let account;
export const setAccount = (_account) => {
    account = _account;
}
export const getAccount = () => {
    return account;
}

// contract
let contract;
export const setContract = (_contract) => {
    contract = _contract;
}
export const getContract = () => {
    return contract;
}
// contract state
let contractState;
export const setContractState = (_contractState) => {
    contractState = _contractState;
}
export const getContractState = () => {
    return contractState;
}

// error message
let errorMessage;
export const setErrorMessage = (_errorMessage) => {
    errorMessage = _errorMessage;
}
export const getErrorMessage = () => {
    return errorMessage;
}