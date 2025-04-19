import { useEffect, useState } from "react"

export const Sender = () => {

    const [socket, setSocket ] = useState<WebSocket | null>(null);

    useEffect(()=>{
        const socket = new WebSocket('ws://localhost:8080');
        socket.onopen = () => {
            socket.send(JSON.stringify({type:'sender'}))
        }

        setSocket(socket);
    }, [])

    const initiateConn = async () => {
        if(!socket){
            alert("socket not found");
            return;
        }   

        const pc = new RTCPeerConnection();

        pc.onnegotiationneeded = async () => {
            const offer = await pc.createOffer();
            await pc.setLocalDescription(offer);
            socket.send(JSON.stringify({
                type:'createOffer',
                sdp:pc.localDescription
            }));
        }

        socket.onmessage = async (event) => {
            try {
                const message = JSON.parse(event.data);
        
                if (message.type === 'createAnswer') {
                    await pc.setRemoteDescription(message.sdp);
                } else if (message.type === 'iceCandidate') {
                    pc.addIceCandidate(message.candidate);
                }
            } catch (err) {
                console.error("Invalid WS message received in Sender:", event.data);
            }
        }

        pc.onicecandidate = (event) => {
            console.log('Sender Sending ICE candidate:', event.candidate);

            if (event.candidate) {
                socket.send(JSON.stringify({
                    type:'iceCandidate',
                    candidate: event.candidate
                }))
            }
        }

        getCameraStreamAndSend(pc);
        
    }

    const getCameraStreamAndSend = (pc: RTCPeerConnection) => {
        navigator.mediaDevices.getUserMedia({video:true}).then((stream)=>{
            const video = document.createElement('video');
            video.srcObject = stream;
            video.play();

            //this is wrong, should be propagated via a component,, useRef. see in receiver page.
            document.body.appendChild(video);

            stream.getTracks().forEach((track)=>{
                pc.addTrack(track);
            });
        });
    }

    return <div> 
        Sender page

        <button onClick={initiateConn}>Send Video</button>
        </div>
}
