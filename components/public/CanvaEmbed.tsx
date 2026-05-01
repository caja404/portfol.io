interface CanvaEmbedProps {
  embedUrl: string;
  title: string;
}

export default function CanvaEmbed({ embedUrl, title }: CanvaEmbedProps) {
  return (
    <div className="w-full">
      <iframe
        src={embedUrl}
        title={title}
        className="w-full h-[400px] md:h-[600px] border-0"
        allow="fullscreen"
        loading="lazy"
      />
    </div>
  );
}
