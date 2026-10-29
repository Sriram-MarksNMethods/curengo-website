import Link from "next/link";
import { btnLight, btnOutlineLight } from "@/components/ui";

export default function NotFound() {
  return (
    <section className="navy navy-glow hero-purple grid min-h-[80svh] place-items-center pt-(--topbar)">
      <div className="wrap text-center">
        <h1 className="m-0 text-[clamp(2.25rem,1.6rem+2.4vw,3.5rem)] leading-tight font-medium text-white">This page isn’t part of the record.</h1>
        <p className="mx-auto mt-4 max-w-lg text-lg text-[#c6bfe6]">The link may be old, or the page may have moved.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/" className={btnLight}>Go to the home page</Link>
          <Link href="/book-a-demo" className={btnOutlineLight}>Book a demo</Link>
        </div>
      </div>
    </section>
  );
}
