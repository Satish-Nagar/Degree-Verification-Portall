# University & Events Images Setup

## 📁 Where to Place Images

**YES, paste your images in the `public` folder!**

## 📍 Steps to Add Images

1. **Place your images in the `public` folder:**
   ```
   DVP/
   └── public/
       ├── pic-1.jpg (already there - for hero background)
       ├── pic-2.jpg (already there - for hero background)
       ├── pic-3.jpg (already there - for hero background)
       ├── university-1.jpg (NEW - Computer Lab)
       ├── university-2.jpg (NEW - Interactive Workshop)
       ├── university-3.jpg (NEW - Lecture Hall)
       └── university-4.jpg (NEW - Sports Complex)
   ```

2. **Name your images exactly as:**
   - `university-1.jpg` - For Computer Lab image
   - `university-2.jpg` - For Interactive Workshop image
   - `university-3.jpg` - For Lecture Hall image
   - `university-4.jpg` - For Sports Complex image

## 🎯 Image Descriptions (Based on Your Images)

Based on the images you showed:
- **university-1.jpg**: Computer lab with students coding
- **university-2.jpg**: Interactive workshop with presenter
- **university-3.jpg**: Lecture hall with projector presentation
- **university-4.jpg**: Sports complex with group photo

## ✅ After Adding Images

Once you place the images in the `public` folder:
1. The carousel will automatically use them
2. Images will rotate every 5 seconds
3. Users can navigate with arrow buttons
4. Dot indicators show current image

## 📝 Quick Checklist

- [ ] Copy your 4 images to `public` folder
- [ ] Rename them to: `university-1.jpg`, `university-2.jpg`, `university-3.jpg`, `university-4.jpg`
- [ ] Refresh your browser to see the changes

## 🔄 If You Want Different Names

If you want to use different image names, update the `ImageCarousel.tsx` file:
```typescript
const images = [
  { url: '/your-image-name-1.jpg', title: 'Your Title' },
  { url: '/your-image-name-2.jpg', title: 'Your Title' },
  // ... etc
];
```

## 💡 Tips

- **Image Size**: Recommended 1200x600px or similar aspect ratio for best display
- **File Format**: JPG, PNG, or WebP all work
- **File Size**: Keep under 1MB per image for faster loading

