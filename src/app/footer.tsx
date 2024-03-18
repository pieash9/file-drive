import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="py-5 bg-gray-100 dark:bg-[#020817] text-gray-800 dark:text-white mt-12 relative z-10">
      <div className="container mx-auto flex flex-col lg:flex-row justify-between items-center">
        <div className="text-center lg:text-left mb-4 lg:mb-0">
          <Link
            href="/"
            className="text-xl font-semibold flex gap-2 items-center"
          >
            <Image
              src="/logo.png"
              height={30}
              width={30}
              alt="file drive logo"
            />
            <p>
              File<span className="text-blue-500">Drive</span>
            </p>
          </Link>
          <p className="text-sm">Your file storage solution</p>
        </div>
        <div className="flex justify-center lg:justify-end space-x-6 relative z-10">
          <Link href="/#">
            <p className="hover:text-blue-500 dark:hover:text-blue-400">
              Privacy Policy
            </p>
          </Link>
          <Link href="/#">
            <p className="hover:text-blue-500 dark:hover:text-blue-400">
              Terms of Service
            </p>
          </Link>
          <Link href="/#">
            <p className="hover:text-blue-500 dark:hover:text-blue-400">
              About
            </p>
          </Link>
        </div>
      </div>

      <div className="mt-4 relative z-10">
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © {new Date().getFullYear()}
          <Link
            href="https://github.com/pieash9"
            target="_blank"
            className="hover:underline mx-2 text-blue-400 hover:text-blue-500"
          >
            Md. Pieash Ahmed
          </Link>
          All Rights Reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
