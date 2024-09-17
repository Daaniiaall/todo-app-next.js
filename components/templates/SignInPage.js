import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { signIn, useSession } from "next-auth/react";

function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const loginHandler = async () => {
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (!res.error) {
      router.replace("/");
    }
  };

  const { status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/");
    }
  }, [status]);

  return (
    <div className="signin-form">
      <h3>Login form</h3>

      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value.trim())}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={loginHandler}>Login</button>

      <div>
        <p>create an account?</p>
        <Link href="/signup">Sign up</Link>
      </div>
    </div>
  );
}

export default SignInPage;
