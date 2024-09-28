import RegisterForm from "../components/RegisterForm.jsx";

const RegisterPage = () => {
  return (
    <>
      <div>
        <RegisterForm />
        Bereits registriert? <a href="/login">Hier geht's zum Login</a>
      </div>
    </>
  );
};

export default RegisterPage;
