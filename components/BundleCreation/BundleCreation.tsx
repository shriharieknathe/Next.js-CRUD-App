"use client";
import { useEffect, useState } from "react";
import "./BundleCreation.scss";
import PlusIcon from "../../components/assets/PlusIcon";
import ListCard from "../ListCard/ListCard";
import { useRouter } from "next/navigation";

// Update the Bundle type to reflect the change from 'status' to 'condition'
export type Bundle = {
  _id: string;
  name: string;
  items: string[];
  object_type: string;
  condition: string; // Rename 'status' to 'condition'
  publish_date: string | null;
  created_by: string;
};

const BundleCreation = () => {
  const [bundleList, setBundleList] = useState<Bundle[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchBundles = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/bundles", {
          cache: "no-store",
        });

        if (!res.ok) {
          throw new Error("Failed to fetch bundles");
        }

        const data = await res.json();
        setBundleList(data.bundles || []); // Assuming response contains a `bundles` array
      } catch (error) {
        console.error("Error loading bundles: ", error);
      }
    };

    fetchBundles();
  }, []);

  const handleCreateNewObject = () => {
    router.push("/addBundle");
  };

  // Function to handle bundle deletion
  const handleDeleteBundle = async (id: string) => {
    const confirmed = confirm("Are you sure you want to delete this bundle?");
    if (confirmed) {
      try {
        const res = await fetch(`http://localhost:3000/api/bundles?id=${id}`, {
          method: "DELETE",
        });

        if (res.ok) {
          // Update the bundleList state to remove the deleted bundle
          setBundleList((prev) => prev.filter((bundle) => bundle._id !== id));
        } else {
          console.error("Failed to delete the bundle.");
          alert("Error deleting the bundle. Please try again.");
        }
      } catch (error) {
        console.error("Error deleting the bundle: ", error);
      }
    }
  };

  return (
    <div className="dashboard_container">
      <div className="header">
        <div className="title">Object Listing</div>
        <div className="button_section" onClick={handleCreateNewObject}>
          <PlusIcon />
          <div className="text">Create new Object</div>
        </div>
      </div>
      <div className="data_listing_container">
        {bundleList.map((data: Bundle) => (
          <ListCard
            key={data._id}
            bundle={data}
            onDelete={handleDeleteBundle}
          />
        ))}
      </div>
    </div>
  );
};

export default BundleCreation;
