import { Form } from "rsuite";
import { Controller } from "react-hook-form";

const InputComponent = ({
  label,
  name,
  classList,
  children,
  error,
  accepter,
  control,
  ...props
}) => {
  return (
    <Form.Group controlId={name} className={classList}>
      <Form.Label>{label}</Form.Label>

      <div className="d-flex flex-column">
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <Form.Control
              {...field}
              value={field.value ?? (name === "dob" ? null : "")}
              className="ms-2"
              accepter={accepter}
              {...props}
            >
              {children}
            </Form.Control>
          )}
        />

        {error && <span className="text-danger">{error}</span>}
      </div>
    </Form.Group>
  );
};

export default InputComponent;
