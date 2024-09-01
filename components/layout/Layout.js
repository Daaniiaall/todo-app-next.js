import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

import { LiaListSolid } from "react-icons/lia";
import { MdAddToPhotos } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { LuLogOut } from "react-icons/lu";

function Layout({children}) {

  const {status} = useSession();

  const logOutHandler = () =>{signOut()}

  return (
    <div className="container">
      <header>
        <p>Todo App | <a href="https://github.com/Daaniiaall" target="_blank" rel="noreferrer">Danial Momenpour</a></p>
        {status === "authenticated" ? <button onClick={logOutHandler}> Log out <LuLogOut /> </button> : null}
      </header>
      <div className="container--main">
        <aside>
          <p>welcome 👋</p>
          <ul>
            <li>
              <LiaListSolid />
              <Link href="/">Todos</Link>
            </li>
            <li>
              <MdAddToPhotos />
              <Link href="/add-todo">Add Todo</Link>
            </li>
            <li>
              <CgProfile />
              <Link href="/profile">Profile</Link>
            </li>
          </ul>
        </aside>
        <section>{children}</section>
      </div>
    </div>
  );
}

export default Layout;
