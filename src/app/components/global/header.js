import Link from "next/link";
import Image from "next/image"
import logo from "../../assets/logo-focalpoint.png"
import './header.scss';

export default function Header() {
  return (
    <header className="header">
       <Image src={logo} alt="logomarca focal" width={150} height={36} />
       <p className="greeting">Bem-vindo de volta, Marcus</p>
       <p className="date">Segunda, 01 de dezembro de 2025</p>
    </header>
  );
};