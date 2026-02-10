import { useContext, useState, createContext, type ReactNode} from "react";

export interface UserContext {
    loggedIn: boolean
    setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
    currentUser: string
    setCurrentUser: React.Dispatch<React.SetStateAction<string>>
    accessToken: string
    setAccessToken: React.Dispatch<React.SetStateAction<string>>
    userName: string
    setUserName: React.Dispatch<React.SetStateAction<string>>
}

const UserContext = createContext<UserContext | undefined>(undefined)

export const UseUser = ({ children }: {children: ReactNode}) => {

    const [loggedIn, setLoggedIn] = useState(false)
    const [currentUser, setCurrentUser] = useState("") 
    const [accessToken, setAccessToken] = useState("")
    const [userName, setUserName] = useState("")

    const value: UserContext = {
        loggedIn,
        setLoggedIn,
        currentUser, 
        setCurrentUser,
        accessToken,
        setAccessToken,
        userName,
        setUserName
    }
    return(
        <UserContext value={value}>
            {children}
        </UserContext>
    )   
}

export const useUser = () => {
      const ctx = useContext(UserContext)
        if (!ctx) {
            throw new Error('useGeneratorContext must be used within generator provider')
        }
        return ctx
}