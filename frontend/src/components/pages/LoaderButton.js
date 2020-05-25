import React from "react";
import { Button, Glyphicon } from "react-bootstrap";
import "./LoadButton.css";




function alertmessage() {
  alert("Successfully Changed");
}

export default function LoaderButton({
  isLoading,
  className = "",
  disabled = false,
  ...props
}) 

{
  return (
    <Button 
      onClick={alertmessage}
      className={`LoaderButton ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && <Glyphicon glyph="refresh" className="spinning" />}
      {props.children}
    </Button>
  );
}
