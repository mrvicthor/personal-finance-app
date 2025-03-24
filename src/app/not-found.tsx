import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white rounded-lg w-full sm:max-w-[35rem] py-8 px-5 sm:px-8">
        <h2 className="text-[2rem] font-bold capitalize text-[#201F24]">
          404 page not found
        </h2>
        <p className="mt-4 text-[#696868]">
          The page you are looking for does not exist
        </p>
        <Link href="/" className="mt-8 text-[#201F24] font-bold">
          Go back to home
        </Link>
      </div>
    </div>
  );
}
