import Login from "../components/Login.jsx";

const LoginPage = () => {
  return (
    <>
      <div>
        <Login />
        Noch nicht registriert? <a href="/register">Registrieren</a>
      </div>
    </>
  );
};

export default LoginPage;
