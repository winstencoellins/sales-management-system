export default function capitalize (word: string) {
    return String(word).charAt(0).toUpperCase() + String(word).slice(1)
}