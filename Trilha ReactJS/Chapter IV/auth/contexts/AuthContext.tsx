import { createContext, ReactNode } from "react";
import { api } from "../services/api";
 
//type of credentials to be passed by the user.
type SignCredentials = {
  email: string
  password: string
}
//type of context, with the member the can be acessed
type AuthContextData = {
  signIn(credentials: SignCredentials): Promise<void>;
  isAuthenticated: boolean
}
//type of children, to be inside the context
// when using ReactNode, means that anything can be passed as children
type AuthProviderProps = {
  children: ReactNode;
}
// contant with context information
export const AuthContext = createContext({} as AuthContextData)

// function that create the elements with the designed context
export function AuthProvider({ children }: AuthProviderProps) {

  const isAuthenticated = false;
  //function responsible to get a jwt
  async function signIn({ email, password }: SignCredentials) {
    // if api response with status different than 200 next will throw a exception
    try {
      const response = await api.post('sessions', {
        email,
        password
      })


    } catch (error) {
      console.log(error)
    }

    
  }


  return (
    <AuthContext.Provider value={{signIn, isAuthenticated}}>
      {children}
    </AuthContext.Provider>
  )
}