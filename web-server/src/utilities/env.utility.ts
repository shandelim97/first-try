export function isDevelopment() {
    if (process.env.NODE_ENV === 'development') return true
    return false
}
