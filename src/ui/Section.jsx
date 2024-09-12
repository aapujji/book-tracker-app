const Section = (data) => {
    const heading = data.heading;
    const content = data.content;
    let className = data.className;
    className += ' section';

    return (
        <section className={className}>
            <h2>{heading}</h2>
            {content}
        </section>
    )
}

export default Section;