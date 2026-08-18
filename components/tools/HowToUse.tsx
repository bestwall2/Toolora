export function HowToUse({ steps, title = 'How to use' }: { steps: string[]; title?: string }) {
  return (
    <section className="mt-10">
      <h2 className="text-xl font-semibold text-foreground mb-4">{title}</h2>
      <ol className="space-y-3">
        {steps.map((step, i) => (
          <li key={i} className="flex items-start gap-3">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-semibold flex items-center justify-center mt-0.5">
              {i + 1}
            </span>
            <p className="text-sm text-muted-foreground leading-relaxed pt-0.5">{step}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
