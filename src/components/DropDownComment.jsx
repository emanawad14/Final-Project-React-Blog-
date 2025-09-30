
// import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Spinner } from '@heroui/react'
// import { useState } from 'react';
// import toast from 'react-hot-toast';
// import { deleteCommentApi } from '../services/CommentServices';

// export default function DropDownPost({ onEdit, onDelete, commentId, callback }) {
//   const [loading, setLoading] = useState(false);

//   async function deleteComment(commentId) {
//     setLoading(true);
//     try {
//       const response = await deleteCommentApi(commentId);
//       if (response.message === "success") {
//         toast.success("Comment deleted successfully");
//         await callback(); // يحدث الكومنتات بعد المسح
//       } else {
//         toast.error("Failed to delete comment");
//       }
//     } catch (error) {
//       toast.error("Error deleting comment");
//     }
//     setLoading(false);
//   }

//   return (
//     <>
//       {loading ? (
//         <Spinner />
//       ) : (
//         <Dropdown>
//           <DropdownTrigger>
//             <svg
//               className="w-6 cursor-pointer"
//               xmlns="http://www.w3.org/2000/svg"
//               width="27"
//               height="27"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="#b0b0b0"
//               strokeWidth="2"
//               strokeLinecap="square"
//               strokeLinejoin="round"
//             >
//               <circle cx="12" cy="12" r="1"></circle>
//               <circle cx="19" cy="12" r="1"></circle>
//               <circle cx="5" cy="12" r="1"></circle>
//             </svg>
//           </DropdownTrigger>
//           <DropdownMenu aria-label="Post Actions">
//             <DropdownItem key="edit" onClick={onEdit}>
//               Edit
//             </DropdownItem>
//             <DropdownItem
//               key="delete"
//               color="danger"
//               className="text-danger"
//               onClick={() => deleteComment(commentId)}
//             >
//               Delete
//             </DropdownItem>
//           </DropdownMenu>
//         </Dropdown>
//       )}
//     </>
//   );
// }




import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Spinner,
} from "@heroui/react";
import { useState } from "react";
import toast from "react-hot-toast";
import { deleteCommentApi } from "../services/CommentServices";

export default function DropDownComment({ commentId, callback }) {
  const [loading, setLoading] = useState(false);

  async function deleteComment() {
    setLoading(true);
    try {
      const response = await deleteCommentApi(commentId);
      if (response.message === "success") {
        toast.success("Comment deleted successfully");
        await callback();
      } else {
        toast.error("Failed to delete comment");
      }
    } catch (error) {
      toast.error("Error deleting comment");
    }
    setLoading(false);
  }

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <Dropdown>
          <DropdownTrigger>
            <svg
              className="w-6 cursor-pointer"
              xmlns="http://www.w3.org/2000/svg"
              width="27"
              height="27"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#b0b0b0"
              strokeWidth="2"
              strokeLinecap="square"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="1"></circle>
              <circle cx="19" cy="12" r="1"></circle>
              <circle cx="5" cy="12" r="1"></circle>
            </svg>
          </DropdownTrigger>
          <DropdownMenu aria-label="Comment Actions">
            <DropdownItem
              key="delete"
              color="danger"
              className="text-danger"
              onClick={deleteComment}
            >
              Delete
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      )}
    </>
  );
}
