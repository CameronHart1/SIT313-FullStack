import "../components/c_email_form.jsx";
import EmailForm from "../components/c_email_form.jsx";
import CoverImage from "../components/c_cover_image";
import FeaturedPosts from "../components/c_featured_posts";

const Home = (props) => {
  const {articles} = props;
  const {tutorials} = props
  return (
    <div>
      <CoverImage />
      <FeaturedPosts
        title="Featured Articles"
        posts={articles}
        type="articles"
        route="placeholder"
      />
      <FeaturedPosts
        title="Featured Tutorials"
        posts={tutorials}
        type="tutorials"
        route="placeholder"
      />
      <EmailForm />
    </div>
  );
};

export default Home;
