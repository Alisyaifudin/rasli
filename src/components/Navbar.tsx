import React, { useState } from 'react';
import IconButton from './Atom/IconButton';
import { MdInfo } from 'react-icons/md';
import { BsFillGearFill } from 'react-icons/bs';
import { IoStatsChartSharp } from 'react-icons/io5';
import Info from './Info';
import ThemeModeBtn from './ThemeModeBtn';
import Setting from './Setting';
import { useAppSelector } from '~/redux/app/hooks';

function Navbar() {
  const version = useAppSelector(state=> state.meta.version)
  const [openInfo, setOpenInfo] = useState(false);
  const [openSetting, setOpenSetting] = useState(false);
  const [openStats, setOpenStats] = useState(false);

  const handleClickInfo = () => setOpenInfo(true);
  const handleCloseInfo = () => setOpenInfo(false);

  const handleClickSetting = () => setOpenSetting(true);
  const handleCloseSetting = () => setOpenSetting(false);

  return (
    <>
      <div className="sticky top-0 dark:bg-zinc-800 bg-blue-500 p-2 text-white">
        <div className="max-w-2xl mx-auto flex justify-between items-center">
          <div className="flex gap-2">
            <IconButton onClick={handleClickInfo}>
              <MdInfo fontSize={26} />
            </IconButton>
            <ThemeModeBtn />
          </div>
          <div className="flex text-sm items-end overflow-hidden">
            <h1 className="overflow-hidden text-ellipsis font-extrabold text-4xl ">
              RASLI
            </h1>
            <p className="overflow-hidden text-ellipsis">v{version}</p>
          </div>
          <div className="flex">
            <IconButton>
              <IoStatsChartSharp fontSize={26} />
            </IconButton>
            <IconButton onClick={handleClickSetting}>
              <BsFillGearFill fontSize={26} />
            </IconButton>
          </div>
        </div>
      </div>
      <Info open={openInfo} onClose={handleCloseInfo} />
      <Setting open={openSetting} onClose={handleCloseSetting} />
    </>
  );
}

export default Navbar;
