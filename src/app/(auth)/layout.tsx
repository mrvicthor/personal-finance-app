import Image from "next/image";
import bannerImage from "../../../public/assets/images/illustration-authentication.svg";
import financeLogo from "../../../public/assets/images/logo-large.svg";
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="grid auth-container h-screen">
      <div className="px-5 py-5 relative h-screen w-full">
        <Image
          src={bannerImage}
          alt="illustration authentication"
          className="object-cover w-full h-full rounded-lg"
        />
        <Image
          src={financeLogo}
          alt="finance logo"
          className="absolute top-12 left-10 z-10"
        />
        <article className="absolute bottom-12 left-10 text-white z-10 space-y-3">
          <p className="font-bold text-[2rem] auth-container-title leading-none">
            Keep track of your money and save for your future
          </p>
          <p className="auth-container-text">
            Personal finance app puts you in control of your spending. Track
            transactions, set budgets, and add to savings pot easily.
          </p>
        </article>
      </div>
      {children}
    </section>
  );
}
