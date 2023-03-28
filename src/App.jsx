import { Layout } from "./components/Layout"
import { Router } from "./components/Router"
import { AuthProvider } from "./context/AuthProvider"

function App() {

  return (
    <AuthProvider>
      <Layout>
        <Router />
      </Layout>
    </AuthProvider>
  )
}

export default App
