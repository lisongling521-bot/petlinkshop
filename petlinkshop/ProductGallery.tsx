import Image from "next/image";

const images = [
  { src: "/images/hero-lifestyle.jpg", alt: "PetLinkShop cat litter lifestyle" },
  { src: "/images/package-front.png", alt: "Package front" },
  { src: "/images/package-back.png", alt: "Package back" },
  { src: "/images/usage-scene.png", alt: "Cat litter usage scene" }
];

export function ProductGallery() {
  return (
    <div className="grid gap-3">
      <div className="overflow-hidden rounded-lg bg-sand">
        <Image
          src={images[0].src}
          alt={images[0].alt}
          width={1100}
          height={900}
          priority
          className="aspect-[4/3] w-full object-cover"
        />
      </div>
      <div className="grid grid-cols-3 gap-3">
        {images.slice(1).map((image) => (
          <div key={image.src} className="overflow-hidden rounded-md bg-white">
            <Image src={image.src} alt={image.alt} width={360} height={280} className="aspect-[4/3] object-cover" />
          </div>
        ))}
      </div>
    </div>
  );
}
