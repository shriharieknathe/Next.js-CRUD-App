"use client";
import { useState, useEffect } from "react";
import "./AddBundle.scss";
import { useRouter } from "next/navigation";
import { Bundle } from "../BundleCreation/BundleCreation";

const itemOptions = [
  "Sunscreen SPF 50",
  "Beach Towel",
  "Sunglasses",
  "Woolen Scarf",
  "Thermal Socks",
  "Gloves",
  "Yoga Mat",
  "Dumbbells",
  "Resistance Bands",
];

type addBundleType = {
  existingBundle?: Bundle; // Make this optional
  isEditMode?: boolean; // Make this optional
};

const AddBundle = ({ existingBundle, isEditMode = false }: addBundleType) => {
  const [formData, setFormData] = useState({
    name: "",
    items: [] as string[], // Ensure items is an array
    object_type: "Bundle",
    condition: "Virtual", // Default to Virtual
    created_by: "Jill Boarne",
  });

  console.log("formData-->>>", formData);

  const router = useRouter();

  // Pre-fill form if editing an existing bundle
  useEffect(() => {
    if (isEditMode && existingBundle) {
      console.log("Existing Bundle:", existingBundle); // Debugging
      setFormData({
        name: existingBundle.name || "", // Default to empty string if undefined
        items: existingBundle.items || [], // Default to empty array if undefined
        object_type: existingBundle.object_type || "Bundle",
        condition: existingBundle.condition || "Virtual", // Mapping condition instead of status
        created_by: existingBundle.created_by || "Jill Boarne",
      });
    }
  }, [existingBundle, isEditMode]); // Dependency on existingBundle and isEditMode

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleItemSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedItem = e.target.value;
    if (!formData.items.includes(selectedItem)) {
      setFormData({ ...formData, items: [...formData.items, selectedItem] });
    }
  };

  const removeItem = (item: string) => {
    setFormData({
      ...formData,
      items: formData.items.filter((i) => i !== item),
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate form data
    if (!formData.name || formData.items.length === 0) {
      alert("Bundle name and at least one item are required.");
      return;
    }

    const submissionData = {
      ...formData,
      publish_date: new Date().toISOString(),
    };

    try {
      const url = isEditMode
        ? `http://localhost:3000/api/bundles/${existingBundle?._id}` // Safely access _id
        : "http://localhost:3000/api/bundles";
      const method = isEditMode ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(submissionData),
      });

      if (res.ok) {
        router.push("/");
      } else {
        throw new Error(
          isEditMode ? "Failed to update bundle" : "Failed to create bundle"
        );
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error submitting form. Please try again.");
    }
  };

  return (
    <div className="form_container_wrapper">
      <div className="form_container">
        <h2>{isEditMode ? "Edit Bundle" : "Create New Bundle"}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form_field">
            <label>Bundle Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form_field">
            <label>Select Items</label>
            <select onChange={handleItemSelect} value="">
              <option value="" disabled>
                -- Select Items --
              </option>
              {itemOptions.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
            <div className="chip_container">
              {formData.items.map((item, index) => (
                <div key={index} className="chip">
                  {item}
                  <span onClick={() => removeItem(item)}>✖</span>
                </div>
              ))}
            </div>
          </div>

          <div className="form_field">
            <label>Object Type</label>
            <div className="radio_group">
              <label>
                <input
                  type="radio"
                  name="object_type"
                  value="Item"
                  checked={formData.object_type === "Item"}
                  onChange={handleChange}
                />
                Item
              </label>
              <label>
                <input
                  type="radio"
                  name="object_type"
                  value="Bundle"
                  checked={formData.object_type === "Bundle"}
                  onChange={handleChange}
                />
                Bundle
              </label>
            </div>
          </div>

          <div className="form_field">
            <label>Condition</label>
            <select
              name="condition"
              value={formData.condition}
              onChange={handleChange}
              required
            >
              <option value="Virtual">Virtual</option>
              <option value="Pre Packed">Pre Packed</option>
            </select>
          </div>

          <div className="form_field">
            <label>Created By</label>
            <input
              type="text"
              name="created_by"
              value={formData.created_by}
              disabled
            />
          </div>

          <button type="submit">{isEditMode ? "Update" : "Submit"}</button>
        </form>
      </div>
    </div>
  );
};

export default AddBundle;
