export default function SectionIntro({ title, text }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[0.6fr_1.4fr] gap-10 mb-14">
      <h2 className="font-display font-medium text-3xl">{title}</h2>
      <p className="text-inkdim max-w-[56ch]">{text}</p>
    </div>
  );
}
