

const Header=()=>{

    return(
        <>
          <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
       
        <div className="flex items-center gap-3">
          <span className="text-xl font-bold text-blue-600">Naukarr.com</span>
        </div>
        <div className="flex items-center gap-14">
        <button
          onClick={() => console.log("Logout clicked")}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition"
        >
          Logout
        </button>
        </div>
      </div>
    </header>
        
        </>
    )
}
export default Header;