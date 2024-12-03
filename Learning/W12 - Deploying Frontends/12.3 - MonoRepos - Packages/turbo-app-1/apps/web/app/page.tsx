import Image, { type ImageProps } from "next/image";
import { SignupButton } from "@repo/ui";
import styles from "./page.module.css";


export default function Home() {
  return (
    <div><SignupButton></SignupButton></div>
  );
}
