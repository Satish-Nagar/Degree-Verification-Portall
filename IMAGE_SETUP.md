# Image Setup Instructions

## 📁 Where to Place Images

In Next.js, all static assets (images, fonts, etc.) must be placed in the **`public`** folder.

## 📍 Current Status

Your images (`pic-1.jpg`, `pic-2.jpg`, `pic-3.jpg`) are currently in the **root directory**. They need to be moved to the **`public`** folder.

## ✅ Steps to Fix

1. **Create the `public` folder** (if it doesn't exist):
   ```
   DVP/
   └── public/
   ```

2. **Move your images** from root to public folder:
   ```
   Move: pic-1.jpg → public/pic-1.jpg
   Move: pic-2.jpg → public/pic-2.jpg
   Move: pic-3.jpg → public/pic-3.jpg
   ```

3. **Final structure should be:**
   ```
   DVP/
   ├── public/
   │   ├── pic-1.jpg
   │   ├── pic-2.jpg
   │   └── pic-3.jpg
   ├── app/
   ├── components/
   └── ...
   ```

## 🎯 How It Works

In Next.js, files in the `public` folder are served from the root URL:
- `public/pic-1.jpg` → accessible as `/pic-1.jpg`
- `public/pic-2.jpg` → accessible as `/pic-2.jpg`
- `public/pic-3.jpg` → accessible as `/pic-3.jpg`

The code in `HeroSection.tsx` already uses the correct paths:
```typescript
const backgroundImages = ['/pic-1.jpg', '/pic-2.jpg', '/pic-3.jpg'];
```

## 🚀 After Moving Images

Once you move the images to the `public` folder:
1. Restart your dev server (`npm run dev`)
2. The rotating background images will work automatically
3. Images will rotate every 5 seconds in the hero section

## 📝 Quick Command (Windows PowerShell)

If you're in the project root directory:
```powershell
New-Item -ItemType Directory -Force -Path public
Move-Item -Path pic-1.jpg -Destination public/
Move-Item -Path pic-2.jpg -Destination public/
Move-Item -Path pic-3.jpg -Destination public/
```

## 📝 Quick Command (Command Prompt)

```cmd
mkdir public
move pic-1.jpg public\
move pic-2.jpg public\
move pic-3.jpg public\
```

