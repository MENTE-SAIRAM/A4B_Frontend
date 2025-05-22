
export const mockProducts = Array.from({ length: 100 }).map((_, index) => ({
  id: index + 1,
  name: `Phone Model ${index + 1}`,
  brand: "BrandX",
  price: (499 + index * 10).toFixed(2),
  image: "https://www.aptronixindia.com/media/catalog/product/cache/31f0162e6f7d821d2237f39577122a8a/r/1/r1594_starlight_pdp_image_position-1a_avail__en-in-removebg-preview_1.png"
}));
