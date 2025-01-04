import MarqueeY from "@/components/marquee";
import SigninPage from "@/components/sign-in";
import Image from "next/image";

export const metadata = {
  title: "Bu Desk 👻 | Login ",
};

const marqueeText =
  "keep coming • spooky finances no more • keep coming • spooky crypto no more • keep coming • spooky invoicing no more • keep coming • spooky projects no more • ";
const showPath = "/login";

export default function LoginSection() {
  return (
    <div className="flex w-full flex-col md:flex-row bg-[linear-gradient(to_right,#80808033_1px,transparent_1px),linear-gradient(to_bottom,#80808033_1px,transparent_1px)] bg-[size:70px_70px] dark:bg-gray-900">
      <div className="hidden md:relative md:flex min-h-[450px] w-full flex-col items-center justify-center border-2 border-black dark:border-gray-700 bg-blue-200 dark:bg-slate-800 p-10 md:min-h-[calc(100dvh-80px)] bg-[linear-gradient(to_right,#80808033_1px,transparent_1px),linear-gradient(to_bottom,#80808033_1px,transparent_1px)] bg-[size:70px_70px]">
        <MarqueeY text={marqueeText} className="left-0 bg-green-1000 dark:bg-gray-900" />
        <div className="flex max-w-[550px] flex-col gap-10">
          {/* biome-ignore lint/style/useSelfClosingElements: <explanation> */}
          <div className="flex flex-col gap-4"></div>
        </div>
        <Image
          src="/images/example.png"
          alt="example"
          width={546}
          height={563}
        />
      </div>
      <div className="flex min-h-[450px] w-full flex-col items-center justify-center border-2 border-black dark:border-gray-700 bg-yellow-200 dark:bg-yellow-900 md:min-h-[calc(100dvh-80px)]">
        <SigninPage />
      </div>
    </div>
  );
}
