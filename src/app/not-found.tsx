import Link from "next/link";
import { PageLayout, Container } from "@/components/layout";
import { Button } from "@/components/ui";

export default function NotFound() {
  return (
    <PageLayout>
      <Container className="flex min-h-[70vh] flex-col items-center justify-center py-12">
        <div className="text-center">
          {/* Decorative illustration */}
          <div className="mb-8 flex items-center justify-center">
            <div className="relative">
              <div className="text-[10rem] font-bold leading-none tracking-tighter text-primary/10 md:text-[14rem]">
                404
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <svg
                  className="h-24 w-24 text-primary/60 md:h-32 md:w-32"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.2}
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
                  />
                </svg>
              </div>
            </div>
          </div>

          <h1 className="mb-3 text-2xl font-semibold text-text-primary md:text-3xl">
            Lost in the stacks
          </h1>
          <p className="mx-auto mb-8 max-w-md text-text-secondary">
            The page you&apos;re looking for doesn&apos;t exist or has been
            moved. Let&apos;s get you back to finding the right professor.
          </p>

          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link href="/">
              <Button size="lg">Back to Home</Button>
            </Link>
            <Link href="/about">
              <Button variant="outline" size="lg">
                Learn About ProfMatch
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </PageLayout>
  );
}
