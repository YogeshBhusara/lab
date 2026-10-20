import { Catalog } from "@/components/catalog";
import { getExperiments, getTags } from "@/lib/experiments";
import { site } from "@/lib/site";

export default function HomePage() {
  const experiments = getExperiments();
  const tags = getTags(experiments);
  const withLinks = experiments.filter((experiment) => experiment.links.length > 0).length;

  return (
    <div className="mx-auto max-w-6xl px-5 pb-20">
      <section className="grid gap-10 py-16 lg:grid-cols-[1.4fr_0.6fr] lg:items-end lg:py-24">
        <div>
          <p className="font-mono text-[11px] tracking-[0.22em] text-[#e7ff6a] uppercase">
            Public experiment index
          </p>
          <h1 className="mt-4 max-w-3xl font-serif text-5xl leading-[0.95] tracking-tight text-[#f4efe4] italic sm:text-7xl">
            A shelf for experiments that used to live in folders.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-[#f4efe4]/72">
            {site.author} keeps prototypes, studies, and native apps here. Open any card for the
            note, the stack, and a link you can send to someone else.
          </p>
        </div>
        <dl className="grid grid-cols-2 gap-px border border-white/10 bg-white/10">
          <div className="bg-[#10120f] p-5">
            <dt className="font-mono text-[11px] tracking-[0.16em] text-[#f4efe4]/45 uppercase">
              Entries
            </dt>
            <dd className="mt-2 font-serif text-4xl italic">{experiments.length}</dd>
          </div>
          <div className="bg-[#10120f] p-5">
            <dt className="font-mono text-[11px] tracking-[0.16em] text-[#f4efe4]/45 uppercase">
              With a repo
            </dt>
            <dd className="mt-2 font-serif text-4xl italic">{withLinks}</dd>
          </div>
        </dl>
      </section>
      <Catalog experiments={experiments} tags={tags} />
    </div>
  );
}
