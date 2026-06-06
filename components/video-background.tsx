"use client";

export default function VideoBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        style={{ opacity: 0.18 }}
      >
        <source src="/videos/background.mp4" type="video/mp4" />
      </video>
      {/* Overlay escuro sólido — sem imagem externa, sem flash de brilho */}
      <div className="absolute inset-0 bg-background/80" />
    </div>
  );
}
