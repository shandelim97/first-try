async function to<T>(promise: Promise<T>): Promise<[any | null, T?]> {
    return promise
        .then((data) => {
            return [null, data] as [null, T]
        })
        .catch((err) => [err, undefined] as [any, undefined])
}

export { to }
