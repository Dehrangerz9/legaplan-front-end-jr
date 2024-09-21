import Link from "next/link";
import Image from "next/image"
import logo from "../../assets/logo-focalpoint.png"
import './header.scss';

export default function Header() {
  const currentDate = new Date().toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
  return (
    <header className="header">
       <Image src={logo} alt="logomarca focal" width={150} height={36} />
       <p className="greeting">Bem-vindo de volta, Marcus</p>
       <p className="date">{currentDate}</p>
    </header>
  );
};