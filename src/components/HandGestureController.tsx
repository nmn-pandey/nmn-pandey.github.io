import { useEffect, useRef, useCallback } from 'react';
import { Hands, type Results } from '@mediapipe/hands';
import { Camera } from '@mediapipe/camera_utils';
import { toast } from 'sonner';

interface HandGestureControllerProps {
  onGesture: (gesture: string, position: { x: number; y: number }) => void;
  isActive: boolean;
}

// Smoothing factor for hand position (lower = smoother but more lag)
const SMOOTHING_FACTOR = 0.15;
// Minimum movement threshold to reduce jitter
const MOVEMENT_THRESHOLD = 0.02;

export default function HandGestureController({ onGesture, isActive }: HandGestureControllerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const handsRef = useRef<Hands | null>(null);
  const cameraRef = useRef<Camera | null>(null);
  const lastGestureTime = useRef(0);
  const gestureCooldown = 300; // ms - reduced for more responsiveness
  
  // Smooth position tracking
  const smoothedPosition = useRef({ x: 0.5, y: 0.5 });
  const targetPosition = useRef({ x: 0.5, y: 0.5 });
  const animationFrameRef = useRef<number>(0);

  const detectGesture = useCallback((landmarks: { x: number; y: number; z: number }[]) => {
    const indexTip = landmarks[8];
    const indexPip = landmarks[6];
    const middleTip = landmarks[12];
    const middlePip = landmarks[10];
    const ringTip = landmarks[16];
    const ringPip = landmarks[14];
    const pinkyTip = landmarks[20];
    const pinkyPip = landmarks[18];

    // Check if fingers are extended
    const isIndexExtended = indexTip.y < indexPip.y;
    const isMiddleExtended = middleTip.y < middlePip.y;
    const isRingExtended = ringTip.y < ringPip.y;
    const isPinkyExtended = pinkyTip.y < pinkyPip.y;

    // Pointing gesture (index extended, others curled)
    if (isIndexExtended && !isMiddleExtended && !isRingExtended && !isPinkyExtended) {
      return 'point';
    }

    // Open hand (all fingers extended)
    if (isIndexExtended && isMiddleExtended && isRingExtended && isPinkyExtended) {
      return 'open';
    }

    // Fist (all fingers curled)
    if (!isIndexExtended && !isMiddleExtended && !isRingExtended && !isPinkyExtended) {
      return 'fist';
    }

    return 'unknown';
  }, []);

  // Smooth position update using requestAnimationFrame
  const updatePosition = useCallback(() => {
    // Apply smoothing with lerp
    smoothedPosition.current.x += (targetPosition.current.x - smoothedPosition.current.x) * SMOOTHING_FACTOR;
    smoothedPosition.current.y += (targetPosition.current.y - smoothedPosition.current.y) * SMOOTHING_FACTOR;

    animationFrameRef.current = requestAnimationFrame(updatePosition);
  }, []);

  const onResults = useCallback((results: Results) => {
    const now = Date.now();
    
    if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
      const landmarks = results.multiHandLandmarks[0];
      const gesture = detectGesture(landmarks);
      
      // Get index finger tip position for pointing
      const indexTip = landmarks[8];
      
      // Update target position (mirrored horizontally)
      const newX = 1 - indexTip.x;
      const newY = indexTip.y;
      
      // Apply movement threshold to reduce jitter
      const dx = Math.abs(newX - targetPosition.current.x);
      const dy = Math.abs(newY - targetPosition.current.y);
      
      if (dx > MOVEMENT_THRESHOLD || dy > MOVEMENT_THRESHOLD) {
        targetPosition.current = { x: newX, y: newY };
      }
      
      // Send smoothed position
      onGesture(gesture, { 
        x: smoothedPosition.current.x,
        y: smoothedPosition.current.y
      });

      // Handle gesture with cooldown
      if (now - lastGestureTime.current >= gestureCooldown) {
        lastGestureTime.current = now;
      }
    }
  }, [onGesture, detectGesture]);

  useEffect(() => {
    if (!isActive || !videoRef.current) return;

    const video = videoRef.current;

    // Initialize MediaPipe Hands with optimized settings
    const hands = new Hands({
      locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
      }
    });

    hands.setOptions({
      maxNumHands: 1,
      modelComplexity: 0, // Use lighter model for better performance
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5
    });

    hands.onResults(onResults);
    handsRef.current = hands;

    // Initialize camera with lower resolution for better performance
    const camera = new Camera(video, {
      onFrame: async () => {
        await hands.send({ image: video });
      },
      width: 320,
      height: 240
    });

    camera.start()
      .then(() => {
        toast.success('Camera started. Point your index finger to navigate!');
      })
      .catch((err) => {
        console.error('Camera error:', err);
        toast.error('Could not access camera. Please allow camera permissions.');
      });

    cameraRef.current = camera;

    // Start position smoothing loop
    animationFrameRef.current = requestAnimationFrame(updatePosition);

    return () => {
      cancelAnimationFrame(animationFrameRef.current);
      camera.stop();
      hands.close();
    };
  }, [isActive, onResults, updatePosition]);

  if (!isActive) return null;

  return (
    <div className="fixed bottom-4 left-4 z-50">
      <div className="glass rounded-xl p-3">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
          <span className="text-sm font-medium">Hand Tracking Active</span>
        </div>
        <video
          ref={videoRef}
          className="w-40 h-30 rounded-lg object-cover"
          playsInline
          muted
        />
        <div className="mt-2 text-xs text-muted-foreground space-y-1">
          <p>Point index finger to navigate</p>
          <p>Open hand to scroll down</p>
          <p>Fist to scroll up</p>
        </div>
      </div>
    </div>
  );
}
