export type CommitAuthor = {
  name: string
  email: string
  date: Date
}

export type Tree = {
  sha: string
  url: string
}

export type Verification = {
  verified: boolean
  reason: string
  signature: null
  payload: null
}

export type Parent = {
  sha: string
  url: string
  html_url: string
}

export type Author = {
  login: string
  id: number
  node_id: string
  avatar_url: string
  gravatar_id: string
  url: string
  html_url: string
  followers_url: string
  following_url: string
  gists_url: string
  starred_url: string
  subscriptions_url: string
  organizations_url: string
  repos_url: string
  events_url: string
  received_events_url: string
  type: string
  site_admin: boolean
}

export type Commit = {
  sha: string
  node_id: string
  commit: {
    author: CommitAuthor
    committer: CommitAuthor
    message: string
    tree: Tree
    url: string
    comment_count: number
    verification: Verification
  }
  url: string
  html_url: string
  comments_url: string
  author: Author
  committer: Author
  parents: Parent[]
}

/**
 * Asynchronously fetches the commit history of a specified file in a GitHub repo.
 *
 * @param path
 * Path to the page from the root directory of the repository.
 * Example: `src/app/page.tsx`
 */
export const fetchCommits = async (path: string) => {
  const res = await fetch(
    `https://api.github.com/repos/nico-bachner/v6/commits?path=${path}`,
  )
  const commits: Commit[] = await res.json()

  return commits
}
