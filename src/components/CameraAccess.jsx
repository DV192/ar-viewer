import React, { useState } from 'react';
import AR from './AR';

function CameraAccess() {
  const [stream, setStream] = useState(null);
  const [permission, setPermission] = useState('');

  const handleCameraAccess = async () => {
    try {
      const newStream = await navigator.mediaDevices.getUserMedia({ video: true });
      setStream(newStream);
      setPermission('granted');
    } catch (error) {
      if (error.name === 'NotAllowedError' || error.name === 'PermissionDeniedError') {
        setPermission('denied');
      } else {
        console.error('Error accessing camera:', error);
      }
    }
  };

  const handleRetry = () => {
    // Navigating to settings is often the only way to re-request after permanent denial
    if (permission === 'denied') {
      // Check if the browser supports navigating to settings
      if (navigator.permissions && navigator.permissions.query) {
        navigator.permissions.query({ name: 'camera' }).then(permissionStatus => {
          if (permissionStatus.state === 'prompt') {
            // Re-request permission if the state is prompt
            handleCameraAccess();
          } else {
            // Open settings if permission is denied permanently
            // window.open('app-settings:'); // This might work on some systems
          }
        });
      } else {
        alert('Please enable camera access in your browser settings.');
      }
    } else {
      handleCameraAccess();
    }
  };

  return (
    <div>
      {stream ? (
        <div className='container'>
          {/* <video ref={(videoRef) => { if (videoRef) videoRef.srcObject = stream; }} autoPlay playsInline />
          <p>Camera access granted!</p> */}
          <AR />
        </div>
      ) : (
        <div>
          {permission === 'denied' ? (
            <div>
              <p>Camera access was denied. Please allow access in settings and try again.</p>
              <p>
                Camera access was denied. To enable it:
                <ul>
                  <li>🔹 Chrome: Click the lock 🔒 icon in the address bar &gt; Enable Camera</li>
                  <li>🔹 Safari: Settings &gt; Safari &gt; Camera &gt; Allow</li>
                  <li>🔹 Firefox: Permissions &gt; Manage Permissions &gt; Allow</li>
                </ul>
                After enabling, refresh the page and try again.
              </p>

              <button onClick={handleRetry}>Retry</button>
            </div>
          ) : (
            <button onClick={handleCameraAccess}>Request Camera Access</button>
          )}
        </div>
      )}
    </div>
  );
}

export default CameraAccess;