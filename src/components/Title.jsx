import { Typography } from '@mui/material'
import {motion} from "framer-motion"
import React, { useContext } from 'react';
import { Context } from '../Context/ContextAPI';

function Title({title,name}) {

  const {  setHovering } = useContext(Context);
  return (
    <motion.div
    initial={{ opacity:0 }}
            whileInView={{ opacity:1 }}
            viewport={{ once: true }}
            transition={{ duration: 2,type:"spring"  }} 
    >
    <Typography onMouseEnter={()=>setHovering(true)} onMouseLeave={()=>setHovering(false)} name={name} variant='h2' sx={{fontFamily:"neue-regular",margin:"16rem 6.4rem 2rem 6.4rem"}}>{title}</Typography>
    </motion.div>
  )
}

export default Title