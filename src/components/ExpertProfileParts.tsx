import Link from "next/link";
import { IconEmail, IconLinkedIn } from "@/components/Icons";
import { site } from "@/lib/content";
import type { Author } from "@/lib/types";

function ProfileList({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <p className="text-sm font-semibold text-ink">{title}</p>
      <ul className="mt-3 space-y-2 text-sm leading-relaxed text-muted">
        {items.map((item) => (
          <li key={item}>· {item}</li>
        ))}
      </ul>
    </div>
  );
}

function ProfileSocial({ author }: { author: Author }) {
  return (
    <div className="flex items-center gap-2">
      {author.linkedIn ? (
        <a
          href={author.linkedIn}
          target="_blank"
          rel="noreferrer"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--line)] text-accent transition hover:bg-[var(--accent-soft)]"
          aria-label={`${author.name} on LinkedIn`}
        >
          <IconLinkedIn className="h-[18px] w-[18px]" />
        </a>
      ) : null}
      <a
        href={`mailto:${site.email}?subject=${encodeURIComponent(`Regarding ${author.name}`)}`}
        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--line)] text-accent transition hover:bg-[var(--accent-soft)]"
        aria-label={`Email about ${author.name}`}
      >
        <IconEmail className="h-[18px] w-[18px]" />
      </a>
    </div>
  );
}

export function ProfileCopy({ author }: { author: Author }) {
  return (
    <>
      <Link
        href="/about#who-we-are"
        className="inline-flex items-center gap-1.5 text-sm text-muted transition hover:text-accent"
      >
        <span aria-hidden className="text-base leading-none">
          ←
        </span>
        Who we are
      </Link>

      <div className="mt-6 flex flex-wrap items-center gap-4">
        <h1 className="text-4xl font-medium tracking-tight text-ink md:text-5xl">
          {author.name}
        </h1>
        <ProfileSocial author={author} />
      </div>

      <p className="mt-4 max-w-xl text-muted leading-relaxed">{author.profession}</p>

      <div className="mt-10 grid gap-8 sm:grid-cols-2">
        <ProfileList title="Expertise" items={author.expertise} />
        <ProfileList title="Education" items={author.education} />
        {author.languages ? (
          <ProfileList title="Languages" items={author.languages} />
        ) : null}
        {author.country ? (
          <ProfileList title="Country" items={[author.country]} />
        ) : null}
      </div>

      <p className="mt-10 max-w-xl text-sm leading-relaxed text-muted">{author.bio}</p>
    </>
  );
}
