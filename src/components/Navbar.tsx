import React from 'react';
import IconButton from './Atom/IconButton';
import { MdInfo } from 'react-icons/md';
import { BsFillGearFill } from 'react-icons/bs';
import { IoStatsChartSharp } from 'react-icons/io5';

function Navbar() {
  return (
    <div className="sticky top-0 dark:bg-zinc-800 bg-blue-500 p-2 text-white">
      <div className="max-w-2xl mx-auto flex justify-between items-center">
        <IconButton>
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
  );
}

export default Navbar;
