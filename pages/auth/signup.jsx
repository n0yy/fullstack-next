import Forms from "../../components/signup";
import { useEffect } from "react";

export default function SignUp() {
  useEffect(() => {
    document.title = "Sign Up";
  }, []);
  return (
    <>
      <Forms />
    </>
  );
}
