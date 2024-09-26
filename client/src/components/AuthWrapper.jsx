import { useAuth } from "../context/AuthContext";
import { Link } from "preact-router/match";

export default function AuthWrapper({ children }) {
  const { user, login } = useAuth();

  if (user) {
    return <>{children}</>;
  } else {
    return (
      <>
        <div>Nicht eingeloggt.</div>
        <Link to="/login">zum Login</Link>
      </>
    );
  }
}
