import { Link } from "react-router-dom";
import NotebookLines from "../../components/NotebookLines/NotebookLines";
import "./ErrorPage.scss";

/**
 * Renders a error page for incorrect routes.
 *
 * @compoenet
 * @returns A JSX element with the error info and a home link.
 */
const ErrorPage = () => {
  return (
    <main className="Error-page">
      <h1>404 - Page Not Found</h1>
      <p>
        Sorry, the page you are looking for does not exist. This error indicates
        a wrong url.
      </p>
      <p>
        You can navigate back to the home page of my logic hub by clicking
        <Link to="/"> here</Link>.
      </p>
    </main>
  );
};

export default ErrorPage;
