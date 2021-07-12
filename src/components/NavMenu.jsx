export const NavMenu = () => {
  return (
    <div className="flex w-full h-full max-w-xs p-4 bg-gray-800">
      <ul className="flex flex-col w-full">
        <li className="my-px">
          <a
            href="#"
            className="flex flex-row items-center h-12 px-4 rounded-lg text-gray-600 bg-gray-100">
            <span className="flex items-center justify-center text-lg text-gray-500">
            </span>
            <img></img>
            <span className="">Style List</span>
          </a>
        </li>
        <li class="my-px">
          <span class="flex font-medium text-sm text-gray-400 px-4 my-4 uppercase">Add New Style</span>
        </li>
        <li class="my-px">
          <span class="flex font-medium text-sm text-gray-400 px-4 my-4 uppercase">Log Out</span>
        </li>
      </ul>
    </div>
  )
}