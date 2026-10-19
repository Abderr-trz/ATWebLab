import type { Metadata } from "next";
import LensExperience from "@/components/through-the-lens/LensExperience";
export const metadata:Metadata={title:"Through the Lens — Concept interactif 3D | AT WebLab",description:"Démonstration expérimentale d'un portfolio photographique immersif par AT WebLab.",robots:{index:false,follow:false}};
export default function Page(){return <LensExperience/>}
