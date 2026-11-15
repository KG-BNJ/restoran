export function Placeholder({ title, text }: { title: string; text: string }) {
  return (
    <section className="px-4 py-16 md:px-[max(1.5rem,calc((100%-1000px)/2))] md:py-24">
      <h1 className="font-display text-4xl md:text-5xl">{title}</h1>
      <p className="mt-4 max-w-md text-muted">{text}</p>
    </section>
  );
}
