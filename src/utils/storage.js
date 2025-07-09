const storage = window.localStorage

export const setStorage = (key, value) => {
    try {
        storage.setItem(key, value)
    } catch (e) {
        console.log(e)
    }
}

export const getStorage = (key, defaultValue) => {
    try {
        const storedValue = storage.getItem(key)

        if (storedValue) {
            return JSON.parse(storedValue)
        }
        return defaultValue
    } catch (e) {
        console.log(e)
    }
}
