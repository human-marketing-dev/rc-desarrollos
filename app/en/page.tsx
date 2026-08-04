import type { Metadata } from "next";
import Landing from "../Landing";

export const metadata: Metadata = {
  title: "R.C. Desarrollos — Triple A Industrial Developer",
  description:
    "We design, build, and operate Triple A industrial parks. World-class infrastructure for the new era of manufacturing and warehousing in Northeast Mexico and Texas.",
};

export default function HomeEn() {
  return <Landing lang="en" />;
}
