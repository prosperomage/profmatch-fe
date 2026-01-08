import Link from "next/link";
import { PageLayout, Container } from "@/components/layout";
import { Button } from "@/components/ui";

export default function NotFound() {
  return (
    <PageLayout>
      <Container className="flex min-h-[60vh] flex-col items-center justify-center py-12">
        <div className="text-center">
          <p className="mb-2 text-6xl font-bold text-primary">404</p>
          <h1 className="mb-4 text-2xl font-semibold text-text-primary">
            Page Not Found
          </h1>
          <p className="mb-8 max-w-md text-text-secondary">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
          <Link href="/">
            <Button>Back to Home</Button>
          </Link>
        </div>
      </Container>
    </PageLayout>
  );
}