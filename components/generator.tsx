// import React, { useState } from 'react';

// const LocationGenerator = () => {
//   const [latitude, setLatitude] = useState(null);
//   const [longitude, setLongitude] = useState(null);

//   // Function to generate a random number within a specified range (inclusive)
//   const getRandomCoordinate = (min, max) => {
//     return Math.random() * (max - min) + min;
//   };

//   const generateRandomLocation = () => {
//     // Define your desired latitude and longitude ranges
//     const minLat = 11.093456674014751-0.009; // Minimum latitude
//     const maxLat = 11.093456674014751+0.009;  // Maximum latitude
//     const minLong = 77.16389496411915-0.009; // Minimum longitude
//     const maxLong = 77.16389496411915+0.009; // Maximum longitude

//     const newLat = getRandomCoordinate(minLat, maxLat);
//     const newLong = getRandomCoordinate(minLong, maxLong);

//     setLatitude(newLat.toFixed(6)); // Format to 6 decimal places
//     setLongitude(newLong.toFixed(6)); // Format to 6 decimal places
//   };

//   return (
//     <div className="p-4 border rounded shadow-md">
//       <h1>Random Location Generator</h1>
//       <button className="bg-blue-800 p-2 rounded text-amber-50 " onClick={generateRandomLocation}>Generate Random Location</button>
//       {latitude && longitude && (
//         <div>
//           <p>Latitude: {latitude}</p>
//           <p>Longitude: {longitude}</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default LocationGenerator;





'use client';

import { useState, useEffect, useRef } from 'react';

////Firebase
import { initializeApp } from "firebase/app";
import { getDatabase, ref, update} from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDExD48FkQXTPknLHBinnU8EaQEZKxK7vE",
  authDomain: "qsat-db.firebaseapp.com",
  databaseURL: "https://qsat-db-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "qsat-db",
  storageBucket: "qsat-db.firebasestorage.app",
  messagingSenderId: "84227044871",
  appId: "1:84227044871:web:7cbb1b0ca996e41c9f1ca2",
  measurementId: "G-15N7Q273LC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const dataRef = ref(database, 'data'); // e.g., 'users/user123'

// Helper function to generate a random number within a given range, including decimals
const getRandomInRange = (min, max) => {
  return Math.random() * (max - min) + min;
};

// Next.js component to generate and display random coordinates
export default function RandomCoordinates() {
  const [coordinates, setCoordinates] = useState({ lat: null, long: null });
  const [isGenerating, setIsGenerating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const intervalRef = useRef(null);
  const intervalRef2 = useRef(null);

  // useEffect hook to manage the timer
  useEffect(() => {
    // Start generating coordinates if `isGenerating` is true
    if (isGenerating) {
      intervalRef.current = setInterval(() => {
        const newLat = getRandomInRange(11.093456674014751-0.009, 11.093456674014751+0.009);
        const newLong = getRandomInRange(77.16389496411915-0.009,77.16389496411915+0.009);
        setCoordinates({ lat: newLat, long: newLong });
      }, 500); // 500ms = 0.5 seconds
    }

    // Cleanup function to clear the interval when the component unmounts or `isGenerating` changes to false
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isGenerating]); // The effect re-runs when `isGenerating` changes

  useEffect(() => {
    // Start generating coordinates if `isGenerating` is true
    if (isUpdating) {
      intervalRef2.current = setInterval(() => {
            const updates = {
              lat: getRandomInRange(11.093456674014751-0.009, 11.093456674014751+0.009),
              long: getRandomInRange(77.16389496411915-0.009,77.16389496411915+0.009)
            };
            console.log("Updating data:", updates);
            update(dataRef, updates)
            .then(() => {
              console.log("Data updated successfully!");
            })
            .catch((error) => {
              console.error("Error updating data:", error);
            });    
      }, 500); // 500ms = 0.5 seconds
    }
    //Not is Generating
    return () => {
      if (intervalRef2.current) {
        clearInterval(intervalRef2.current);
      }
    };
  }, [isUpdating]); 

  // Click handler to start the generation
  const handleStart = () => {
    setIsGenerating(true);
  };

  const handUpdate = () => {
     setIsUpdating(true);
    
  };

  // Click handler to stop the generation
  const handleStop = () => {
    setIsUpdating(false);
    setIsGenerating(false);
    setCoordinates({ lat: 11.093456674014751, long: 77.16389496411915 });
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Random Coordinate Generator</h1>
      <div className="flex space-x-4 mb-4">
        <button
          onClick={handleStart}
          disabled={isGenerating}
          className="px-4 py-2 text-white bg-blue-500 rounded disabled:opacity-50"
        >
          Start
        </button>
        <button
          onClick={handleStop}
          disabled={!isGenerating}
          className="px-4 py-2 text-white bg-red-500 rounded disabled:opacity-50"
        >
          Stop
        </button>
        <button
          onClick={handUpdate}
          disabled={!isGenerating}
          className="px-4 py-2 text-white bg-red-500 rounded disabled:opacity-50"
        >
          Update
        </button>
      </div>

      <div className="mt-4 p-4 border rounded-md">
        {coordinates.lat !== null ? (
          <>
            <p>
              **Latitude:** {coordinates.lat.toFixed(15)} 
            </p>
            <p>
              **Longitude:** {coordinates.long.toFixed(15)}
            </p>
          </>
        ) : (
          <p>Click "Start" to begin generating coordinates.</p>
        )}
      </div>
    </div>
  );
}
