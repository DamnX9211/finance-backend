import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { useState } from "react";
import { LoginApi } from "./auth.api";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await LoginApi({ email, password });
      login(res.access_token, res.role);
      navigate("/dashboard");
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Something went wrong");
      }
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
          {error && (
            <p className="text-red-500 text-center">{error}</p>
          )}
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
