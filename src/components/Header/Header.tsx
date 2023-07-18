import "./Header.scss";

type Props = {
  heading: string;
};

const Header = ({ heading }: Props) => {
  return (
    <header>
      <h1>{heading}</h1>
    </header>
  );
};

export default Header;
