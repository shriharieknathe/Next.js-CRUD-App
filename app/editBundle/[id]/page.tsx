import AddBundle from "@/components/AddBundle/AddBundle.";

const getBundleById = async (id: string) => {
  try {
    const res = await fetch(`http://localhost:3000/api/bundles/${id}`, {
      cache: "no-store", // This ensures fresh data on each request
    });

    if (!res.ok) {
      throw new Error("Failed to fetch bundle");
    }

    return res.json(); // Return the fetched data
  } catch (error) {
    console.error(error);
    return null; // Return null in case of an error
  }
};

export default async function EditBundle({ params }: any) {
  const { id } = params; // Extract the ID from the parameters
  const bundleData = await getBundleById(id); // Fetch bundle data by ID

  if (!bundleData) {
    return <div>Error loading bundle or no bundle found</div>; // Handle error case
  }

  return (
    <div>
      <AddBundle existingBundle={bundleData.bundle} isEditMode={true} />
    </div>
  );
}
