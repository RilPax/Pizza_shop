import { Link } from "react-router";
import { AuthForm } from "../../components";

export const Register = () => {
  return (
    <div>
      <Link to="/">На главную</Link>
      <AuthForm type="register" />
    </div>
  );
};
