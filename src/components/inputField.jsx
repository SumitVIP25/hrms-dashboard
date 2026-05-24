export default function InputField({ label, type = "text", placeholder, value, onChange }) {
    return (
        <div className="mb-3">
            <label className="form-label">
                {label}
            </label>
            <input
                type={type}
                value={value}
                placeholder={placeholder}
                onChange={onChange}
                className="form-control"
            />
        </div>
    );
}