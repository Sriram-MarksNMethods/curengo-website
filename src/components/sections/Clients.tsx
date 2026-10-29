// Client logos, looping. TODO: real logos (with the clients' permission) from Curengo.
export default function Clients() {
  const logos = Array.from({ length: 6 }, (_, i) => i);
  return (
    <section id="clients" className="border-t border-line py-16">
      <div className="wrap">
        <p className="mb-6 text-center text-[0.9375rem] text-muted">
          Trusted by rehabilitation centres <span className="ph">[across region]</span>
        </p>
        <div className="edge-fade overflow-hidden">
          <div className="flex w-max animate-marquee gap-4 hover:[animation-play-state:paused]">
            {[...logos, ...logos].map((i, k) => (
              <span key={k} aria-hidden={k >= logos.length} className="grid h-16 w-40 flex-none place-items-center rounded-xl border border-line bg-surface text-[0.8125rem] text-faint">
                [Client logo]
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
