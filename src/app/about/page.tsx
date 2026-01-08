import { Metadata } from "next";
import { PageLayout, Container } from "@/components/layout";

export const metadata: Metadata = {
  title: "About - ProfMatch",
  description: "Learn about ProfMatch and how it helps students find research supervisors.",
};

export default function AboutPage() {
  return (
    <PageLayout>
      <Container className="py-12 md:py-20">
        <div className="mx-auto max-w-2xl">
          <h1 className="mb-6 text-3xl font-semibold text-text-primary md:text-4xl">
            About ProfMatch
          </h1>

          <div className="space-y-6 text-text-secondary">
            <p className="text-lg">
              ProfMatch is an intelligent matching system designed to connect
              prospective postgraduate students with university professors whose
              research interests align with their academic background and goals.
            </p>

            <section>
              <h2 className="mb-3 text-xl font-semibold text-text-primary">
                The Problem
              </h2>
              <p>
                Prospective postgraduate students often struggle to identify
                suitable research supervisors due to the time-consuming nature of
                manually researching professor profiles, publications, and
                research interests across multiple platforms. This leads to
                suboptimal matches, wasted application efforts, and missed
                opportunities for meaningful research collaboration.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold text-text-primary">
                Our Solution
              </h2>
              <p>
                ProfMatch automates the discovery and matching process by
                aggregating professor data from Google Scholar, university
                websites, and research databases. We analyze this information
                against your CV and stated research interests to produce ranked
                recommendations with detailed justifications.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold text-text-primary">
                How It Works
              </h2>
              <ol className="list-inside list-decimal space-y-2">
                <li>Enter your target university name or URL</li>
                <li>Describe your research interests</li>
                <li>Upload your CV or resume</li>
                <li>
                  Our system analyzes faculty profiles and matches them to your
                  background
                </li>
                <li>
                  Receive ranked recommendations with explanations of why each
                  professor is a good fit
                </li>
              </ol>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold text-text-primary">
                Privacy
              </h2>
              <p>
                We take your privacy seriously. Your uploaded documents are
                processed securely and are not stored beyond your active session.
                All session data is automatically purged after 24 hours.
              </p>
            </section>
          </div>
        </div>
      </Container>
    </PageLayout>
  );
}