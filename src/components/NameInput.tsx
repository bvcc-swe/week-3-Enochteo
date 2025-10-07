import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuRadioItem,
  DropdownMenuRadioGroup,
} from "./ui/dropdown-menu";

const NameInput = () => {
  const [name, setName] = useState("");
  const [greeting, setGreeting] = useState("");
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [emailmsg, setEmailMsg] = useState("");
  const [nameCount, setNameCount] = useState(0);
  const [emailCount, setEmailCount] = useState(0);
  const [prevName, setPrevName] = useState("");
  const [prevEmail, setPrevEmail] = useState("");
  const [color, setColor] = useState("");

  const handleSubmit = () => {
    setError("");
    if (!name.trim()) {
      setError("Please enter your name");
      return;
    }
    if (name.trim().length < 2) {
      setError("Name must be at least 2 characters");
      return;
    }
    let emailmsg = "";
    if (email) {
      if (!email.includes("@")) {
        setError("Email must have '@'");
        return;
      } else if (!email.includes(".")) {
        setError("Email must have '.'");
        return;
      }
      emailmsg = "and thanks for your email";
      localStorage.setItem("email", email);
    }
    setGreeting(`Hello, ${name.trim()}! Welcome to data analysis! ${emailmsg}`);
    localStorage.setItem("name", name);
  };
  const ResetName = () => {
    setName("");
    setError("");
    setGreeting("");
    setEmail("");
    setColor("");
    setPrevName(localStorage.getItem("name"));
    setPrevEmail(localStorage.getItem("email"));
    setNameCount(0);
    setEmailCount(0);
  };
  const getColor = () => {
    switch (color) {
      case "red":
        return "bg-red-50";
      case "blue":
        return "bg-blue-50";
      case "green":
        return "bg-red-50";
    }
  };
  return (
    <Card className={`max-w-md mx-auto ${getColor()}`}>
      <CardHeader>
        <CardTitle>Personalize Your Experience</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input
          placeholder="Enter your name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setNameCount(e.target.value.length);
          }}
        />
        <p>Character Count {nameCount}</p>
        <Input
          placeholder="Enter your email, Must contain '@'"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setEmailCount(e.target.value.length);
          }}
        />
        <p>Character Count {emailCount}</p>
        <Button onClick={handleSubmit} className="w-full">
          Say Hello
        </Button>
        {error && <p className="text-center text-red-600 text-sm">{error}</p>}
        {greeting && (
          <p className="text-center text-green-600 font-medium">{greeting}</p>
        )}
        <DropdownMenu>
          <DropdownMenuTrigger>Select Favorite Color</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuRadioGroup value={color} onValueChange={setColor}>
              <DropdownMenuRadioItem value={"red"}>Red</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value={"blue"}>Blue</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value={"green"}>
                Green
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
        <div className="flex items-center justify-center">
          <Button
            onClick={ResetName}
            className="bg-blue-500 hover:bg-blue-700 text-white font-medium rounded"
          >
            Clear
          </Button>
        </div>
        <p>Last name Submitted: {prevName}</p>
        <p>Last Email Submitted: {prevEmail}</p>
      </CardContent>
    </Card>
  );
};

export default NameInput;
