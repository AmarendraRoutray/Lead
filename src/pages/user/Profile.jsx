const userName = "Mr. Admin";
const userEmail = "admin@gmail.com";
const userInitial = userName?.[0]?.toUpperCase() || "";

function Profile() {
  return (
    <section className="w-full">
      {/* Banner */}
      <div className="w-full h-48 bg-[#1877c1] rounded-t-2xl relative flex items-center justify-center">
        {/* Shadow circle right top (optional, for nice effect) */}
        <div className="absolute right-8 top-8 w-16 h-16 rounded-full bg-white/10 pointer-events-none" />
        <div className="absolute left-8 top-8 w-16 h-16 rounded-full bg-white/10 pointer-events-none" />
        {/* Avatar - big and absolute center */}
        <div className="absolute left-1/2 top-full -translate-x-1/2 -translate-y-1/2 z-20">
          <div className="w-36 h-36 rounded-full bg-[#bf3e19] flex items-center justify-center text-white text-[5rem] font-semibold border-4 border-white shadow-xl">
            {userInitial}
          </div>
        </div>
      </div>
      {/* Content below banner */}
      <div className="pt-24 flex flex-col items-center text-center">
        <div className="text-3xl font-bold">{userName}</div>
        <div className="text-gray-500 mt-1">{userEmail}</div>
        {/* Buttons row */}
        <div className="flex gap-4 mt-6">
          <button className="px-6 py-2 rounded-full border border-gray-300 font-medium hover:bg-gray-100 transition">
            Edit Profile
          </button>
          <button className="px-6 py-2 rounded-full bg-[#1877c1] text-white font-medium shadow hover:bg-blue-700 transition">
            My Leads
          </button>
          <button className="px-6 py-2 rounded-full bg-[#1877c1] text-white font-medium shadow hover:bg-blue-700 transition">
            My Referrals
          </button>
        </div>
      </div>
    </section>
  );
}


export default Profile;