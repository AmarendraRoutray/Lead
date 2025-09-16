

// function LogoutConfirm({ open, onClose, onConfirm }) {
//   if (!open) return null;

//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-[1000]">
//       <div className="bg-white rounded-lg shadow-lg p-6 w-80">
//         <h2 className="text-lg font-semibold mb-4">
//           Are you sure you want to logout?
//         </h2>
//         <div className="flex justify-end space-x-3">
//           <button
//             onClick={onClose}
//             className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
//           >
//             No
//           </button>
//           <button
//             onClick={onConfirm}
//             className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
//           >
//             Yes
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default LogoutConfirm;




function LogoutConfirm({ open, onClose, onConfirm }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-[1000] p-4">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-sm">
        <h2 className="text-lg font-semibold mb-4 text-center">
          Are you sure you want to logout?
        </h2>
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition"
          >
            No
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
}

export default LogoutConfirm;
