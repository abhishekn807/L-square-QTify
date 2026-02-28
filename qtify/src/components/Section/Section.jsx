import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Section.module.css";
import Card from "../Card/Card";

function Section({ title, endpoint }) {
  const [albums, setAlbums] = useState([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const res = await axios.get(
          `https://qtify-backend.labs.crio.do${endpoint}`
        );
        setAlbums(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchAlbums();
  }, [endpoint]);

  const displayedAlbums = showAll ? albums : albums.slice(0, 7);

  return (
    <div className={styles.section}>
      <div className={styles.header}>
        <h2>{title}</h2>
        <button
          className={styles.toggle}
          onClick={() => setShowAll(!showAll)}
        >
          {showAll ? "Collapse" : "Show All"}
        </button>
      </div>

      <div className={styles.grid}>
        {displayedAlbums.map((album) => (
          <Card
            key={album.id}
            image={album.image}
            title={album.title}
            follows={album.follows}
          />
        ))}
      </div>
    </div>
  );
}

export default Section;