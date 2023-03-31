export function isUrl (url) {
    return /^https?:\/\/([a-zA-Z0-9]+\.)+[a-zA-Z0-9]+/.test(url)
}