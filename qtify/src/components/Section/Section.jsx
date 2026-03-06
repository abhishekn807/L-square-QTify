import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Section.module.css";
import Card from "../Card/Card";
import Slider from "../Slider/Slider";
import { Tabs, Tab } from "@mui/material";

function Section({ title, endpoint }) {

  const [data, setData] = useState([]);
  const [genres, setGenres] = useState([]);
  const [value, setValue] = useState("all");
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {

    const fetchData = async () => {

      try {

        // SONGS SECTION
        if (endpoint === "songs") {

          const songs = await axios.get(
            "https://qtify-backend.labs.crio.do/songs"
          );

          const genres = await axios.get(
            "https://qtify-backend.labs.crio.do/genres"
          );

          setData(songs.data);
          setGenres(genres.data.data);

        }

        // ALBUMS SECTION
        else {

          const res = await axios.get(
            `https://qtify-backend.labs.crio.do/albums/${endpoint}`
          );

          setData(res.data);

        }

      } catch (error) {
        console.log(error);
      }

    };

    fetchData();

  }, [endpoint]);

  const filteredSongs =
    value === "all"
      ? data
      : data.filter((song) => song.genre.key === value);

  return (
    <div className={styles.section}>

      <div className={styles.header}>

        <h2>{title}</h2>

        {endpoint !== "songs" && (
          <button
            className={styles.toggle}
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? "Collapse" : "Show All"}
          </button>
        )}

      </div>

      {endpoint === "songs" && (
        <Tabs
          value={value}
          onChange={(e, newValue) => setValue(newValue)}
        >
          <Tab label="All" value="all" />

          {genres.map((genre) => (
            <Tab
              key={genre.key}
              label={genre.label}
              value={genre.key}
            />
          ))}

        </Tabs>
      )}

      {endpoint !== "songs" && showAll ? (

        <div className={styles.grid}>
          {data.map((item) => (
            <Card
              key={item.id}
              image={item.image}
              title={item.title}
              follows={item.follows}
            />
          ))}
        </div>

      ) : (

     <Slider
  data={(endpoint === "songs" ? filteredSongs : data).map((item) => (
    <Card
      key={item.id}
      image={item.image}
      title={item.title}
      follows={endpoint === "songs" ? item.likes : item.follows}
    />
  ))}
/>

      )}

    </div>
  );
}

export default Section;