import SectionHead from "../SectionHead";

// TODO: approved quotes from Curengo's clients
function Quote({ text, main = false }: { text: string; main?: boolean }) {
  return (
    <figure data-reveal className="m-0 flex flex-col justify-between gap-8 rounded-2xl border border-line bg-surface p-8">
      <blockquote className={main ? "text-[clamp(1.25rem,1rem+0.8vw,1.625rem)] leading-[1.45] font-medium tracking-[-0.01em]" : "text-[1.0625rem] leading-[1.65]"}>
        <span className="ph">{text}</span>
      </blockquote>
      <figcaption className="flex items-center gap-3.5 text-[0.9375rem]">
        <i className="size-11 shrink-0 rounded-full border border-line bg-sunken" aria-hidden="true" />
        <div>
          <b className="ph block font-semibold">[Name]</b>
          <span className="text-sm text-muted">[Role, Centre name]</span>
        </div>
      </figcaption>
    </figure>
  );
}

export default function Testimonials() {
  return (
    <section id="stories" className="sec border-t border-line">
      <div className="wrap">
        <SectionHead title="What centres say" lede={<span className="ph">[Approved quotes from clients. Two or three is enough.]</span>} />
        <div className="grid grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] gap-6 max-[860px]:grid-cols-1">
          <Quote main text="[A short quote from a centre owner or medical director about what changed after moving to Curengo.]" />
          <div className="grid gap-6">
            <Quote text="[Quote from a nurse or physio about daily use.]" />
            <Quote text="[Quote from a partner doctor.]" />
          </div>
        </div>
      </div>
    </section>
  );
}
