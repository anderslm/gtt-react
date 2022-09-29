import fs from 'fs'
import path from 'path'

const dbDirectory = path.join(process.cwd(), 'db')

export const readAll = () =>
  fs.readdirSync(dbDirectory).filter(f => f.endsWith('.md')).map(fileName =>
    [fileName, fs.readFileSync(path.join(dbDirectory, fileName), 'utf8')])
