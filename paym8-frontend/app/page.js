import Image from 'next/image';
import AuthForm from './auth';

export default function Login() {
  return (
    <main className="flex min-h-screen items-center justify-center p-24">
      {/* Next.js logo section */}
      <div className="relative flex place-items-center mb-8">
        <Image
          className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
          src="/paylogo.png"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
      </div>

    
     <AuthForm />
    </main>
  );
}
