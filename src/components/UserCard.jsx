// export default function UserCard({ user }) {
//   console.log("UserCard render:", user.name);
//   return (
//     <div style={{ border: "1px solid #ccc", margin: "4px", padding: "4px" }}>
//       <p>{user.name}</p>
//       <p>{user.role}</p>
//     </div>
//   );
// }


import React from "react";

const UserCard = React.memo(function UserCard({ user }) {
  console.log("UserCard render:", user.name);
  return (
    <div style={{ border: "1px solid #ccc", margin: "4px", padding: "4px" }}>
      <p>{user.name}</p>
      <p>{user.role}</p>
    </div>
  );
});

export default UserCard;
