import { createContext } from "react";
import useToggle from "../hooks/useToggle";

const ToggleContext = createContext({});

export const ToggleProvider = ({ children }) => {
  const [postModal, setPostModal] = useToggle(false)
  const [searchModal, setSearchModal] = useToggle(false)
  const [deleteModal, setDeleteModal] = useToggle(false)
  const [postCountToggle, setPostCountToggle] = useToggle(true);
  const [followingToggle, setFollowingToggle] = useToggle(false);
  const [followersToggle, setFollowersToggle] = useToggle(false);

  return (
    <ToggleContext.Provider
      value={{
        postCountToggle, setPostCountToggle, followingToggle, setFollowingToggle, followersToggle, setFollowersToggle,
        postModal, setPostModal, searchModal, setSearchModal, deleteModal, setDeleteModal
      }}>
      {children}
    </ToggleContext.Provider>
  );
};

export default ToggleContext;