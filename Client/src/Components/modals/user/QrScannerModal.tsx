import React, { useEffect, useRef, useState } from "react";
import { X, Camera, RefreshCw, AlertTriangle } from "lucide-react";
import jsQR from "jsqr";

interface QrScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onScanSuccess: (data: string) => void;
}

export const QrScannerModal: React.FC<QrScannerModalProps> = ({
  isOpen,
  onClose,
  onScanSuccess,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [cameras, setCameras] = useState<MediaDeviceInfo[]>([]);
  const [selectedCameraId, setSelectedCameraId] = useState<string>("");
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [permissionState, setPermissionState] = useState<"prompt" | "granted" | "denied">("prompt");

  useEffect(() => {
    if (!isOpen) return;

    // Enumerate video input devices
    navigator.mediaDevices
      .enumerateDevices()
      .then((devices) => {
        const videoDevices = devices.filter((device) => device.kind === "videoinput");
        setCameras(videoDevices);

        // Prefer back camera if available
        const backCam = videoDevices.find(
          (device) =>
            device.label.toLowerCase().includes("back") ||
            device.label.toLowerCase().includes("environment")
        );

        if (backCam) {
          setSelectedCameraId(backCam.deviceId);
        } else if (videoDevices.length > 0) {
          setSelectedCameraId(videoDevices[0].deviceId);
        }
      })
      .catch((err) => {
        console.error("Error enumerating devices:", err);
      });

    return () => {
      stopCamera();
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && selectedCameraId) {
      startCamera(selectedCameraId);
    } else if (isOpen) {
      startCamera(null);
    }
  }, [isOpen, selectedCameraId]);

  const startCamera = async (deviceId: string | null) => {
    stopCamera();
    setError(null);

    const constraints: MediaStreamConstraints = {
      video: deviceId
        ? { deviceId: { exact: deviceId } }
        : { facingMode: "environment" },
    };

    try {
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      streamRef.current = stream;
      setPermissionState("granted");
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.setAttribute("playsinline", "true");
        await videoRef.current.play();
        setIsScanning(true);
      }
    } catch (err: any) {
      console.error("Camera access failed:", err);
      setPermissionState("denied");
      setError(
        "Camera access denied or unavailable. Please enable camera permissions in your browser settings to scan."
      );
    }
  };

  const stopCamera = () => {
    setIsScanning(false);
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  };

  // Scanning frame-by-frame loop
  useEffect(() => {
    let animationFrameId: number;
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    const scan = () => {
      if (
        videoRef.current &&
        videoRef.current.readyState === videoRef.current.HAVE_ENOUGH_DATA
      ) {
        const video = videoRef.current;
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        
        if (context) {
          context.drawImage(video, 0, 0, canvas.width, canvas.height);
          const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
          const code = jsQR(imageData.data, imageData.width, imageData.height);

          if (code && code.data) {
            onScanSuccess(code.data);
            stopCamera();
            return;
          }
        }
      }

      if (isScanning) {
        animationFrameId = requestAnimationFrame(scan);
      }
    };

    if (isScanning) {
      animationFrameId = requestAnimationFrame(scan);
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isScanning, onScanSuccess]);

  const toggleCamera = () => {
    if (cameras.length <= 1) return;
    const currentIndex = cameras.findIndex((c) => c.deviceId === selectedCameraId);
    const nextIndex = (currentIndex + 1) % cameras.length;
    setSelectedCameraId(cameras[nextIndex].deviceId);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <style>{`
        @keyframes scanAnim {
          0% { transform: translateY(0); }
          50% { transform: translateY(240px); }
          100% { transform: translateY(0); }
        }
        .scanner-line {
          animation: scanAnim 3s infinite linear;
        }
      `}</style>
      
      <div className="relative bg-slate-900 border border-white/10 w-full max-w-md rounded-3xl overflow-hidden shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-5 border-b border-white/5">
          <div className="flex items-center gap-2">
            <Camera className="w-5 h-5 text-orange-500" />
            <span className="text-white font-bold text-lg">Scan QR Code</span>
          </div>
          <button
            onClick={() => {
              stopCamera();
              onClose();
            }}
            className="p-2 text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-full transition duration-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Area */}
        <div className="relative aspect-square mx-6 mt-6 bg-black rounded-2xl overflow-hidden border border-white/5 flex items-center justify-center">
          {error ? (
            <div className="p-6 text-center space-y-4">
              <div className="inline-flex p-3 bg-red-500/10 text-red-500 rounded-full">
                <AlertTriangle className="w-8 h-8" />
              </div>
              <p className="text-sm text-gray-300 leading-relaxed">{error}</p>
              <button
                onClick={() => startCamera(selectedCameraId || null)}
                className="px-5 py-2 bg-orange-600 hover:bg-orange-500 text-white font-semibold text-xs rounded-xl shadow-lg transition duration-200"
              >
                Retry Camera
              </button>
            </div>
          ) : permissionState === "prompt" ? (
            <div className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 border-4 border-orange-500/30 border-t-orange-500 rounded-full animate-spin"></div>
              <p className="text-sm text-gray-400">Requesting camera access...</p>
            </div>
          ) : (
            <>
              <video
                ref={videoRef}
                className="w-full h-full object-cover"
                playsInline
                muted
              />
              {/* Target Scan Frame overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-60 h-60 border-2 border-dashed border-white/40 rounded-2xl">
                  {/* Corners */}
                  <div className="absolute -top-1.5 -left-1.5 w-6 h-6 border-t-4 border-l-4 border-orange-500 rounded-tl-lg"></div>
                  <div className="absolute -top-1.5 -right-1.5 w-6 h-6 border-t-4 border-r-4 border-orange-500 rounded-tr-lg"></div>
                  <div className="absolute -bottom-1.5 -left-1.5 w-6 h-6 border-b-4 border-l-4 border-orange-500 rounded-bl-lg"></div>
                  <div className="absolute -bottom-1.5 -right-1.5 w-6 h-6 border-b-4 border-r-4 border-orange-500 rounded-br-lg"></div>
                  
                  {/* Glowing Scanning line */}
                  <div className="scanner-line absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent shadow-[0_0_10px_2px_rgba(249,115,22,0.8)]"></div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer & Toggles */}
        <div className="p-6 flex flex-col items-center gap-4 text-center">
          {!error && permissionState === "granted" && (
            <>
              <p className="text-sm text-gray-400">
                Align the QR code on your table inside the frame.
              </p>
              {cameras.length > 1 && (
                <button
                  onClick={toggleCamera}
                  className="flex items-center gap-2 px-5 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-sm font-semibold text-white transition duration-200"
                >
                  <RefreshCw className="w-4 h-4 text-orange-500" />
                  Switch Camera
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
