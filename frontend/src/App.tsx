import { Button } from "./components/ui/button"


const App = () => {
  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-row items-center justify-between mb-6">
        <h2 className="text-2xl font-bold tracking-tight">Welcome to Your Finacial Dashboard</h2>
        <Button>
          <a href="/login">Login</a>
        </Button>
      </div>
       
    </div>
  )
}

export default App
