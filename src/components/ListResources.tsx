import ResourceCard from "@/components/ResourceCard";

export default function ListResources({
  resources,
}: {
  resources: Resource[];
}): JSX.Element {
  const categorizedResources = resources.reduce(
    (acc: Record<string, Resource[]>, resource: Resource) => {
      if (acc[resource.category]) {
        acc[resource.category].push(resource);
      } else {
        acc[resource.category] = [resource];
      }
      return acc;
    },
    {},
  );

  return (
    <>
      {Object.keys(categorizedResources).map((category) => (
        <div key={category}>
          <h2 className="mt-8 text-xl font-bold tracking-tight text-black underline decoration-4 decoration-green-300 underline-offset-8 dark:text-white md:text-2xl">
            {category}
          </h2>
          <div className="my-2 mt-6 grid w-full max-w-3xl grid-cols-1 gap-4 sm:grid-cols-2">
            {categorizedResources[category].map((resource: Resource) => (
              <ResourceCard key={resource.url} resource={resource} />
            ))}
          </div>
        </div>
      ))}
    </>
  );
}
