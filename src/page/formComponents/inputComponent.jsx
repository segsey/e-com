import { Form } from "rsuite";
const InputComponent = ({
  label,
  name,
  text,
  register,
  classList,
  children,
  error,
  accepter,
  ...props
}) => {
  return (
    <Form.Group controlId={name} className={classList}>
      <Form.Label>{label}</Form.Label>
      <div className="d-flex flex-column">
        <Form.Control
          name={name}
          className="ms-2"
          {...(register ? register(name) : {})}
          accepter={accepter}
          {...props}
        >
          {children}
        </Form.Control>
        {error && <span className="text-danger">{error}</span>}
      </div>
    </Form.Group>
  );
};

export default InputComponent;
