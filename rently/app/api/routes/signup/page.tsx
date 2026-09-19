import { Suspense } from "react";
import AuthPage from "../../../signup/signup";

export default function SignupPage() {
	return (
		<Suspense fallback={<main className="min-h-screen bg-slate-50" />}>
			<AuthPage />
		</Suspense>
	);
}
