import Image from "next/image";
import styles from "./page.module.css";
import Header from "./components/global/header";
import ToDoList from "./components/toDoList";

export default function Home() {
  return (<>
  <Header/>
  <ToDoList/>
  </>
  );
}
