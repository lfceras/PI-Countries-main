import React from "react";
import { Link } from "react-router-dom";
import styles from './landingpage.module.css'


function LandingPage() {
  return (
      <div className={styles.principal}>
        <Link to="/home">
          <button className={styles.buttons}>Ingresar</button>
        </Link>
      </div>
  );
}

export default LandingPage;
