import { RiChatSmileAiLine } from "react-icons/ri";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="main-footer">
      <Link href="/">
        <p>Kamkom</p>
        <RiChatSmileAiLine size={25} />
      </Link>
      {/* <p>footer</p> */}
    </div>
  );
};
export default Footer;
