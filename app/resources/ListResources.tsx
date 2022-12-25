import ResourceCard from "components/ResourceCard";
import { promises as fs } from "fs";

// get resources from local file
async function getListResources(): Promise<Resource[]> {
  const res = await fs.readFile("content/resources.json", "utf-8");
  const resources: Resource[] = JSON.parse(res);
  return resources;
}

export default async function ListResources(): Promise<JSX.Element> {
  const resources: Resource[] = await getListResources();

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
