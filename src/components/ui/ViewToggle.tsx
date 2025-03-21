// import { MdOutlineCalendarViewDay } from "react-icons/md";

// export default function ViewToggle() {
//   return (
//     <button className="flex items-center gap-0.5 border border-gray-300 px-6 py-2 rounded cursor-pointer">
//       <span className="text-lg">
//         <MdOutlineCalendarViewDay />
//       </span>
//       View
//     </button>
//   );
// }

import { MdOutlineCalendarViewDay } from "react-icons/md";
import IconButton from "./IconButton";

export default function ViewToggle() {
  return (
    <IconButton icon={<MdOutlineCalendarViewDay />} label="View" bordered />
  );
}
