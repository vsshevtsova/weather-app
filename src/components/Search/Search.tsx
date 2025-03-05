import { useState } from "react";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";

interface SearchProps {
  onSubmit: (city: string) => void;
}

export const Search = ({ onSubmit }: SearchProps) => {
  const [value, setValue] = useState("");
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (value.trim()) {
      onSubmit(value);
      setValue("");
    }
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Control
          type="text"
          value={value}
          onChange={handleInputChange}
          placeholder="Введите..."
        />
        <Button type="submit">Поиск</Button>
      </Form>
    </div>
  );
};
