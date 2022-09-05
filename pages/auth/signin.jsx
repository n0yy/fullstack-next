import { useEffect } from "react";
import FormsSignIn from "../../components/signin";

export default function SignIn() {
  useEffect(() => {
    document.title = "Sign In";
  }, []);
  return <FormsSignIn />;
}
