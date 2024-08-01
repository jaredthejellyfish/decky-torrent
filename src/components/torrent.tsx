import React from "react";
import { TorrentDetails } from "./torrent-type";
import { FaCaretUp, FaCaretDown } from "react-icons/fa";
import { Focusable, ServerAPI } from "decky-frontend-lib";

// Utility functions
const formatSize = (sizeInBytes: number): string => {
  const units = ["bytes", "KB", "MB", "GB"];
  let size = sizeInBytes;
  let unitIndex = 0;

  while (size >= 1000 && unitIndex < units.length - 1) {
    size /= 1000;
    unitIndex++;
  }

  return `${size.toFixed(2)} ${units[unitIndex]}`;
};

const trimStringWithEllipsis = (input: string, maxLength = 30): string =>
  input.length > maxLength ? `${input.substring(0, maxLength - 3)}...` : input;

const calculateETA = (
  totalSize: number,
  downloadedSize: number,
  rateDownload: number
): string => {
  if (rateDownload === 0) return "Calculating...";

  const etaInSeconds = (totalSize - downloadedSize) / rateDownload;
  const [value, unit] =
    etaInSeconds >= 3600
      ? [Math.floor(etaInSeconds / 3600), "hour"]
      : etaInSeconds >= 60
      ? [Math.floor(etaInSeconds / 60), "minute"]
      : [Math.floor(etaInSeconds), "second"];

  return `${value} ${unit}${value !== 1 ? "s" : ""}`;
};

// Sub-components
const TransferRate: React.FC<{ rate: number; icon: React.ElementType }> = ({
  rate,
  icon: Icon,
}) => (
  <>
    <Icon />
    {formatSize(rate)}/s
  </>
);

const PeerInfo: React.FC<{ activePeers: number; totalPeers: number }> = ({
  activePeers,
  totalPeers,
}) => (
  <span>
    {activePeers} of {totalPeers} peers
  </span>
);

const ProgressBar: React.FC<{
  value: number;
  color: string;
}> = ({ value, color }) => (
  <div
    style={{
      width: "100%",
      backgroundColor: "#e0e0e0",
      borderRadius: "8px",
      overflow: "hidden",
      margin: "5px 0",
      height: "10px",
    }}
  >
    <div
      style={{
        width: `${value}%`,
        backgroundColor: color,
        height: "100%",
        transition: "width 0.2s ease-in-out",
      }}
    />
  </div>
);

// Main Torrent component
const Torrent: React.FC<{ torrent: TorrentDetails; serverAPI: ServerAPI }> = ({
  torrent: {
    fields: {
      peers,
      peersGettingFromUs,
      peersSendingToUs,
      totalSize,
      name,
      percentComplete,
      rateDownload,
      rateUpload,
      status,
      id,
      uploadedEver,
    },
  },
  serverAPI,
}) => {
  const isComplete = percentComplete >= 1;
  const isPaused = status === 0;
  const downloadedSize = totalSize * percentComplete;

  const progressColor = isPaused
    ? "#999999"
    : isComplete
    ? "#4caf50"
    : "#33b3fd";

  const pauseOrResumeTorrent = async (id: number) => {
    const method = isPaused ? "resume_torrent" : "pause_torrent";
    const action = isPaused ? "resume" : "pause";

    try {
      const res = await serverAPI.callPluginMethod(method, { torrent_id: id });
      if (!res.success) {
        throw new Error(`Failed to ${action} torrent.`);
      }
    } catch (e) {
      serverAPI.toaster.toast({
        title: "Error",
        body: (e as Error).message,
        critical: true,
        showToast: true,
        eType: 1,
      });
    }
  };

  return (
    <Focusable
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        borderBottom: "1px solid rgba(89, 89, 89, 0.5)",
        paddingBottom: "10px",
      }}
      onClick={() => pauseOrResumeTorrent(id)}
    >
      <span style={{ fontWeight: "bold", fontSize: "1rem" }}>
        {trimStringWithEllipsis(name)}
      </span>
      <span
        style={{
          fontSize: "0.6rem",
          display: "flex",
          alignItems: "center",
        }}
      >
        {!isComplete ? (
          <>
            {formatSize(downloadedSize)} of {formatSize(totalSize)}
          </>
        ) : (
          <>
            {formatSize(totalSize)}, uploaded {formatSize(uploadedEver)}
          </>
        )}
        {!isPaused && (
          <>
            {" "}
            -
            {!isComplete && (
              <>
                <TransferRate rate={rateDownload} icon={FaCaretDown} /> |
              </>
            )}{" "}
            <TransferRate rate={rateUpload} icon={FaCaretUp} />
          </>
        )}
      </span>
      <ProgressBar value={percentComplete * 100} color={progressColor} />
      <span style={{ fontSize: "0.7rem" }}>
        {isPaused ? (
          "Paused"
        ) : isComplete ? (
          <>
            Seeding to{" "}
            <PeerInfo
              activePeers={peersGettingFromUs}
              totalPeers={peers.length}
            />
          </>
        ) : (
          <>
            Downloading from{" "}
            <PeerInfo
              activePeers={peersSendingToUs}
              totalPeers={peers.length}
            />{" "}
            - {calculateETA(totalSize, downloadedSize, rateDownload)}
          </>
        )}
      </span>
    </Focusable>
  );
};

export default Torrent;
