module.exports = function(base64, maxWidth, maxHeight, callback) {
  // Max size for thumbnail
  if (typeof maxWidth === 'undefined') maxWidth = 500;
  if (typeof maxHeight === 'undefined') maxHeight = 500;

  // Create and initialize two canvas
  var canvas = document.createElement('canvas');
  var ctx = canvas.getContext('2d');
  var canvasCopy = document.createElement('canvas');
  var copyContext = canvasCopy.getContext('2d');

  // Create original image
  // https://stackoverflow.com/questions/46399223/async-await-in-image-loading
  (async () => {
    const img = new Image();
    img.src = base64;
    await img.decode();
    // img is ready to use

    // Determine new ratio based on max size
    var ratio = 1;
    if (img.width > maxWidth) ratio = maxWidth / img.width;
    else if (img.height > maxHeight) ratio = maxHeight / img.height;

    // Draw original image in second canvas
    canvasCopy.width = img.width;
    canvasCopy.height = img.height;
    copyContext.drawImage(img, 0, 0);

    // Copy and resize second canvas to first canvas
    canvas.width = img.width * ratio;
    canvas.height = img.height * ratio;

    ctx.drawImage(
      canvasCopy,
      0,
      0,
      canvasCopy.width,
      canvasCopy.height,
      0,
      0,
      canvas.width,
      canvas.height
    );

    callback(canvas.toDataURL('image/jpeg'));
  })();
};
