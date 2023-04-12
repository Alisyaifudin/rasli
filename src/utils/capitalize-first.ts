// capitalize the first letter of all words in a string
export function capitalizeFirst(str: string): string {
  return str
    .trim()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
