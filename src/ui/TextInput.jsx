const TextInput = (data) => {
    return (
        <div className="form-field">
            <label htmlFor={data.id} className="form-field-label">
                <span className="">{data.label}</span>
            </label>
            <input 
                className={`${data.className} form-field-input`}
                type={data.type || 'text'}
                id={data.id}
                name={data.id}
                required={data.isRquired}
                onChange={data.onChange}
                value={data.value}
                maxLength={data.size || null}
            />
        </div>
    )
}

export default TextInput;