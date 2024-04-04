import React, { useState } from "react";
import CustomModal from "./CustomModal";
function ProjectCard({
  name,
  img,
  tech,
  enabled,
  sequence,
  detail,
  github,
  liveUrl,
}) {
  const [open, setOpen] = useState(false);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  return (
    <div className="w-full">
      <div
        className={`${Styles.card} h-56 overflow-hidden relative flex justify-between items-end cursor-pointer p-2 w-full`}
      >
        <div
          className={`${Styles.card_img} bg-contain bg-no-repeat bg-[50%_50%] w-full h-full absolute z-[1] left-0 top-0 transition-all duration-[0.3s]`}
          style={{ backgroundImage: `url(${img})` }}
        ></div>
        <div
          className={`${Styles.card_box} flex justify-center items-center z-[2] relative overflow-hidden flex-col backdrop-blur-[5px] translate-x-[0%] translate-y-[20%] opacity-0 p-4`}
        >
          <p>{name}</p>
        </div>
        <div
          className={`${Styles.card_box} flex justify-center items-center z-[2] relative overflow-hidden flex-col backdrop-blur-[5px] translate-x-[0%] translate-y-[20%] opacity-0 p-4`}
          onClick={onOpenModal}
        >
          <i className="fa-solid fa-eye text-2xl text-black dark:text-white"></i>
        </div>
      </div>
      <CustomModal
        open={open}
        onCloseModal={onCloseModal}
        name={name}
        img={img}
        tech={tech}
        detail={detail}
        liveUrl={liveUrl}
        github={github}
        enabled-={enabled}
        sequence={sequence}
      />
    </div>
  );
}

export default ProjectCard;