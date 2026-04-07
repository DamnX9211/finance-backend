import { Link } from "lucide-react"

const App = () => {
  return (
    <div>
       <p className="text-sm text-center text-gray-600">
            <Link to="/dashboard" className="text-blue-600 hover:underline">
              Dashboard
            </Link>
          </p>
    </div>
  )
}

export default App
