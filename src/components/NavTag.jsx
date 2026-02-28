export function NavTag({ tag }) {
  if (!tag) return null;

  const base =
    "inline-flex items-center px-[0.5rem] py-[0.1875rem] rounded-full text-[0.625rem] font-bold tracking-[0.05em] uppercase";

  const styles = {
    white: `${base} bg-white text-black`,
    green: `${base} bg-[#c3f967] text-black`,
    dim: `${base} bg-white/10 text-[#888] border border-white/10`,
  };

  return <span className={styles[tag.style] ?? styles.green}>{tag.label}</span>;
}
