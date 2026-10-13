import type { Metadata } from "next";
import { Reveal } from "@/components/Reveal";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Privacy",
  description: "Privacy policy for Carbon Sense.",
};

export default function PrivacyPage() {
  return (
    <div className="pt-[72px]">
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-2xl px-5 md:px-8">
          <Reveal>
            <h1 className="display text-4xl text-ink">Privacy</h1>
            <div className="mt-8 space-y-4 text-muted leading-relaxed">
              <p>
                Carbon Sense is an independent publication. We aim to collect as little personal
                data as necessary to operate the site and newsletter.
              </p>
              <p>
                Newsletter subscriptions are handled by Substack under their privacy practices.
                Emails you send to {site.email} are used only to respond to your enquiry.
              </p>
              <p>
                The site may use standard hosting analytics (for example Vercel) that process
                technical logs such as IP address, user agent, and pages visited to keep the service
                reliable and secure.
              </p>
              <p>
                Questions about privacy:{" "}
                <a className="text-accent underline-offset-4 hover:underline" href={`mailto:${site.email}`}>
                  {site.email}
                </a>
                .
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
