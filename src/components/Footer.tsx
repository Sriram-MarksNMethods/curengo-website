import Image from "next/image";
import Link from "next/link";

const linkClass = "text-muted no-underline hover:text-accent";

export default function Footer() {
  return (
    <footer className="border-t border-line pt-14 pb-8 text-[0.9375rem] text-muted">
      <div className="wrap">
        <div className="grid grid-cols-[minmax(0,1.4fr)_repeat(3,minmax(0,1fr))] gap-8 max-[820px]:grid-cols-2 max-[480px]:grid-cols-1">
          <div className="max-[820px]:col-span-full">
            <Link href="/" data-home aria-label="Curengo home" className="inline-block">
              <Image src="/brand/curengo-logo.png" alt="" width={720} height={267} className="h-14 w-auto max-[560px]:h-12 dark:hidden" />
              <Image src="/brand/curengo-logo-reverse.png" alt="" width={360} height={124} className="hidden h-14 w-auto max-[560px]:h-12 dark:block" />
            </Link>
            <p className="mt-4 max-w-88 leading-relaxed">Rehabilitation Management Information System. Digitizing the Continuum of Care.</p>
          </div>
          <div>
            <h2 className="mb-3.5 text-sm font-semibold text-heading">Product</h2>
            <ul className="grid gap-2">
              <li><Link className={linkClass} href="/platform">Platform</Link></li>
              <li><Link className={linkClass} href="/solutions">Solutions</Link></li>
              <li><Link className={linkClass} href="/abdm">ABDM &amp; integrations</Link></li>
              <li><Link className={linkClass} href="/pricing">Pricing</Link></li>
            </ul>
          </div>
          <div>
            <h2 className="mb-3.5 text-sm font-semibold text-heading">Company</h2>
            <ul className="grid gap-2">
              <li><Link className={linkClass} href="/about">About</Link></li>
              <li><Link className={linkClass} href="/book-a-demo">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h2 className="mb-3.5 text-sm font-semibold text-heading">Office</h2>
            <address className="not-italic leading-relaxed">
              <span className="ph">[Office address]</span>
              <br />
              <span className="ph">[Phone]</span>
              <br />
              <span className="ph">[Email]</span>
            </address>
            {/* TODO: real social profile URLs from Curengo */}
            <ul className="mt-4 grid gap-2">
              <li><a className={linkClass} href="#">LinkedIn</a></li>
              <li><a className={linkClass} href="#">Instagram</a></li>
              <li><a className={linkClass} href="#">YouTube</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 flex flex-wrap justify-between gap-4 border-t border-line pt-6 text-[0.8125rem] text-faint">
          <span>© 2026 Curengo</span>
          <nav aria-label="Legal" className="flex gap-5">
            <Link className="text-faint no-underline hover:text-accent" href="/privacy-policy">Privacy Policy</Link>
            <Link className="text-faint no-underline hover:text-accent" href="/terms-and-conditions">Terms and Conditions</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
