import { useUsers } from "../hooks/useUsers"
import { UsersList } from '../components/UsersList'

export function Home() {

    const { users } = useUsers()

    return (
        <>
            <h2 className="text-3xl text-center mb-6">Users you can follow!</h2>
            <UsersList users={users} />
        </>
    )
}