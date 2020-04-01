const fileToDataURL = file => new Promise((resolve) => {
  const reader = new FileReader();
  reader.onloadend = e => resolve(e.target.result);
  reader.readAsDataURL(file);
});

const dataURLToImage = dataURL => new Promise((resolve) => {
  const img = new Image();
  img.onload = () => resolve(img);
  img.src = dataURL;
});

const canvastoFile = (canvas, type, quality) => new Promise(resolve => canvas.toBlob(blob => resolve(blob), type, quality));

const compress = (originCanvas, maxSize) => new Promise(async (resolve) => {
  const originfile = await canvastoFile(originCanvas, 'image/*', 1)
  const originSize = originfile.size / 1024;
  const base64 = await fileToDataURL(originfile);
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  if (originSize < maxSize) return resolve(base64);

  const img = await dataURLToImage(base64);
  const scale = 1;
  const originWidth = img.width;
  const originHeight = img.height;
  const targetWidth = originWidth * scale;
  const targetHeight = originHeight * scale;

  canvas.width = targetWidth;
  canvas.height = targetHeight;
  context.clearRect(0, 0, targetWidth, targetHeight);
  context.drawImage(img, 0, 0, targetWidth, targetHeight);

  const maxQualitySize = { quality: 100, size: Number.MAX_SAFE_INTEGER };
  const minQualitySize = { quality: 0, size: 0 };
  let quality = 100;
  let count = 0;
  let compressFinish = false;
  let failStatus = false;
  let compressBlob = null;

  while (!compressFinish && count < 12) {
    compressBlob = await canvastoFile(canvas, 'image/jpeg', quality / 100);
    const compressSize = compressBlob.size / 1024;
    count++;
    if (compressSize === maxSize) {
      compressFinish = true;
      return;
    }
    if (compressSize > maxSize) {
      maxQualitySize.quality = quality;
      maxQualitySize.size = compressSize;
    }
    if (compressSize < maxSize) {
      minQualitySize.quality = quality;
      minQualitySize.size = compressSize;
    }

    quality = Math.ceil((maxQualitySize.quality + minQualitySize.quality) / 2);

    if (maxQualitySize.quality - minQualitySize.quality < 2) {
      if (!minQualitySize.size && quality) {
        quality = minQualitySize.quality;
      } else if (!minQualitySize.size && !quality) {
        compressFinish = true;
        failStatus = true;
      } else if (minQualitySize.size > maxSize) {
        compressFinish = true;
        failStatus = true;
      } else {
        compressFinish = true;
        quality = minQualitySize.quality;
      }
    }
  }

  if (failStatus) {
    resolve(false);
    return;
  }

  compressBlob = await canvastoFile(canvas, 'image/jpeg', quality / 100);
  const compressedBase64 = await fileToDataURL(compressBlob);
  resolve(compressedBase64);
});


function imgClip(base64Codes) {
  return new Promise(resolve => {
    let img = new Image();
    img.src = base64Codes;
    let canvas = document.createElement('canvas');
    let ctx = canvas.getContext('2d');
    img.onload = async function () {
      let { width: w, height: h } = this
      let isWidthLong = w > h
      let size = isWidthLong ? h : w;
      canvas.width = size;
      canvas.height = size;

      ctx.drawImage(this, isWidthLong ? -(w - h) / 2 : 0, isWidthLong ? 0 : -(h - w) / 2, w, h);
      let t = await compress(canvas, 512);
      resolve(t)
    }
  })
}


export default imgClip;