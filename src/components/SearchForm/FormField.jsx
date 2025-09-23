/* eslint-disable no-unused-vars */
import { Controller } from "react-hook-form";

function FormField({ control, label, name, Component }) {
    return (
        <div>
            <p className="mb-1 font-bold">{label}</p>

            {/* Dùng Controller để tạo ra 1 field trong React Hook Form */}
            <Controller
                name={name}
                control={control}
                render={({ field: { name, value, onChange } }) => {
                    return (
                        <Component
                            name={name}
                            value={value}
                            control={control}
                            onChange={onChange}
                        />
                    );
                }}
            />
        </div>
    );
}
export default FormField;
