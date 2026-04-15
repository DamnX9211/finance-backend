import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { useState } from "react";
import { LoginApi } from "./auth.api";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { toast } from "sonner";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await LoginApi({ email, password });
      login(res.access_token, res.role);
      navigate("/dashboard");
    } catch (error) {
        const errorMessage = error.response?.data?.detail || "Login failed";
        setError(errorMessage);
        toast.error(errorMessage, {
          duration: 4000,
          position: "top-right",
        });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <Card className="w-87.5 p-6">
        <CardContent className="space-y-4 p-6">
          <h2 className="text-xl font-semibold text-center">Login</h2>
          <Input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        
          <Button
            onClick={handleLogin}
            disabled={loading}
            className="w-full"
            >
                {loading ? "Logging in..." : "Login"}
            </Button>
            <p className="text-sm text-center text-gray-600">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-600 hover:underline">
              Register
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
