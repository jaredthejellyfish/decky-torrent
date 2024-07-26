import { ProgressBar } from "decky-frontend-lib";
import { FC, useState, useEffect } from "react";
import { FaFile } from "react-icons/fa";

const Torrent: FC = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 0 : prev + 0.1));
    }, 100); // Adjust the interval speed as needed

    return () => clearInterval(interval); // Cleanup the interval on component unmount
  }, []);

  return (
    <div
      style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
    >
      <style>{`
        progress[value]::-webkit-progress-value {
          background-color: #66c0f4;
        }
        progress[value]::-moz-progress-bar {
          background-color: #66c0f4;
        }
        progress[value]::-ms-fill {
          background-color: #66c0f4;
        }
      `}</style>
      <FaFile style={{ width: "40", height: "40" }} />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          paddingLeft: "0.4rem",
          paddingRight: "0.4rem",
        }}
      >
        <span style={{ fontWeight: "bold", fontSize: "1.1rem" }}>
          Torrent Name
        </span>
        <span style={{ fontSize: "0.9rem" }}>
          0.00 GB of 100.00 GB - Remaining time unknown
        </span>
        {/* <progress
          value={progress}
          max="100"
          style={{
            width: "500px",
            height: "15px",
            borderRadius: 0,
            marginTop: "5px",
            marginBottom: "5px",
          }}
        /> */}
        <ProgressBar nProgress={progress} focusable={false} />
        <span style={{ fontSize: "0.9rem" }}>
          Downloading from 0 of 0 peers
        </span>
      </div>
    </div>
  );
};

export default Torrent;
