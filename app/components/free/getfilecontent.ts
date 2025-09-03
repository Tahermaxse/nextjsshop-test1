import fs from 'fs'

// Function to read and format file content
export function getFileContent(filePath: string): string {
  try {
    const content = fs.readFileSync(filePath, 'utf-8')
    // Replace backticks with escaped backticks
    return content.replace(/`/g, '\\`')
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error)
    return ''
  }
}