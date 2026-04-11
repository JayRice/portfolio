export const SCHOLARS_VISITED_KEY = "portfolio-scholars-visited"

export function getScholarsVisited(): boolean {
  try {
    return localStorage.getItem(SCHOLARS_VISITED_KEY) === "1"
  } catch {
    return false
  }
}

export function setScholarsVisited(): void {
  try {
    localStorage.setItem(SCHOLARS_VISITED_KEY, "1")
  } catch {
    /* ignore quota / private mode */
  }
}
