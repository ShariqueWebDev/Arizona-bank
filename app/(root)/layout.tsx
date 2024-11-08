import Image from "next/image";
import Sidebar from "../../components/Sidebar";
import MobilNav from "@/components/MobilNav";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const loggedIn = { firstName: "Sharique", lastName: "Shaikh" };
  return (
    <main className="flex h-screen w-full font-inter">
      <Sidebar user={loggedIn} />
      <div className="flex size-full flex-col">
        <div className="root-layout">
          <Image
            src={"/icons/logo.svg"}
            width={30}
            height={30}
            alt="menu icon"
          />
          <div className="">
            <MobilNav user={loggedIn} />
          </div>
        </div>
        {children}
      </div>
    </main>
  );
}
