import { Container } from "components/Container";
import PublicationCard from "components/PublicationCard";

const publications = [
  {
    title:
      "A new approach to the analysis of the effects of the COVID-19 pandemic on the economy",
    date: "September 20, 2021",
    description: (
      <>
        <p>
          <b>Mir Sazzat Hossain*</b>, Sugandha Roy, KMB Asad, A K M Mahbubur
          Rahman, M Ashraful Amin, Amin Ahsan Ali and Arshad Momen, in
          proceedings of the{" "}
          <i>
            <b>
              {" "}
              2021 IEEE International Conference on Big Data (Big Data 2021)
            </b>
          </i>
          , 2021.
        </p>
      </>
    ),
    codeURL: "#",
    paperURL: "https://ieeexplore.ieee.org/document/9509059",
  },
];

export default function Publications() {
  return (
    <Container className="mt-9">
      <div className="max-w-3xl">
        <h3 className="font-bold text-2xl md:text-4xl tracking-tight mb-6 text-zinc-800 dark:text-zinc-100">
          Publications
        </h3>

        {publications.map((publication) => (
          <PublicationCard key={publication.title} publication={publication} />
        ))}
      </div>
    </Container>
  );
}
