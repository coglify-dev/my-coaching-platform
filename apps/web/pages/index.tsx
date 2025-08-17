import type { GetServerSidePropsContext } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { useId } from "react";

import { getServerSession } from "@calcom/features/auth/lib/getServerSession";
import { Button } from "@calcom/ui";

import PageWrapper from "@components/PageWrapper";
import { Footer } from "@components/layouts/Footer";
import { Header } from "@components/layouts/Header";

interface HeroProps {
  title: string;
  description: string;
  buttonText: string;
}

function BackgroundIllustration(props: { className?: string }) {
  const id = useId();

  return (
    <div {...props}>
      <svg
        viewBox="0 0 1026 1026"
        fill="none"
        aria-hidden="true"
        className="animate-spin-slow absolute inset-0 h-full w-full">
        <path
          d="M1025 513c0 282.77-229.23 512-512 512S1 795.77 1 513 230.23 1 513 1s512 229.23 512 512Z"
          stroke="#D4D4D4"
          strokeOpacity="0.7"
        />
        <path
          d="M513 1025C230.23 1025 1 795.77 1 513"
          stroke={`url(#${id}-gradient-1)`}
          strokeLinecap="round"
        />
        <defs>
          <linearGradient
            id={`${id}-gradient-1`}
            x1="1"
            y1="513"
            x2="1"
            y2="1025"
            gradientUnits="userSpaceOnUse">
            <stop stopColor="text-gray-900" />
            <stop offset="1" stopColor="text-gray-900" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
      <svg
        viewBox="0 0 1026 1026"
        fill="none"
        aria-hidden="true"
        className="animate-spin-reverse-slower absolute inset-0 h-full w-full">
        <path
          d="M913 513c0 220.914-179.086 400-400 400S113 733.914 113 513s179.086-400 400-400 400 179.086 400 400Z"
          stroke="#D4D4D4"
          strokeOpacity="0.7"
        />
        <path
          d="M913 513c0 220.914-179.086 400-400 400"
          stroke={`url(#${id}-gradient-2)`}
          strokeLinecap="round"
        />
        <defs>
          <linearGradient
            id={`${id}-gradient-2`}
            x1="913"
            y1="513"
            x2="913"
            y2="913"
            gradientUnits="userSpaceOnUse">
            <stop stopColor="text-gray-900" />
            <stop offset="1" stopColor="text-gray-900" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

function Hero({ title, description, buttonText }: HeroProps) {
  const router = useRouter();
  return (
    <div className="overflow-hidden py-20 sm:py-32 lg:pb-32 xl:pb-36">
      <div className="lg:grid lg:grid-cols-12 lg:gap-x-8">
        <div className="relative z-10 mx-auto max-w-2xl lg:col-span-7 lg:max-w-none lg:pt-6 xl:col-span-6">
          <h1 className="font-cal text-emphasis mt-2 text-4xl font-extrabold uppercase sm:text-5xl">
            {title}
          </h1>
          <p className="text-subtle mt-8 text-base">{description}</p>
          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-4">
            <Button onClick={() => router.push("/coaches")}>{buttonText}</Button>
          </div>
        </div>
        <div className="relative mt-10 sm:mt-20 lg:col-span-5 lg:row-span-2 lg:mt-0 xl:col-span-6">
          <BackgroundIllustration className="absolute left-1/2 top-4 h-[1026px] w-[1026px] -translate-x-1/3 stroke-gray-300/70 [mask-image:linear-gradient(to_bottom,white_20%,transparent_75%)] sm:top-16 sm:-translate-x-1/2 lg:-top-16 lg:ml-12 xl:-top-14 xl:ml-0" />
          <Image className="relative z-10" src="/hero-1-trans.png" alt="Hero" width={1026} height={1026} />
        </div>
      </div>
    </div>
  );
}

function HomePage() {
  return (
    <div className="container">
      <Header />
      <Hero
        title="Stay up ahead in your career"
        buttonText="Explore Coaches"
        description="Get ahead in your career with personalized coaching from industry experts. Our one-to-one sessions provide tailored guidance and insights to help you succeed. Book now and take the next step towards your goals."
      />
      <Footer />
    </div>
  );
}

HomePage.PageWrapper = PageWrapper;

export async function getServerSideProps({ req, res }: GetServerSidePropsContext) {
  const session = await getServerSession({ req, res });

  const isCoachVerified = session?.user?.isCoachVerified;

  if (session?.user?.id && isCoachVerified) {
    return { redirect: { permanent: false, destination: "/event-types" } };
  }

  if (session?.user?.id && !isCoachVerified) {
    return { redirect: { permanent: false, destination: "/" } };
  }

  return {
    props: {},
  };
}

export default HomePage;
