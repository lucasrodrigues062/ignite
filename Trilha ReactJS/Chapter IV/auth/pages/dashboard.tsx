import { destroyCookie } from "nookies"
import { useContext, useEffect } from "react"
import { Can } from "../components/Can"
import { AuthContext } from "../contexts/AuthContext"
import { useCan } from "../hooks/useCan"
import { setupApiClient } from "../services/api"
import { api } from "../services/apiClient"
import { AuthTokenError } from "../services/errors/AuthTokenError"
import { withSSRAuth } from "../utils/withSSRAuth"



export default function Dashboard() {

  const { user, signOut, isAuthenticated } = useContext(AuthContext)
  
  const userCanSeeMetrics = useCan({
    roles: ['administrator', 'editor']
  })

  useEffect(() => {
    api.get('/me')
      .then(response => console.log(response))
      .catch(err => console.log(err))
  }, [])

  return (
    <>
      <h1>Welcome: {user?.email}</h1>
        <button onClick={signOut}
        >SignOut</button>
      <Can permissions={['metrics.list']}>
        <div>Métricas</div>

      </Can>
    </>
  )
}

export const getServerSideProps = withSSRAuth(async (ctx) => {

  const apiClient = setupApiClient(ctx);
  const response = await apiClient.get('/me')

  return {
    props: {}
  }
})