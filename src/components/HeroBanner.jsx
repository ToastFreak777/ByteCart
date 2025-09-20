// import Img from "next/image";
import Link from "next/link";

import { urlFor } from "@/lib/client";

const HeroBanner = ({
  heroBanner: { smallText, midText, image, product, buttonText, desc },
}) => {
  return (
    <div className="hero-banner-container">
      <div>
        <p className="beats-solo">{smallText}</p>
        <h3>{midText}</h3>
        {/*//* Could Have just used a regular img , the next/image is for img optimization */}
        {/* <Img
          unoptimized
          src={urlFor(image).url()}
          alt={product}
          className="hero-banner-image"
          width={500}
          height={500}
          priority
        /> */}
        <img src={urlFor(image)} className="hero-banner-image" />

        <div>
          <Link href={`/product/${product}`}>
            <button type="button">{buttonText}</button>
          </Link>

          <div className="desc">
            <h5>DESCRIPTION</h5>
            <p>{desc}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
