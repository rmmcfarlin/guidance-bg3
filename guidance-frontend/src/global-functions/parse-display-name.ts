export function getDisplayName(str: string): string {
    const conjunctions = new Set(["of", "and", "or"]);

    return str
        .split("-")
        .map(word =>
            conjunctions.has(word) ? word : word[0].toUpperCase() + word.slice(1)
        )
        .join(" ");
}
