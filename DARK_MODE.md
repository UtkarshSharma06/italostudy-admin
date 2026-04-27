# Dark Mode Forced

The app now loads in dark mode by default. The dark class is added to the HTML element before the React app loads.

## How it works:
1. Inline script in `index.html` adds `class="dark"` to `<html>` element
2. Tailwind CSS dark mode is triggered by this class
3. All components use `dark:` variants for colors

## If you see light mode:
1. Hard refresh: `Ctrl + Shift + R`
2. Clear browser cache
3. Check if theme toggle is overriding (click moon icon)

## Files modified:
- `index.html` - Added dark class forcing script
- `src\index.css` - Updated CSS variables for dark theme
- `src\App.tsx` - Set defaultTheme="dark"
- `src\components\Layout.tsx` - Added dark: variants to backgrounds
