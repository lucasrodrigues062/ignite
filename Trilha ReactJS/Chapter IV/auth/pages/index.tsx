import type { NextPage } from 'next'
import { FormEvent, useContext, useState } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import styles from '../styles/Home.module.css'

// component responsible for authenticate a user
const Home: NextPage = () => {
  
  // useState on form items
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  // getting context fucntion to authenticate the user
  const { signIn } = useContext(AuthContext)

  // responsible to call the context to autenticate the user
  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    const data = {
      email, password
    }
    await signIn(data)
  }
  // JSX element
  return (
    <form onClick={handleSubmit} className={styles.container}>
      <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
      <button type="submit">Entrar</button>
    </form>
  )
}

export default Home
