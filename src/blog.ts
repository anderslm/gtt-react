import matter from 'gray-matter'
import html from 'remark-html'
import { remark } from 'remark'

type Markdown = string

type PostId = string

type Post = { id: PostId, title: string, posted: Date, text: Markdown }

type Posts = Post[]

type Html = string

type MarkdownAsHtml = (markdown: Markdown) => Promise<Html>

type File = string[]

type Files = File[]

type GetPosts = (file: Files) => Posts

type GetPost = (id: PostId, files: Files) => Post

type DateAsString = (date: Date) => string


export const getPosts: GetPosts = files => { 
    return files.map(f => {
        const matterResult = matter(f[1])
        const header = matterResult.data as { date: string; title: string }

        return { id: f[0].substring(0, f[0].length - 3), title: header.title, posted: new Date(header.date), text: matterResult.content }
    })
}

export const getPost: GetPost = (id, files) => getPosts(files).find(p => p.id == id)

export const dateAsString: DateAsString = date => date.toISOString()

export const markdownAsHtml: MarkdownAsHtml = async m => (await remark().use(html).process(m)).toString()