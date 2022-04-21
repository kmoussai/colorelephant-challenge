function handleFetchError(response: Response) {
    if (!response.ok) return Promise.reject(new Error(response.statusText));
    return response;
}

export { handleFetchError };
