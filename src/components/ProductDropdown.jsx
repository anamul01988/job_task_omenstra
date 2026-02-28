import { motion } from "framer-motion";
import { productItems } from "../data/navData";
import { NavTag } from "./NavTag";
import { DropdownShell } from "./DropdownShell";

function ProductCard({ item }) {
  return (
    <motion.a
      href={`/products/${item.id}`}
      // whileHover={{ y: "-0.5rem" }}
      transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
      className="c-nav-card min-w-0 h-[19.625em] group"
    >
      <img
        src={item.imgUrl}
        alt=""
        className="c-nav-card__img absolute bottom-[-2.5rem] left-0 w-full h-[18.75rem] object-cover"
        style={{
          WebkitMaskImage:
            "radial-gradient(circle at center 70%, black 10%, transparent 85%)",
          maskImage:
            "radial-gradient(circle at center 70%, black 10%, transparent 85%)",
        }}
      />
      <div className="relative z-10 w-full">
        <div className="flex items-center gap-[0.5rem] mb-[1rem]">
          <h3 className="c-nav-card__title !mb-0">{item.title}</h3>
          <NavTag tag={item.tag} />
        </div>
        <p className="c-nav-card__desc max-w-full">{item.desc}</p>
      </div>
    </motion.a>
  );
}

export default function ProductDropdown({ isOpen }) {
  return (
    <DropdownShell
      isOpen={isOpen}
      className="grid grid-cols-5 gap-[0.75rem] w-[80rem] p-[0.75rem]"
    >
      {productItems.map((item) => (
        <ProductCard key={item.id} item={item} />
      ))}
    </DropdownShell>
  );
}
