import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto max-w-[1200px] px-6 py-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-text-secondary">
            &copy; {new Date().getFullYear()} ProfMatch. All rights reserved.
          </p>

          <nav className="flex items-center gap-6">
            <Link
              href="/privacy"
              className="text-sm text-text-secondary transition-colors hover:text-primary"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="text-sm text-text-secondary transition-colors hover:text-primary"
            >
              Terms
            </Link>
            <Link
              href="/contact"
              className="text-sm text-text-secondary transition-colors hover:text-primary"
            >
              Contact
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}