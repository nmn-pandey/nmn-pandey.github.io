import React, { useEffect, useRef, useState } from 'react';
import { Hands } from '@mediapipe/hands';
import type { Results } from '@mediapipe/hands';
import * as cam from '@mediapipe/camera_utils';
import Webcam from 'react-webcam';

interface HandTrackerProps {
    onHandMove?: (x: number, y: number) => void;
    onGesture?: (gesture: string) => void;
}

const HandTracker: React.FC<HandTrackerProps> = ({ onHandMove, onGesture }) => {
    const webcamRef = useRef<Webcam>(null);
    const [isActive, setIsActive] = useState(false);
    const lastY = useRef<number | null>(null);

    useEffect(() => {
        const hands = new Hands({
            locateFile: (file) => {
                return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
            },
        });

        hands.setOptions({
            maxNumHands: 1,
            modelComplexity: 1,
            minDetectionConfidence: 0.5,
            minTrackingConfidence: 0.5,
        });

        hands.onResults((results: Results) => {
            if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
                const landmarks = results.multiHandLandmarks[0];
                const indexFingerTip = landmarks[8];

                // Normalize coordinates to -1 to 1
                const x = (indexFingerTip.x - 0.5) * 2;
                const y = (indexFingerTip.y - 0.5) * 2;

                if (onHandMove) onHandMove(x, y);

                // Simple scroll logic
                if (lastY.current !== null) {
                    const deltaY = indexFingerTip.y - lastY.current;
                    if (Math.abs(deltaY) > 0.02) {
                        window.scrollBy(0, deltaY * 1000);
                    }
                }
                lastY.current = indexFingerTip.y;

                // Gesture detection (simple pinch)
                const thumbTip = landmarks[4];
                const distance = Math.sqrt(
                    Math.pow(indexFingerTip.x - thumbTip.x, 2) +
                    Math.pow(indexFingerTip.y - thumbTip.y, 2)
                );

                if (distance < 0.05) {
                    if (onGesture) onGesture('pinch');
                }
            } else {
                lastY.current = null;
            }
        });

        if (webcamRef.current && webcamRef.current.video) {
            const camera = new cam.Camera(webcamRef.current.video, {
                onFrame: async () => {
                    if (webcamRef.current?.video) {
                        await hands.send({ image: webcamRef.current.video });
                    }
                },
                width: 640,
                height: 480,
            });
            camera.start();
        }

        return () => {
            hands.close();
        };
    }, [onHandMove, onGesture]);

    return (
        <div id="hand-tracking-container" style={{ display: isActive ? 'block' : 'none' }}>
            <Webcam
                ref={webcamRef}
                style={{ width: '100%', height: '100%' }}
                screenshotFormat="image/jpeg"
                videoConstraints={{ width: 640, height: 480, facingMode: 'user' }}
            />
            <button
                onClick={() => setIsActive(!isActive)}
                style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    background: 'var(--primary)',
                    border: 'none',
                    color: 'black',
                    padding: '2px 5px',
                    fontSize: '10px',
                    cursor: 'pointer'
                }}
            >
                {isActive ? 'OFF' : 'ON'}
            </button>
        </div>
    );
};

export default HandTracker;
