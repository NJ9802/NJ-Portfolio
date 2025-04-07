type SectionProps = {
  id: string;
  first?: boolean;
  children: React.ReactNode;
};

const Section = ({ id, first, children }: SectionProps) => {
  return (
    <section id={id} className={first ? "" : "mt-20 sm:mt-28 md:mt-36"}>
      {children}
    </section>
  );
};

export default Section;
