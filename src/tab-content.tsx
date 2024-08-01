import {
  FileSelectionType,
  Navigation,
  PanelSection,
  PanelSectionRow,
  ServerAPI,
  Spinner,
} from "decky-frontend-lib";
import { useEffect, useState, VFC } from "react";
import Torrent from "./components/torrent";
import { TorrentDetails } from "./components/torrent-type";
import { FaFile, FaPlus } from "react-icons/fa";

const Content: VFC<{ serverAPI: ServerAPI }> = ({ serverAPI }) => {
  const [data, setData] = useState<{ torrents: TorrentDetails[] } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchTorrents = async (showLoading: boolean) => {
    if (showLoading) setLoading(true);
    setError(null);

    try {
      const res = await serverAPI.callPluginMethod("get_torrents", {});
      if (!res.success) throw new Error("Failed to fetch torrents.");

      const parsedData = JSON.parse(res.result as string);
      if (parsedData.error) throw new Error(parsedData.error);

      setData(parsedData.torrents?.length ? parsedData : null);
    } catch (error) {
      setError(
        (error as Error).message || "An error occurred while fetching torrents."
      );
      setData(null);
    } finally {
      if (showLoading) setLoading(false);
    }
  };

  useEffect(() => {
    fetchTorrents(true);
    const interval = setInterval(() => fetchTorrents(false), 2000);
    return () => clearInterval(interval);
  }, []);

  const handleAction = async (action: string, params: object = {}) => {
    const res = await serverAPI.callPluginMethod(action, params);
    if (!res.success) {
      serverAPI.toaster.toast({
        title: "Error",
        body: `There was an error performing the action: ${action}`,
        critical: true,
        showToast: true,
        eType: 1,
      });
    }
  };

  const addTorrentFromFile = async () => {
    const result = await serverAPI.openFilePickerV2(
      FileSelectionType.FILE,
      "/home/deck",
      true,
      true
    );
    handleAction("add_torrent_from_path", { path: result.realpath });
  };

  return (
    <PanelSection title="Torrents">
      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        {loading && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "150px",
            }}
          >
            <Spinner style={{ width: "90px", height: "90px" }} />
          </div>
        )}
        {error && <div style={{ color: "red" }}>{error}</div>}
        {!error &&
          !loading &&
          (data?.torrents?.length ? (
            data.torrents.map((torrent) => (
              <Torrent
                key={torrent.fields.hashString}
                torrent={torrent}
                serverAPI={serverAPI}
              />
            ))
          ) : (
            <div>No torrents found.</div>
          ))}
      </div>
      <PanelSectionRow>
        <div
          style={{
            display: "flex",
            justifyContent: "start",
            alignItems: "center",
            gap: "6px",
            padding: 0,
            paddingTop: "13px",
          }}
          className="Panel Focusable"
        >
          <button
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "9px",
              border: "none",
              borderRadius: "3px",
              fontWeight: "600",
              backgroundColor: "rgba(106, 109, 120, 0.4)",
              color: "white",
            }}
            tabIndex={0}
            onClick={addTorrentFromFile}
            className="Focusable"
          >
            <FaPlus style={{ marginRight: "4px" }} /> Add Torrent
          </button>
          <button
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "9px",
              border: "none",
              borderRadius: "3px",
              fontWeight: "600",
              backgroundColor: "rgba(106, 109, 120, 0.4)",
              color: "white",
            }}
            tabIndex={0}
            className="Focusable"
            onClick={() => {
              Navigation.CloseSideMenus();
              Navigation.Navigate("/torrents");
            }}
          >
            <FaFile style={{ marginRight: "4px" }} /> Transmission
          </button>
        </div>
      </PanelSectionRow>
    </PanelSection>
  );
};

export default Content;
