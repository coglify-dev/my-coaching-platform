import type { GetServerSidePropsContext } from "next";
import { signOut } from "next-auth/react";
import Head from "next/head";

import { getServerSession } from "@calcom/features/auth/lib/getServerSession";
import { Button } from "@calcom/ui";
import { AlertTriangle, Check } from "@calcom/ui/components/icon";

import type { inferSSRProps } from "@lib/types/inferSSRProps";

import PageWrapper from "@components/PageWrapper";

export default function CoachVerification({ isCoachVerified }: inferSSRProps<typeof getServerSideProps>) {
  console.log("🚀 ~ file: coach-verification.tsx:14 ~ CoachVerification ~ isCoachVerified:", isCoachVerified);
  return (
    <div className="container bg-opacity-90 backdrop-blur-md backdrop-grayscale backdrop-filter">
      <Head>
        <title>Coach verification</title>
      </Head>
      <div className="flex min-h-screen flex-col items-center justify-center px-6">
        <div className="border-brand-default dark:border-darkmodebrand m-10 flex max-w-2xl flex-col items-start rounded-md border p-12 text-left">
          <div className="border-brand-default dark:border-darkmodebrand rounded-full border p-3">
            {isCoachVerified ? (
              <Check className="h-12 w-12 flex-shrink-0 p-0.5 font-extralight" />
            ) : (
              <AlertTriangle className="h-12 w-12 flex-shrink-0 p-0.5 font-extralight" />
            )}
          </div>
          <h3 className="font-cal my-6 text-3xl font-normal">Verification</h3>

          <p className="my-6">
            We need to verify your application. Soon you will receive an email with the further information
          </p>

          <p>Once your application is approved, you will be able to access the platform.</p>

          <div className="mt-6 flex space-x-5 text-center">
            <Button color="primary" onClick={() => signOut({ callbackUrl: "/" })}>
              Return to the home page
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

CoachVerification.PageWrapper = PageWrapper;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { req, res } = context;

  const session = await getServerSession({ req, res });

  const isCoachVerified = session?.user?.isCoachVerified;

  return {
    props: {
      isCoachVerified: !!isCoachVerified,
    },
  };
}
