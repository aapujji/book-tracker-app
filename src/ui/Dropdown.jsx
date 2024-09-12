const Dropdown = (data) => {
    return (
        <div className="form-field">
            {data.label && 
                <label className="form-field-label">
                    <span className="">{data.label}</span>
                </label>
            }
            <select className="select" name={data.name} id={`select-${data.id}`} value={data.defaultValue} onChange={data.onChange}>
                {data.options.map((option, key) => {
                    return <option key={key} value={option.value}>{option.label}</option>
                })}
            </select>
        </div>
    )
}

export default Dropdown;