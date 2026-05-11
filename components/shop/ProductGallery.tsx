import Image from "next/image";

const images = [
  { src: "/images/package-front.png", alt: "Petlinkshop tofu cat litter front package" },
  { src: "/images/package-back.png", alt: "Petlinkshop tofu cat litter back package instructions" },
  { src: "/images/cat-scene.png", alt: "Petlinkshop low dust tofu cat litter home scene" }
];

export function ProductGallery() {
  return (
    <div className="grid gap-4">
      <div className="surface overflow-hidden bg-zinc-50 p-8">
        <Image
          src="/images/package-front.png"
          alt="Petlinkshop imported tofu cat litter low dust odor control package"
          width={1100}
          height={1100}
          priority
          className="mx-auto aspect-square w-full object-contain"
        />
      </div>
      <div className="grid grid-cols-3 gap-4">
        {images.map((image) => (
          <div key={image.src} className="overflow-hidden rounded-[22px] bg-white ring-1 ring-zinc-200">
            <Image src={image.src} alt={image.alt} width={380} height={320} className="aspect-square object-cover" />
          </div>
        ))}
      </div>
    </div>
  );
}
