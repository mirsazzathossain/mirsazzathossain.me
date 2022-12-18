import ResourceCard from "components/ResourceCard";
import { server } from "config";

export default async function ListResources() {
  const resources: Resource[] = await fetch(`${server}/api/resources`).then(
    (res) => res.json()
  );

  const categorizedResources = resources.reduce(
    (acc: any, resource: Resource) => {
      if (acc[resource.category]) {
        acc[resource.category].push(resource);
      } else {
        acc[resource.category] = [resource];
      }
      return acc;
    },
    {}
  );

  return (
    <>
      {Object.keys(categorizedResources).map((category) => (
        <div key={category}>
          <h2 className="font-bold text-xl md:text-2xl tracking-tight mt-8 text-black dark:text-white underline underline-offset-8 decoration-4 decoration-green-300">
            {category}
          </h2>
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 my-2 w-full mt-6 max-w-3xl">
            {categorizedResources[category].map((resource: Resource) => (
              <ResourceCard key={resource.url} resource={resource} />
            ))}
          </div>
        </div>
      ))}
    </>
  );
}
