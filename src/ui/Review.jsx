import Section from "./Section";
const Review = (data) => {
    const review = data.review;

    return (
        <Section heading="Review" content={review} className="review" />
    )
}

export default Review;