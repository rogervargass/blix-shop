import { ReactNode, createContext, useState } from 'react';

type UserContextType = {
  name: string,
  setName: React.Dispatch<React.SetStateAction<string>>,
  email: string,
  setEmail: React.Dispatch<React.SetStateAction<string>>,
  userId: string,
  setUserId: React.Dispatch<React.SetStateAction<string>>
}

export const UserContext = createContext<UserContextType>({
  name: '',
  setName: () => '',
  email: '',
  setEmail: () => '',
  userId: '',
  setUserId: () => '',
});
UserContext.displayName = "User"

interface Props {
  children?: ReactNode
}

export default function UserProvider({ children }: Props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [userId, setUserId] = useState('');
  return (
    <UserContext.Provider
      value={{
        name,
        setName,
        email,
        setEmail,
        userId,
        setUserId
      }}
    >
      {children}
    </UserContext.Provider>
  )
}