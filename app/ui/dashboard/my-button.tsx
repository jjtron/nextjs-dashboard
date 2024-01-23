import clsx from "clsx";
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function Mybutton({varble1, varble2} : {varble1: string; varble2: string}) {
  return <div className={`${varble1}`}>
    {usePathname()}
    <div className={
      clsx(
        'font-medium',
        {
          'bg-sky-100': varble2 === usePathname(),
        }
      )
    }><Link href={varble2}><p className="md:block">My Link</p></Link></div>
  </div>;
}
