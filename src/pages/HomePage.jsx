import React from 'react';
import { Link } from 'react-router';

const HomePage = () => {
  return (
    <main className="min-h-[100dvh] bg-gray-100 flex flex-col items-center justify-center p-6 text-center">
      <h1 className="text-[1.625rem] sm:text-3xl font-semibold mb-4 text-gray-800">🦋 AR Butterfly Experience</h1>

      <p className=" mb-6 max-w-xl text-gray-700">
        This experience uses augmented reality to display a 3D butterfly when a specific image is scanned.
        To begin, you'll need to use <strong>two separate devices</strong>.
      </p>

      <section className="bg-white px-10 py-6 rounded-2xl shadow-md max-w-xl w-full">
        <ol className="list-decimal text-left space-y-6 text-gray-700">
          <li>
            On <strong>one device</strong> (such as a laptop, tablet, or smart TV), open the following link to
            <strong> display the butterfly image target</strong>:
            <div className="mt-2 space-y-1">
              <Link
                to="/image"
                className="inline-block text-sm px-3 py-1 bg-blue-100 text-blue-800 rounded-lg hover:bg-blue-200 transition"
              >
                Open Target Image
              </Link>
              <p className="text-sm text-gray-500 break-words">
                URL: <Link to="/image" className="underline">https://ar-viewer-v1.web.app/image</Link>
              </p>
            </div>
          </li>
          <li>
            On a <strong>second device</strong> (preferably a phone or tablet with camera access),
            open this AR viewer link and <strong>grant camera permission</strong>. Then
            <strong> scan the image</strong> displayed on the first device:
            <div className="mt-2 space-y-1">
              <Link
                to="/ar"
                className="inline-block text-sm px-3 py-1 bg-green-100 text-green-800 rounded-lg hover:bg-green-200 transition"
              >
                Launch AR Experience
              </Link>
              <p className="text-sm text-gray-500 break-words">
                URL: <Link to="/ar" className="underline">https://ar-viewer-v1.web.app/ar</Link>
              </p>
            </div>
          </li>
        </ol>
      </section>

      <footer className="mt-10 text-sm text-gray-500">
        For the best experience, ensure your <strong>camera is functioning</strong> and the
        <strong> lighting is adequate</strong> 🌞
      </footer>
    </main>
  );
};

export default HomePage;
