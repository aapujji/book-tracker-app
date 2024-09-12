const TextArea = (data) => {
    return (
        <div className="form-field textarea">
            <label className="form-field-label" htmlFor={data.name}>{data.label}</label>
            <textarea className="form-field-textarea" id={data.id} name={data.name}></textarea>
        </div>
    )
}

export default TextArea;