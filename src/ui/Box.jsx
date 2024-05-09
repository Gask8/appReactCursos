import { useState } from "react";

export function Box({ children, type }) {
  // const [isOpen, setIsOpen] = useState(true);

  return (
    <div className={`box-${type}`}>
      {/* <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? "–" : "+"}
      </button> */}

      {/* {isOpen && children} */}
      {children}
    </div>
  );
}
