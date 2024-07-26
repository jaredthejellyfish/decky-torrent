import {
  ButtonItem,
  definePlugin,
  DialogButton,
  Navigation,
  PanelSection,
  PanelSectionRow,
  ServerAPI,
  staticClasses,
  useParams,
} from "decky-frontend-lib";
import { VFC } from "react";
import { FaArrowCircleLeft, FaDownload } from "react-icons/fa";
import { IoReloadCircle } from "react-icons/io5";
import Torrent from "./components/torrent";
// interface AddMethodArgs {
//   left: number;
//   right: number;
// }

const Content: VFC<{ serverAPI: ServerAPI }> = ({}) => {
  return (
    <PanelSection title="Panel Section">
      <PanelSectionRow></PanelSectionRow>

      <PanelSectionRow>
        <ButtonItem
          layout="below"
          onClick={() => {
            Navigation.CloseSideMenus();
            Navigation.Navigate("/torrents");
          }}
        >
          Downloads
        </ButtonItem>
      </PanelSectionRow>
    </PanelSection>
  );
};

const TorrentsPage: VFC = () => {
  const params = useParams() as { appId: string };

  return (
    <div
      style={{
        marginTop: "50px",
        color: "white",
        paddingLeft: "20px",
        paddingRight: "20px",
      }}
    >
      {JSON.stringify(params)}
      <div
        id="heading"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            width: "100%",
          }}
        >
          <button
            onClick={() => Navigation.NavigateBack()}
            style={{
              position: "absolute",
              left: "0",
              width: "35px",
              height: "35px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "10px",
            }}
          >
            <FaArrowCircleLeft style={{ width: "30px", height: "30px" }} />
          </button>
          <span
            style={{ margin: "0 auto", fontSize: "1.5rem", fontWeight: "bold" }}
          >
            Torrents
          </span>
        </div>
      </div>

      <div>
        <Torrent />
      </div>
    </div>
  );
};

export default definePlugin((serverApi: ServerAPI) => {
  serverApi.routerHook.addRoute("/torrents", TorrentsPage, {
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
