"use client";

import { MenuData } from "./MenuData";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";

export function NavMenu() {
  const pathname = usePathname();

  const getActiveIndex = () => {
    return MenuData.findIndex((item) => item.href === pathname);
  };

  return (
    <nav className="min-w-[300px] h-full bg-[#31323E] py-10 px-5 pr-0 relative shadow-inset z-20">
      <Image src="/logo.svg" alt="logo" width={70} height={70} />
      <ul className="flex flex-col mt-10 gap-8 relative z-10">
        {MenuData.map((item) => (
          <li key={item.id} className="cursor-pointer">
            <Link
              href={item.href}
              className="flex items-center gap-[10px] pl-5 h-[50px] rounded-l-[20px]"
            >
              <div className="relative w-6 h-6">
                <motion.div
                  className="absolute inset-0"
                  initial={{ opacity: pathname === item.href ? 1 : 0 }}
                  animate={{
                    opacity: pathname === item.href ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <Image
                    src={item.activeSrc}
                    alt={item.title}
                    width={24}
                    height={24}
                  />
                </motion.div>
                <motion.div
                  className="absolute inset-0"
                  initial={{ opacity: pathname === item.href ? 0 : 1 }}
                  animate={{
                    opacity: pathname === item.href ? 0 : 1,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <Image
                    src={item.src}
                    alt={item.title}
                    width={24}
                    height={24}
                  />
                </motion.div>
              </div>
              <motion.p
                className="text-[20px]"
                initial={{
                  color: pathname === item.href ? "#1E202C" : "#BFC0D1",
                }}
                animate={{
                  color: pathname === item.href ? "#1E202C" : "#BFC0D1",
                }}
                transition={{ duration: 0.3 }}
              >
                {item.title}
              </motion.p>
            </Link>
          </li>
        ))}
      </ul>

      <motion.div
        className="absolute bg-[#BFC0D1] rounded-l-[20px] z-0"
        layoutId="activeTab"
        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
        style={{
          width: "calc(100% - 20px)",
          height: "50px",
          top: `${getActiveIndex() * 82 + 150}px`,
          left: "20px",
        }}
      />
    </nav>
  );
}
