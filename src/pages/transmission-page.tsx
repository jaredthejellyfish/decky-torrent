type Props = {};

function TransmissionPage({}: Props) {
  return (
    <iframe
      src="http://localhost:9091/transmission/web/"
      style={{
        width: "100%",
        height: "100vh",
        marginTop: "40px",
        border: "none",
      }}
      title="Transmission Web Interface"
    />
  );
}

export default TransmissionPage;
