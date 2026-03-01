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
        {albums.map((album, index) => (
  <div
    key={album.id}
    style={{
      display: !showAll && index >= 7 ? "none" : "block"
    }}
  >
    <Card
      image={album.image}
      title={album.title}
      follows={album.follows}
    />
  </div>
))}
      </div>
    </div>
  );
}

export default Section;