export function getRandom (arr: any[]) {
    const randIndex: number = Math.floor(Math.random() * arr.length)
    return arr[randIndex]
}
