import { createContext, ReactNode, useEffect, useState } from "react";
import Router from "next/router";
import { setCookie, parseCookies, destroyCookie } from 'nookies';
import { api } from "../services/apiClient";
import {BroadcastChannel} from "worker_threads";

//type of user, and roles, permissions
type User = {
  email: string;
  permissions: string[];
  roles: string[]
}
 
//type of credentials to be passed by the user.
type SignCredentials = {
  email: string
  password: string
}
//type of context, with the member the can be acessed
type AuthContextData = {
  signIn: (credentials: SignCredentials) => Promise<void>;
  signOut: () => void;
  isAuthenticated: boolean
  user: User
}
//type of children, to be inside the context
// when using ReactNode, means that anything can be passed as children
type AuthProviderProps = {
  children: ReactNode;
}
// contant with context information
export const AuthContext = createContext({} as AuthContextData)

let autChannel: BroadcastChannel

export function signOut() {
  destroyCookie(undefined, 'nextauth.token')
  destroyCookie(undefined, 'nextauth.refreshToken')
  autChannel.postMessage('signOut')

  Router.push('/')
}

// function that create the elements with the designed context
export function AuthProvider({ children }: AuthProviderProps) {
// setting user to null, when the app begins
  const [user, setUser] = useState<User>()
  // const responsable to know if user is authenticated or not
  const isAuthenticated = !!user;

  useEffect(() => {
    autChannel = new BroadcastChannel('auth')
    autChannel.onmessage = (message) => {
      switch (message.data) {
        case 'signOut':
          signOut()
          break
        default:
          break
      }
    }
  }, [])

  // execute one time on every call
  useEffect(() => {
    // get saved cookies
    const { 'nextauth.token': token } = parseCookies()
    // if there is a token, will make a request to get the permissions
    if (token) {
      api.get('/me').then(response => {
        const { email, permissions, roles } = response.data

        setUser({ email, permissions, roles})
      }).catch(() => {
        signOut()
      })
    }
  }, [])

  //function responsible to get a jwt
  async function signIn({ email, password }: SignCredentials) {
    // if api response with status different than 200 next will throw a exception
    try {
      const response = await api.post('sessions', {
        email,
        password
      })
      // desctruturing the object response
      const { token, refreshToken, permissions, roles } = response.data;
      
      // this function creates a cookie on the browser
      setCookie(undefined, 'nextauth.token', token, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: '/'
      })

      setCookie(undefined, 'nextauth.refreshToken', refreshToken, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: '/'
      })

      // update user on the context
      setUser({
        email,
        permissions,
        roles
      })

      // resets the headers default configuration before redirects
      api.defaults.headers['Authorization'] = `Bearer ${token}`

      // Redirects user to home when login is suscceful
      Router.push('/dashboard')


    } catch (error) {
      console.log(error)
    }

    
  }


  return (
    <AuthContext.Provider value={{signIn, signOut ,isAuthenticated, user}}>
      {children}
    </AuthContext.Provider>
  )
}