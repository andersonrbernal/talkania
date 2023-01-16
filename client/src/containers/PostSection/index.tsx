import Posts from "../../components/Posts";
import PostShare from "../../components/PostShare";
import './PostSection.css'

const PostSection = () => {
    return (
        <section className="PostSection">
            <PostShare />
            <Posts />
        </section>
    );
}
 
export default PostSection;