import { RepositoryItem } from "./RepositoryItem"
import '../styles/repositories.scss'
import { useEffect, useState } from "react"

interface Repository {
  name: string,
  description: string,
  html_url: string
}

//https://api.github.com/orgs/rocketseat/repos
const repo = {
  name: 'cool react',
  description: 'Forms in react',
  link: 'https://github.com'
}

export function RepositoryList() {
  const [repositories, setRepositories] = useState<Repository[]>([])

  useEffect(() => {
    fetch('https://api.github.com/orgs/rocketseat/repos')
    .then(response => response.json())
    .then(data => setRepositories(data))
  }, [])

  return (
    <section className="repository-list">
      <h1>Lista de repositorios</h1>

      <ul>
        {repositories.map(repository =>{
          return <RepositoryItem key={repository.name} repository={repository}/>
        })}
                
      </ul>
    </section>
      
  )
}