import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router';

const ImagePage = () => {
  const imageContainerRef = useRef(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleToggleFullscreen = () => {
    const container = imageContainerRef.current;

    if (!document.fullscreenElement) {
      container?.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
  };

  // Track fullscreen state
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  return (
    <main className="min-h-[100dvh] bg-gray-50 flex flex-col items-center justify-center p-6 relative">
      {/* Back Button */}
      <div className="absolute top-6 left-6 z-10">
        <Link
          to="/"
          className="flex items-center justify-center text-center text-sm px-3 py-1 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition"
        >
          <svg className="size-3 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
            <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
          </svg>
          
          Back to Home
        </Link>
      </div>

      {/* Section */}
      <section className="flex flex-col items-center pt-6">
        <h1 className="text-[1.625rem] sm:text-3xl font-medium text-gray-800 mb-2">AR Image Target</h1>
        <p className="text-sm text-gray-600 mb-4 text-center max-w-xl">
          Point your AR-enabled device at this image. Keep it visible and well-lit.
        </p>

        {/* Fullscreen Container */}
        <div
          ref={imageContainerRef}
          className="bg-white p-4 rounded-xl shadow border border-gray-200 flex flex-col items-center gap-4 relative"
        >
          <img
            src="/butterfly.jpg"
            alt="Butterfly Image Target"
            className={`${isFullscreen ? 'w-auto h-full' : 'w-[30rem]'} max-w-full object-contain rounded-md`}
          />

          {/* Exit Fullscreen Icon */}
          {isFullscreen && (
            <button
              onClick={handleToggleFullscreen}
              className="absolute top-6 right-6 bg-white text-gray-800 rounded-md p-1 shadow hover:bg-gray-100 transition cursor-pointer"
              aria-label="Exit Fullscreen"
            >
              <svg className='size-5' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
              </svg>
            </button>
          )}

          {/* Toggle Button */}
          {!isFullscreen && (
            <button
              onClick={handleToggleFullscreen}
              className="text-sm px-3 py-1 bg-blue-100 text-blue-800 rounded-lg hover:bg-blue-200 transition cursor-pointer"
            >
              View Fullscreen
            </button>
          )}
        </div>

        <p className="text-xs text-gray-500 mt-3 text-center max-w-xl">
          For best results: avoid glare, hold your scanning device steady, and ensure the full image is in view.
        </p>
      </section>
    </main>
  );
};

export default ImagePage;
