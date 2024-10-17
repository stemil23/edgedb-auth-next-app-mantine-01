import { auth } from '@/edgedb';
import Link from "next/link";
import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';
import { Welcome } from '../components/Welcome/Welcome';
import ButtonSignup from "@/components/Authentication/ButtonSignup";
import ButtonLogIn from "@/components/Authentication/ButtonLogIn";

export default function HomePage() {
  return (
    <>
      <Welcome />
      <ColorSchemeToggle />
<ButtonSignup />
<ButtonLogIn />
</>
  );
}
