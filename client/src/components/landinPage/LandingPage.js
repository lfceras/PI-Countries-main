import React from "react";
import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <header>
      <div className="texto">
        <Link to="/home">
          <button>Ingresar</button>
        </Link>
      </div>
    </header>
  );
}

export default LandingPage;
