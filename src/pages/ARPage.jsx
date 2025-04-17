import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router';
import AR from '../components/AR';

const ARPage = () => {
  const arRef = useRef(null);
  const [hasCameraAccess, setHasCameraAccess] = useState(null);

  useEffect(() => {
    const checkCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        setHasCameraAccess(true);
        // stream.getTracks().forEach(track => track.stop()); // stop preview after check
      } catch {
        setHasCameraAccess(false);
      }
    };

    checkCamera();

    return () => {
      setHasCameraAccess(null);
    }
  }, []);

  return (
    <main className="min-h-[100dvh] bg-black text-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Back Button */}
      <div className="absolute top-6 left-6 z-10">
        <Link
          to="/"
          className="flex items-center justify-center text-center text-sm px-3 py-1 bg-white text-gray-800 rounded-md hover:bg-gray-200 transition"
        >
          <svg className="size-3 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
            <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
          </svg>

          Back to Home
        </Link>
      </div>

      <h1 className="text-[1.625rem] sm:text-3xl font-semibold mb-3 text-center">AR Experience</h1>
      <p className="text-sm text-gray-300 mb-6 text-center max-w-md">
        Point your camera at the target image to see the butterfly appear in augmented reality.
      </p>

      {/* AR Container */}
      <div
        ref={arRef}
        className="w-full h-full max-w-screen-md aspect-video min-h-[25rem] relative bg-gray-900 rounded-lg overflow-hidden"
      >
        {hasCameraAccess && (
          <div className="absolute inset-0 flex items-center justify-center text-white bg-black/50 text-sm">
            <AR />
          </div>
        )}
        {hasCameraAccess === false && (
          <div className="absolute inset-0 flex items-center justify-center text-red-400 text-center text-sm p-4">
            Camera access is required to view the AR experience. Please allow camera permission in your browser settings.
          </div>
        )}
      </div>

      <p className="text-xs text-gray-400 mt-4 text-center max-w-md">
        If the AR experience doesn't appear, ensure your camera is enabled and the target image is visible and well-lit.
      </p>
    </main>
  );
};

export default ARPage;
