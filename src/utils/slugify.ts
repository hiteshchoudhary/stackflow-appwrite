export default function slugify(text: string) {
  return text
      .toString()
      .toLowerCase()
      .trim() // Trim whitespace from both sides of the string
      .replace(/\s+/g, "-") // Replace spaces with a dash
      .replace(/[^\w\-]+/g, "") // Remove all non-word characters
      .replace(/\-\-+/g, "-"); // Replace multiple dashes with a single dash
}
