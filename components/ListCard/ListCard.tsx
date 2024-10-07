"use client";
import { useRouter } from "next/navigation";
import EditIcon from "../assets/EditIcon";
import TrashIcon from "../assets/TrashIcon";
import { Bundle } from "../BundleCreation/BundleCreation";
import "./ListCard.scss";

export type BundlePropType = {
  bundle: Bundle;
  onDelete: (id: string) => void;
};

const ListCard = ({ bundle, onDelete }: BundlePropType) => {
  const router = useRouter();

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "Not Published";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB");
  };

  // Truncate object ID to 7 characters
  const truncatedObjectId = bundle._id.slice(0, 7);

  const handleEdit = () => {
    router.push(`/editBundle/${bundle._id}`);
  };

  return (
    <div className="list_wrapper">
      <div className="info_wrapper">
        <div className="info_section">
          <div className="info">Object Type: {bundle.object_type}</div>
          <div className="info">Created By: {bundle.created_by}</div>
          <div className="info">
            Published date: {formatDate(bundle.publish_date)}{" "}
            {/* Handle null and undefined */}
          </div>
        </div>
        <div className="button_section">
          <TrashIcon onClick={() => onDelete(bundle._id)} />{" "}
          {/* Call onDelete */}
          <EditIcon onClick={handleEdit} />
        </div>
      </div>
      <div className="chip_wrapper">
        <div className="title">{bundle.name}</div>
        <div className="chip">Object ID: {truncatedObjectId}</div>
      </div>
      <div className="status_wrapper">
        <div className="circle"></div>
        <div className="status">Pending</div>
      </div>
    </div>
  );
};

export default ListCard;
