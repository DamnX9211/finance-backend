import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { RegisterApi } from "./auth.api";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { toast } from "sonner";

export default function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    try {
      setLoading(true);
      setError("");

      await RegisterApi({ name, email, password });
        toast.success("Registration successful!", {
          duration: 4000,
          position: "top-right",
        });
      navigate("/dashboard");
    } catch (error: unknown) {
        const errorMessage = error.response?.data?.detail || "Registration failed";
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
          <h2 className="text-xl font-semibold text-center">Create Account</h2>
          
          <Input
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          
          <Input
            placeholder="Email"
            type="email"
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
            onClick={handleRegister}
            disabled={loading}
            className="w-full"
          >
            {loading ? "Creating Account..." : "Register"}
          </Button>

          <p className="text-sm text-center text-gray-600">
            Already have an account?{" "}
            <Link to="/" className="text-blue-600 hover:underline">
              Login
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}