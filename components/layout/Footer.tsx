export function Footer({ brandName }: { brandName: string }) {
  return (
    <footer className="border-t border-[var(--color-border)] px-[var(--page-padding-x)] py-10 text-center text-sm text-[var(--color-text-secondary)]">
      {brandName} © 2026. Sales outsourcing and AI automation.
    </footer>
  );
}
