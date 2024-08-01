import { definePlugin, ServerAPI, staticClasses } from "decky-frontend-lib";
import Content from "./tab-content";

import { FaDownload } from "react-icons/fa";
import TransmissionPage from "./pages/transmission-page";

export default definePlugin((serverApi: ServerAPI) => {
  serverApi.routerHook.addRoute("/torrents", TransmissionPage, {
    exact: true,
  });

  return {
    title: <div className={staticClasses.Title}>Decky Torrent</div>,
    content: <Content serverAPI={serverApi} />,
    icon: <FaDownload />,
    onDismount() {
      serverApi.routerHook.removeRoute("/torrents");
    },
  };
});
