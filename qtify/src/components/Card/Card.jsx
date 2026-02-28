import React from "react";
import styles from "./Card.module.css";
import Chip from "@mui/material/Chip";

function Card({ image, title, follows }) {
  return (
    <div className={styles.card}>
      <div className={styles.top}>
        <img src={image} alt={title} />
        <Chip label={`${follows} Follows`} className={styles.chip} />
      </div>
      <div className={styles.bottom}>
        <p>{title}</p>
      </div>
    </div>
  );
}

export default Card;