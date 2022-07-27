import React, { useState } from 'react';
import IconButton from './Atom/IconButton';
import { MdInfo } from 'react-icons/md';
import { BsFillGearFill } from 'react-icons/bs';
import { IoStatsChartSharp } from 'react-icons/io5';
import Info from './Info';

function Navbar() {
  const [openInfo, setOpenInfo] = useState(false);
  const [openSettings, setOpenSettings] = useState(false);
  const [openStats, setOpenStats] = useState(false);

  const handleClickInfo = () => {
    setOpenInfo(true);
  }
  const handleCloseInfo = () => {
    setOpenInfo(false);
  }

  return (
    <>
      <div className="sticky top-0 dark:bg-zinc-800 bg-blue-500 p-2 text-white">
        <div className="max-w-2xl mx-auto flex justify-between items-center">
          <IconButton onClick={handleClickInfo}>
            <MdInfo fontSize={26} />
          </IconButton>
          <div className="flex text-sm items-end">
            <h1 className="font-extrabold text-4xl">RASLI</h1>
            <p>v0.3.0</p>
          </div>
          <div className="flex">
            <IconButton>
              <IoStatsChartSharp fontSize={26} />
            </IconButton>
            <IconButton>
              <BsFillGearFill fontSize={26} />
            </IconButton>
          </div>
        </div>
      </div>
      <Info open={openInfo} onClose={handleCloseInfo}/>
    </>
  );
}

export default Navbar;
