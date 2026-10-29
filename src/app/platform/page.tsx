import JsonLd from "@/components/JsonLd";
import { breadcrumbLd, pageMeta } from "@/lib/site";
import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Apps from "@/components/sections/Apps";
import GetStarted from "@/components/sections/GetStarted";
import PlatformModules from "@/components/sections/PlatformModules";
import Roles from "@/components/sections/Roles";
import Scales from "@/components/sections/Scales";
import Security from "@/components/sections/Security";
import { btnLight, btnOutlineLight } from "@/components/ui";

export const metadata: Metadata = pageMeta("/platform", "Platform", "Rehab EMR, clinical workflow, operations, billing, assessment scales and apps on one patient record, with a screen for every role.");

export default function PlatformPage() {
  return (
    <>
      <JsonLd data={breadcrumbLd("Platform", "/platform")} />
      <PageHero
        title="One platform for the whole rehab centre"
        lede="Clinical records, care plans, operations and billing on one patient record, with a screen for every person on the team."
        actions={
          <>
            <Link href="/book-a-demo" className={btnLight}>Book a Demo</Link>
            <Link href="/pricing" className={btnOutlineLight}>See pricing</Link>
          </>
        }
      />
      <PlatformModules />
      <Roles />
      <Scales navy />
      <Apps />
      <Security />
      <GetStarted />
    </>
  );
}
