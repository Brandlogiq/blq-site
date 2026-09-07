"use client";

export default function VideoBackground({
  src,
  poster,
}: {
  src?: string;
  poster?: string;
}) {
  if (!src && !poster) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {src ? (
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src={src}
          poster={poster}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        />
      ) : (
        <img
          src={poster}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}
      <div className="absolute inset-0 bg-black/50" />
    </div>
  );
}
