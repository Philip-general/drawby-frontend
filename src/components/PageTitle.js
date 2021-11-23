import { Helmet } from "react-helmet";
import { PropTypes } from "prop-types";

export default function PageTitle({ title }) {
  return (
    <Helmet>
      <title>{title} | DrawBy</title>
    </Helmet>
  );
}

PageTitle.propTypes = {
  title: PropTypes.string.isRequired
};
