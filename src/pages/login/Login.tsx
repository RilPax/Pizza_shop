import { Link } from "react-router";
import { AuthForm } from "../../components";

export const Login = () => {
  return (
    <div>
      <Link to="/">На главную</Link>
      <AuthForm type="login" />
    </div>
  );
};
