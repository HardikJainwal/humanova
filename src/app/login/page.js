import LoginPage from "@/components/auth/LoginPage";

export const metadata = {
  title: "Login Humanova",
  description: "Sign in to your Humanova workspace.",
  alternates: {
    canonical: "https://humanova.live/login",
  },
};

export default function LoginRoute() {
  return <LoginPage />;
}
