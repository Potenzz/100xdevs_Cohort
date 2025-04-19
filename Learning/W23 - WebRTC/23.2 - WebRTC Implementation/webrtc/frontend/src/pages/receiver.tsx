import { useEffect, useRef } from "react";

export const Receiver = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    console.log("socket set")
    const socket = new WebSocket("ws://localhost:8080");
    socket.onopen = () => {
      socket.send(JSON.stringify({ type: "receiver" }));
    };

    startReceiving(socket);
  }, []);

  function startReceiving(socket: WebSocket) {
    const pc = new RTCPeerConnection();

    socket.onmessage = (event) => {
        console.log("WebSocket message received"); // Add this log

      try {
        console.log("Raw WS data:", event.data);

        const message = JSON.parse(event.data);

        if (message.type === "createOffer") {
          pc.setRemoteDescription(message.sdp).then(() => {
            pc.createAnswer().then((answer) => {
              pc.setLocalDescription(answer);
              socket.send(
                JSON.stringify({
                  type: "createAnswer",
                  sdp: answer,
                })
              );
            });
          });
        } else if (message.type === "iceCandidate") {
            console.log('Receiver Received ICE candidate:', message.candidate);

          pc.addIceCandidate(message.candidate);
        }
      } catch (err) {
        console.error("Invalid WS message received in Sender:", event.data);
      }
    };

    pc.onicecandidate = (event) => {
        if (event.candidate) {
        console.log('onicecan')
          socket.send(
            JSON.stringify({
              type: "iceCandidate",
              candidate: event.candidate,
            })
          );
        }
      };
    


    const remoteStream = new MediaStream();
    pc.ontrack = (event) => {
        console.log("Track received:", event.track);

        remoteStream.addTrack(event.track);
        if (videoRef.current) {
          videoRef.current.srcObject = remoteStream;
        }
      };

  }

  return (
    <div>
      Receiver page
      <video ref={videoRef} autoPlay muted playsInline></video>
    </div>
  );
};
