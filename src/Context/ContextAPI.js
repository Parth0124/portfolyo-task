import React, { createContext, useState} from 'react'

export const Context = createContext()

function ContextApi({children}) {

  const [open, setOpen]=useState(false);
  const [modalOpen, setModalOpen]=useState(false);
  const [apiData, setApidata]=useState([false]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hovering, setHovering] = useState(false);
  const [currProject, setCurrentProject] = useState(null);

  return (
    <Context.Provider value={{open, setOpen,apiData, setApidata,loading, setLoading,error, setError,hovering, setHovering,currProject, setCurrentProject,modalOpen, setModalOpen }}>
      {children}
    </Context.Provider>
  )
}

export default ContextApi