export function getImagePath(imageId: string) {
  if (imageId) {
    return `https://www.artic.edu/iiif/2/${imageId}/full/843,/0/default.jpg`;
  } else {
    return '/images/no-image-available.png';
  }
}
